export type BookFormatType = "json" | "xml";

export interface Book {
  title: string;
  author: string;
  isbn: number;
  quantity: number;
  price: number;
}

export interface BookApiObject {
  book: {
    title: string;
    author: string;
    isbn: number;
  };
  stock: {
    quantity: number;
    price: number;
  };
}

export interface BooksApiResponse {
  results: BookApiObject[];
}
