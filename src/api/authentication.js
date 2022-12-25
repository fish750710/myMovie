import base from "./base";

const baseURL = `${base.apiURL}/authentication`;

export default {
  /**
   * [GET]
   * @returns
   */
  getToken() {
    return {
      url: `${baseURL}/token/new?${base.baseParams}`,
      options: base.requestQptions("GET"),
    };
  },
  /**
   * [GET] 遊客 session ID
   * @returns
   */
  getGuestSessionID() {
    return {
      url: `${baseURL}/guest_session/new?${base.baseParams}`,
      options: base.requestQptions("GET"),
    };
  },
  /**
   * [POST] session ID
   * @param {*} body
   * @returns
   */
  getSessionID(body) {
    return {
      url: `${baseURL}/session/new?${base.baseParams}`,
      options: base.requestQptions("POST", body),
    };
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
  login(loginData) {
    return {
      url: `${baseURL}/token/validate_with_login?${base.baseParams}`,
      options: base.requestQptions("POST", loginData),
    };
  },
  /** [DELETE] 登出
   * { "session_id": "xxxx" }
   * @param {*} data
   * @returns
   */
  logout(data) {
    return {
      url: `${baseURL}/session?${base.baseParams}`,
      options: base.requestQptions("DELETE", data),
    };
  },
};
