import base from './base';

const baseURL = `${base.apiURL}/authentication`;
const baseParams = `api_key=${base.apiKey}&language=${base.lang}`;
const headers = {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
};


export default {
  async getToken() {
    return await fetch(
      `${baseURL}/token/new?${baseParams}`,
      headers,
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  async getGuestSessionID() {
    return await fetch(
      `${baseURL}/guest_session/new?${baseParams}`,
      headers,
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  async getSessionID(body) {
    return await fetch(
      `${baseURL}/session/new?${baseParams}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
      },
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  async login(loginData) {
    // "username": "account",
    //     "password": "1234",
    //     "request_token": section_id
    return await fetch(
      `${baseURL}/token/validate_with_login?${baseParams}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(loginData)
      },
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
