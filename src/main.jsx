import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "@storeVars";
import ThemeProvider from "@utils/admin/ThemeContext";
import "./index.css";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider>
          <App />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            pauseOnHover={false}
            theme="colored"
          />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
