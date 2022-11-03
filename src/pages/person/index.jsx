import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/Card';

import { personSVC } from '@/api';

import style from './styled';

function index() {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading } = useSelector((state) => state.user);
  const renderRef = useRef(true);
  const [searchParams, setSearchParams]= useSearchParams()
  const [movieList, setMovieList] = useState([]);
  const [personName, setPersonName] = useState('');

  const getPersonMovies = async (personId) => {
    try {
      const {cast, crew} = await personSVC.getPersonMovies(personId);
      console.log("cast", cast, "crew", crew);
      setMovieList(cast);
    } catch (err) {
      console.log(err);
    }
  };
  const toDetail = (item) => {
    navigate(`/detail/${item.id}`);
  };

  useEffect(() => {
    try {
      if (renderRef.current) {
        renderRef.current = false;
        return;
      }
      getPersonMovies(params.personId);
      setPersonName(searchParams.get('name'))
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <style.Content>
      <style.Section>
      <div className='main'>
        <div className="label">{personName} 的其他作品</div>
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
      </style.Section>
    </style.Content>
  );
}

export default index;
