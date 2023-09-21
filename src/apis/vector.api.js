import axios from "axios";
import axiosInstance from "../configs/axiosInstance";
import CONST from "../utils/constants";

const VectorAPI = {
  async filesListWord2vec() {
    try {
      const response = await axiosInstance.get("/word2vec");
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
  async getAllfilesListWord2vec(take, lastId, page) {
    try {
      const config = {
        params: {
          take,
          lastId,
          page,
        },
      };
      const response = await axios.get(`${CONST.BASE_URL_API}/word2vec/all`, config);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
  async searchWord2vec(search_query, take) {
    try {
      const config = {
        params: {
          search_query,
          take,
        },
      };
      const response = await axios.get(`${CONST.BASE_URL_API}/word2vec/all/search/key`, config);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
  async filterWord2vec(dosen, mata_kuliah, take) {
    try {
      const config = {
        params: {
          dosen,
          mata_kuliah,
          take,
        },
      };
      const response = await axios.get(`${CONST.BASE_URL_API}/word2vec/all/filter/key`, config);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
  async getListFilesSent2vec() {
    try {
      const response = await axiosInstance.get("/sent2vec");
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
  async getFileWord2vecById(id) {
    try {
      const response = await axiosInstance.get(`/word2vec/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
  async getAllFileWord2vecById(id) {
    try {
      const response = await axios.get(`${CONST.BASE_URL_API}/word2vec/all/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async editWord2vec(data) {
    try {
      const id = data.id;
      const response = await axiosInstance.patch(`/word2vec/${id}`, data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async downloadWord2vec(id) {
    try {
      const response = await axiosInstance.get(`/word2vec/download/${id}`, {
        responseType: "blob",
      });
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async word2vecConvert(data) {
    try {
      const response = await axiosInstance.post("/word2vec", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async deleteVector(id) {
    try {
      const response = await axiosInstance.delete(`/word2vec/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
};

export default VectorAPI;
