import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  // useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import Tag from "@/components/Tag";
import ActorList from "@/components/MovieList/ActorList";
import Section from "@/components/MovieList/Section";
import Forum from "@/components/Forum";
import Trailer from "@/components/Trailer";

import { moviesSVC } from "@/api";
import base from "@/api/base";

import styles from "@/styles/_export.module.scss";
import style from "./styled";

import useFetch from "@/hooks/useFetch";
import useFavorite from "@/hooks/useFavorite";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// const set = new Set();
function index() {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const params = useParams();
  const location = useLocation();
  // const dispatch = useDispatch();

  // const [count, setCount] = useState(0);
  // 重複渲染問題
  const { isLogin } = useSelector((state) => state.user);
  const { sendRequest, isLoading, error } = useFetch();
  const {
    getAccountStates,
    favoriteState,
    favoriteHandler,
    message,
    setMessage,
  } = useFavorite();

  const [movieData, setMovieData] = useState({});
  const [watchProviders, setWatchProviders] = useState({});
  const [personList, setPersonList] = useState([]);
  const [isPlayShow, setIsPlayShow] = useState(false);
  const [director, setDirector] = useState({});
  const [alertMsg, setAlertMsg] = useState("");
  const [category, setCategory] = useState("");
  const [tabVal, setTabVal] = useState(0);

  const [trailer, setTrailer] = useState([]);
  // 優化效能 避免重新產生 function
  const trailerCallback = useCallback(() => {
    return trailer;
  }, [trailer]);
  // 可測試是否重新產生 functtion
  // set.add(trailerCallback);

  const handleClickOpen = () => {
    setIsPlayShow(true);
  };
  const handleClose = () => {
    setIsPlayShow(false);
  };
  const handleChangeTab = (event, index) => {
    setTabVal(index);
  };
  // 預告片
  const getTrailer = async (id, category) => {
    try {
      const trailerParams = moviesSVC.getTrailer(id, category);
      const res = await sendRequest(trailerParams.url, trailerParams.options);
      if (res.success === false) {
        setAlertMsg(res.status_message);
        return;
      }
      setTrailer(res.results);
    } catch (err) {
      console.log(err);
    }
  };
  // 電影 或 tv 詳情
  const getMovieDetail = async (id, category) => {
    try {
      const movieDetailParams = moviesSVC.getMovieDetail(id, category);
      const res = await sendRequest(
        movieDetailParams.url,
        movieDetailParams.options
      );
      if (res.success === false) {
        setAlertMsg(res.status_message);
        return;
      }
      setMovieData(res);
    } catch (err) {
      console.log(err);
    }
  };
  // 串流平台
  const getWatchProviders = async (id, category) => {
    try {
      const watchProvidersParams = moviesSVC.getWatchProviders(id, category);
      const res = await sendRequest(
        watchProvidersParams.url,
        watchProvidersParams.options
      );
      if (res.success === false) {
        setAlertMsg(res.status_message);
        return;
      }
      setWatchProviders(res.results);
    } catch (err) {
      console.log(err);
    }
  };
  // 演員和工作人員
  const getPersonList = async (id, category) => {
    try {
      const personListParams = moviesSVC.getPersonList(id, category);
      const res = await sendRequest(
        personListParams.url,
        personListParams.options
      );
      if (res.success === false) {
        setAlertMsg(res.status_message);
        return;
      }
      setDirector(res.crew.find((item) => item.job === "Director"));
      setPersonList(res.cast);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    try {
      const movieId = params.id;
      const categoryVal = location.pathname.split("/")[1];
      setCategory(categoryVal);

      // Promise.all([
      //   getMovieDetail(movieId, categoryVal),
      //   getTrailer(movieId, categoryVal),
      //   getWatchProviders(movieId, categoryVal),
      //   getPersonList(movieId, categoryVal),
      // ]).then((res) => {
      //   console.log(res, "res");
      //   setMovieData(res[0]);
      //   setTrailer(res[1]);
      //   setWatchProviders(res[2]);
      //   setDirector(res[3].crew.find((item) => item.job === "Director"));
      //   setPersonList(res[3].cast);
      // });

      // render 和 Promise all 效果依樣 setIsLoading 總共計算兩次
      getMovieDetail(movieId, categoryVal);
      getTrailer(movieId, categoryVal);
      getWatchProviders(movieId, categoryVal);
      getPersonList(movieId, categoryVal);
      setTimeout(() => {
        window.scrollTo(0, 0);
        //
      }, 300);
    } catch (error) {
      console.log(error);
      //
    }
  }, [params.id]);

  useEffect(() => {
    if (isLogin) getAccountStates(params.id, location.pathname.split("/")[1]);
  }, [isLogin]);

  const PreLoading = ({ w, h }) => {
    return (
      <Skeleton
        animation="wave"
        variant="text"
        sx={{
          bgcolor: styles.bg_sub_color,
          width: w + "px",
          height: h + "px",
        }}
      />
    );
  };

  // 頻繁 render 不建議使用 useCallback & useMemo
  // 優化效能避免非必要渲染 5次 => 2次
  const renderInfo = useCallback(
    () => (
      <style.Intro>
        <div className="main-img">
          {movieData?.poster_path && (
            <img
              src={`${base.originalURL}/w342/${movieData.poster_path}`}
              alt={movieData.original_title || movieData.name}
            />
          )}
          <div
            className="btn btn-gradual btn-play"
            onClick={handleClickOpen}
          ></div>
        </div>
        <div className="info-box w-full">
          <Stack spacing={1} className="">
            <div className="flex justify-between">
              <div className="flex">
                {movieData?.genres?.map((item) => (
                  <Tag item={item.name} key={item.id} />
                ))}
              </div>
              <style.Favorite
                onClick={() => favoriteHandler(params.id, !favoriteState)}
              >
                {favoriteState ? (
                  <img src="./images/icon/heart.png" alt="" />
                ) : (
                  <img src="./images/icon/heart_.png" alt="" />
                )}
              </style.Favorite>
            </div>
            <div className="title mb-3">
              {isLoading ? (
                <>
                  <PreLoading w="180" h="25" />
                  <PreLoading w="100" h="25" />
                </>
              ) : (
                <>
                  {movieData?.title || movieData?.name}
                  <div className="score">
                    {movieData?.vote_average?.toFixed(1)}
                  </div>
                </>
              )}
            </div>
            <div className="flex mb-4">
              {isLoading ? (
                <>
                  <div className="label">
                    <PreLoading w="70" h="25" />
                  </div>
                  <div className="label">
                    <PreLoading w="70" h="25" />
                  </div>
                  <div className="label">
                    <PreLoading w="50" h="25" />
                  </div>
                </>
              ) : (
                <div className="flex mb-4">
                  <div className="label">
                    {movieData?.release_date || movieData.last_air_date}
                  </div>
                  <div className="label">
                    {movieData?.spoken_languages?.map((item, index) =>
                      index > 0 ? "、" + item.name : item.name
                    )}
                  </div>
                  {movieData?.runtime && (
                    <div className="label">{movieData?.runtime}分</div>
                  )}
                </div>
              )}
            </div>
            <div className="label mb-4">導演 {director?.name}</div>
            <div className="label mb-4">劇情介紹</div>
            {isLoading ? (
              <>
                <PreLoading h="25" />
                <PreLoading h="25" />
              </>
            ) : (
              <div className="description w-full leading-8">
                {movieData?.overview}
              </div>
            )}

            <div className="label">播放平台</div>
            <div className="play-platform flex w-20">
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
    ),
    [movieData, favoriteState, isLogin]
  );
  const renderInfoM = useCallback(
    () => (
      <style.Intro style={{ display: isMobile ? "block" : "flex" }}>
        <div className="main-img-m">
          {movieData?.backdrop_path && (
            <img
              src={`${base.originalURL}/w780/${movieData.backdrop_path}`}
              alt={movieData.original_title || movieData.name}
            />
          )}
          <div
            className="btn btn-gradual btn-play"
            onClick={handleClickOpen}
          ></div>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabVal}
            onChange={handleChangeTab}
            aria-label="tabs"
            indicatorColor="secondary"
            textColor="inherit"
          >
            <Tab label="介紹" />
            <Tab label="評論" />
          </Tabs>
        </Box>
        <Box sx={{ p: 1 }}>
          {/* m 介紹 */}
          <div
            className="info-box w-full"
            style={{ display: tabVal === 1 ? "none" : "block" }}
          >
            <Stack spacing={1} className="">
              <div className="flex justify-between">
                <div className="flex">
                  {movieData?.genres?.map((item) => (
                    <Tag item={item.name} key={item.id} />
                  ))}
                </div>
                <style.Favorite onClick={() => favoriteHandler(!favoriteState)}>
                  {favoriteState ? (
                    <img src="./images/icon/heart.png" alt="" />
                  ) : (
                    <img src="./images/icon/heart_.png" alt="" />
                  )}
                </style.Favorite>
              </div>
              <div className="title mb-3">
                {isLoading ? (
                  <>
                    <PreLoading w="180" h="25" />
                    <PreLoading w="100" h="25" />
                  </>
                ) : (
                  <>
                    {movieData?.title || movieData?.name}
                    <div className="score">
                      {movieData?.vote_average?.toFixed(1)}
                    </div>
                  </>
                )}
              </div>
              <div className="flex mb-4">
                {isLoading ? (
                  <>
                    <div className="label">
                      <PreLoading w="70" h="25" />
                    </div>
                    <div className="label">
                      <PreLoading w="70" h="25" />
                    </div>
                    <div className="label">
                      <PreLoading w="50" h="25" />
                    </div>
                  </>
                ) : (
                  <div className="flex mb-4">
                    <div className="label">
                      {movieData?.release_date || movieData.last_air_date}
                    </div>
                    <div className="label">
                      {movieData?.spoken_languages?.map((item, index) =>
                        index > 0 ? "、" + item.name : item.name
                      )}
                    </div>
                    {movieData?.runtime && (
                      <div className="label">{movieData?.runtime}分</div>
                    )}
                  </div>
                )}
              </div>
              <div className="label mb-4">導演 {director?.name}</div>
              <div className="label mb-4">劇情介紹</div>
              {isLoading ? (
                <>
                  <PreLoading h="25" />
                  <PreLoading h="25" />
                </>
              ) : (
                <div className="description w-full leading-8">
                  {movieData?.overview}
                </div>
              )}

              <div className="label">播放平台</div>
              <div className="play-platform flex w-20">
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
          {/* m 評論 */}
          <div style={{ display: tabVal !== 1 ? "none" : "block" }}>
            {(movieData?.title || movieData?.name) && (
              <Forum id={params.id} category={category} />
            )}
          </div>
        </Box>
      </style.Intro>
    ),
    [movieData, favoriteState, isLogin, tabVal]
  );
  // 類似影片 4次 => 2次
  const renderSimilar = useCallback(
    () => (
      <style.Section>
        {(movieData?.title || movieData?.name) && (
          <Section title="相關影片" id={params.id} category={category} />
        )}
      </style.Section>
    ),
    [movieData]
  );
  // 演員
  const renderActor = useCallback(
    () => (
      <style.Section>
        {personList.length > 0 && (
          <ActorList personList={personList} isLoading={isLoading} />
        )}
      </style.Section>
    ),
    [personList]
  );
  // 評論
  const renderForum = useCallback(
    () => (
      <>
        <style.Section style={{ display: isMobile ? "none" : "block" }}>
          {(movieData?.title || movieData?.name) && (
            <Forum id={params.id} category={category} />
          )}
        </style.Section>
      </>
    ),
    [movieData, params.id]
  );
  // const calcMemo = useMemo(() => {
  //   return 1 + 1;
  // });
  // set.add(renderInfo);

  return (
    <style.Content>
      <Snackbar
        open={!!message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
      >
        <Alert
          onClose={() => setMessage("")}
          severity="info"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {alertMsg ? (
        <MuiAlert variant="filled" severity="error">
          {alertMsg}
        </MuiAlert>
      ) : (
        <>
          <style.Section>
            {isMobile ? renderInfoM() : renderInfo()}
          </style.Section>
          {/* 演員 */}
          {renderActor()}
          {/* pc 評論 */}
          {renderForum()}
          {/* 相關影片輪播 */}
          {renderSimilar()}
          {/* 預告片 */}
          <Trailer
            handleClose={handleClose}
            playShow={isPlayShow}
            movieData={movieData}
            trailerCallback={trailerCallback}
          />
        </>
      )}
    </style.Content>
  );
}

export default index;
