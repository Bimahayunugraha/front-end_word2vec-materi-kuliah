import React, { useEffect, useState } from "react";
import AllEmbeddingFileListItem from "./AllEmbeddingFileListItem";
import { useSelector } from "react-redux";
import SkeletonLoadingAllEmbeddingFileLists from "./SkeletonLoadingAllEmbeddingFileLists";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { select } from "../../utils/globalVariable";
import PrimaryButton from "../PrimaryButton";
import InfiniteScroll from "react-infinite-scroll-component";
import { PropagateLoader } from "react-spinners";
import Word2vecAPI from "../../apis/word2vec.api";

const INITIAL_ALL_LIST_WORD2VEC = {
  data: [],
  status: false,
};

const AllEmbeddingFileLists = () => {
  const [allListWord2vec, setAllListWord2vec] = useState(INITIAL_ALL_LIST_WORD2VEC);
  const [filterAllListWord2vecByName, setFilterAllListWord2vecByName] =
    useState(INITIAL_ALL_LIST_WORD2VEC);
  const [filterAllListWord2vecByMataKuliah, setFilterAllListWord2vecByMataKuliah] =
    useState(INITIAL_ALL_LIST_WORD2VEC);
  const [checked, setChecked] = useState("");
  const [checkedMataKuliah, setCheckedMataKuliah] = useState("");

  const [lastId, setLastId] = useState("");
  const [tempId, setTempId] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const loading = useSelector((state) => state.word2vec.loading);
  const navigate = useNavigate();

  const allListsFilterOne = Array.from(
    new Set(filterAllListWord2vecByName.data?.map((value) => value.user.name))
  );
  const allListsFilterTwo = Array.from(
    new Set(filterAllListWord2vecByMataKuliah.data?.map((value) => value.course))
  );

  useEffect(() => {
    Word2vecAPI.getAllfilesListWord2vec(10, lastId).then((result) => {
      const newWord2vec = result.data.payload;
      setAllListWord2vec({ data: [...allListWord2vec.data, ...newWord2vec], status: true });
      setTempId(result.data.meta.lastId);
      setHasMore(result.data.meta.hasMore);
    });
  }, [loading, lastId]);

  const fetchMore = () => {
    setLastId(tempId);
  };

  useEffect(() => {
    getFilterByName();
  }, [loading]);

  const getFilterByName = async () => {
    const response = await Word2vecAPI.getAllfilesListWord2vec(1000, lastId);
    setFilterAllListWord2vecByName({ data: response.data.payload, status: true });
  };

  useEffect(() => {
    getAllListsByMataKuliah();
  }, [loading]);

  const getAllListsByMataKuliah = async () => {
    const response = await Word2vecAPI.getAllfilesListWord2vec(1000, lastId);
    setFilterAllListWord2vecByMataKuliah({ data: response.data.payload, status: true });
  };

  const filterName = allListsFilterOne
    .map((name) => {
      return { value: name, label: name };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  const filterMataKuliah = allListsFilterTwo
    .map((course) => {
      return { value: course, label: course };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  const handleChange = (e) => {
    setChecked(e.value);
  };

  const handleChangeMataKuliah = (e) => {
    setCheckedMataKuliah(e.value);
  };

  const filterData = (e) => {
    e.preventDefault();

    navigate(
      `/w2v/all/filters?dosen=${checked.replace(/ /g, "+")}&mata_kuliah=${checkedMataKuliah.replace(
        / /g,
        "+"
      )}`
    );
  };

  return (
    <div className="mx-auto pt-20 pb-16 md:container md:px-8">
      <div className="flex justify-center md:justify-start">
        <form
          className="relative mb-4 hidden items-center justify-center space-x-2 transition-all duration-300 md:inline-flex md:px-2"
          onSubmit={filterData}>
          <div className="relative md:w-48">
            <Select
              className={`z-10 ${select} cursor-pointer`}
              options={filterName}
              name="dosen"
              placeholder="Filter Dosen"
              noOptionsMessage={() => "Nama dosen tidak ditemukan"}
              onChange={handleChange}
            />
          </div>

          <div className="relative w-48">
            <Select
              className={`z-10 ${select} cursor-pointer`}
              options={filterMataKuliah}
              id="course"
              name="course"
              placeholder="Filter Mata Kuliah"
              noOptionsMessage={() => "Nama mata kuliah tidak ditemukan"}
              onChange={handleChangeMataKuliah}
            />
          </div>

          <PrimaryButton
            type={!checked || !checkedMataKuliah ? "button" : "submit"}
            className="ml-2 py-2 px-3">
            <i className="fa-solid fa-bars-filter text-sm"></i>
          </PrimaryButton>
        </form>

        <form onSubmit={filterData} className="relative mb-4 transition-all duration-300 md:hidden">
          <div className="flex items-center space-x-2">
            <div className="relative md:w-48">
              <Select
                className={`z-[15] ${select} cursor-pointer`}
                options={filterName}
                name="dosen"
                placeholder="Filter dosen"
                noOptionsMessage={() => "Nama dosen tidak ditemukan"}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative w-48">
              <Select
                className={`z-10 ${select} cursor-pointer`}
                options={filterMataKuliah}
                id="course"
                name="course"
                placeholder="Filter mata kuliah"
                noOptionsMessage={() => "Nama mata kuliah tidak ditemukan"}
                onChange={handleChangeMataKuliah}
                required
              />
            </div>
          </div>
          <PrimaryButton
            type={!checked || !checkedMataKuliah ? "button" : "submit"}
            className="mt-2 w-full py-2 px-3">
            <i className="fa-solid fa-bars-filter mr-2 text-sm"></i>
            <span>Filter</span>
          </PrimaryButton>
        </form>
      </div>

      {allListWord2vec.status ? (
        <div>
          {allListWord2vec.data?.length > 0 ? (
            <div>
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
                <div className="w-ful mb-6 mt-2 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                  {allListWord2vec.data?.map((item, index) => {
                    return <AllEmbeddingFileListItem key={index} data={item} />;
                  })}
                </div>
              </InfiniteScroll>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center py-6 text-xs font-semibold leading-7 text-neutral-80">
              <i className="fi fi-rr-info mr-3 text-sm"></i>
              Data semua embedding file tidak ditemukan
            </div>
          )}
        </div>
      ) : (
        <div className="w-ful mb-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          <SkeletonLoadingAllEmbeddingFileLists />
          <SkeletonLoadingAllEmbeddingFileLists />
          <SkeletonLoadingAllEmbeddingFileLists />
          <SkeletonLoadingAllEmbeddingFileLists />
        </div>
      )}
    </div>
  );
};

export default AllEmbeddingFileLists;
