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
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import EditBookThumbnail from "./components/EditBookThumbnail.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

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
        path="login"
        element={<Login />}
      />
      <Route
        path="signup"
        element={<Signup />}
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
