import React, { useState, memo } from "react";
import style from "./styled";

const index = memo(({ title, data, setOption, selectd }) => {
  return (
    <style.Content>
      {title && <div className="label">{title}</div>}
      <div className="section">
        {data?.map((item, index) => (
          <div
            className={`btn ${item.id === selectd ? "active" : null}`}
            onClick={() => setOption(item.id)}
            key={index}
          >
            {item.name}
          </div>
        ))}
      </div>
    </style.Content>
  );
});

export default index;
