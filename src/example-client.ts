import { BookSearchApiClient } from "./BookSearchApiClient";

async function retrieveData(): Promise<void> {
  const api = new BookSearchApiClient("json");
  const res = await api.getBooksByAuthor("Shakespeare", 10);

  console.log(res);
}
