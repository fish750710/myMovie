import React from 'react';
import Filter from '@/components/Filter';

import style from './styled';
import './index.scss';

// background: rgba(104, 107, 114, 0.1);
function index() {
  const movieType = {
    title: '類型',
    data: [
      '全部',
      '科幻奇幻',
      '戰爭',
      '劇情',
      '動作',
      '動畫',
      '喜劇',
      '家庭',
      '懸疑',
      '新聞',
      '犯罪',
      '真人秀',
      '記錄',
      '肥皂劇',
      '脫口秀',
      '西部',
    ],
  };
  const year = {title:'年份', data:['全部', '2022', '2021', '2020', '2019', '2018']};
  return (
    <style.content>
      <div className="filter-box">
        <Filter title={movieType.title} data={movieType.data}/>
        <Filter title={year.title} data={year.data}/>
      </div>
    </style.content>
  );
}

export default index;
