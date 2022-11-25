import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { moviesSVC, accountSVC } from "@/api";

// 暫時不處理

const useFavorite = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, isLogin, sessionID, userData } = useSelector(
    (state) => state.user
  );
  const [favoriteState, setFavoriteState] = useState(false);
  const [message, setMessage] = useState(100);
  const [movieId, setMovieId] = useState();
  const [favorite, setFavorite] = useState({ id: 0, state: false });

  // 新增和移除收藏
  // const editFavorite = async (bool) => {
  //   try {
  //     const data = {
  //       media_type: location.pathname.split("/")[1],
  //       media_id: movieId,
  //       favorite: bool,
  //     };
  //     const res = await accountSVC.editFavorite(data, sessionID, userData.id);
  //     // console.log("editFavorite =>", res);
  //     if (res.success === true) {
  //       setFavoriteState(bool);
  //       // updateFavoriteMovies();
  //       if (bool) {
  //         setMessage("已成功加入收藏");
  //       } else {
  //         setMessage("已成功取消收藏");
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const favoriteHandler = (bool) => {
    if (isLogin) {
      editFavorite(bool);
    } else {
      setMessage("請登錄");
    }
  };

  useEffect(() => {
    // console.log("favoriteHandler =>", favorite);
    favoriteHandler(favorite.state);
  }, [favorite.id, favorite.state]);

  return { favoriteState, message, setFavorite, setMessage };
};

export default useFavorite;
