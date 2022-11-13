import base from "./base";

const baseURL = `${base.apiURL}`;

// movie & tv 共用
export default {
  // 電影詳情
  async getMovieDetail(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 串流平台
  async getWatchProviders(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/watch/providers?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 演員和工作人員
  async getPersonList(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/credits?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 預告片
  async getTrailer(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/videos?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 獲取評論
  async getReviews(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/reviews?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 類似影片
  async getSimilar(id, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/similar?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 帳戶電影狀態 （收藏，監視）
  async getAccountStates(id, sessionID, category) {
    return await fetch(
      `${baseURL}/${category}/${id}/account_states?${base.baseParams}&session_id=${sessionID}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /** [POST]評分
   * data => { "value": 8.5 }
   * @param {*} id
   * @param {*} sessionID
   * @param {*} data
   * @param {*} category
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
  /** [POST]評分
   * data => { "value": 8.5 }
   * @param {*} id
   * @param {*} sessionID
   * @param {*} data
   * @param {*} category
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
