import React, { useState } from 'react';
import style from './styled';

function index({ title, data, setOption }) {
  const [state, setState] = useState(0);
  const clickHandler = (id) => {
    if (state === id) return;
    // console.log(id);
    setState(id);
    setOption(id);
  };

  return (
    <style.Content>
      {title && <div className='label'>{title}</div>}
      <div className='section'>
        {data?.map((item, index) => (
          <div
            className={`btn ${item.id === state ? 'active' : null}`}
            onClick={() => clickHandler(item.id)}
            key={index}
          >
            {item.name}
          </div>
        ))}
      </div>
    </style.Content>
  );
}

export default index;
