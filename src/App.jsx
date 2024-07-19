import {
  AddBook,
  AllBooks,
  Book,
  EditBook,
  EditBookThumbnail,
  Home,
  Login,
  Signup,
} from "./pages/Allpages";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout, Protected } from "./components/AllComponents";
import "./admin/charts/ChartjsConfig";
import Dashboard from "./admin/pages/Dashboard";
import AdminLayout from "./admin/partials/AdminLayout";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          path=""
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
          path="book/:bookId"
          element={
            <Protected>
              <Book />
            </Protected>
          }
        />
        <Route
          path="books"
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
      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        <Route
          path="dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
