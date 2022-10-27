import React from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from '@/components/Filter';
import Card from '@/components/Card';

import style from './styled';
import './index.scss';

// background: rgba(104, 107, 114, 0.1);
function index() {
  const navigate = useNavigate();

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
  const year = {
    title: '年份',
    data: ['全部', '2022', '2021', '2020', '2019', '2018'],
  };
  const sortList = {
    data: ['人氣', '評分', '上映日', '片名'],
  };

  const isLoading = false;
  const itemList = [
    {
      id: 'tt',
      name: '蛛蛛人',
      imgUrl:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      score: '8.2',
    },
    {
      id: 'tt2',
      name: '蛛蛛人2',
      imgUrl:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
      score: '7.5',
    },
    {
      id: 'tt3',
      name: '蛛蛛人3',
      imgUrl:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
      score: '6',
    },
    {
      id: 'tt4',
      name: '蛛蛛人4',
      imgUrl:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      score: '9.1',
    },
    {
      id: 'tt5',
      name: '蛛蛛人5',
      imgUrl:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      score: '2',
    },
  ];

  const toDetail = (item) => {
    console.log('item', item)
    navigate(`/detail/${item.id}`)
  }

  return (
    <style.content>
      <style.section className=''>
        <Filter title={movieType.title} data={movieType.data} />
        <Filter title={year.title} data={year.data} />
        <div className='btn btn-submit btn-gradual'>搜尋</div>
      </style.section>
      <style.section className='sort-box'>
        <Filter data={sortList.data} />
      </style.section>
      <div className='main'>
        { itemList.map((item, index) => <Card isLoading={isLoading} item={item} key={index} toDetail={toDetail} />)}
      </div>
      <div className='footer'>
        <div className='btn btn-more btn-gradual'>載入更多</div>
      </div>
    </style.content>
  );
}

export default index;
