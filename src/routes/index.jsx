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
import TV from "@/pages/tv";
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
        path: "tv",
        element: <TV />,
      },
      {
        path: "movie",
        element: <Movies />,
      },
      {
        path: "themePavilion",
        element: <ThemePavilion />,
      },
      {
        path: "myMovies",
        element: <MyMovies />,
      },
      {
        path: "movie/detail/:id",
        element: <Detail />,
      },
      {
        path: "tv/detail/:id",
        element: <Detail />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "person/:personId",
        element: <Person />,
      },
    ],
  },
]);
export default router;
