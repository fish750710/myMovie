import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import styled from 'styled-components';
// import styles from '@/styles/_export.module.scss';
import style from "./styled";

import SearchIcon from "@mui/icons-material/Search";

export default function () {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState("");

  // 防抖
  const debounce = (fn, delay = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  // 改善效能使用防抖 debounce
  const handleEnter = debounce((e) => {
    if (e.keyCode === 13) {
      const encodeVal = encodeURIComponent(inputVal);
      navigate({ pathname: "/search", search: `?key=${encodeVal}` });
      setInputVal("");
    } else if (e.keyCode === 27) {
      setInputVal("");
    }
  }, 500);

  return (
    <>
      <style.Search>
        <style.SearchIconWrapper>
          <SearchIcon fontSize="large" />
        </style.SearchIconWrapper>
        <style.StyledInputBase
          type="text"
          placeholder="搜尋片名 / 演員"
          inputProps={{ "aria-label": "search" }}
          onKeyDown={handleEnter}
          onChange={(e) => setInputVal(e.target.value)}
          value={inputVal}
        />
      </style.Search>
    </>
  );
}
