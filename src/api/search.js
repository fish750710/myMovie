import base from "./base";

const baseURL = `${base.apiURL}/search`;

export default {
  // 迷糊搜尋
  searchData(query, page = 1) {
    return {
      url: `${baseURL}/multi?${base.baseParams}&query=${query}&page=${page}&include_adult=false`,
      options: base.requestQptions("GET"),
    };
  },
  // 搜尋電影
  getMovies(query, page = 1) {
    return {
      url: `${baseURL}/movie?${base.baseParams}&query=${query}&page=${page}&include_adult=false`,
      options: base.requestQptions("GET"),
    };
  },
  // 搜尋演員
  getPerson(query, page = 1) {
    return {
      url: `${baseURL}/person?${base.baseParams}&query=${query}&page=${page}&include_adult=false`,
      options: base.requestQptions("GET"),
    };
  },
  // 搜尋電視
  getTV(query, page = 1) {
    return {
      url: `${baseURL}/tv?${base.baseParams}&query=${query}&page=${page}&include_adult=false`,
      options: base.requestQptions("GET"),
    };
  },
};
