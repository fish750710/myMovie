import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  setUserData,
  setIsLogin,
  setSessionID,
} from "@/store/slices/userSlice";
import style from "./styled";
import StorageUtil from "@/utils/storageUtil";

import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";

import { authenticationSVC, accountSVC } from "@/api";

import useFetch from "@/hooks/useFetch";

const domain = "http://localhost:5173/";

export default () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, isLogin, sessionID } = useSelector((state) => state.user);
  const { sendRequest, isLoading, error } = useFetch();

  const isActive = ({ isActive }) => (isActive ? "active" : null);

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
    const accountDetailsParams = accountSVC.getAccountDetails(sessionID);
    const res = await sendRequest(
      accountDetailsParams.url,
      accountDetailsParams.options
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
      dispatch(setSessionID(res.guest_session_id));
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
    initSessionData();
  }, []);

  return (
    <Box sx={{ display: { xs: "flex", sm: "none" } }}>
      <style.Navbar>
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
                <AccountCircle fontSize="large" /> {userData.name}
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
