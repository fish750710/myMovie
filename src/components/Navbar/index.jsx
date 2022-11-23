import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  setUserData,
  setIsLogin,
  setSessionID,
} from '@/store/slices/userSlice';
import Search from '../Search';
import style from './styled';
import StorageUtil from '@/utils/storageUtil';

import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { authenticationSVC, accountSVC } from '@/api';

const domain = 'http://localhost:5173/';

const index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, isLogin, sessionID } = useSelector((state) => state.user);

  const renderRef = useRef(true);
  const isActive = ({ isActive }) => (isActive ? 'active' : null);
  // const [dynamicBg, changeDynamicBg] = useState({
  //   background: `rgba(27, 30, 37, 0.68)`,
  // });

  const logout = async () => {
    const res = await authenticationSVC.logout({ session_id: sessionID });
    StorageUtil.removeSessionID();
    dispatch(setIsLogin(false));
    // location.href = domain;
    navigate('/');
    console.log('登出', res);
  };

  // const handleScroll = (e) => {
  //   if (window.scrollY > 24) {
  //     changeDynamicBg({
  //       background: `rgba(27, 30, 37, ${window.scrollY / 300 + 0.68})`,
  //     });
  //   } else {
  //     changeDynamicBg({ background: `rgba(27, 30, 37, 0.68)` });
  //   }
  // };
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
    } else {
    }
  };

  const getAccountData = async (sessionID) => {
    const res = await accountSVC.getAccountDetails(sessionID);
    // console.log("getAccountDetails res", res);
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

    if (res.success) {
      StorageUtil.saveGuestSessionID(res.guest_session_id);
      dispatch(setSessionID(res.guest_session_id));
    }
    console.log('<getGuestSessionID>', res);
  };
  const getSessionID = async (t) => {
    const body = {
      request_token: t,
    };
    const res = await authenticationSVC.getSessionID(body);
    // console.log("getSessionID", res);
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
    initSessionData();
  }, []);

  useEffect(() => {
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  return (
    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
      <style.Navbar>
        <style.Menu>
          <li className='btn'>
            <NavLink
              to='movie'
              className={isActive}
              style={{ display: 'block', width: '100%', height: '100%' }}
            >
              電影
            </NavLink>
          </li>
          <li>
            <NavLink
              to='tv'
              className={isActive}
              style={{ display: 'block', width: '100%', height: '100%' }}
            >
              電視節目
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="themePavilion"
              className={isActive}
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              主題館
            </NavLink>
          </li> */}
          {isLogin && (
            <li>
              <NavLink
                to='myMovies'
                className={isActive}
                style={{ display: 'block', width: '100%', height: '100%' }}
              >
                我的片單
              </NavLink>
            </li>
          )}

          <IconButton
            size='large'
            edge='end'
            aria-label='account of current user'
            // aria-controls={menuId}
            aria-haspopup='true'
            onClick={handleProfile}
            color='inherit'
          >
            {isLogin ? (
              <>
                <AccountCircle fontSize='large' /> {userData.name}
              </>
            ) : (
              <li>
                <p>登錄</p>
              </li>
            )}
          </IconButton>
        </style.Menu>
      </style.Navbar>
    </Box>
  );
};

export default index;
