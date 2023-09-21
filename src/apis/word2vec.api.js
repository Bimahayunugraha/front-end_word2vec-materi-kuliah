import axios from "axios";
import axiosInstance from "../configs/axiosInstance";
import CONST from "../utils/constants";

const Word2vecAPI = {
  async filesListWord2vec() {
    try {
      const response = await axiosInstance.get("/private/word2vec");
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getFileListsWord2vecByCourse(course, take, page) {
    try {
      const config = {
        params: {
          take,
          page,
        },
      };
      const response = await axiosInstance.get(`/private/word2vec/${course}`, config);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async searchFileListsWord2vecByCourse(course, search_query, take, page) {
    try {
      const config = {
        params: {
          search_query,
          take,
          page,
        },
      };
      const response = await axiosInstance.get(`/private/word2vec/${course}/search/key`, config);
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
      const response = await axios.get(`${CONST.BASE_URL_API}/public/word2vec/all`, config);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
  async searchWord2vec(search_query, take, lastId) {
    try {
      const config = {
        params: {
          search_query,
          take,
          lastId,
        },
      };
      const response = await axios.get(
        `${CONST.BASE_URL_API}/public/word2vec/all/search/key`,
        config
      );
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
      const response = await axios.get(
        `${CONST.BASE_URL_API}/public/word2vec/all/filter/key`,
        config
      );
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getFileWord2vecByIdWithoutContentFile(course, id) {
    try {
      const response = await axiosInstance.get(`/private/word2vec/${course}/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getFileWord2vecByIdWithContentFile(course, id) {
    try {
      const response = await axiosInstance.get(`/private/word2vec/content/${course}/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getAllFileWord2vecById(course, id) {
    try {
      const response = await axios.get(`${CONST.BASE_URL_API}/public/word2vec/all/${course}/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async editWord2vec(data) {
    try {
      const id = data.id;
      const response = await axiosInstance.patch(`/private/word2vec/${id}`, data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async downloadWord2vec(id) {
    try {
      const response = await axiosInstance.get(`/private/word2vec/download/${id}`, {
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
      const response = await axiosInstance.post("/private/word2vec", data, {
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
      const response = await axiosInstance.delete(`/private/word2vec/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
};

export default Word2vecAPI;
