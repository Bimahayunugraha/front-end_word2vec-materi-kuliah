import axiosInstance from "../configs/axiosInstance";

const CorpusAPI = {
  async filesListCorpus() {
    try {
      const response = await axiosInstance.get("/private/corpus");
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getAllFilesListCorpusByCourse(course, take, page) {
    try {
      const config = {
        params: {
          take,
          page,
        },
      };
      const response = await axiosInstance.get(`/private/corpus/${course}`, config);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async searchAllFilesListCorpusByCourse(course, search_query, take, page) {
    try {
      const config = {
        params: {
          search_query,
          take,
          page,
        },
      };
      const response = await axiosInstance.get(`/private/corpus/${course}/search/key`, config);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async downloadCorpus(id) {
    try {
      const response = await axiosInstance.get(`/private/corpus/download/${id}`, {
        responseType: "blob",
      });
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getFileCorpusByIdWithContent(course, id) {
    try {
      const response = await axiosInstance.get(`/private/corpus/content/${course}/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getFileCorpusByIdWithoutContent(course, id) {
    try {
      const response = await axiosInstance.get(`/private/corpus/${course}/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async corpusConvert(data) {
    try {
      const response = await axiosInstance.post("/private/corpus", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async editCorpusFileContent(data) {
    try {
      const id = data.id;
      const response = await axiosInstance.patch(`/private/corpus/file/content/${id}`, data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async editCorpus(data) {
    try {
      const id = data.id;
      const response = await axiosInstance.patch(`/private/corpus/${id}`, data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async deleteCorpus(id) {
    try {
      const response = await axiosInstance.delete(`/private/corpus/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
};

export default CorpusAPI;
