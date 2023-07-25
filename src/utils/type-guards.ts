import { BooksApiResponse } from "../types/BookSearchApi.type";

export function isBooksApiResponse(
  response: BooksApiResponse | string
): response is BooksApiResponse {
  return Array.isArray((response as BooksApiResponse).results);
}
