import base from "./base";

const baseURL = `${base.apiURL}/account`;

export default {
  /**
   * [GET] account Details
   * @param {*} sessionID
   * @returns
   */
  async getAccountDetails(sessionID) {
    return await fetch(
      `${baseURL}?${base.baseParams}&session_id=${sessionID}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /**
   * [GET] 我的最愛電影
   * @param {*} sessionID
   * @param {*} accountID
   * @returns
   */
  async getFavoriteMovies(sessionID, accountID) {
    return await fetch(
      `${baseURL}/${accountID}/favorite/movies?${base.baseParams}&session_id=${sessionID}&sort_by=created_at.asc&page=1`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /**
   * [GET] 我的最愛電視節目
   * @param {*} sessionID
   * @param {*} accountID
   * @returns
   */
  async getFavoriteTV(sessionID, accountID) {
    return await fetch(
      `${baseURL}/${accountID}/favorite/tv?${base.baseParams}&session_id=${sessionID}&sort_by=created_at.asc&page=1`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
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
  async editFavorite(data, sessionID, accountID) {
    return await fetch(
      `${baseURL}/${accountID}/favorite?${base.baseParams}&session_id=${sessionID}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /** [GET] 獲取評分
   *
   * @param {*} sessionID
   * @param {*} accountID
   * @returns
   */
  async getRatedMovies(sessionID, accountID) {
    return await fetch(
      `${baseURL}/${accountID}/rated/movies?${base.baseParams}&session_id=${sessionID}&sort_by=created_at.asc&page=1`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
