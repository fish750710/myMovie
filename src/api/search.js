import base from './base';

const baseURL = `${base.apiURL}/search`;
const baseParams = `api_key=${base.apiKey}&language=${base.lang}`;
const headers = {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
};

const sortList = JSON.parse(import.meta.env.VITE_SORT_LIST);

export default {
  // 迷糊搜尋
  async searchData(query) {
    return await fetch(
      // https://api.themoviedb.org/3/search/multi?api_key=313ea9371ca76d02621113d1bc97a665&language=zh-TW&query=%E7%8E%8B%E6%B7%A8&page=1&include_adult=false
      `${baseURL}/multi?${baseParams}&query=${query}`,
      headers,
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 搜尋電影
  async getMovies(query) {
    // https://api.themoviedb.org/3/search/movie?api_key=313ea9371ca76d02621113d1bc97a665&language=zh-TW&query=33D&page=1&include_adult=false
    return await fetch(`${baseURL}/movie?${baseParams}&query=${query}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 搜尋演員
  async getPerson(query) {
    // https://api.themoviedb.org/3/search/person?api_key=313ea9371ca76d02621113d1bc97a665&language=zh-TW&query=Dwayne%20Johnson&page=1&include_adult=false
    return await fetch(
      `${baseURL}/person?${baseParams}&query=${query}&include_adult=false`,
      headers,
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 搜尋電視
  async getTV(query) {
    return await fetch(
      // https://api.themoviedb.org/3/search/tv?api_key=313ea9371ca76d02621113d1bc97a665&language=zh-TW&page=1&query=%E4%B8%BB%E5%BB%9A&include_adult=false
      `${baseURL}/tv?${baseParams}&query=${query}`,
      headers,
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
};
