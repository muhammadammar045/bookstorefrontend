import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import {
  AddProduct,
  AllProducts,
  Product,
  EditProduct,
  Home,
  Login,
  Signup,
} from "@userPages";
import {
  AllPermissionsAdmin,
  AddOrUpdatePermission,
  AllCategoriesAdmin,
  AddOrUpdateCategory,
  AllRolesAdmin,
  AddOrUpdateRole,
  AllProductsAdmin,
  AddOrUpdateProduct,
  AllUsersAdmin,
  AddOrUpdateUser,
  Main,
} from "@adminPages";
import { Error404, SomethingWrong } from "@commonPartials";
import { AdminLayout, AdminProtected, Protected, Layout } from "@layout";
import { Spinner } from "@loadingState";
import CategoryProducts from "./user/components/Category/CategoryProducts";
import Checkout from "./user/components/Cart/Checkout";
import Cart from "./user/components/Cart/Cart";
import PaymentCancelPage from "./utils/payment/Stripe/PaymentCancel";
import PaymentSuccessPage from "./utils/payment/Stripe/PaymentSuccessPage";
import AllOrders from "./user/components/Orders/AllOrders";

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
    <ErrorBoundary FallbackComponent={SomethingWrong}>
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
            path="product/:productId"
            element={
              <Protected>
                <Product />
              </Protected>
            }
          />
          <Route
            path="products"
            element={
              <Protected>
                <AllProducts />
              </Protected>
            }
          />
          <Route
            path="add-product"
            element={
              <Protected>
                <AddProduct />
              </Protected>
            }
          />
          <Route
            path="edit-product/:productId"
            element={
              <Protected>
                <EditProduct />
              </Protected>
            }
          />
          <Route
            path="category-products/:categoryId"
            element={
              <Protected>
                <CategoryProducts />
              </Protected>
            }
          />
          <Route
            path="/cart"
            element={
              <Protected>
                <Cart />
              </Protected>
            }
          />
          <Route
            path="/checkout"
            element={
              <Protected>
                <Checkout />
              </Protected>
            }
          />
          <Route
            path="/payment-success"
            element={<PaymentSuccessPage />}
          />
          <Route
            path="/payment-cancel"
            element={<PaymentCancelPage />}
          />
          <Route
            path="/user/orders"
            element={
              <Protected>
                <AllOrders />
              </Protected>
            }
          />
        </Route>

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          {/* DASHBOARD */}
          <Route path="dashboard">
            <Route
              index
              path="main"
              element={
                <AdminProtected>
                  <Main />
                </AdminProtected>
              }
            />
          </Route>

          {/* USERS */}
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

          {/* PRODUCTS */}
          <Route path="products">
            <Route
              path="all-products"
              element={
                <AdminProtected>
                  <AllProductsAdmin />
                </AdminProtected>
              }
            />
            <Route
              path="add-or-update-product"
              element={
                <AdminProtected>
                  <AddOrUpdateProduct />
                </AdminProtected>
              }
            />
          </Route>

          {/* ROLES */}
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

          {/* PERMISSIONS */}
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

          {/* CATEGORIES */}
          <Route path="categories">
            <Route
              path="all-categories"
              element={
                <AdminProtected>
                  <AllCategoriesAdmin />
                </AdminProtected>
              }
            />
            <Route
              path="add-or-update-category"
              element={
                <AdminProtected>
                  <AddOrUpdateCategory />
                </AdminProtected>
              }
            />
          </Route>
        </Route>
        <Route
          path="*"
          element={<Error404 />}
        />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
