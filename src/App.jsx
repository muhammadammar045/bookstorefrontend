import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Protected } from "./components/AllComponents";
import {
  AddBook,
  AllBooks,
  EditBook,
  EditBookThumbnail,
  Home,
  Login,
  Signup,
} from "./pages/Allpages";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<Home />}
        />
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="signup"
          element={<Signup />}
        />

        <Route
          path="all-books"
          element={
            <Protected>
              <AllBooks />
            </Protected>
          }
        />
        <Route
          path="add-book"
          element={
            <Protected>
              <AddBook />
            </Protected>
          }
        />
        <Route
          path="edit-book/:bookId"
          element={
            <Protected>
              <EditBook />
            </Protected>
          }
        />
        <Route
          path="edit-book-thumbnail/:bookId"
          element={
            <Protected>
              <EditBookThumbnail />
            </Protected>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
