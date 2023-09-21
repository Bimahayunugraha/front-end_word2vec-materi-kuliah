import React, { useEffect, useState } from "react";
import SimilarityResultListItem from "./SimilarityResultListItem";
import SimilarityAPI from "../../../apis/similarity.api";
import SkeletonLoadingSimilarityResultLists from "./SkeletonLoadingSimilarityResultLists";
import InfiniteScroll from "react-infinite-scroll-component";
import { PropagateLoader } from "react-spinners";

const Initial_Similarity = {
  data: [],
  status: false,
  page: 0,
};

const SimilarityResulLists = () => {
  const [similarityLists, setSimilarityLists] = useState(Initial_Similarity);
  const [lastId, setLastId] = useState("");
  const [tempId, setTempId] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const similarityResultLists = Array.from(
    new Set(similarityLists.data?.map((value) => value.exam_name))
  );

  useEffect(() => {
    SimilarityAPI.getSimilarity(20, lastId).then((result) => {
      const newUsers = result.data.payload;
      setSimilarityLists({ status: true, data: [...similarityLists.data, ...newUsers] });
      setTempId(result.data.meta.lastId);
      setHasMore(result.data.meta.hasMore);
    });
  }, [lastId]);

  const fetchMore = () => {
    setLastId(tempId);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-wide text-primary-soft-violet md:text-2xl">
          Hasil Kesamaan Teks
        </h1>
        <p className="text-sm font-normal text-neutral-60 md:text-base">
          Hasil pemeriksaan kesamaan teks antara kunci jawaban dan jawaban mahasiswa.
        </p>
      </div>
      <div className="pt-6 pb-6">
        {similarityLists.status ? (
          <div>
            {similarityLists.data.length > 0 ? (
              <div>
                <InfiniteScroll
                  dataLength={similarityLists.data.length}
                  next={fetchMore}
                  hasMore={hasMore}
                  loader={
                    <div className="my-0 mx-auto flex items-center justify-center py-3 px-6">
                      <PropagateLoader size={10} color="#6FCBFD" />
                    </div>
                  }>
                  <div className="mb-6 grid gap-3 md:grid-cols-3 xl:grid-cols-4">
                    {similarityResultLists.map((exam) => {
                      return <SimilarityResultListItem key={exam} data={exam} />;
                    })}
                  </div>
                </InfiniteScroll>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center py-4 text-xs font-semibold leading-7 text-neutral-80">
                <i className="fa-regular fa-circle-info mr-3 text-sm"></i>
                Data hasil kesamaan tidak ditemukan
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6 grid gap-3 md:grid-cols-3 xl:grid-cols-4">
            <SkeletonLoadingSimilarityResultLists />
            <SkeletonLoadingSimilarityResultLists />
            <SkeletonLoadingSimilarityResultLists />
            <SkeletonLoadingSimilarityResultLists />
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarityResulLists;
