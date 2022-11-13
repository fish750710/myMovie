import base from "./base";

const baseURL = `${base.apiURL}/discover`;

const sortList = JSON.parse(import.meta.env.VITE_SORT_LIST);

export default {
  /**
   * [GET] 電影或 tv 列表
   * @param {*} category movie or tv
   * @param {*} optType 電影類型
   * @param {*} optYear 電影年份
   * @param {*} sortType 排序
   * @param {*} sortBy ase or desc
   * @param {*} page 頁
   * @returns
   */
  async getMovieList(category, optType, optYear, sortType, sortBy, page) {
    return await fetch(
      `${baseURL}/${category}?${base.baseParams}&with_genres=${optType}&year=${optYear}&sort_by=${sortList[sortType]?.key}.${sortBy}&page=${page}&with_status=0&with_type=0`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /**
   * [GET] 最受歡迎的電影
   * @param {*} category
   * @returns
   */
  async getPopularMovies(category) {
    return await fetch(
      `${baseURL}/${category}?${base.baseParams}&sort_by=popularity.desc`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /**
   * [GET] 什麼是最好的戲劇？
   * @param {*} category
   * @returns
   */
  async getBestDramas(category) {
    return await fetch(
      `${baseURL}/${category}?${base.baseParams}&with_genres=18&sort_by=vote_average.desc&vote_count.gte=10`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /**
   * [GET] 最近上映電影 抓近一個月
   * @param {*} category
   * @param {*} dateStart 上映日期開始
   * @param {*} dateEnd
   * @returns
   */
  async getONMovies(category, dateStart, dateEnd) {
    return await fetch(
      `${baseURL}/${category}?${base.baseParams}&primary_release_date.gte=${dateStart}&primary_release_date.lte=${dateEnd}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /**
   * [GET] 熱門電影或戲劇
   * @param {*} category // movies or tv
   * @param {*} lang // 語言 ko zh
   * @returns
   */
  async getPopData(category, lang) {
    return await fetch(
      `${baseURL}/${category}?${base.baseParams}&sort_by=popularity.desc&certification_country=TW&include_adult=true&include_video=false&page=1&with_original_language=${lang}&with_watch_monetization_types=flatrate`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
