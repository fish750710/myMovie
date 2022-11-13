import base from "./base";

const baseURL = `${base.apiURL}/genre`;

export default {
  /**
   * [GET] 電影類別
   * @param {*} category
   * @returns
   */
  async getGenreList(category) {
    return await fetch(
      `${baseURL}/${category}/list?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
