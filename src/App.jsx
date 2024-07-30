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
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout, Protected } from "./components/AllComponents";
import "./admin/charts/ChartjsConfig";
import Dashboard from "./admin/pages/Dashboard";
import AdminLayout from "./admin/partials/AdminLayout";
import AllRolesAdmin from "./admin/components/Roles/AllRolesAdmin";
import AllUsersAdmin from "./admin/components/Users/AllUsersAdmin";
import AllPermissionsAdmin from "./admin/components/Permissions/AllPermissionsAdmin";
import { Spinner } from "./components/AllComponents";
import { AllBooksAdmin } from "./admin/components/AllAdminComponents";
const App = () => {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
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
        <Route
          path="all-users"
          element={
            <Protected>
              <AllUsersAdmin />
            </Protected>
          }
        />
        <Route
          path="all-roles"
          element={
            <Protected>
              <AllRolesAdmin />
            </Protected>
          }
        />
        <Route
          path="all-permissions"
          element={
            <Protected>
              <AllPermissionsAdmin />
            </Protected>
          }
        />
        <Route
          path="all-books"
          element={
            <Protected>
              <AllBooksAdmin />
            </Protected>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
