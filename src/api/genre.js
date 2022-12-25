import base from "./base";

const baseURL = `${base.apiURL}/genre`;

export default {
  /**
   * [GET] 電影類別
   * @param {*} category
   * @returns
   */
  getGenreList(category) {
    return {
      url: `${baseURL}/${category}/list?${base.baseParams}`,
      options: base.requestQptions("GET"),
    };
  },
};
