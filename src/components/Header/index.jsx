import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setUserData, setIsLogin, setSessionID } from '@/store/slices/userSlice';
import Search from '../Search';
import style from './styled';
import StorageUtil from '@/utils/storageUtil';

import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';

import { authenticationSVC, accountSVC } from '@/api';

const domain = 'http://localhost:5173/';

const index = () => {
  const dispatch = useDispatch();
  const { userData, isLogin } = useSelector(state => state.user);

  const renderRef = useRef(true);
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
  const login = async () => {
    const res = await authenticationSVC.getToken();
    if (res.success) {
      // token = res.request_token;
      location.href = `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=${domain}`;
    }
  };
  const handleProfile = () => {
    if (!isLogin) {
      login();
    }
  };

  const getAccountData = async (sessionID) => {
    const res = await accountSVC.getAccountDetails(sessionID);
    console.log('getAccountDetails res', res);
    if (res.success === false) {
      console.log('remove id');
      StorageUtil.removeSessionID();
      dispatch(setIsLogin(false));
      return;
    }
    dispatch(setUserData(res));
    dispatch(setIsLogin(true));
    dispatch(setSessionID(sessionID));
  };
  const getGuestSessionID = async () => {
    const res = await authenticationSVC.getGuestSessionID();
    if (res.success === false) {
      StorageUtil.saveGuestSessionID(res.guest_session_id);
      console.log('<getGuestSessionID>');
    }
  };
  const getSessionID = async (t) => {
    const body = {
      request_token: t,
    };
    const res = await authenticationSVC.getSessionID(body);
    console.log('getSessionID', res);
    if (res.success === false) {
      console.log('remove id 2');
      StorageUtil.removeSessionID();
      dispatch(setIsLogin(false));
      location.href = domain;
    } else {
      StorageUtil.saveSessionID(res.session_id);
      getAccountData(res.session_id);
    }
  };
  const initSessionData = () => {
    const sessionID = StorageUtil.getSessionID();
    const url = new URL(location.href);
    const request_token = url.searchParams.get('request_token');

    
    if (sessionID || request_token) {
      console.log('sessionID =>', sessionID, 'token =>', request_token);
      sessionID ? getAccountData(sessionID) : getSessionID(request_token);
    } else {
      getGuestSessionID();
    }
  };

  useEffect(() => {
    if (renderRef.current) {
      renderRef.current = false;
      return;
    }
    initSessionData()
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <style.Navbar style={dynamicBg}>
      <div className='flex items-center'>
        <NavLink to='/' className='flex items-center'>
          <i>
            <img src='./images/logo/film-slate.png' alt='My Movie' />
          </i>
          <p className='pl-2'>My Movie</p>
        </NavLink>
        <Search />
      </div>
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
          onClick={handleProfile}
          color='inherit'
        >
          {isLogin? (<><AccountCircle fontSize='large' /> {userData.name}</>): (<p>登錄</p>)}
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
