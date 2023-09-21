import axiosInstance from "../configs/axiosInstance";

const CourseMaterialAPI = {
  async getListsCourseMaterial() {
    try {
      const response = await axiosInstance.get("/private/course-materials");
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async getAllFilesListsCourseMaterialByCourse(course, take, page) {
    try {
      const config = {
        params: {
          take,
          page,
        },
      };
      const response = await axiosInstance.get(`/private/course-materials/${course}`, config);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async searchAllFilesListsCourseMaterialByCourse(course, search_query, take, page) {
    try {
      const config = {
        params: {
          search_query,
          take,
          page,
        },
      };
      const response = await axiosInstance.get(
        `/private/course-materials/${course}/search/key`,
        config
      );
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async downloadCourseMaterialFile(id) {
    try {
      const response = await axiosInstance.get(`/private/course-materials/download/${id}`, {
        responseType: "blob",
      });
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },

  async editInformationCourseMaterial(data) {
    try {
      const id = data.id;
      const response = await axiosInstance.patch(`/private/course-materials/${id}`, data);
      return response;
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
    }
  },
};

export default CourseMaterialAPI;
