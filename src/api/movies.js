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
  getMovieDetail(id, category) {
    return {
      url: `${baseURL}/${category}/${id}?${base.baseParams}`,
      options: base.requestQptions("GET"),
    };
  },
  /** [GET] 串流平台
   *
   * @param {*} id
   * @param {*} category 類別 （movie，tv）
   * @returns
   */
  getWatchProviders(id, category) {
    return {
      url: `${baseURL}/${category}/${id}/watch/providers?${base.baseParams}`,
      options: base.requestQptions("GET"),
    };
  },
  /** [GET] 演員和工作人員
   *
   * @param {*} id
   * @param {*} category 類別 （movie，tv）
   * @returns
   */
  getPersonList(id, category) {
    return {
      url: `${baseURL}/${category}/${id}/credits?${base.baseParams}`,
      options: base.requestQptions("GET"),
    };
  },
  /** [GET] 預告片
   *
   * @param {*} id
   * @param {*} category 類別 （movie，tv）
   * @returns
   */
  getTrailer(id, category) {
    return {
      url: `${baseURL}/${category}/${id}/videos?${base.baseParams}`,
      options: base.requestQptions("GET"),
    };
  },
  /** [GET] 獲取評論
   *
   * @param {*} id
   * @param {*} category 類別 （movie，tv）
   * @returns
   */
  getReviews(id, category) {
    return {
      url: `${baseURL}/${category}/${id}/reviews?${base.baseParams}`,
      options: base.requestQptions("GET"),
    };
  },
  /** [GET] 類似影片
   *
   * @param {*} id
   * @param {*} category 類別 （movie，tv）
   * @returns
   */
  getSimilar(id, category) {
    return {
      url: `${baseURL}/${category}/${id}/similar?${base.baseParams}`,
      options: base.requestQptions("GET"),
    };
  },
  /** [GET] 近期熱門電影
   *
   * @param {*} category 類別 （movie，tv）
   * @returns
   */
  getPopular(category) {
    return {
      url: `${baseURL}/${category}/popular?${baseParams}`,
      options: base.requestQptions("GET"),
    };
  },
  /** [GET] 帳戶電影狀態 （收藏，監視）
   *
   * @param {*} id
   * @param {*} sessionID
   * @param {*} category 類別 （movie，tv）
   * @returns
   */
  getAccountStates(id, sessionID, category) {
    return {
      url: `${baseURL}/${category}/${id}/account_states?${base.baseParams}&session_id=${sessionID}`,
      options: base.requestQptions("GET"),
    };
  },
  /** [POST] 評分
   * data => { "value": 8.5 }
   * @param {*} id
   * @param {*} sessionID
   * @param {*} data { "value": 8.5 }
   * @param {*} category 類別 （movie，tv）
   * @returns
   */
  rateMovie(id, sessionID, data, category) {
    return {
      url: `${baseURL}/${category}/${id}/rating?${base.baseParams}&session_id=${sessionID}`,
      options: base.requestQptions("POST", data),
    };
  },
  /** [POST] 遊客評分
   * data => { "value": 8.5 }
   * @param {*} id
   * @param {*} sessionID
   * @param {*} data { "value": 8.5 }
   * @param {*} category 類別 （movie，tv）
   * @returns
   */
  rateMovieGuest(id, guestSessionID, data, category) {
    return {
      url: `${baseURL}/${category}/${id}/rating?${base.baseParams}&guest_session_id=${guestSessionID}`,
      options: base.requestQptions("POST", data),
    };
  },
};
