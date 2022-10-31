import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
// import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from "@mui/material/DialogActions";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import Tag from '@/components/Tag';
import ActorList from '@/components/MovieList/ActorList';
import Section from '@/components/MovieList/Section';
import Forum from '@/components/Forum';

import { moviesSVC } from '@/api';
import base from '@/api/base';

import styles from '@/styles/_export.module.scss';
import style from './styled';
import './index.scss';

function index() {
  const renderRef = useRef(true);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [watchProviders, setWatchProviders] = useState();
  const [personList, setPersonList] = useState();
  const [trailer, setTrailer] = useState();
  const [playShow, setPlayShow] = useState(false);
  const [director, setDirector] = useState();
  const [imdbID, setImdbID] = useState();

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label='close'
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  const youtubeOpts = {
    height: '315',
    width: '560',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleClickOpen = () => {
    console.log('trailer', trailer);
    setPlayShow(true);
  };
  const handleClose = () => {
    setPlayShow(false);
  };

  // 預告片
  const getTrailer = async (id) => {
    try {
      const { results } = await moviesSVC.getTrailer(id);
      setTrailer(results);
    } catch (err) {
      console.log(error);
    }
  };
  // 電影詳情
  const getMovieDetail = async (id) => {
    try {
      const res = await moviesSVC.getMovieDetail(id);
      setMovieData(res);
      setImdbID(res.imdb_id);
      console.log('getMovieDetail =>', res)
    } catch (err) {
      console.log(error);
    }
  };
  // 串流平台
  const getWatchProviders = async (id) => {
    try {
      const { results } = await moviesSVC.getWatchProviders(id);
      setWatchProviders(results);
    } catch (err) {
      console.log(error);
    }
  };
  // 演員和工作人員
  const getPersonList = async (id) => {
    try {
      const { cast, crew } = await moviesSVC.getPersonList(id);
      setDirector(crew.find((item) => item.job === 'Director'));
      setPersonList(cast);
    } catch (err) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      if (renderRef.current) {
        renderRef.current = false;
        return;
      }
      // const getMovieDetail = async (id) => {
      //   try {
      //     setIsLoading(true);
      //     // const res = await moviesSVC.getMovieDetail(id);
      //     // const { results: providersResults } =
      //     //   await moviesSVC.getWatchProviders(id);
      //     // const { cast, crew } = await moviesSVC.getPersonList(id);
      //     // setDirector(crew.find((item) => item.job === 'Director'));
      //     // const { results: trailerResults } = await moviesSVC.getTrailer(id);
      //     // setMovieData(res);
      //     // setWatchProviders(providersResults);
      //     // setPersonList(cast);
      //     // setTrailer(trailerResults);

      //     // setTimeout(() => {
      //     //   window.scrollTo(0, 0);
      //     //   setIsLoading(false);
      //     // }, 100);
      //   } catch (error) {
      //     console.log(error);
      //     setIsLoading(false);
      //   }
      // };
      const movieId = params.id;
      setIsLoading(true);
      getMovieDetail(movieId);
      getTrailer(movieId);
      getWatchProviders(movieId);
      getPersonList(movieId);
      setTimeout(() => {
        window.scrollTo(0, 0);
        setIsLoading(false);
      }, 300);
      // console.log("params", params.id, getMovieDetail(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  const PreLoading = ({ w, h }) => {
    return (
      <Skeleton
        animation='wave'
        variant='text'
        sx={{
          bgcolor: styles.bg_sub_color,
          width: w + 'px',
          height: h + 'px',
        }}
      />
    );
  };

  return (
    <style.Content>
      <style.Section>
        <style.Intro>
          <div className='main-img'>
            {movieData?.poster_path && (
              <img
                src={`${base.originalURL}/w342/${movieData.poster_path}`}
                alt={movieData.original_title}
              />
            )}
            <div
              className='btn btn-gradual btn-play'
              onClick={handleClickOpen}
            ></div>
          </div>
          <div className='info-box w-full'>
            <Stack spacing={1} className=''>
              <div className='flex'>
                {movieData?.genres?.map((item) => (
                  <Tag item={item.name} key={item.id} />
                ))}
              </div>
              <div className='title mb-3'>
                {isLoading ? (
                  <>
                    <PreLoading w='180' h='25' />
                    <PreLoading w='100' h='25' />
                  </>
                ) : (
                  <>
                    {movieData?.title}
                    <div className='score'>
                      {movieData?.vote_average?.toFixed(1)}
                    </div>
                  </>
                )}
              </div>
              <div className='flex mb-4'>
                {isLoading ? (
                  <>
                    <div className='label'>
                      <PreLoading w='70' h='25' />
                    </div>
                    <div className='label'>
                      <PreLoading w='70' h='25' />
                    </div>
                    <div className='label'>
                      <PreLoading w='50' h='25' />
                    </div>
                  </>
                ) : (
                  <div className='flex mb-4'>
                    <div className='label'>{movieData?.release_date}</div>
                    <div className='label'>
                      {movieData?.spoken_languages?.map((item, index) =>
                        index > 0 ? '、' + item.name : item.name,
                      )}
                    </div>
                    <div className='label'>{movieData?.runtime}分</div>
                  </div>
                )}
              </div>
              <div className='label mb-4'>導演 {director?.name}</div>
              <div className='label mb-4'>劇情介紹</div>
              {isLoading ? (
                <>
                  <PreLoading h='25' />
                  <PreLoading h='25' />
                </>
              ) : (
                <div className='description w-full'>{movieData?.overview}</div>
              )}

              <div className='label'>播放平台</div>
              <div className='play-platform flex'>
                {watchProviders?.[base.local]?.flatrate?.map((item) => (
                  <img
                    src={`${base.originalURL}/original/${item.logo_path}`}
                    alt={item.provider_name}
                    key={item.provider_id}
                  />
                ))}
              </div>
            </Stack>
          </div>
        </style.Intro>
      </style.Section>
      <style.Section>
        <ActorList personList={personList} isLoading={isLoading} />
      </style.Section>
      <style.Section>
        <Forum id={params.id} />
      </style.Section>
      <style.Section>
        <Section title='相關影片' id={params.id} />
      </style.Section>
      <BootstrapDialog onClose={handleClose} open={playShow}>
        {trailer?.length === 0 ? (
          <>
            <BootstrapDialogTitle onClose={handleClose}>
              {movieData?.title}
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>找不到相關資訊</Typography>
            </DialogContent>
          </>
        ) : (
          <>
            <BootstrapDialogTitle onClose={handleClose}>
              {trailer?.name}
            </BootstrapDialogTitle>
            {/* {trailer &&
              trailer
            .filter((item, index) => index === 0)
            .map((item) => console.log(item))} */}
            {trailer?.slice(0, 1).map((item) => (
              <YouTube videoId={item.key} opts={youtubeOpts} key={item.id} />
              // <iframe
              //   width="420"
              //   height="315"
              //   src={`https://www.youtube.com/embed/${item.key}`}
              //   frameborder="0"
              //   key={item.id}
              //   allowfullscreen
              // ></iframe>
            ))}
          </>
        )}
      </BootstrapDialog>
    </style.Content>
  );
}

export default index;
