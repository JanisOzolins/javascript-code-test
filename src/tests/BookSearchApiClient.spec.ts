import { BookSearchApiClient } from "../BookSearchApiClient";

describe("BookSearchApiClient", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getBooksByAuthor", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve([
              {
                book: {
                  title: "Romeo and Juliett",
                  author: "William Shakespeare",
                  isbn: 9789963512737,
                },
                stock: {
                  quantity: 756,
                  price: 19.99,
                },
              },
              {
                book: {
                  title: "Hamlet",
                  author: "William Shakespeare",
                  isbn: 9788467033380,
                },
                stock: {
                  quantity: 22,
                  price: 5.99,
                },
              },
            ]),
          text: () =>
            Promise.resolve(
              `<root><results><item><book><author>William Shakespeare</author><isbn>9789963512737</isbn><title>Romeo and Juliett</title></book><stock><price>19.99</price><quantity>756</quantity></stock></item><item><book><author>William Shakespeare</author><isbn>9788467033380</isbn><title>Hamlet</title></book><stock><price>5.99</price><quantity>22</quantity></stock></item></results></root>`
            ),
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
          json: () =>
            Promise.resolve([
              {
                book: {
                  title: "Tom Sawyer Abroad",
                  author: "Mark Tawin",
                  isbn: 9287963232737,
                },
                stock: {
                  quantity: 12,
                  price: 14.5,
                },
              },
              {
                book: {
                  title: "A Horse's Tale",
                  author: "Mark Tawin",
                  isbn: 7438467023380,
                },
                stock: {
                  quantity: 1,
                  price: 99.99,
                },
              },
            ]),
          text: () =>
            Promise.resolve(
              `<root><results><item><author>Mark Tawin</author><isbn>9287963232737</isbn><price>14.5</price><quantity>12</quantity><title>Tom Sawyer Abroad</title></item><item><author>Mark Tawin</author><isbn>7438467023380</isbn><price>99.99</price><quantity>1</quantity><title>A Horse's Tale</title></item></results></root>`
            ),
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
});