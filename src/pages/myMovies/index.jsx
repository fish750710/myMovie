import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { accountSVC } from '@/api';
import { setIsLoading } from '@/store/slices/userSlice';

import BaseList from '@/components/MovieList/BaseList';
import style from './styled';

function index() {
  const dispatch = useDispatch();
  const { sessionID, userData, isLoading } = useSelector((state) => state.user);
  const renderRef = useRef(true);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteTV, setFavoriteTV] = useState([]);

  const getFavoriteMovies = async () => {
    try {
      dispatch(setIsLoading(true));
      const res = await accountSVC.getFavoriteMovies(sessionID, userData.id);
      console.log('getFavoriteMovies', res);
      setFavoriteMovies(res.results);
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  };
  const getFavoriteTV = async () => {
    try {
      dispatch(setIsLoading(true));
      const res = await accountSVC.getFavoriteTV(sessionID, userData.id);
      console.log('getFavoriteTV', res);
      setFavoriteTV(res.results);
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  };

  useEffect(() => {
    if (renderRef.current) {
      renderRef.current = false;
      return;
    }
    if (sessionID) {
      getFavoriteMovies();
      getFavoriteTV();
    }
  }, [sessionID]);

  return (
    <style.content>
      <style.section>
        <BaseList
          isLoading={isLoading}
          itemList={favoriteMovies}Ｆ
          title='電影'
        />
      </style.section>
      <style.section>
        <BaseList isLoading={isLoading} itemList={favoriteTV} title='電視節目' />
      </style.section>
    </style.content>
  );
}

export default index;
