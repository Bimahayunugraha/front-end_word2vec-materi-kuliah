import useSWR from "swr";
import Word2vecAPI from "../../apis/word2vec.api";

const useWord2vec = () => {
  const fetcher = async () => {
    try {
      const response = await Word2vecAPI.filesListWord2vec();
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  };
  const { data, isLoading } = useSWR("word2vec", fetcher);

  return { dataWord2vec: data, loadingWord2vec: isLoading };
};

export default useWord2vec;
