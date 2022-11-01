import React, { useRef, useEffect, useState } from "react";

import style from "./styled";
import List from "./List";

import { moviesSVC } from "@/api";
import base from "@/api/base";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const getSimilarList = async (id) => {
  return await moviesSVC.getSimilar(id);
};

function section({ title, id }) {
  const renderRef = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [itemList, setItemList] = useState();

  useEffect(() => {
    if (renderRef.current) {
      renderRef.current = false;
      return;
    }
    const getMoviesList = async () => {
      try {
        setIsLoading(true);
        const { results: resSimilarList } = await getSimilarList(id);
        console.log('resSimilarList =>', resSimilarList);
        setItemList(resSimilarList);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getMoviesList();
  }, [id]);

  return (
    <style.section>
      <List isLoading={isLoading} itemList={itemList} title={title} />
    </style.section>
  );
}

export default section;
