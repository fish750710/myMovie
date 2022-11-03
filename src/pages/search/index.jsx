import React, { useRef, useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/Card';
import ActorList from '@/components/MovieList/ActorList';

import { searchSVC } from '@/api';
import { setIsLoading } from '@/store/slices/userSlice';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import style from './styled';

function index() {
  const renderRef = useRef(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading } = useSelector((state) => state.user);
  const [queryKey, seQueryKey] = useState('');
  const [total, setTotal] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const pageTotal = useRef(0);

  const [movieList, setMovieList] = useState([]);
  const [tvList, setTVList] = useState([]);
  const [personList, setPersonList] = useState([]);

  const [btnMoreVal, setBtnMoreVal] = useState('電影');
  const [moreData, setMoreData] = useState([]);
  const [moreShowFlag, setMoreShowFlag] = useState(false);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const changePage = (e, p) => {
    setPage(p);
  };
  const moreClick = () => {
    let val = null;
    switch (tabValue) {
      case 0:
        val = '電影';
        break;
      case 1:
        val = '電視節目';
        break;
      case 2:
        val = '演員';
        break;
      default:
        break;
    }
    // console.log('val', val)
    setBtnMoreVal(val);
    setMoreShowFlag(true);
  };
  const toDetail = (item) => {
    navigate(`/detail/${item.id}`);
  };

  const searchData = async (keyword) => {
    try {
      dispatch(setIsLoading(true));
      const res = await searchSVC.searchData(keyword, page);
      // console.log(res);
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
            console.log(item.media_type);
            break;
        }
      });
      setMovieList(m);
      setTVList(t);
      setPersonList(p);
      setTotal(res.total_results);
      dispatch(setIsLoading(false));
    } catch (err) {
      dispatch(setIsLoading(false));
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
      // console.log('key', searchParams.get('test'));
      setTotal(0);
      seQueryKey(key);
      searchData(key);
      setMoreShowFlag(false);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams.get('key')]);

  useEffect(() => {
    try {
      const getMoreData = async () => {
        dispatch(setIsLoading(true));
        const key = searchParams.get('key');
        let res = null;
        switch (btnMoreVal) {
          case '電影':
            res = await searchSVC.getMovies(key, page);
            break;
          case '電視節目':
            res = await searchSVC.getTV(key, page);
            break;
          case '演員':
            res = await searchSVC.getPerson(key, page);
            break;
        }
        // console.log('getMore res =>', res);
        setMoreData(res.results);
        setTotal(res.total_results);
        if (res.total_results !== total) {
          pageTotal.current = Math.ceil(res.total_results / res.results.length);
        }
        window.scrollTo(0, 0);
        dispatch(setIsLoading(false));
      };
      getMoreData();
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  }, [btnMoreVal, page]);

  return (
    <style.Content>
      <style.Section
        style={{
          visibility: !moreShowFlag ? 'visible' : 'hidden',
          height: !moreShowFlag ? '100%' : '0',
        }}
      >
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
            <div
              className='flex-wrap'
              style={{ display: tabValue === 0 ? 'flex' : 'none' }}
            >
              {movieList.map((item, index) => (
                <Card
                  isLoading={isLoading}
                  item={item}
                  key={index}
                  toDetail={toDetail}
                />
              ))}
            </div>
            <div
              className='flex-wrap'
              style={{ display: tabValue === 1 ? 'flex' : 'none' }}
            >
              {tvList.map((item, index) => (
                <Card
                  isLoading={isLoading}
                  item={item}
                  key={index}
                  toDetail={toDetail}
                />
              ))}
            </div>
            <div
              className='flex-wrap'
              style={{ display: tabValue === 2 ? 'flex' : 'none' }}
            >
              <ActorList isLoading={isLoading} personList={personList} />
            </div>
          </Box>
          <Button
            variant='outlined'
            onClick={moreClick}
            style={{
              display:
                total <= movieList.length ||
                total <= tvList.length ||
                total <= personList.length
                  ? 'none'
                  : 'block',
            }}
          >
            More..
          </Button>
        </div>
      </style.Section>
      <style.Section style={{ display: moreShowFlag ? 'block' : 'none' }}>
        <div className='label'>
          {btnMoreVal} {queryKey} ({total})
        </div>
        <div className='content'>
          <div className='flex-wrap flex'>
            {moreData.map((item, index) => (
              <Card
                isLoading={isLoading}
                item={item}
                key={index}
                toDetail={toDetail}
              />
            ))}
          </div>
        </div>
        <div className='footer flex py-10'>
          <Stack spacing={2}>
            <Pagination
              count={pageTotal.current}
              page={page}
              onChange={changePage}
              size='large'
              variant='outlined'
              shape='rounded'
              showFirstButton
              showLastButton
              color='primary'
              sx={{
                button: {
                  color: '#fff',
                },
              }}
            />
          </Stack>
        </div>
      </style.Section>
    </style.Content>
  );
}

export default index;
