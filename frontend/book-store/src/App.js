import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getBookById } from "./graphql/queries/book";
import { onCreateBook } from "./graphql/subscriptions/book";

const bookId = "d91f4994-de48-40d1-8f75-acf5f815b041";

const App = ({ signOut } = {}) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateBook)).subscribe({
      next: (result) => {
        console.log(result);

        toast(`New book added!`);

        const newBook = result.value.data.onCreateBook;
        setBook(newBook);
      },
    });
  }, []);

  const getBook = async () => {
    const res = await API.graphql({
      query: getBookById,
      variables: {
        bookId,
      },
      authMode: "AWS_IAM",
    });

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
      {signOut && <button onClick={signOut}>Sign out</button>}
      <ToastContainer />
    </>
  );
};

export default withAuthenticator(App);
