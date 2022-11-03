import React from "react";
import { useNavigate } from 'react-router-dom';

import Card from "../Card";

function baseList({ isLoading, itemList, title }) {
  const navigate = useNavigate();
  const toDetail = (item) => {
    navigate(`/detail/${item.id}`);
  };
  return (
    <div className='flex flex-wrap'>
      <div className="title label">{title}</div>
        {itemList?.map((item, index) => (
            <Card isLoading={isLoading} item={item} key={index} toDetail={toDetail} />
        ))}
    </div>
  );
}

export default baseList;
