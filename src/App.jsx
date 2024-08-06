import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  AddBook,
  AllBooks,
  Book,
  EditBook,
  EditBookThumbnail,
  Home,
  Login,
  Signup,
} from "@userPages/Allpages";
import {
  AllBooksAdmin,
  AllPermissionsAdmin,
  AllRolesAdmin,
  AllUsersAdmin,
  AddOrUpdateBook,
  AddOrUpdatePermission,
  AddOrUpdateRole,
  AddOrUpdateUser,
  Dashboard,
} from "@adminPages/AllAdminPages";
import {
  AdminLayout,
  AdminProtected,
  Protected,
  Layout,
} from "@layout/AllLayouts";
import { Spinner } from "@userComponents/AllComponents";

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
    }, 2000);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Routes>
      {/* USER ROUTES */}
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

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        <Route path="dashboard">
          <Route
            index
            path="main"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
        </Route>
        <Route path="users">
          <Route
            path="all-users"
            element={
              <AdminProtected>
                <AllUsersAdmin />
              </AdminProtected>
            }
          />
          <Route
            path="add-or-update-user"
            element={
              <AdminProtected>
                <AddOrUpdateUser />
              </AdminProtected>
            }
          />
        </Route>
        <Route path="books">
          <Route
            path="all-books"
            element={
              <AdminProtected>
                <AllBooksAdmin />
              </AdminProtected>
            }
          />
          <Route
            path="add-or-update-book"
            element={
              <AdminProtected>
                <AddOrUpdateBook />
              </AdminProtected>
            }
          />
        </Route>
        <Route path="roles">
          <Route
            path="all-roles"
            element={
              <AdminProtected>
                <AllRolesAdmin />
              </AdminProtected>
            }
          />
          <Route
            path="add-or-update-role"
            element={
              <AdminProtected>
                <AddOrUpdateRole />
              </AdminProtected>
            }
          />
        </Route>
        <Route path="permissions">
          <Route
            path="all-permissions"
            element={
              <AdminProtected>
                <AllPermissionsAdmin />
              </AdminProtected>
            }
          />
          <Route
            path="add-or-update-permission"
            element={
              <AdminProtected>
                <AddOrUpdatePermission />
              </AdminProtected>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
