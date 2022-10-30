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
const category = 'movie';


function index() {
  const navigate = useNavigate();
  const renderRef = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMoiveList] = useState([]);
  // 類型
  const [movieOptType, setMovieOptType] = useState();
  const [genreList, setGenreList] = useState({
    title: '類型', data: [{id: 0, name:'全部'}]
  });
  // 年份
  const [movieOptYear, setMovieOptYear] = useState();
  const yearList = {
    title: '年份',
    data: [{id: 0, name:'全部'}, {id: 2022, name:'2022'}, {id: 2021, name:'2021'}, {id: 2020, name:'2020'}, {id: 2019, name:'2019'}],
  };
  // 排序
  const [sortType, setSortType] = useState(0);
  const [sortBy, setSortBy] = useState('desc') // asc
  const sortList = {
    data: [{id: 0, name: '人氣', key: 'popularity'}, {id: 1, name: '評分', key: 'vote_average'}, {id: 2, name: '上映日', key: 'release_date'}, {id: 3, name: '片名', key: 'original_title'}],
  };
  const [page, setPage] = useState(1);

  const toDetail = (item) => {
    console.log('item', item);
    navigate(`/detail/${item.id}`);
  };

  // 電影類別
  const getGenreList = async() => {
    setIsLoading(true);
    const url = `${baseURL}/genre/${category}/list?api_key=${apiKey}&language=${lang}`
    try {
      await fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }).then(res => res.json()).then( resData => {
        if (genreList.data.length > 1)  return;
        setGenreList((current) => ({ ...current, data: current.data.concat(resData.genres) }));
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    }
  }
  const getMovieList = async() => {
    // console.log(`${sortList?.data[sortType]?.key}.${sortBy}`);
    const baseURL2 = `${baseURL}/discover/movie?api_key=${apiKey}&language=${lang}`
    // const url = `${baseURL}/movie/550?api_key=${apiKey}`;
    const url3 = `${baseURL2}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    const url4 = `${baseURL2}&with_genres=${movieOptType}&year=${movieOptYear}&sort_by=${sortList?.data[sortType]?.key}.${sortBy}&page=${page}`;
    // &sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2022&with_genres=27&with_watch_monetization_types=flatrate
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
    try {
      setIsLoading(true);
      await fetch(url4, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }).then(res => res.json()).then( resData => {
        // console.log(resData);
        setMoiveList(movieList.concat(resData.results));
        // 模擬 loading..
        setIsLoading(false);
        // setTimeout(() => {
        // }, 500);
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }
  const search = () => {
    // console.log('key', movieOptType, movieOptYear);
    getMovieList();
  };
  const loadMoreHandler = () => {
    if (isLoading) return;
    setPage(current => current+1);
  }

  useEffect(() => {
    try {
      if (renderRef.current) {
        renderRef.current = false;
        return;
      }
      // 避免重複累加 List
      if (genreList.data.length < 2) {
        getGenreList();
      }
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  }, [movieOptType, movieOptYear, sortType, page]);

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
        <Filter data={sortList.data} setOption={setSortType}/>
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
      <div className='btn btn-more btn-gradual w-80 my-14' onClick={loadMoreHandler}>載入更多</div>
    </style.content>
  );
}

export default index;
