import base from './base';
import StorageUtil from '@/utils/storageUtil';
import { useSelector } from 'react-redux';

const baseURL = `${base.apiURL}/movie`;
const baseParams = `api_key=${base.apiKey}&language=${base.lang}`;
const headers = {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
};

export default {
  // 電影詳情
  async getMovieDetail(id) {
    return await fetch(`${baseURL}/${id}?${baseParams}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 串流平台
  async getWatchProviders(id) {
    // https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key=313ea9371ca76d02621113d1bc97a665
    return await fetch(
      `${baseURL}/${id}/watch/providers?${baseParams}`,
      headers,
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 演員和工作人員
  async getPersonList(id) {
    return await fetch(`${baseURL}/${id}/credits?${baseParams}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 預告片
  async getTrailer(id) {
    return await fetch(`${baseURL}/${id}/videos?${baseParams}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 獲取評論
  async getReviews(id) {
    // https://api.themoviedb.org/3/movie/436270/reviews?api_key=313ea9371ca76d02621113d1bc97a665&language=en-US&page=1
    return await fetch(`${baseURL}/${id}/reviews?${baseParams}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 類似影片
  async getSimilar(id) {
    // https://api.themoviedb.org/3/movie/928123/similar?api_key=313ea9371ca76d02621113d1bc97a665&language=zh-TW&page=1
    return await fetch(`${baseURL}/${id}/similar?${baseParams}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 近期熱門電影
  async getPopular() {
    // https://api.themoviedb.org/3/movie/popular?api_key=313ea9371ca76d02621113d1bc97a665&language=en-US&page=1
    return await fetch(`${baseURL}/popular?${baseParams}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 帳戶電影狀態 （收藏，監視）
  async getAccountStates(id) {
    const { sessionID } = useSelector(state => state.user);
    console.log(sessionID)
    return await fetch(`${baseURL}/${id}/account_states?${baseParams}&session_id=${sessionID}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 評分
  // async rateMovie(id, value) {
  //   const session_id = StorageUtil.getGuestSessionID();
  //   let url = `${baseURL}/${id}/rating?${baseParams}&guest_session_id=${session_id}`;
  //   if (StorageUtil.getSessionID()) {
  //     url = `${baseURL}/${id}/rating?${baseParams}&session_id=${StorageUtil.getSessionID()}`;
  //   }
  //   console.log('rate =>', id, value, url)
  //   return await fetch(url, {
  //     method: 'POST',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify(value),
  //   })
  //     .then((res) => res.json())
  //     .catch((err) => console.log(err));
  // },
};
