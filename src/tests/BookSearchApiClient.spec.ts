import { BookSearchApiClient } from "../BookSearchApiClient";
import {
  markTwainJsonMockResponse,
  markTwainTextResponse,
  williamShakespeareJsonResponse,
  williamShakespeareTextResponse,
} from "./BookSearchApiClient.mock";

describe("BookSearchApiClient", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getBooksByAuthor", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(williamShakespeareJsonResponse),
          text: () => Promise.resolve(williamShakespeareTextResponse),
        })
      ) as jest.Mock;
    });

    it("should build the request URL correctly", async () => {
      const service = new BookSearchApiClient("json");

      await service.getBooksByAuthor("Shakespear", 10);

      expect(fetch).toHaveBeenCalledWith(
        "http://api.book-seller-example.com/by-author?q=Shakespear&limit=10&format=json"
      );
    });

    it("should return the correct mock response", async () => {
      const service = new BookSearchApiClient("json");

      const res = await service.getBooksByAuthor("Shakespear", 10);

      expect(res.length).toBe(2);
      expect(res[0]).toStrictEqual({
        title: "Romeo and Juliett",
        author: "William Shakespeare",
        isbn: 9789963512737,
        quantity: 756,
        price: 19.99,
      });
      expect(res[1]).toStrictEqual({
        title: "Hamlet",
        author: "William Shakespeare",
        isbn: 9788467033380,
        quantity: 22,
        price: 5.99,
      });
    });

    it("should convert the XML response into correct object", async () => {
      const service = new BookSearchApiClient("xml");
      const res = await service.getBooksByAuthor("Shakespear", 10);

      expect(res).toStrictEqual([
        {
          author: "William Shakespeare",
          isbn: 9789963512737,
          price: 19.99,
          quantity: 756,
          title: "Romeo and Juliett",
        },
        {
          author: "William Shakespeare",
          isbn: 9788467033380,
          price: 5.99,
          quantity: 22,
          title: "Hamlet",
        },
      ]);
    });
  });

  describe("getBooksByYear", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(markTwainJsonMockResponse),
          text: () => Promise.resolve(markTwainTextResponse),
        })
      ) as jest.Mock;
    });

    it("should build the request URL correctly", async () => {
      const service = new BookSearchApiClient("json");

      await service.getBooksByYear(1993, 25);

      expect(fetch).toHaveBeenCalledWith(
        "http://api.book-seller-example.com/by-year?q=1993&limit=25&format=json"
      );
    });

    it("should return the correct mock response", async () => {
      const service = new BookSearchApiClient("json");

      const res = await service.getBooksByYear(1993, 25);

      expect(res).toStrictEqual([
        {
          author: "Mark Tawin",
          isbn: 9287963232737,
          price: 14.5,
          quantity: 12,
          title: "Tom Sawyer Abroad",
        },
        {
          author: "Mark Tawin",
          isbn: 7438467023380,
          price: 99.99,
          quantity: 1,
          title: "A Horse's Tale",
        },
      ]);
    });

    it("should convert the XML response into correct object", async () => {
      const service = new BookSearchApiClient("xml");
      const res = await service.getBooksByAuthor("Mark Twain", 10);

      expect(res).toStrictEqual([
        {
          author: "Mark Tawin",
          isbn: 9287963232737,
          price: 14.5,
          quantity: 12,
          title: "Tom Sawyer Abroad",
        },
        {
          author: "Mark Tawin",
          isbn: 7438467023380,
          price: 99.99,
          quantity: 1,
          title: "A Horse's Tale",
        },
      ]);
    });
  });

  describe("Errors", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve("{results:{{}}"),
          text: () => Promise.resolve(`<root><results></RESULTS></root>`),
        })
      ) as jest.Mock;
    });

    it("should throw an error if invalid XML", async () => {
      const service = new BookSearchApiClient("xml");

      try {
        await service.getBooksByAuthor("Mark Twain", 10);
      } catch (error) {
        expect(error.message).toBe("Error while trying to parse the XML file");
      }
    });

    it("should throw an error if incorrect format provided", async () => {
      // @ts-ignore
      const service = new BookSearchApiClient("randomformat");

      try {
        await service.getBooksByAuthor("Mark Twain", 10);
      } catch (error) {
        expect(error.message).toBe(
          "Invalid response - please make sure the API returns either a valid JSON Object or XML"
        );
      }
    });
  });
});
