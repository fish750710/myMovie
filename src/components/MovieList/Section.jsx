// 相關影片
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./styled";
import List from "./List";

import { moviesSVC, discoverSVC } from "@/api";
import { setIsLoading } from "@/store/slices/userSlice";

function section({ title, id, category }) {
  const renderRef = useRef(true);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [itemList, setItemList] = useState();

  // 類似影片
  const getSimilarList = async () => {
    try {
      dispatch(setIsLoading(true));
      const { results: resSimilarList } = await moviesSVC.getSimilar(
        id,
        category
      );
      // console.log('resSimilarList =>', resSimilarList);
      setItemList(resSimilarList);
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  };
  // 最好的戲劇
  const getBestDramas = async () => {
    try {
      dispatch(setIsLoading(true));
      const { results } = await discoverSVC.getBestDramas("movie");
      setItemList(results);
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  };
  // 最受歡迎的電影
  const getPopularMovies = async () => {
    try {
      dispatch(setIsLoading(true));
      const { results } = await discoverSVC.getPopularMovies("movie");
      setItemList(results);
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  };
  // 熱門電影或戲劇
  const getPopData = async (lang) => {
    try {
      dispatch(setIsLoading(true));
      const { results } = await discoverSVC.getPopData(category, lang);
      setItemList(results);
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) {
      switch (title) {
        case "熱門電影":
          getPopularMovies();
          break;
        case "熱門戲劇":
          getBestDramas();
          break;
        case "熱門韓國電影":
          getPopData("ko");
          break;
        case "熱門韓劇":
          getPopData("ko");
          break;
        case "熱門華語劇":
          getPopData("zh");
          break;
        default:
          getPopData("zh");
          break;
      }
      return;
    }
    // if (renderRef.current) {
    //   renderRef.current = false;
    //   return;
    // }
    getSimilarList();
  }, [id]);

  return (
    <style.section>
      <List
        isLoading={isLoading}
        itemList={itemList}
        title={title}
        category={category}
      />
    </style.section>
  );
}

export default section;
