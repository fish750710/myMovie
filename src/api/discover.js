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
  getMovieList(category, optType, optYear, sortType, sortBy, page) {
    return {
      url: `${baseURL}/${category}?${base.baseParams}&with_genres=${optType}&year=${optYear}&sort_by=${sortList[sortType]?.key}.${sortBy}&page=${page}&with_status=0&with_type=0`,
      options: base.requestQptions("GET"),
    };
  },
  /**
   * [GET] 最受歡迎的電影
   * @param {*} category
   * @returns
   */
  getPopularMovies(category) {
    return {
      url: `${baseURL}/${category}?${base.baseParams}&sort_by=popularity.desc`,
      options: base.requestQptions("GET"),
    };
  },
  /**
   * [GET] 什麼是最好的戲劇？
   * @param {*} category
   * @returns
   */
  getBestDramas(category) {
    return {
      url: `${baseURL}/${category}?${base.baseParams}&with_genres=18&sort_by=vote_average.desc&vote_count.gte=10`,
      options: base.requestQptions("GET"),
    };
  },
  /**
   * [GET] 最近上映電影 抓近一個月
   * @param {*} category
   * @param {*} dateStart 上映日期開始
   * @param {*} dateEnd
   * @returns
   */
  getONMovies(category, dateStart, dateEnd) {
    return {
      url: `${baseURL}/${category}?${base.baseParams}&primary_release_date.gte=${dateStart}&primary_release_date.lte=${dateEnd}`,
      options: base.requestQptions("GET"),
    };
  },
  /**
   * [GET] 熱門電影或戲劇
   * @param {*} category // movies or tv
   * @param {*} lang // 語言 ko zh
   * @returns
   */
  getPopData(category, lang) {
    return {
      url: `${baseURL}/${category}?${base.baseParams}&sort_by=popularity.desc&certification_country=TW&include_adult=true&include_video=false&page=1&with_original_language=${lang}&with_watch_monetization_types=flatrate`,
      options: base.requestQptions("GET"),
    };
  },
};
