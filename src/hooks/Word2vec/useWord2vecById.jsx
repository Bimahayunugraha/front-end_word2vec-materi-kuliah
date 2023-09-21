import Word2vecAPI from "../../apis/word2vec.api";
import useQuery from "../useQuery";
import useSWR from "swr";

const useWord2vecById = () => {
  const query = useQuery();
  const id = query.get("view");

  const fetcher = async () => {
    try {
      const response = await Word2vecAPI.getFileWord2vecById(id);
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  };

  const { data, isLoading } = useSWR(`/word2vec/${id}`, fetcher);

  return { dataWord2vecById: data, loadingWord2vecById: isLoading };
};

export default useWord2vecById;
