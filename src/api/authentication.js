import base from "./base";

const baseURL = `${base.apiURL}/authentication`;

export default {
  /**
   * [GET]
   * @returns
   */
  async getToken() {
    return await fetch(`${baseURL}/token/new?${base.baseParams}`, base.headers)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /**
   * [GET] 遊客 session ID
   * @returns
   */
  async getGuestSessionID() {
    return await fetch(
      `${baseURL}/guest_session/new?${base.baseParams}`,
      base.headers
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /**
   * [POST] session ID
   * @param {*} body
   * @returns
   */
  async getSessionID(body) {
    return await fetch(`${baseURL}/session/new?${base.baseParams}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
<<<<<<< HEAD
  /** 
   * [POST] 登入
=======
  /** [POST] 登入
>>>>>>> ddf978afd4d8696eeb5c1c8f7cfce15b33174612
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
      `${baseURL}/token/validate_with_login?${base.baseParams}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loginData),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  /** [DELETE] 登出
   * { "session_id": "xxxx" }
   * @param {*} data
   * @returns
   */
  async logout(data) {
    return await fetch(`${baseURL}/session?${base.baseParams}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
};
