import React, { useState } from 'react';
import style from './styled';

function index({ title, data }) {
  const [state, setState] = useState(0);
  const clickHandler = (name, index) => {
    if (state === index) return;
    console.log(name, index);
    setState(index);
  };
  return (
    <style.Content>
      {title && (<div className='label'>{title}</div>)}
      <div className='section'>
        {data?.map((item, index) => (
          <div className={`btn ${index === state ? 'active' : null}`} onClick={() => clickHandler(item, index)} key={index}>
            {item}
          </div>
        ))}
      </div>
    </style.Content>
  );
}

export default index;
