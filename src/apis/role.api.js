import axiosInstance from "../configs/axiosInstance";

const RolesAPI = {
  async getRole() {
    try {
      const response = await axiosInstance.get("/private/roles");
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async addRole(data) {
    try {
      const response = await axiosInstance.post("/private/roles", data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async editRole(data) {
    try {
      const id = data.id;
      const response = await axiosInstance.patch(`/private/roles/${id}`, data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async deleteRole(id) {
    try {
      const response = await axiosInstance.delete(`/private/roles/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
};

export default RolesAPI;
