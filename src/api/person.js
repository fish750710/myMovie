import base from "./base";

const baseURL = `${base.apiURL}/person`;

export default {
  // 指定演員的電影
  getPersonMovies(personId) {
    return {
      url: `${baseURL}/${personId}/movie_credits?${base.baseParams}`,
      options: base.requestQptions("GET"),
    };
  },
};
