import base from './base';

const baseURL = `${base.apiURL}/discover`;
const baseParams = `api_key=${base.apiKey}&language=${base.lang}`;
const headers = {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
};

const sortList = JSON.parse(import.meta.env.VITE_SORT_LIST);

export default {
  // 電影或 tv 列表
  async getMovieList(category, optType, optYear, sortType, sortBy, page) {
    // console.log(`${baseURL}/${category}?${baseParams}&with_genres=${optType}&year=${optYear}&sort_by=${sortList[sortType]?.key}.${sortBy}&page=${page}`)
    // console.log('https://api.themoviedb.org/3/discover/tv?api_key=313ea9371ca76d02621113d1bc97a665&language=zh-TW&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=10764&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0')
    return await fetch(
      `${baseURL}/${category}?${baseParams}&with_genres=${optType}&year=${optYear}&sort_by=${sortList[sortType]?.key}.${sortBy}&page=${page}&with_status=0&with_type=0`,
      headers,
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
