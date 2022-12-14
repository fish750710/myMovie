import React, { useEffect, useState, useRef, memo } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/css/pagination";
import Skeleton from "@mui/material/Skeleton";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";

import styles from "@/styles/_export.module.scss";
import style from "./styled";

import { discoverSVC } from "@/api";
import base from "@/api/base";

import useFetch from "@/hooks/useFetch";
import useFavorite from "@/hooks/useFavorite";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default () => {
  const { sendRequest, isLoading, error } = useFetch();
  const { favoriteMovies, favoriteHandler, message, setMessage } =
    useFavorite();
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  // const { isLogin, sessionID, userData } = useSelector((state) => state.user);

  // 最近 1個月上映電影
  const getONMovies = async (category, dateStart, dateEnd) => {
    try {
      const ONMoviesParams = discoverSVC.getONMovies(
        category,
        dateStart,
        dateEnd
      );
      const { results } = await sendRequest(
        ONMoviesParams.url,
        ONMoviesParams.options
      );
      // if (results.length === 0) {
      //   getONMovies("movie", "2022-12-06", "2023-01-06");
      // }
      // console.log(results, "results");
      setItemList(results);
    } catch (error) {
      console.log(error);
    }
  };
  const getDate = (isPrevMonth = false) => {
    const date = new Date();
    const d = String(date.getDate()).padStart(2, "0");
    let m = date.getMonth();
    let y = date.getFullYear();
    if (isPrevMonth) {
      y = m === 0 ? y - 1 : y;
      m = String(m === 0 ? 12 : m).padStart(2, "0");
    } else {
      m = String(m + 1).padStart(2, "0");
    }
    return `${y}-${m}-${d}`;
  };
  const toDetail = (item) => {
    navigate(`/movie/detail/${item.id}`);
  };
  const mappingId = (id) => {
    let state = false;
    if (favoriteMovies?.length) {
      state = !!favoriteMovies?.find((item) => item.id === id);
    }
    return state;
  };

  useEffect(() => {
    getONMovies("movie", getDate(true), getDate());
  }, []);

  return (
    <style.Banner className="">
      {itemList.length === 0 ? (
        <>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={1280}
            height={720}
            sx={{ bgcolor: styles.bg_sub_color }}
          />
          <style.Bg />
        </>
      ) : (
        <>
          <Snackbar
            open={!!message}
            autoHideDuration={6000}
            onClose={() => setMessage("")}
          >
            <Alert
              onClose={() => setMessage("")}
              severity="info"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
          <Box sx={{ display: { xs: "block", sm: "none" }, width: "100%" }}>
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                padding: "0 0",
              }}
              className="w-full"
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 5000,
              }}
              pagination={{
                clickable: true,
              }}
              slidesPerView="auto"
              loop
            >
              {itemList?.map((item, index) => (
                <SwiperSlide key={index} className="">
                  <style.BannerBoxM>
                    <style.Img
                      style={{
                        backgroundImage: `url(${base.originalURL}/w300/${item.backdrop_path})`,
                        backgroundSize: "contain",
                      }}
                    />
                    <style.Bg />
                    <style.TitleM>
                      <div className="score">{item.vote_average}</div>
                      <h2>{item.title}</h2>
                      <div className="btn-box">
                        <a className="more btn-bg">
                          <div
                            className="content"
                            onClick={() => toDetail(item)}
                          >
                            更多資訊
                          </div>
                        </a>
                      </div>
                    </style.TitleM>
                  </style.BannerBoxM>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" }, width: "100%" }}>
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                padding: "0 0",
                maxWidth: 1280,
              }}
              className="w-full"
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 5000,
              }}
              pagination={{
                clickable: true,
              }}
              slidesPerView={1}
              loop
            >
              {itemList?.map((item, index) => (
                <SwiperSlide key={index}>
                  <style.BannerBox>
                    <style.Img
                      style={{
                        backgroundImage: `url(${base.originalURL}/w1280/${item.backdrop_path})`,
                      }}
                    />
                    <style.Bg />
                    <style.Title>
                      <div className="score">{item.vote_average}</div>
                      <h2>{item.title}</h2>
                      <div className="info">
                        <p>
                          {item.overview.length > 60
                            ? item.overview.slice(0, 60) + " ..."
                            : item.overview}
                        </p>
                      </div>
                      <div className="btn-box">
                        <a className="more btn-bg">
                          <div
                            className="content"
                            onClick={() => toDetail(item)}
                          >
                            更多資訊
                          </div>
                        </a>
                        <a
                          className="add btn-bg"
                          // onClick={() =>
                          //   setFavorite({ id: item.id, state: !favoriteState })
                          // }
                          onClick={() =>
                            favoriteHandler(item.id, !mappingId(item.id))
                          }
                        >
                          {mappingId(item.id) ? "取消收藏" : "加入收藏"}
                        </a>
                      </div>
                    </style.Title>
                  </style.BannerBox>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </>
      )}
    </style.Banner>
  );
};
