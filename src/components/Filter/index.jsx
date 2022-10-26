import React, { useState } from "react";
import style from "./styled";

function index({ title, data }) {
  const [state, setState] = useState('全部')
  const clickHandler = (name) => {
    if(state === name) return;
    console.log(name)
    setState(name)
  }
  return (
    <style.Content>
      <div className="title">{title}</div>
      <div className="section">
        {data?.map((item, index) => <div className='btn' onClick={() => clickHandler(item)} key={index}>{item}</div>)}
      </div>
    </style.Content>
  );
}

export default index;
