import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "../Search";
import style from "./styled";

const index = () => {
  const isActive = ({ isActive }) => isActive ? 'active' : null;
  const [dynamicBg, changeDynamicBg] = useState({
    background: `rgba(27, 30, 37, 0.68)`
  })

  const handleScroll = e => {
    if (window.scrollY > 24) {
      changeDynamicBg({background: `rgba(27, 30, 37, ${window.scrollY/300+0.68})`})
    } else {
      changeDynamicBg({background: `rgba(27, 30, 37, 0.68)`})
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])
  return (
    <style.Navbar style={dynamicBg}>
      <div>
        <NavLink to="/">Logo</NavLink>
      </div>
      <Search />
      <style.Menu>
        <li className='btn'>
          <NavLink to="movies" className={isActive} style={{display: 'block', width: '100%', height: '100%'}}>電影</NavLink>
        </li>
        <li>
          <NavLink to="drama" className={isActive} style={{display: 'block', width: '100%', height: '100%'}}>戲劇</NavLink>
        </li>
        <li>
          <NavLink to="theme-pavilion" className={isActive} style={{display: 'block', width: '100%', height: '100%'}}>主題館</NavLink>
        </li>
        <li>
          <NavLink to="myMovies" className={isActive} style={{display: 'block', width: '100%', height: '100%'}}>我的片單</NavLink>
        </li>
      </style.Menu>
    </style.Navbar>
  );
};

export default index;
