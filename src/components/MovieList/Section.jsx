// 相關影片
import React, { useRef, useEffect, useState, memo } from "react";

import style from "./styled";
import List from "./List";

import { moviesSVC, discoverSVC } from "@/api";

import useFetch from "@/hooks/useFetch";

// 收藏觸發避免重複渲染 memo
export default memo(({ title, id, category }) => {
  const [itemList, setItemList] = useState();
  const { sendRequest, isLoading, error } = useFetch();

  // 類似影片
  const getSimilarList = async () => {
    try {
      const similarParams = moviesSVC.getSimilar(id, category);
      const { results: resSimilarList } = await sendRequest(
        similarParams.url,
        similarParams.options
      );
      setItemList(resSimilarList);
    } catch (error) {
      console.log(error);
    }
  };
  // 最好的戲劇
  const getBestDramas = async () => {
    try {
      const bestDramasParams = discoverSVC.getBestDramas("movie");
      const { results } = await sendRequest(
        bestDramasParams.url,
        bestDramasParams.options
      );
      setItemList(results);
    } catch (error) {
      console.log(error);
    }
  };
  // 最受歡迎的電影
  const getPopularMovies = async () => {
    try {
      const popularMoviesParams = discoverSVC.getPopularMovies("movie");
      const { results } = await sendRequest(
        popularMoviesParams.url,
        popularMoviesParams.options
      );
      setItemList(results);
    } catch (error) {
      console.log(error);
    }
  };
  // 熱門電影或戲劇
  const getPopData = async (lang) => {
    try {
      const popDataParams = discoverSVC.getPopData(category, lang);
      const { results } = await sendRequest(
        popDataParams.url,
        popDataParams.options
      );
      setItemList(results);
    } catch (error) {
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
});
