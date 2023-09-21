import axiosInstance from "../configs/axiosInstance";

const SimilarityAPI = {
  async getSimilarity(take, lastId, page) {
    try {
      const config = {
        params: {
          take,
          lastId,
          page,
        },
      };
      const response = await axiosInstance.get("/private/similarity", config);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getSimilarityByExamName(exam_name) {
    try {
      const response = await axiosInstance.get(`/private/similarity/${exam_name}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getSimilarityByStudentClass(exam_name, student_class) {
    try {
      const response = await axiosInstance.get(`/private/similarity/${exam_name}/${student_class}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async searchSimilarityByStudentClass(exam_name, student_class, search_query) {
    try {
      const config = {
        params: {
          search_query,
        },
      };
      const response = await axiosInstance.get(
        `/private/similarity/${exam_name}/${student_class}/search/key`,
        config
      );
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getDetailSimilarityStudent(exam_name, student_class, student_nim) {
    try {
      const response = await axiosInstance.get(
        `/private/similarity/${exam_name}/${student_class}/${student_nim}`
      );
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async checkSimilarity(data) {
    try {
      const response = await axiosInstance.post("/private/similarity", data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
  async loadModelWord2vec(data) {
    try {
      const response = await axiosInstance.post("/private/similarity/load-model", data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
};

export default SimilarityAPI;
