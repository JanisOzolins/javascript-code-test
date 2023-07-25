import { BooksApiResponse } from "../types/BookSearchApi.type";

export const markTwainJsonMockResponse: BooksApiResponse = {
  results: [
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
  ],
};

export const markTwainTextResponse: string = `<root><results><item><author>Mark Tawin</author><isbn>9287963232737</isbn><price>14.5</price><quantity>12</quantity><title>Tom Sawyer Abroad</title></item><item><author>Mark Tawin</author><isbn>7438467023380</isbn><price>99.99</price><quantity>1</quantity><title>A Horse's Tale</title></item></results></root>`;

export const williamShakespeareJsonResponse: BooksApiResponse = {
  results: [
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
  ],
};

export const williamShakespeareTextResponse: string = `<root><results><item><book><author>William Shakespeare</author><isbn>9789963512737</isbn><title>Romeo and Juliett</title></book><stock><price>19.99</price><quantity>756</quantity></stock></item><item><book><author>William Shakespeare</author><isbn>9788467033380</isbn><title>Hamlet</title></book><stock><price>5.99</price><quantity>22</quantity></stock></item></results></root>`;
