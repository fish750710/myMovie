import base from "./base";

const baseURL = `${base.apiURL}`;

// movie & tv 共用
export default {
  /** [GET] 電影詳情
   * 
   * @param {*} id 
   * @param {*} category 類別 （movie，tv）
   * @returns 
   */
  async getMovieDetail(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /** [GET] 串流平台
   * 
   * @param {*} id 
   * @param {*} category 類別 （movie，tv）
   * @returns 
   */
  async getWatchProviders(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/watch/providers?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /** [GET] 演員和工作人員
   * 
   * @param {*} id 
   * @param {*} category 類別 （movie，tv）
   * @returns 
   */
  async getPersonList(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/credits?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /** [GET] 預告片
   * 
   * @param {*} id 
   * @param {*} category 類別 （movie，tv）
   * @returns 
   */
  async getTrailer(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/videos?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /** [GET] 獲取評論
   * 
   * @param {*} id 
   * @param {*} category 類別 （movie，tv）
   * @returns 
   */
  async getReviews(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/reviews?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /** [GET] 類似影片
   * 
   * @param {*} id 
   * @param {*} category 類別 （movie，tv）
   * @returns 
   */
  async getSimilar(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/similar?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
<<<<<<< HEAD
  /** [GET] 近期熱門電影
   * 
   * @param {*} category 類別 （movie，tv）
   * @returns 
   */
  async getPopular(category) {
    // https://api.themoviedb.org/3/movie/popular?api_key=313ea9371ca76d02621113d1bc97a665&language=en-US&page=1
    return await fetch(`${baseURL}/${category}/popular?${baseParams}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /** [GET] 帳戶電影狀態 （收藏，監視）
   * 
   * @param {*} id 
   * @param {*} sessionID 
   * @param {*} category 類別 （movie，tv）
   * @returns 
   */
=======
  // 帳戶電影狀態 （收藏，監視）
>>>>>>> ddf978afd4d8696eeb5c1c8f7cfce15b33174612
  async getAccountStates(id, sessionID, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/account_states?${base.baseParams}&session_id=${sessionID}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
<<<<<<< HEAD
  /** [POST] 評分
=======
  /** [POST]評分
>>>>>>> ddf978afd4d8696eeb5c1c8f7cfce15b33174612
   * data => { "value": 8.5 }
   * @param {*} id
   * @param {*} sessionID
   * @param {*} data { "value": 8.5 }
   * @param {*} category 類別 （movie，tv）
   * @returns
   */
  async rateMovie(id, sessionID, data, category) {
    const url = `${baseURL}/${category}/${id}/rating?${base.baseParams}&session_id=${sessionID}`;
    return await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
<<<<<<< HEAD
  /** [POST] 遊客評分
=======
  /** [POST]評分
>>>>>>> ddf978afd4d8696eeb5c1c8f7cfce15b33174612
   * data => { "value": 8.5 }
   * @param {*} id
   * @param {*} sessionID
   * @param {*} data { "value": 8.5 }
   * @param {*} category 類別 （movie，tv）
   * @returns
   */
  async rateMovieGuest(id, guestSessionID, data, category) {
    const url = `${baseURL}/${category}/${id}/rating?${base.baseParams}&guest_session_id=${guestSessionID}`;
    return await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
