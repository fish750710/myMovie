import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import style from "./styled";
import Actor from "../Card/Actor";

import Button from "@mui/material/Button";

function ActorList({ isLoading, personList }) {
  const navigate = useNavigate();
  const [showNumber, setShowNumber] = useState(7);
  // console.log("actor loading", isLoading);

  const toActorMovies = ({id, name}) => {
    const encodeName = encodeURIComponent(name);
    navigate({pathname:`/person/${id}`, search: `?name=${encodeName}`});
  }
  return (
    <div className="flex flex-wrap">
      {personList?.map((item, index) =>
        index < showNumber ? (
          <Actor isLoading={isLoading} item={item} key={item.id} toActorMovies={toActorMovies} />
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
}

export default ActorList;
