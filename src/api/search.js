import base from "./base";

const baseURL = `${base.apiURL}/search`;

export default {
  // 迷糊搜尋
  async searchData(query, page = 1) {
    return await fetch(
      `${baseURL}/multi?${base.baseParams}&query=${query}&page=${page}&include_adult=false`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 搜尋電影
  async getMovies(query, page = 1) {
    return await fetch(
      `${baseURL}/movie?${base.baseParams}&query=${query}&page=${page}&include_adult=false`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 搜尋演員
  async getPerson(query, page = 1) {
    return await fetch(
      `${baseURL}/person?${base.baseParams}&query=${query}&page=${page}&include_adult=false`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  // 搜尋電視
  async getTV(query, page = 1) {
    return await fetch(
      `${baseURL}/tv?${base.baseParams}&query=${query}&page=${page}&include_adult=false`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
