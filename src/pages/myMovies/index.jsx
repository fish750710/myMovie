import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useFetch from "@/hooks/useFetch";

import { accountSVC } from "@/api";

import BaseList from "@/components/MovieList/BaseList";
import style from "./styled";

export default function () {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sendRequest, isLoading, error } = useFetch();
  const { sessionID, userData, isLogin } = useSelector((state) => state.user);

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteTV, setFavoriteTV] = useState([]);

  const getFavoriteMovies = async () => {
    try {
      const favoriteMoviesParams = accountSVC.getFavoriteMovies(
        sessionID,
        userData.id
      );
      const res = await sendRequest(
        favoriteMoviesParams.url,
        favoriteMoviesParams.options
      );
      setFavoriteMovies(res.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getFavoriteTV = async () => {
    try {
      const favoriteTVParams = accountSVC.getFavoriteTV(sessionID, userData.id);
      const res = await sendRequest(
        favoriteTVParams.url,
        favoriteTVParams.options
      );
      setFavoriteTV(res.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLogin) navigate("/", { replace: true });
    if (sessionID) {
      getFavoriteMovies();
      getFavoriteTV();
    }
  }, [sessionID]);

  return (
    <style.content>
      <style.section>
        <BaseList
          isLoading={isLoading}
          itemList={favoriteMovies}
          title="電影"
          category="movie"
        />
      </style.section>
      <style.section>
        <BaseList
          isLoading={isLoading}
          itemList={favoriteTV}
          title="電視節目"
          category="tv"
        />
      </style.section>
    </style.content>
  );
}
