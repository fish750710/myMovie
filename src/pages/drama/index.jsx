import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from '@/components/Filter';
import Card from '@/components/Card';

import style from './styled';
import './index.scss';

// background: rgba(104, 107, 114, 0.1);
const apiKey = '313ea9371ca76d02621113d1bc97a665';
const lang = 'zh-TW'
// https://api.themoviedb.org/3/movie/550?api_key=313ea9371ca76d02621113d1bc97a665
const baseURL = 'https://api.themoviedb.org/3';
const category = 'tv'; // movie


function index() {
  const navigate = useNavigate();
  const renderRef = useRef(true);
  const [movieList, setMoiveList] = useState([]);
  const [movieOptType, setMovieOptType] = useState();
  const [movieOptYear, setMovieOptYear] = useState();
  const [genreList, setGenreList] = useState({
    title: '類型', data: [{id: 0, name:'全部'}]
  });
  const yearList = {
    title: '年份',
    data: [{id: 0, name:'全部'}, {id: 2022, name:'2022'}, {id: 2021, name:'2021'}, {id: 2020, name:'2020'}, {id: 2019, name:'2019'}],
  };
  const sortList = {
    data: ['人氣', '評分', '上映日', '片名'],
  };

  const isLoading = false;

  const toDetail = (item) => {
    console.log('item', item);
    navigate(`/detail/${item.id}`);
  };

  // 電視類別
  const getGenreList = async() => {
    const url = `${baseURL}/genre/${category}/list?api_key=${apiKey}&language=${lang}`
    try {
      await fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }).then(res => res.json()).then( resData => {
        // console.log(resData);
        setGenreList((prvData) => ({ ...prvData, data: prvData.data.concat(resData.genres) }));
      });
    } catch (error) {
      console.log(error)
    }
  }
  const getMovieList = async() => {
    const baseURL2 = `${baseURL}/discover/movie`
    const url = `${baseURL}/movie/550?api_key=${apiKey}`;
    const url2 = `${baseURL2}?api_key=${apiKey}&sort_by=popularity.desc`
    const url3 = `${baseURL2}?api_key=${apiKey}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    // https://image.tmdb.org/t/p/w300/
    // https://www.themoviedb.org/t/p/w300_and_h450_bestv2/
    // https://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg
    // https://image.tmdb.org/t/p/w300/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg
    // or with a poster
    // https://image.tmdb.org/t/p/w92/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    // https://image.tmdb.org/t/p/w154/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    // https://image.tmdb.org/t/p/w185/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    // https://image.tmdb.org/t/p/w342/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    // https://image.tmdb.org/t/p/w500/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    // https://image.tmdb.org/t/p/w780/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    // https://image.tmdb.org/t/p/original/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
    await fetch(url3, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => res.json()).then( resData => {
      console.log(resData);
      setMoiveList(resData.results);
    });
  }
  const search = () => {
    console.log('key', movieOptType, movieOptYear);
  };

  useEffect(() => {
    try {
      if (renderRef.current) {
        renderRef.current = false;
        return;
      }
      getGenreList();
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <style.content>
      <style.section className=''>
        <Filter title={genreList.title} data={genreList.data} setOption={setMovieOptType}/>
        <Filter title={yearList.title} data={yearList.data} setOption={setMovieOptYear}/>
        <div className='btn btn-submit btn-gradual' onClick={search}>
          搜尋
        </div>
      </style.section>
      <style.section className='sort-box'>
        <Filter data={sortList.data} />
      </style.section>
      <div className='main'>
        <div className="content">
          {movieList.map((item, index) => (
              <Card
                isLoading={isLoading}
                item={item}
                key={index}
                toDetail={toDetail}
              />
            ))}
        </div>
      </div>
      <div className='btn btn-more btn-gradual w-80'>載入更多</div>
    </style.content>
  );
}

export default index;
