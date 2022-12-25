import base from "./base";

const baseURL = `${base.apiURL}/guest_session`;

export default {
  /**
   * [GET] 遊客的評分
   * @param {*} guest_session_id
   * @returns
   */
  getGuestRatedMovies(guest_session_id) {
    return {
      url: `${baseURL}/${guest_session_id}/rated/movies?${base.baseParams}`,
      options: base.requestQptions("GET"),
    };
  },
};
