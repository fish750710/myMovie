import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Filter from '@/components/Filter';
import Card from '@/components/Card';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TuneIcon from '@mui/icons-material/Tune';

import style from './styled';

import { genreSVC, discoverSVC } from '@/api';
import { setIsLoading } from '@/store/slices/userSlice';

const yearList = JSON.parse(import.meta.env.VITE_YEAR_LIST);
const sortList = JSON.parse(import.meta.env.VITE_SORT_LIST);

function index({ category }) {
  const isMobile = useMediaQuery({ maxWidth: 599 });
  const navigate = useNavigate();
  const renderRef = useRef(true);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [movieList, setMoiveList] = useState([]);
  // 類型
  const [movieOptType, setMovieOptType] = useState(0);
  const [genreList, setGenreList] = useState({
    title: '類型',
    data: [{ id: 0, name: '全部' }],
  });

  const [movieOptYear, setMovieOptYear] = useState(0); // 年份
  const [sortType, setSortType] = useState(0); // 排序
  const [sortBy, setSortBy] = useState('desc'); // asc
  const moreFlag = useRef(false);
  const page = useRef(1);
  const [isFilterOption, setIsFilterOption] = useState(false);

  const toDetail = (item) => {
    // console.log("item", item);
    navigate(`/${category}/detail/${item.id}`);
  };

  // 電影類別
  const getGenreList = async () => {
    try {
      const { genres } = await genreSVC.getGenreList(category);
      // console.log('getGenreList =>', genres)
      if (genreList.data.length > 1) return;
      setGenreList((current) => ({
        ...current,
        data: current.data.concat(genres),
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const getMovieList = async (more) => {
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
      const { results } = await discoverSVC.getMovieList(
        category,
        movieOptType === 0 ? null : movieOptType,
        movieOptYear === 0 ? null : movieOptYear,
        sortType,
        sortBy,
        page.current,
      );
      moreFlag.current
        ? setMoiveList(movieList.concat(results))
        : setMoiveList(results);
      moreFlag.current = false;
    } catch (err) {
      console.log(err);
    }
  };
  const search = () => {
    getMovieList();
  };
  const loadMoreHandler = () => {
    if (isLoading) return;
    moreFlag.current = true;
    page.current += 1;
    // setPage((current) => current + 1);
    getMovieList();
  };

  useEffect(() => {
    try {
      console.log('render');
      if (renderRef.current) {
        renderRef.current = false;
        return;
      }
      page.current = 1;
      dispatch(setIsLoading(true));
      // 避免重複累加 List
      if (genreList.data.length < 2) {
        getGenreList();
      }
      getMovieList();
      dispatch(setIsLoading(false));
      // setTimeout(() => {
      // }, 500);
    } catch (err) {
      dispatch(setIsLoading(false));
      console.log(err);
    }
  }, [movieOptType, movieOptYear, sortType]);

  return (
    <style.content>
      <style.section
        className=''
        style={{ display: isFilterOption || !isMobile ? 'block' : 'none' }}
      >
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Filter
            title={genreList.title}
            data={genreList.data}
            setOption={setMovieOptType}
            selectd={movieOptType}
          />
          <Filter
            title={yearList.title}
            data={yearList.data}
            setOption={setMovieOptYear}
            selectd={movieOptYear}
          />
        </Box>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <FormControl fullWidth sx={{ margin: '10px 0' }}>
            <InputLabel id='demo-simple-select-label' sx={{ color: '#fff' }}>
              {genreList.title}
            </InputLabel>
            <Select
              sx={{
                border: '1px solid darkgrey',
                color: '#fff',
                '& .MuiSvgIcon-root': {
                  color: '#fff',
                },
              }}
              value={movieOptType}
              label={genreList.title}
              onChange={(e) => setMovieOptType(e.target.value)}
            >
              {genreList.data.map((item, index) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ margin: '10px 0' }}>
            <InputLabel id='demo-simple-select-label' sx={{ color: '#fff' }}>
              {yearList.title}
            </InputLabel>
            <Select
              sx={{
                border: '1px solid darkgrey',
                color: '#fff',
                '& .MuiSvgIcon-root': {
                  color: '#fff',
                },
              }}
              value={movieOptYear}
              label={yearList.title}
              onChange={(e) => setMovieOptYear(e.target.value)}
            >
              {yearList.data.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <div className='btn btn-submit btn-gradual' onClick={search}>
          搜尋
        </div>
      </style.section>
      <style.section className='sort-box flex items-center'>
        <Filter data={sortList} setOption={setSortType} selectd={sortType} />
        {isMobile && (
          <TuneIcon
            sx={{ fontSize: 26 }}
            onClick={() => setIsFilterOption(!isFilterOption)}
          />
        )}
      </style.section>
      <div className='main'>
        <div className='content'>
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
      <div
        className='btn btn-more btn-gradual w-80 my-14'
        onClick={loadMoreHandler}
      >
        載入更多
      </div>
    </style.content>
  );
}

export default index;
