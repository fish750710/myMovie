import base from "./base";

const baseURL = `${base.apiURL}/person`;

export default {
  // 指定演員的電影
  async getPersonMovies(personId) {
    return await fetch(
      `${baseURL}/${personId}/movie_credits?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
