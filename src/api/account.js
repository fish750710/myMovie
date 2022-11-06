import base from "./base";

const baseURL = `${base.apiURL}/account`;
const baseParams = `api_key=${base.apiKey}&language=${base.lang}`;
const headers = {
  method: "GET",
  headers: { "content-type": "application/json" },
};

export default {
  // account Details
  async getAccountDetails(sessionID) {
    return await fetch(
      `${baseURL}?${baseParams}&session_id=${sessionID}`,
      headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 我的最愛電影
  async getFavoriteMovies(sessionID, accountID) {
    return await fetch(
      `${baseURL}/${accountID}/favorite/movies?${baseParams}&session_id=${sessionID}&sort_by=created_at.asc&page=1`,
      headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 我的最愛電視節目
  async getFavoriteTV(sessionID, accountID) {
    return await fetch(
      `${baseURL}/${accountID}/favorite/tv?${baseParams}&session_id=${sessionID}&sort_by=created_at.asc&page=1`,
      headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /** 編輯我的最愛
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
      `${baseURL}/${accountID}/favorite?${baseParams}&session_id=${sessionID}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 獲取評分
  async getRatedMovies(sessionID, accountID) {
    return await fetch(
      `${baseURL}/${accountID}/rated/movies?${baseParams}&session_id=${sessionID}&sort_by=created_at.asc&page=1`,
      headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
