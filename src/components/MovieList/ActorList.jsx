import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";

import Actor from "../Card/Actor";

import Button from "@mui/material/Button";

// 收藏觸發避免重複渲染 memo
const ActorList = memo(({ isLoading, personList }) => {
  const navigate = useNavigate();
  const [showNumber, setShowNumber] = useState(7);

  const toActorMovies = ({ id, name }) => {
    const encodeName = encodeURIComponent(name);
    navigate({ pathname: `/person/${id}`, search: `?name=${encodeName}` });
  };
  return (
    <div className="flex flex-wrap">
      {personList?.map((item, index) =>
        index < showNumber ? (
          <Actor
            isLoading={isLoading}
            item={item}
            key={item.id}
            toActorMovies={toActorMovies}
          />
        ) : null
      )}
      {showNumber !== personList?.length && showNumber < personList?.length ? (
        <div className="flex items-center ml-5">
          <Button onClick={() => setShowNumber(personList.length)}>
            more..
          </Button>
        </div>
      ) : null}
    </div>
  );
});

export default ActorList;
