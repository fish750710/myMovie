import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import styles from '@/styles/_export.module.scss';
import style from './styled';

import SearchIcon from '@mui/icons-material/Search';

function index() {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState('');

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      const encodeVal = encodeURIComponent(inputVal);
      // console.log(inputVal, encodeVal);
      navigate({pathname: '/search', search: `?key=${encodeVal}`})
      setInputVal('');
    } else if (e.keyCode === 27) {
      setInputVal('');
    }
  }

  return (
    <>
      <style.Search>
        <style.SearchIconWrapper>
          <SearchIcon fontSize="large" />
        </style.SearchIconWrapper>
        <style.StyledInputBase
          type="text"
          placeholder='搜尋片名 / 演員'
          inputProps={{ 'aria-label': 'search' }}
          onKeyDown={handleEnter}
          onChange={(e) => setInputVal(e.target.value)}
          value={inputVal}
        />
      </style.Search>
    </>
  );
}

export default index;
