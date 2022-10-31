import base from "./base";

const baseURL = `${base.apiURL}/genre`;
const baseParams = `api_key=${base.apiKey}&language=${base.lang}`;
const headers = {
  method: "GET",
  headers: { "content-type": "application/json" },
};

export default {
  // 電影類別
  async getGenreList(category) {
    return await fetch(`${baseURL}/${category}/list?${baseParams}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
