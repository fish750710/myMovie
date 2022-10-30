import React, { useRef, useEffect, useState } from "react";
import style from "./styled";

import { moviesSVC } from "@/api";
import base from "@/api/base";

import Message from "@/components/Card/Message";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

function index({ id }) {
  const renderRef = useRef(true);
  const [reviews, setReviews] = useState();
  const [rating, setRating] = useState();

  const ratingHandler = (event, newValue) => {
    setRating(newValue);
  };

  useEffect(() => {
    if (renderRef.current) {
      renderRef.current = false;
      return;
    }
    const sortDate = (arr) => {
      const newArr = arr.map((item) => {
        item.time = new Date(item.updated_at).toLocaleString();
        item.t = new Date(item.updated_at).getTime();
        return item;
      });
      return newArr.sort((a, b) => b.t - a.t);
    };
    const getReviews = async (id) => {
      try {
        const res = await moviesSVC.getReviews(id);
        setReviews(sortDate(res.results));
      } catch (error) {
        console.log("reviews:", error);
      }
    };
    getReviews(id);
  }, [id]);
  return (
    <style.CardBox>
      <style.Card>
        <div className="flex items-end justify-end">
          <div className="label">
            評分
            <Rating
              className="ml-5"
              name="size-large"
              value={rating}
              size="large"
              onChange={() => ratingHandler}
            />
          </div>
        </div>
        {reviews?.map((item) => (
          <Message item={item} key={item.id} />
        ))}
      </style.Card>
    </style.CardBox>
  );
}

export default index;
