import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

import { Provider } from "react-redux";
import store from "./store";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
  // </React.StrictMode>
);
