import React from "react";
import { NavLink } from "react-router-dom";
import Search from "../Search";
import style from "./styled";

const index = () => {
  return (
    <style.Navbar>
      <div>
        <NavLink to="/">Logo</NavLink>
      </div>
      <Search />
      <style.Menu>
        <li>
          <NavLink to="movies">電影</NavLink>
        </li>
        <li>
          <NavLink to="drama">戲劇</NavLink>
        </li>
        <li>
          <NavLink to="theme-pavilion">主題館</NavLink>
        </li>
        <li>
          <NavLink to="myMovies">我的片單</NavLink>
        </li>
      </style.Menu>
    </style.Navbar>
  );
};

export default index;
