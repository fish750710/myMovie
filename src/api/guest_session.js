import base from "./base";

const baseURL = `${base.apiURL}/guest_session`;

export default {
  /**
   * [GET] 遊客的評分
   * @param {*} guest_session_id
   * @returns
   */
  async getGuestRatedMovies(guest_session_id) {
    return await fetch(
      `${baseURL}/${guest_session_id}/rated/movies?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
