import axios from "axios";
import Auth from "../utils/auth";
import CONST from "../utils/constants";

const exceptionApiUrlforRT = (config) => {
  if (!config) return null;
  const arr = [config.url.includes("/private/auth/login")];
  return !arr.includes(true);
};

export const isHandlerEnabled = (config) => {
  // eslint-disable-next-line no-prototype-builtins
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled ? false : true;
};

export const requestHandler = async (config) => {
  if (isHandlerEnabled(config)) {
    const token = Auth.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (exceptionApiUrlforRT(config)) {
      const newToken = await axios.post(`${CONST.BASE_URL_API}/private/auth/refresh`, {
        refreshToken: Auth.getRefreshToken(),
      });
      Auth.storeUserInfoToCookie(newToken.data);
      config.headers.Authorization = `Bearer ${newToken.data.access_token}`;
    }
  }
  return config;
};

export const successHandler = (response) => {
  if (isHandlerEnabled(response)) {
    if (response.status === 200) {
      return response;
    }
  }
  return response;
};

export const errorHandler = async (error) => {
  // const err = error.response;
  // if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
  // 	await axios
  // 		.post(`${CONST.BASE_URL_API}/auth/refresh`, {
  // 			refreshToken: Auth.getRefreshToken(),
  // 		})
  // 		.then((res) => {
  // 			err.config.__isRetryRequest = true;
  // 			Auth.storeUserInfoToCookie(res.data);
  // 			err.config.headers["Authorization"] = `Bearer ${res.data.access_token}`;
  // 			return err.config;
  // 		});
  // }
  // return Promise.reject({ ...error });
  return Promise.reject(error);
};
