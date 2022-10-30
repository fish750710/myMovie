import React, { useState } from "react";
// import style from "./styled";
import Actor from "../Card/Actor";

import Button from "@mui/material/Button";

function ActorList({ isLoading, personList }) {
  const [showNumber, setShowNumber] = useState(7);
  // console.log("actor loading", isLoading);
  return (
    <div className="flex flex-wrap">
      {personList?.map((item, index) =>
        index < showNumber ? (
          <Actor isLoading={isLoading} item={item} key={item.id} />
        ) : null
      )}
      {showNumber !== personList?.length ? (
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
