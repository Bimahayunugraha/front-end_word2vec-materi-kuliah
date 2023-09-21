import useSWR from "swr";
import CourseMaterialAPI from "../../apis/courseMaterial.api";

const useCourseMaterial = () => {
  const fetcher = async () => {
    try {
      const response = await CourseMaterialAPI.getListsCourseMaterial();
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  };
  const { data, isLoading } = useSWR("course-materials", fetcher);

  return { dataCourseMaterialFiles: data, loadingCourseMaterialFiles: isLoading };
};

export default useCourseMaterial;
