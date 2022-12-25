import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { moviesSVC, accountSVC } from "@/api";

import useFetch from "@/hooks/useFetch";
import useMessage from "@/hooks/useMessage";

const useFavorite = () => {
  const { isLogin, sessionID, userData } = useSelector((state) => state.user);
  const { sendRequest, isLoading, error } = useFetch();
  const [message, setMessage] = useMessage("");
  // const params = useParams();
  // const location = useLocation();
  // const dispatch = useDispatch();
  const [favoriteState, setFavoriteState] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // 我的最愛電影
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
  // 收藏狀態
  const getAccountStates = async (id, category) => {
    try {
      // console.log(id, category, "getAccountStates");
      const accountStatesParams = moviesSVC.getAccountStates(
        id,
        sessionID,
        category
      );
      const res = await sendRequest(
        accountStatesParams.url,
        accountStatesParams.options
      );
      if (res.success === false) return;
      setFavoriteState(res.favorite);
    } catch (error) {
      console.log(error);
    }
  };
  // 新增和移除收藏
  const editFavorite = async (movieId, bool) => {
    try {
      const data = {
        media_type: "movie",
        media_id: movieId,
        favorite: bool,
      };
      const editFavoriteParams = accountSVC.editFavorite(
        data,
        sessionID,
        userData.id
      );
      const res = await sendRequest(
        editFavoriteParams.url,
        editFavoriteParams.options
      );
      if (res.success === true) {
        getFavoriteMovies();
        if (bool) {
          setMessage("已成功加入收藏");
          setFavoriteState(true);
        } else {
          setMessage("已成功取消收藏");
          setFavoriteState(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const favoriteHandler = (movieId, bool) => {
    if (isLogin) {
      editFavorite(movieId, bool);
    } else {
      setMessage("請登錄");
    }
  };

  // useEffect(() => {
  //   // console.log("favoriteHandler =>", favorite);
  //   favoriteHandler(favorite.state);
  // }, [favorite.id, favorite.state]);

  useEffect(() => {
    if (sessionID && isLogin) {
      getFavoriteMovies();
    }
  }, [sessionID]);

  return {
    getAccountStates,
    favoriteMovies,
    favoriteState,
    favoriteHandler,
    message,
    setMessage,
  };
};

export default useFavorite;
