import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useQuery from "../../hooks/useQuery";
import FilterW2vItem from "./FilterAllEmbeddingFileListItem";
import SkeletonLoadingSearchAllEmbeddingFile from "./SkeletonLoadingSearchAllEmbeddingFile";
import { useSelector } from "react-redux";
import Word2vecAPI from "../../apis/word2vec.api";
import { useNavigateBack } from "../../hooks/useNavigateBack";
import { useNavigate } from "react-router-dom";

const INITIAL_ALL_LIST_WORD2VEC = {
  data: [],
  status: false,
};

const FilterAllEmbeddingFileLists = () => {
  let queryLink = useQuery();
  const name = queryLink.get("dosen");
  const mata_kuliah = queryLink.get("mata_kuliah");
  const [allListWord2vec, setAllListWord2vec] = useState(INITIAL_ALL_LIST_WORD2VEC);
  const [rows, setRows] = useState(0);

  const loading = useSelector((state) => state.word2vec.loading);
  const navigate = useNavigate();

  useEffect(() => {
    Word2vecAPI.filterWord2vec(name, mata_kuliah, 1000).then((result) => {
      setAllListWord2vec({ data: result.data.payload, status: true });
      setRows(result.data.meta.totalRows);
    });
  }, [loading]);

  return (
    <div className="mx-auto pt-20 pb-16 md:container md:px-10">
      <Helmet>
        <title>{`Filter Data Word2vec Dosen ${name} dan Mata Kuliah ${mata_kuliah} - Word2vec Mata Kuliah`}</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="z-10 w-full px-4 md:px-0">
        <div className="flex items-center space-x-0 md:space-x-3">
          <button
            onClick={useNavigateBack(navigate)}
            className="mr-2 flex h-8 w-14 items-center justify-center rounded-full font-medium text-blue-500 hover:bg-blue-100 hover:text-blue-600 md:h-8 md:w-8">
            <i className="fa-solid fa-arrow-left text-base md:text-xl"></i>
          </button>
          {allListWord2vec.status ? (
            <h5 className="text-xs font-medium text-gray-700 md:text-sm">
              Hasil filter untuk dosen <span className="text-secondary-green">{name}</span> dan mata
              kuliah <span className="text-secondary-green">{mata_kuliah}</span> berjumlah {rows}{" "}
              data
            </h5>
          ) : (
            <div className="inline-flex w-48 animate-pulse items-center rounded-xl border-b border-transparent bg-skeleton py-3 text-sm font-medium"></div>
          )}
        </div>
      </div>
      <div className="pt-6 pb-10">
        {allListWord2vec.status ? (
          <div>
            {allListWord2vec.data?.length > 0 ? (
              <div className="mb-6 w-full">
                {allListWord2vec.data?.map((item) => {
                  return <FilterW2vItem key={item.id} data={item} />;
                })}
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center py-6 px-6 text-xs font-medium leading-7 text-neutral-80 md:text-sm">
                Data embedding file yang Anda filter untuk dosen
                <span className="px-1 text-base font-bold text-secondary-green"> {name}</span> dan
                mata kuliah
                <span className="px-1 text-base font-bold text-secondary-orange">
                  {" "}
                  {mata_kuliah}
                </span>{" "}
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

export default FilterAllEmbeddingFileLists;
