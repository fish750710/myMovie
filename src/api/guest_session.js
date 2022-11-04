import base from "./base";

const baseURL = `${base.apiURL}/guest_session`;
const baseParams = `api_key=${base.apiKey}&language=${base.lang}`;
const headers = {
  method: "GET",
  headers: { "content-type": "application/json" },
};

export default {
  // 遊客的評分
  async getGuestRatedMovies(guest_session_id) {
    return await fetch(`${baseURL}/${guest_session_id}/rated/movies?${baseParams}`, headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
