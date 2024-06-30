import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./components/Layout.jsx";
import AllBooks from "./pages/AllBooks.jsx";
import AddBook from "./pages/AddBook.jsx";
import EditBook from "./pages/EditBook.jsx";
import EditBookThumbnail from "./components/EditBookThumbnail.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
    >
      <Route
        path=""
        element={<Layout />}
      />
      <Route
        path="all-books"
        element={<AllBooks />}
      />
      <Route
        path="add-book"
        element={<AddBook />}
      />
      <Route
        path="/edit-book/:bookId"
        element={<EditBook />}
      />
      <Route
        path="/edit-book-thumbnail/:bookId"
        element={<EditBookThumbnail />}
      />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
