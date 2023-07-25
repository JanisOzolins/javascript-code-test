import { BookSearchApiClient } from "../BookSearchApiClient";

const Mock = jest.fn(() => ({
  getBooksByAuthor: jest.fn(),
}));

describe("BookSearchApiClient", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getBooksByAuthor", () => {
    it("should build the request URL correctly", async () => {
      const service = new BookSearchApiClient("json");

      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ author: "William Shakespeare" }),
        })
      ) as jest.Mock;

      await service.getBooksByAuthor("Shakespear", 10);

      expect(fetch).toHaveBeenCalledWith(
        "http://api.book-seller-example.com/by-author?q=Shakespear&limit=10&format=json"
      );
    });

    it("should return the correct mock response", async () => {
      const service = new BookSearchApiClient("json");

      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ author: "William Shakespeare" }),
        })
      ) as jest.Mock;

      const res = await service.getBooksByAuthor("Shakespear", 10);

      expect(res).toStrictEqual({
        author: "William Shakespeare",
      });
    });
  });

  describe("getBooksByYear", () => {
    afterEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ author: "Mark Twain", year: 1993 }),
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

      expect(res).toStrictEqual({ author: "Mark Twain", year: 1993 });
    });
  });
});
