import base from "./base";

const baseURL = `${base.apiURL}/person`;
const baseParams = `api_key=${base.apiKey}&language=${base.lang}`;
const headers = {
  method: "GET",
  headers: { "content-type": "application/json" },
};

export default {
  // 指定演員的電影
  async getPersonMovies(personId) {
    // https://api.themoviedb.org/3/person/18918/movie_credits?api_key=313ea9371ca76d02621113d1bc97a665&language=zh-TW
    return await fetch(`${baseURL}/${personId}/movie_credits?${baseParams}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
