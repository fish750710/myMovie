import React from "react";

import styles from "@/styles/_export.module.scss";
import style from "./styled";

import base from "@/api/base";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function index({ isLoading, item, toDetail }) {
  return (
    <style.CardBox>
      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={152}
            height={225}
            sx={{ bgcolor: styles.bg_sub_color }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "21px", bgcolor: styles.bg_sub_color }}
          />
        </Stack>
      ) : (
        <style.Card onClick={() => toDetail(item)}>
          <style.Img
            style={{
              backgroundImage: `url(${base.originalURL}/w154/${item.poster_path})`,
            }}
          />
          <div className="score">{item.vote_average?.toFixed(1)}</div>
          <div className="move-name">{item.title || item.name}</div>
        </style.Card>
      )}
    </style.CardBox>
  );
}

export default index;
