import React, { memo } from 'react';
import style from './styled';

const index = memo(({ item }) => {
  return (
    <style.Tag>
      {item}
    </style.Tag>
  );
});

export default index;
