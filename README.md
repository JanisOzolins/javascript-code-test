# Javascript Code Test

## Getting started

To build the application please run `npm i` followed by `npm run build`

To run unit tests, please run `npm run test`

## Endpoints

`getBooksByAuthor`

```
Retrieves a list of books matching the name of the author
@param authorName author name
@param limit query param to limit the number of results
@returns an array of Book objects
```

`getBooksByYear`

```
Retrieve a list of books matching the publication year
@param year — publication year of the book
@param limit — query param to limit the number of results
@returns — an array of Book objects
```

---

`BookSearchApiClient` is a simple class that makes a call to a http API to retrieve a list of books and return them.

You need to refactor the `BookSearchApiClient` class, and demonstate in `example-client.js` how it would be used. Refactor to what you consider to be production ready code. You can change it in anyway you would like and can use javascript or typescript.

Things you will be asked about:

1. How could you easily add other book seller APIs in the the future
2. How woud you manage differences in response payloads between differnt APIs without needing to make future changes to whatever code you have in example-client.js
3. How would you implement different query types for example: by publisher, by year published etc
4. How your code would be tested
