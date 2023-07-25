import {
  BookFormatType,
  BooksApiResponse,
  Book,
  BookApiObject,
} from "./types/BookSearchApi.type";
import { isBooksApiResponse } from "./utils/type-guards";

export class BookSearchApiClient {
  format: BookFormatType;
  baseUrl: string = "http://api.book-seller-example.com";

  constructor(format) {
    this.format = format;
  }

  async getBooksByAuthor(authorName: string, limit: number) {
    // building a URL relevant for this  method
    const getBooksByAuthorBaseUrl = `${this.baseUrl}/by-author`;
    const queryParams = new Map<string, string>();

    if (authorName) queryParams.set("q", authorName);
    if (limit) queryParams.set("limit", String(limit));

    const url = this.createUrlWithParams(getBooksByAuthorBaseUrl, queryParams);

    const response: BooksApiResponse | string = await this.fetcher<
      BooksApiResponse | string
    >(url);
    return this.formatResponse(response);
  }

  async getBooksByYear(year: number, limit: number) {
    // building a URL relevant for this  method
    const getBooksByYearBaseUrl = `${this.baseUrl}/by-year`;
    const queryParams = new Map<string, string>();

    if (year) queryParams.set("q", String(year));
    if (limit) queryParams.set("limit", String(limit));

    const url = this.createUrlWithParams(getBooksByYearBaseUrl, queryParams);

    return this.formatResponse(await this.fetcher(url));
  }

  createUrlWithParams(base: string, params: Map<string, string>): string {
    const fullURL = new URL(base);

    params.forEach(function (value, key) {
      fullURL.searchParams.append(key, value);
    });
    fullURL.searchParams.append("format", this.format);
    return fullURL.toString();
  }

  formatResponse(data: BooksApiResponse | string): Book[] {
    let results: Book[] = [];
    if (this.format === "json" && isBooksApiResponse(data)) {
      results = data.results.map((item: BookApiObject) => {
        const book: Book = {
          title: item.book.title,
          author: item.book.author,
          isbn: Number(item.book.isbn),
          quantity: Number(item.stock.quantity),
          price: Number(item.stock.price),
        };

        return book;
      });
    } else if (this.format === "xml" && typeof data === "string") {
      const parser = new window.DOMParser();
      const xml = parser.parseFromString(data, "text/xml");
      const errorNode = xml.querySelector("parsererror");

      if (errorNode) {
        throw new Error("Error while trying to parse the XML file");
      } else {
        // results array
        const items = xml.documentElement.getElementsByTagName("results")[0];

        items.childNodes.forEach(function (item: HTMLElement) {
          const author =
            item.getElementsByTagName("author")[0].childNodes[0].nodeValue;
          const title =
            item.getElementsByTagName("title")[0].childNodes[0]?.nodeValue;
          const isbn: number = Number(
            item.getElementsByTagName("isbn")[0].childNodes[0]?.nodeValue
          );
          const quantity: number = Number(
            item.getElementsByTagName("quantity")[0].childNodes[0]?.nodeValue
          );
          const price: number = Number(
            item.getElementsByTagName("price")[0].childNodes[0]?.nodeValue
          );

          results.push({
            author,
            title,
            isbn,
            quantity,
            price,
          });
        });
      }
    } else {
      throw new Error(
        "Unsupported response - please make sure the API returns either a JSON Object or XML"
      );
    }

    return results;
  }

  /**
   * generic fetcher function that accepts a full URL with query parameters
   */
  async fetcher<T>(url: string): Promise<T> {
    let data;
    try {
      let res: Response = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Error occured when trying to fetch items" + url);
      }

      if (this.format === "xml") {
        data = res.text();
      } else {
        data = res.json();
      }
    } catch (error) {
      console.log((error as Error).message);
    }

    return data;
  }
}
