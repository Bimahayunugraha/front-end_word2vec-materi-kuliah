import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Auth = {
  isAuthorization() {
    if (Cookies.get("token") || Cookies.get("rt")) return true;
    return null;
  },
  getUser() {
    return Cookies.get("connect");
  },
  getRefreshToken() {
    return Cookies.get("rt");
  },
  getAccessToken() {
    return Cookies.get("token");
  },
  getUserId() {
    return Cookies.get("sub");
  },
  removeRefreshToken() {
    Cookies.remove("rt");
    Cookies.remove("token");
  },
  signOut() {
    Cookies.remove("token");
    Cookies.remove("rt");
    Cookies.remove("sub");
    Cookies.remove("connect");
  },
  storeUserInfoToCookie(data) {
    if (!data.access_token || !data.refresh_token) return null;

    const decodeAccessToken = jwt_decode(data.access_token);
    const decodeRefreshToken = jwt_decode(data.refresh_token);
    const decoded = JSON.stringify(jwt_decode(data.access_token));

    const expireAccessToken = new Date(decodeAccessToken.exp * 1000);
    const expireRefreshToken = new Date(decodeRefreshToken.exp * 1000);
    Cookies.set("token", data.access_token, { expires: expireAccessToken, secure: true });
    Cookies.set("rt", data.refresh_token, { expires: expireRefreshToken, secure: true });
    Cookies.set("connect", decoded, { expires: expireRefreshToken, secure: true });
    Cookies.set("sub", data.payload.id, { expires: expireRefreshToken });
    return data;
  },
};

export default Auth;
