import React, { useRef, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Card from '@/components/Card';
import Actor from '@/components/Card/Actor';
import ActorList from '@/components/MovieList/ActorList';

import { moviesSVC, searchSVC } from '@/api';
import base from '@/api/base';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { createTheme } from '@mui/material/styles';

import style from './styled';
// import styles from '@/styles/_export.module.scss';

function index() {
  const renderRef = useRef(true);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [queryKey, seQueryKey] = useState('');
  const [total, setTotal] = useState(0);
  const [tabValue, setTabValue] = React.useState(0);

  const [movieList, setMovieList] = useState([]);
  const [tvList, setTVList] = useState([]);
  const [personList, setPersonList] = useState([]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getPerson = async (name) => {
    try {
      const res = await searchSVC.getPerson(name);
      console.log(res);
      setMovieList(res.results);
      setTotal(res.total_results);
    } catch (err) {
      console.log(err);
    }
  };
  const searchData = async (keyword) => {
    try {
      const res = await searchSVC.searchData(keyword);
      console.log(res);
      let m = [];
      let t = [];
      let p = [];
      res.results.forEach((item) => {
        switch (item.media_type) {
          case 'movie':
            m.push(item);
            break;
          case 'tv':
            t.push(item);
            break;
          case 'person':
            p.push(item);
            break;
          default:
            console.log(item.media_type)
            break;
        }
      });
      setMovieList(m);
      setTVList(t);
      setPersonList(p);
      setTotal(res.total_results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      if (renderRef.current) {
        renderRef.current = false;
        return;
      }
      const key = searchParams.get('key');
      console.log('key', key);
      seQueryKey(key);
      searchData(key);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams.get('key')]);

  // const section = (item) => {
  //   switch (item.media_type) {
  //     case 'person':
  //       return (
  //         <Actor
  //           isLoading={isLoading}
  //           item={item}
  //           // key={item.id}
  //           // toActorMovies={toActorMovies}
  //         />
  //       );
  //     case 'tv':
  //     case 'movie':
  //       return (
  //         <Card
  //           isLoading={isLoading}
  //           item={item}
  //           // key={index}
  //           // toDetail={toDetail}
  //         />
  //       );
  //     default:
  //       return <>000</>;
  //   }
  // };

  return (
    <style.Content>
      <style.Section>
        <div className='label'>
          {queryKey} ({total})
        </div>
        <div className='content'>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleChange}
                aria-label='tabs'
                indicatorColor='secondary'
                textColor='inherit'
              >
                <Tab label={`電影 (${movieList.length})`} />
                <Tab label={`電視節目 (${tvList.length})`} />
                <Tab label={`演員 (${personList.length})`} />
              </Tabs>
            </Box>
            <div className='flex-wrap' style={{ display: tabValue === 0 ? 'flex' : 'none' }}>
              {movieList.map((item, index) => (
                <Card
                  isLoading={isLoading}
                  item={item}
                  key={index}
                  // toDetail={toDetail}
                />
              ))}
            </div>
            <div className='flex-wrap' style={{ display: tabValue === 1 ? 'flex' : 'none' }}>
              {tvList.map((item, index) => (
                <Card
                  isLoading={isLoading}
                  item={item}
                  key={index}
                  // toDetail={toDetail}
                />
              ))}
            </div>
            <div className='flex-wrap' style={{ display: tabValue === 2 ? 'flex' : 'none' }}>
              <ActorList isLoading={isLoading} personList={personList} />
            </div>
          </Box>
        </div>
      </style.Section>
    </style.Content>
  );
}

export default index;
