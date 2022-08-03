import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { API, graphqlOperation } from "aws-amplify";
import { useState } from "react";

import { getBookById } from "./graphql/queries/book";

const bookId = "d91f4994-de48-40d1-8f75-acf5f815b041";

const App = ({ signOut, user }) => {
  const [book, setBook] = useState(null);

  const getBook = async () => {
    const res = await API.graphql(graphqlOperation(getBookById, { bookId }));

    setBook(res.data.getBookById);
  };

  return (
    <>
      <section>
        <button onClick={getBook}>Get book details</button>
        <hr />
        {book && (
          <article>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>{book.price}</p>
          </article>
        )}
      </section>
      <button onClick={signOut}>Sign out</button>
    </>
  );
};

export default withAuthenticator(App);
