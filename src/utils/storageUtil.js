import Cookies from 'js-cookie';

const KEY = 'session_id';
const GUEST_KEY = 'guestSessionId'

export default {
  saveSessionID(id) {
    Cookies.set(KEY, id);
  },
  getSessionID() {
    return Cookies.get(KEY);
  },
  removeSessionID() {
    Cookies.remove(KEY);
  },
  saveGuestSessionID(id) {
    Cookies.set(GUEST_KEY, id);
  },
  getGuestSessionID() {
    return Cookies.get(GUEST_KEY);
  },
}