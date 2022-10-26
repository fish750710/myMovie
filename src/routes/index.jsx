import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import App from "../App";
import Home from "../pages/home";
import Movies from "../pages/movies";
import Drama from "../pages/drama";
import ThemePavilion from "../pages/themePavilion";
import MyMovies from "../pages/myMovies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "drama",
        element: <Drama />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "theme-pavilion",
        element: <ThemePavilion />,
      },
      {
        path: "myMovies",
        element: <MyMovies />,
      },
    ],
  },
]);
export default router;
