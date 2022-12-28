import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../Card";

export default function ({ isLoading, itemList, title, category }) {
  const navigate = useNavigate();
  const toDetail = (item) => {
    navigate(`/${category}/detail/${item.id}`);
  };
  return (
    <div className="flex flex-col">
      <div className="title label">{title}</div>
      <div className="flex flex-wrap">
        {itemList?.map((item, index) => (
          <Card
            isLoading={isLoading}
            item={item}
            key={index}
            toDetail={toDetail}
          />
        ))}
      </div>
    </div>
  );
}
