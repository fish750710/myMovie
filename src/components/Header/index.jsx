import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import {
  setUserData,
  setIsLogin,
  setSessionID,
} from "@/store/slices/userSlice";
import Search from "../Search";
import style from "./styled";
import StorageUtil from "@/utils/storageUtil";

import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import { common } from "@mui/material/colors";

import { authenticationSVC, accountSVC } from "@/api";

import useFetch from "@/hooks/useFetch";

const domain = "http://localhost:5173/";

export default () => {
  const isMobile = useMediaQuery({ maxWidth: 599 });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, isLogin, sessionID } = useSelector((state) => state.user);
  const { sendRequest, isLoading, error } = useFetch();

  const isActive = ({ isActive }) => (isActive ? "active" : null);
  const [dynamicBg, changeDynamicBg] = useState({
    background: `rgba(27, 30, 37, 0.68)`,
  });

  const logout = async () => {
    const logouttParams = authenticationSVC.logout({ session_id: sessionID });
    const res = await sendRequest(logouttParams.url, logouttParams.options);
    StorageUtil.removeSessionID();
    dispatch(setIsLogin(false));
    navigate("/");
    // console.log("登出", res);
  };

  // 優化效能 節流
  const throttle = (fn, delay = 500) => {
    let timer = null;
    return (...args) => {
      if (timer) return;
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, delay);
    };
  };

  const handleScroll = throttle((e) => {
    if (window.scrollY > 24) {
      changeDynamicBg({
        background: `rgba(27, 30, 37, ${window.scrollY / 300 + 0.68})`,
      });
    } else {
      changeDynamicBg({ background: `rgba(27, 30, 37, 0.68)` });
    }
  }, 500);
  const login = async () => {
    const tokenParams = authenticationSVC.getToken();
    const res = await sendRequest(tokenParams.url, tokenParams.options);
    if (res.success) {
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
    const getAccountDetailsParams = accountSVC.getAccountDetails(sessionID);
    const res = await sendRequest(
      getAccountDetailsParams.url,
      getAccountDetailsParams.options
    );
    if (res.success === false) {
      console.log("remove id");
      StorageUtil.removeSessionID();
      dispatch(setIsLogin(false));
      return;
    }
    dispatch(setUserData(res));
    dispatch(setIsLogin(true));
    dispatch(setSessionID(sessionID));
  };
  const getGuestSessionID = async () => {
    const guestSessionIDParams = authenticationSVC.getGuestSessionID();
    const res = await sendRequest(
      guestSessionIDParams.url,
      guestSessionIDParams.options
    );
    if (res.success) {
      StorageUtil.saveGuestSessionID(res.guest_session_id);
      // 重複渲染問題
      // dispatch(setSessionID(res.guest_session_id));
    }
  };
  const getSessionID = async (t) => {
    const body = {
      request_token: t,
    };
    const sessionIdParams = authenticationSVC.getSessionID(body);
    const res = await sendRequest(sessionIdParams.url, sessionIdParams.options);
    if (res.success === false) {
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
    const request_token = url.searchParams.get("request_token");
    if (sessionID || request_token) {
      sessionID ? getAccountData(sessionID) : getSessionID(request_token);
    } else {
      getGuestSessionID();
    }
  };

  useEffect(() => {
    !isMobile && initSessionData();
  }, []);

  // 效能不好 滾動就重新渲染，使用節流改善效能
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <style.Navbar style={dynamicBg}>
      <div className="flex items-center">
        <NavLink to="/" className="flex items-center">
          <i>
            <img src="./images/logo/film-slate.png" alt="My Movie" />
          </i>
          <p className="pl-2">My Movie</p>
        </NavLink>
        <Search />
      </div>
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        <style.Menu>
          <li className="btn">
            <NavLink
              to="movie"
              className={isActive}
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              電影
            </NavLink>
          </li>
          <li>
            <NavLink
              to="tv"
              className={isActive}
              style={{ display: "block", width: "100%", height: "100%" }}
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
                to="myMovies"
                className={isActive}
                style={{ display: "block", width: "100%", height: "100%" }}
              >
                我的片單
              </NavLink>
            </li>
          )}

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfile}
            color="inherit"
          >
            {isLogin ? (
              <>
                <div onClick={handleClick}>
                  <AccountCircle fontSize="large" /> {userData.name}
                </div>
                {/* <MenuItem onClick={logout}>登出</MenuItem> */}
              </>
            ) : (
              <li>
                <p>登錄</p>
              </li>
            )}
          </IconButton>
        </style.Menu>
      </Box>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        {isLogin && (
          <div onClick={handleClick}>
            <MoreIcon sx={{ fontSize: 26 }} color="primary" />
          </div>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        // MenuListProps={{
        //   'aria-labelledby': 'basic-button',
        // }}
        PaperProps={{
          elevation: 0,
          sx: {
            background: "#686b72",
            color: "white",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              background: "#686b72",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="large" sx={{ color: common["white"] }} />
          </ListItemIcon>
          登出
        </MenuItem>
      </Menu>
    </style.Navbar>
  );
};
