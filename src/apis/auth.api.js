import axios from "axios";
import axiosInstance from "../configs/axiosInstance";
import Auth from "../utils/auth";
import CONST from "../utils/constants";

const AuthAPI = {
  async login(data) {
    try {
      const response = await axiosInstance.post("/private/auth/login", data);
      Auth.storeUserInfoToCookie(response.data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async logout(data) {
    try {
      const rt = data.rt;
      const response = await axios.delete(`${CONST.BASE_URL_API}/private/auth/logout/${rt}`, data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async sendResetPasswordLink(data) {
    try {
      const response = await axios.post(
        `${CONST.BASE_URL_API}/private/auth/requestResetPasswordLink`,
        data
      );
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async resetPassword(data) {
    try {
      const id = data.id;
      const token = data.token;
      const response = await axios.patch(
        `${CONST.BASE_URL_API}/private/auth/resetPassword/${id}/${token}`,
        data
      );
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async verifyResetPasswordToken(data) {
    try {
      const id = data.id;
      const token = data.token;
      const response = await axios.get(
        `${CONST.BASE_URL_API}/private/auth/resetPassword/${id}/${token}`,
        data
      );
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
};

export default AuthAPI;
