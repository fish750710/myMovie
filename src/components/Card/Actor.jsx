import React from "react";
import style from "./styled";

import base from "@/api/base";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function ({ isLoading, item, toActorMovies }) {
  return (
    <>
      {isLoading ? (
        <Stack spacing={1} className="ml-3">
          <Skeleton
            animation="wave"
            variant="rounded"
            width={92}
            height={138}
            sx={{ bgcolor: "#686b72" }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "21px", bgcolor: "#686b72" }}
          />
        </Stack>
      ) : (
        <style.Actor
          className="flex flex-wrap person btn"
          key={item.id}
          onClick={() => toActorMovies(item)}
        >
          <img
            src={`${base.originalURL}/w92/${item.profile_path}`}
            alt={item.id}
          />

          <p>{item.name}</p>
        </style.Actor>
      )}
    </>
  );
}
