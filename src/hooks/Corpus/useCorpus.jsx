import useSWR from "swr";
import CorpusAPI from "../../apis/corpus.api";

const GetCorpus = () => {
  const fetcher = async () => {
    try {
      const response = await CorpusAPI.filesListCorpus();
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  };
  const { data, isLoading } = useSWR("corpus", fetcher);

  return { dataCorpus: data, loadingCorpus: isLoading };
};

export default GetCorpus;
