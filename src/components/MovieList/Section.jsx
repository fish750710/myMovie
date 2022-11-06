// 相關影片
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./styled";
import List from "./List";

import { moviesSVC } from "@/api";
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

  useEffect(() => {
    if (!id) return;
    if (renderRef.current) {
      renderRef.current = false;
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
}

export default section;
