import CorpusAPI from "../../apis/corpus.api";
import useSWR from "swr";
import { useParams } from "react-router-dom";

const GetCorpusById = () => {
  const { id } = useParams();

  const fetcher = async () => {
    try {
      const response = await CorpusAPI.getFileCorpusByIdWithContent(id);
      return response.data.payload;
    } catch (error) {
      throw Error(error);
    }
  };

  const { data, isLoading } = useSWR(`/corpus/${id}`, fetcher);

  return { dataCorpusById: data, loadingCorpusById: isLoading };
};

export default GetCorpusById;
