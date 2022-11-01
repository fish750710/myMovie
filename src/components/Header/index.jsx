import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Search from '../Search';
import style from './styled';

import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';

const index = () => {
  const isActive = ({ isActive }) => (isActive ? 'active' : null);
  const [dynamicBg, changeDynamicBg] = useState({
    background: `rgba(27, 30, 37, 0.68)`,
  });

  const handleScroll = (e) => {
    if (window.scrollY > 24) {
      changeDynamicBg({
        background: `rgba(27, 30, 37, ${window.scrollY / 300 + 0.68})`,
      });
    } else {
      changeDynamicBg({ background: `rgba(27, 30, 37, 0.68)` });
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <style.Navbar style={dynamicBg}>
      <div>
        <NavLink to='/'>Logo</NavLink>
      </div>
      <Search />
      <style.Menu>
        <li className='btn'>
          <NavLink
            to='movies'
            className={isActive}
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            電影
          </NavLink>
        </li>
        <li>
          <NavLink
            to='drama'
            className={isActive}
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            電視節目
          </NavLink>
        </li>
        <li>
          <NavLink
            to='theme-pavilion'
            className={isActive}
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            主題館
          </NavLink>
        </li>
        <li>
          <NavLink
            to='myMovies'
            className={isActive}
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            我的片單
          </NavLink>
        </li>
        <IconButton
          size='large'
          edge='end'
          aria-label='account of current user'
          // aria-controls={menuId}
          aria-haspopup='true'
          // onClick={handleProfileMenuOpen}
          color='inherit'
        >
          <AccountCircle fontSize='large' />
        </IconButton>
              {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size='large'
          aria-label='show more'
          aria-haspopup='true'
          color='inherit'
        >
          <MoreIcon />
          <AccountCircle />
        </IconButton>
      </Box> */}
      </style.Menu>
    </style.Navbar>
  );
};

export default index;
