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
  /** 
   * [POST] 登入
   * {
   * "username": "account",
   * "password": "1234",
   *  "request_token": section_id
   * }
   * @param {*} loginData 
   * @returns 
   */
  async login(loginData) {
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
  /** 登出
   * { "session_id": "2629f70fb498edc263a0adb99118ac41f0053e8c" }
   * @param {*} data 
   * @returns 
   */
  async logout(data) {
    return await fetch(
      `${baseURL}/session?${baseParams}`,
      {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      },
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
