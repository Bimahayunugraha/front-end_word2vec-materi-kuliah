import axiosInstance from "../configs/axiosInstance";

const SentenceAPI = {
  async getFilesListSentences() {
    try {
      const response = await axiosInstance.get("/sentence");
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async downloadSentence(id) {
    try {
      const response = await axiosInstance.get(`/sentence/download/${id}`, {
        responseType: "blob",
      });
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getFileSenteceById(id) {
    try {
      const response = await axiosInstance.get(`/sentence/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async convertSentence(data) {
    try {
      const response = await axiosInstance.post("/sentence", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async deleteSentence(id) {
    try {
      const response = await axiosInstance.delete(`/sentence/${id}`);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
};

export default SentenceAPI;
