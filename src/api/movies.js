import base from "./base";

const baseURL = `${base.apiURL}`;
const baseParams = `api_key=${base.apiKey}&language=${base.lang}`;
const headers = {
  method: "GET",
  headers: { "content-type": "application/json" },
};

// movie & tv 共用
export default {
  // 電影詳情
  async getMovieDetail(id, category) {
    return await fetch(`${baseURL}/${category}/${id}?${baseParams}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 串流平台
  async getWatchProviders(id, category) {
    // https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key=313ea9371ca76d02621113d1bc97a665
    return await fetch(
      `${baseURL}/${category}/${id}/watch/providers?${baseParams}`,
      headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 演員和工作人員
  async getPersonList(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/credits?${baseParams}`,
      headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 預告片
  async getTrailer(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/videos?${baseParams}`,
      headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 獲取評論
  async getReviews(id, category) {
    // https://api.themoviedb.org/3/movie/436270/reviews?api_key=313ea9371ca76d02621113d1bc97a665&language=en-US&page=1
    return await fetch(
      `${baseURL}/${category}/${id}/reviews?${baseParams}`,
      headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 類似影片
  async getSimilar(id, category) {
    // https://api.themoviedb.org/3/movie/928123/similar?api_key=313ea9371ca76d02621113d1bc97a665&language=zh-TW&page=1
    return await fetch(
      `${baseURL}/${category}/${id}/similar?${baseParams}`,
      headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 近期熱門電影
  async getPopular(category) {
    // https://api.themoviedb.org/3/movie/popular?api_key=313ea9371ca76d02621113d1bc97a665&language=en-US&page=1
    return await fetch(`${baseURL}/${category}/popular?${baseParams}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 帳戶電影狀態 （收藏，監視）
  async getAccountStates(id, sessionID, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/account_states?${baseParams}&session_id=${sessionID}`,
      headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /** 評分
   * data => { "value": 8.5 }
   * @param {*} id
   * @param {*} sessionID
   * @param {*} data
   * @param {*} category
   * @returns
   */
  async rateMovie(id, sessionID, data, category) {
    const url = `${baseURL}/${category}/${id}/rating?${baseParams}&session_id=${sessionID}`;
    return await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /** 評分
   * data => { "value": 8.5 }
   * @param {*} id
   * @param {*} sessionID
   * @param {*} data
   * @param {*} category
   * @returns
   */
  async rateMovieGuest(id, guestSessionID, data, category) {
    const url = `${baseURL}/${category}/${id}/rating?${baseParams}&guest_session_id=${guestSessionID}`;
    return await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
