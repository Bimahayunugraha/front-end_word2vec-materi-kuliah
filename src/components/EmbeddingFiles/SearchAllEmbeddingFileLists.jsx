import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import SearchAllEmbeddingFileListItem from "./SearchAllEmbeddingFileListItem";
import SkeletonLoadingSearchAllEmbeddingFile from "./SkeletonLoadingSearchAllEmbeddingFile";
import Word2vecAPI from "../../apis/word2vec.api";
import { useNavigateBack } from "../../hooks/useNavigateBack";
import InfiniteScroll from "react-infinite-scroll-component";
import { PropagateLoader } from "react-spinners";

const INITIAL_ALL_LIST_WORD2VEC = {
  data: [],
  status: false,
};

const SearchAllEmbeddingFileLists = () => {
  let queryLink = useQuery();
  const search = queryLink.get("search_query");

  const [allListWord2vec, setAllListWord2vec] = useState(INITIAL_ALL_LIST_WORD2VEC);
  const [rows, setRows] = useState(0);
  const [lastId, setLastId] = useState("");
  const [tempId, setTempId] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const loading = useSelector((state) => state.word2vec.loading);
  const navigate = useNavigate();

  useEffect(() => {
    Word2vecAPI.searchWord2vec(search, 10, lastId).then((result) => {
      const newWord2vec = result.data.payload;
      setAllListWord2vec({ data: [...allListWord2vec.data, ...newWord2vec], status: true });
      setTempId(result.data.meta.lastId);
      setHasMore(result.data.meta.hasMore);
      setRows(result.data.meta.totalRows);
    });
  }, [loading, search, lastId]);

  const fetchMore = () => {
    setLastId(tempId);
  };

  return (
    <div className="mx-auto pt-20 pb-16 md:container md:px-10">
      <Helmet>
        <title>{`Cari Data Word2vec key ${search} - Word2vec Mata Kuliah`}</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="z-10 w-full px-4 md:px-0">
        <div className="inline-flex items-center space-x-1 md:space-x-3">
          <button
            onClick={useNavigateBack(navigate)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full font-medium text-blue-500 hover:bg-blue-100 hover:text-blue-600">
            <i className="fa-solid fa-arrow-left text-xl"></i>
          </button>
          {allListWord2vec.status ? (
            <div className="flex items-center">
              <p className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-800">
                Hasil pencarian : <span className="text-secondary-green">{search}</span> berjumlah{" "}
                {rows} data
              </p>
            </div>
          ) : (
            <div className="inline-flex w-48 animate-pulse items-center rounded-xl border-b border-transparent bg-skeleton py-3 text-sm font-medium"></div>
          )}
        </div>
      </div>
      <div className="pt-6 pb-10">
        {allListWord2vec.status ? (
          <div>
            {allListWord2vec.data?.length > 0 ? (
              <InfiniteScroll
                dataLength={allListWord2vec.data?.length}
                next={fetchMore}
                hasMore={hasMore}
                className="md:px-2"
                loader={
                  <div className="my-0 mx-auto flex items-center justify-center py-3 px-6">
                    <PropagateLoader size={10} color="#6FCBFD" />
                  </div>
                }>
                <div className="mb-6 w-full">
                  {allListWord2vec.data?.map((item) => {
                    return <SearchAllEmbeddingFileListItem key={item.id} data={item} />;
                  })}
                </div>
              </InfiniteScroll>
            ) : (
              <div className="flex flex-wrap items-center justify-center py-6 px-6 text-xs font-medium leading-7 text-neutral-80 md:text-sm">
                Data embedding file yang Anda cari dengan kata kunci{" "}
                <span className="px-1 text-base font-bold text-secondary-green">{search}</span>{" "}
                tidak ditemukan
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6 w-full">
            <SkeletonLoadingSearchAllEmbeddingFile />
            <SkeletonLoadingSearchAllEmbeddingFile />
            <SkeletonLoadingSearchAllEmbeddingFile />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAllEmbeddingFileLists;
