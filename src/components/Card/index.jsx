import React from 'react';
import style from './styled';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function index({ isLoading, item, toDetail }) {
  return (
    <style.CardBox>
      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton
            animation='wave'
            variant='rounded'
            width={152}
            height={225}
            sx={{ bgcolor: '#686b72' }}
          />
          <Skeleton
            animation='wave'
            variant='text'
            sx={{ fontSize: '21px', bgcolor: '#686b72' }}
          />
        </Stack>
      ) : (
        <style.Card onClick={() => toDetail(item)}>
          <style.Img
            style={{
              background: `linear-gradient(
                180deg,
                rgba(22, 22, 22, 0) 30.58%,
                rgba(22, 22, 22, 0.98) 100%
              ), url(${item.imgUrl})`
            }}
          />
          <div className='score'>{item.score}</div>
          <div className='move-name'>{item.name}</div>
        </style.Card>
      )}
    </style.CardBox>
  );
}

export default index;
