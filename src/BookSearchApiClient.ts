export class BookSearchApiClient {
  format: string;
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

    return await this.fetcher(url);
  }

  async getBooksByYear(year: number, limit: number) {
    // building a URL relevant for this  method
    const getBooksByYearBaseUrl = `${this.baseUrl}/by-year`;
    const queryParams = new Map<string, string>();

    if (year) queryParams.set("q", String(year));
    if (limit) queryParams.set("limit", String(limit));

    const url = this.createUrlWithParams(getBooksByYearBaseUrl, queryParams);

    return await this.fetcher(url);
  }

  createUrlWithParams(base: string, params: Map<string, string>): string {
    const fullURL = new URL(base);

    params.forEach(function (value, key) {
      fullURL.searchParams.append(key, value);
    });
    fullURL.searchParams.append("format", this.format);
    return fullURL.toString();
  }

  /**
   * generic fetcher function that accepts a full URL with query parameters
   */
  async fetcher(url: string): Promise<any> {
    let data;
    try {
      let res: Response = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Error occured when trying to fetch items" + url);
      }

      data = res.json();
    } catch (error) {
      console.log((error as Error).message);
    }

    return data;
  }
}
