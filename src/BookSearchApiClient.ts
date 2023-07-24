export class BookSearchApiClient {
  format: string;
  baseUrl: string = "http://api.book-seller-example.com";

  constructor(format) {
    this.format = format;
  }

  async getBooksByAuthor(authorName, limit) {
    return await this.fetchBooks(authorName, limit, this.format);
  }

  async fetchBooks(
    authorName: string,
    limit: number,
    format: string
  ): Promise<any> {
    let data;
    try {
      const fullUrl = `${this.baseUrl}/by-author?q=${authorName}&limit=${limit}&format=${format}`;
      let res: Response = await fetch(fullUrl);

      data = res.json();
    } catch (error) {}

    return new Promise(data);
  }
}
