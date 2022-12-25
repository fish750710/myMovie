import base from "./base";

const baseURL = `${base.apiURL}/account`;

export default {
  /**
   * [GET] account Details
   * @param {*} sessionID
   * @returns
   */
  getAccountDetails(sessionID) {
    return {
      url: `${baseURL}?${base.baseParams}&session_id=${sessionID}`,
      options: base.requestQptions("GET"),
    };
  },
  /**
   * [GET] 我的最愛電影
   * @param {*} sessionID
   * @param {*} accountID
   * @returns
   */
  getFavoriteMovies(sessionID, accountID) {
    return {
      url: `${baseURL}/${accountID}/favorite/movies?${base.baseParams}&session_id=${sessionID}&sort_by=created_at.asc&page=1`,
      options: base.requestQptions("GET"),
    };
  },
  /**
   * [GET] 我的最愛電視節目
   * @param {*} sessionID
   * @param {*} accountID
   * @returns
   */
  getFavoriteTV(sessionID, accountID) {
    return {
      url: `${baseURL}/${accountID}/favorite/tv?${base.baseParams}&session_id=${sessionID}&sort_by=created_at.asc&page=1`,
      options: base.requestQptions("GET"),
    };
  },
  /** [POST] 編輯我的最愛
   * 
   * @param {*} data 
   * {
      "media_type": "movie",
      "media_id": 550,
      "favorite": true
    }
   * @param {*} sessionID 
   * @param {*} accountID 
   * @returns 
   */
  editFavorite(data, sessionID, accountID) {
    return {
      url: `${baseURL}/${accountID}/favorite?${base.baseParams}&session_id=${sessionID}`,
      options: base.requestQptions("POST", data),
    };
  },
  /** [GET] 獲取評分
   *
   * @param {*} sessionID
   * @param {*} accountID
   * @returns
   */
  getRatedMovies(sessionID, accountID) {
    return {
      url: `${baseURL}/${accountID}/rated/movies?${base.baseParams}&session_id=${sessionID}&sort_by=created_at.asc&page=1`,
      options: base.requestQptions("GET"),
    };
  },
};
