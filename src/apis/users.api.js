import axiosInstance from "../configs/axiosInstance";
import Auth from "../utils/auth";

const UsersAPI = {
  async getUsersByRoleDosen(take, page) {
    try {
      const config = {
        params: {
          take,
          page,
        },
      };
      const response = await axiosInstance.get("/private/users/dosen", config);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async searchUsersByRoleDosen(search_query, take, page) {
    try {
      const config = {
        params: {
          search_query,
          take,
          page,
        },
      };
      const response = await axiosInstance.get("/private/users/dosen/search/key", config);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async addNewUser(data) {
    try {
      const response = await axiosInstance.post("/private/users", data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getUserById() {
    try {
      const id = Auth.getUserId();
      const response = await axiosInstance.get(`/private/user/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async editUserRoleDosen(data) {
    try {
      const id = data.id;
      const response = await axiosInstance.patch(`/private/user/dosen/${id}`, data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async editPassword(data) {
    try {
      const id = data.id;
      const response = await axiosInstance.patch(`/private/user/dosen/password/${id}`, data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async editUserProfileRoleDosen(data) {
    try {
      const id = data.id;
      const response = await axiosInstance.patch(`/private/user/dosen/profile/${id}`, data, {
        headers: { "content-type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async deleteUserByIdForRoleDosen(id) {
    try {
      const response = await axiosInstance.delete(`/private/user/dosen/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
};

export default UsersAPI;
