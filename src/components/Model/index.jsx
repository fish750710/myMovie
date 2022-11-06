import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Filter from "@/components/Filter";
import Card from "@/components/Card";

import style from "./styled";

import { genreSVC, discoverSVC } from "@/api";
import { setIsLoading } from "@/store/slices/userSlice";

const yearList = JSON.parse(import.meta.env.VITE_YEAR_LIST);
const sortList = JSON.parse(import.meta.env.VITE_SORT_LIST);

function index({ category }) {
  const navigate = useNavigate();
  const renderRef = useRef(true);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [movieList, setMoiveList] = useState([]);
  // 類型
  const [movieOptType, setMovieOptType] = useState();
  const [genreList, setGenreList] = useState({
    title: "類型",
    data: [{ id: 0, name: "全部" }],
  });

  const [movieOptYear, setMovieOptYear] = useState(); // 年份
  const [sortType, setSortType] = useState(0); // 排序
  const [sortBy, setSortBy] = useState("desc"); // asc
  const moreFlag = useRef(false);
  const page = useRef(1);

  const toDetail = (item) => {
    // console.log("item", item);
    navigate(`/${category}/detail/${item.id}`);
  };

  // 電影類別
  const getGenreList = async () => {
    try {
      const { genres } = await genreSVC.getGenreList(category);
      // console.log('getGenreList =>', genres)
      if (genreList.data.length > 1) return;
      setGenreList((current) => ({
        ...current,
        data: current.data.concat(genres),
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const getMovieList = async (more) => {
    // https://image.tmdb.org/t/p/w300/
    // https://www.themoviedb.org/t/p/w300_and_h450_bestv2/
    // https://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg
    // https://image.tmdb.org/t/p/w300/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg
    // or with a poster
    // https://image.tmdb.org/t/p/w92/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    // https://image.tmdb.org/t/p/w154/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    // https://image.tmdb.org/t/p/w185/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    // https://image.tmdb.org/t/p/w342/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    // https://image.tmdb.org/t/p/w500/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    // https://image.tmdb.org/t/p/w780/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    // https://image.tmdb.org/t/p/original/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    try {
      const { results } = await discoverSVC.getMovieList(
        category,
        movieOptType,
        movieOptYear,
        sortType,
        sortBy,
        page.current
      );
      moreFlag.current
        ? setMoiveList(movieList.concat(results))
        : setMoiveList(results);
      moreFlag.current = false;
    } catch (err) {
      console.log(err);
    }
  };
  const search = () => {
    getMovieList();
  };
  const loadMoreHandler = () => {
    if (isLoading) return;
    moreFlag.current = true;
    page.current += 1;
    // setPage((current) => current + 1);
    getMovieList();
  };

  useEffect(() => {
    try {
      if (renderRef.current) {
        renderRef.current = false;
        return;
      }
      page.current = 1;
      dispatch(setIsLoading(true));
      // 避免重複累加 List
      if (genreList.data.length < 2) {
        getGenreList();
      }
      getMovieList();
      dispatch(setIsLoading(false));
      // setTimeout(() => {
      // }, 500);
    } catch (err) {
      dispatch(setIsLoading(false));
      console.log(err);
    }
  }, [movieOptType, movieOptYear, sortType]);

  return (
    <style.content>
      <style.section className="">
        <Filter
          title={genreList.title}
          data={genreList.data}
          setOption={setMovieOptType}
        />
        <Filter
          title={yearList.title}
          data={yearList.data}
          setOption={setMovieOptYear}
        />
        <div className="btn btn-submit btn-gradual" onClick={search}>
          搜尋
        </div>
      </style.section>
      <style.section className="sort-box">
        <Filter data={sortList} setOption={setSortType} />
      </style.section>
      <div className="main">
        <div className="content">
          {movieList.map((item, index) => (
            <Card
              isLoading={isLoading}
              item={item}
              key={index}
              toDetail={toDetail}
            />
          ))}
        </div>
      </div>
      <div
        className="btn btn-more btn-gradual w-80 my-14"
        onClick={loadMoreHandler}
      >
        載入更多
      </div>
    </style.content>
  );
}

export default index;
