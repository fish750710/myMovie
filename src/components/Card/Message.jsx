import React from "react";
import style from "./styled";

import base from "@/api/base";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";

function Actor({ item }) {
  return (
    <style.MessageCard>
      <div className="flex justify-between">
        <div className="flex items-center">
          <Avatar
            alt=""
            src={`${base.originalURL}/w45${item.author_details?.avatar_path}`}
          />
          <div className="name ml-5">{item.author}</div>
        </div>
        <div className="date">{new Date(item.updated_at).toLocaleString()}</div>
      </div>
      <Rating
        name="size-small"
        value={item.author_details?.rating / 2}
        size="small"
        precision={0.5}
        readOnly
      />
      <div className="content">{item.content}</div>
    </style.MessageCard>
  );
}

export default Actor;
