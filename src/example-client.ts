import { BookSearchApiClient } from "./BookSearchApiClient";

async function retrieveData(): Promise<void> {
  const bookSearchService = new BookSearchApiClient("json");

  try {
    const response = await bookSearchService.getBooksByAuthor(
      "Shakespeare",
      10
    );
    console.log(response);
  } catch (error) {
    console.error(error.message);
  }
}
