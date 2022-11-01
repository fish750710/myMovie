import React from "react";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import App from "@/App";
import Home from "@/pages/home";
import Movies from "@/pages/movies";
import Drama from "@/pages/drama";
import ThemePavilion from "@/pages/themePavilion";
import MyMovies from "@/pages/myMovies";
import Detail from "@/pages/detail";
import Search from "@/pages/search";
import Person from "@/pages/person";

const router = createHashRouter([
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
      {
        path: "detail/:id",
        element: <Detail />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "person/:personId",
        element: <Person />
      }
    ],
  },
]);
export default router;
