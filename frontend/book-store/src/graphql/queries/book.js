export const getBookById = `
  query GetBookById($bookId: ID!) {
    getBookById(bookId: $bookId) {
      title
      author
      description
      price
    }
  }
`;
