import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Breadcrumbs from "../../Breadcrumbs";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./similarity.module.css";
import SimilarityAPI from "../../../apis/similarity.api";
import SkeletonLoadingDetailSimilarityResultByClass from "./SkeletonLoadingDetailSimilarityResultByClass";
import { useDebounce } from "use-debounce";
import { useNavigateBack } from "../../../hooks/useNavigateBack";

const Initial_Similarity_By_Student_class = {
  data: [],
  status: false,
};

const DetailSimilarityResultByClass = () => {
  const { exam_name, student_class } = useParams();
  const [similarityListsByClass, setSimilarityListsByClass] = useState(
    Initial_Similarity_By_Student_class
  );
  const [search_query, setSearch_query] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [debouncedKeyword] = useDebounce(search_query, 1300);
  const navigate = useNavigate();

  const similarityListsByStudentClass = Array.from(
    new Set(similarityListsByClass.data?.map((value) => value.student_nim))
  );

  useEffect(() => {
    if (debouncedKeyword) {
      SimilarityAPI.searchSimilarityByStudentClass(
        exam_name,
        student_class,
        debouncedKeyword.toLowerCase()
      ).then((result) => setSimilarityListsByClass({ status: true, data: result.data.payload }));
    } else {
      SimilarityAPI.getSimilarityByStudentClass(exam_name, student_class).then((response) => {
        setSimilarityListsByClass({ status: true, data: response.data.payload });
      });
    }
  }, [debouncedKeyword]);

  const handleSearchTrigger = () => {
    setSearchTrigger(!searchTrigger);
    setSearch_query("");
  };

  const handleClearSearchInput = () => {
    setSearch_query("");
  };

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>{`Detail Hasil Kesamaan ${exam_name} Kelas ${student_class} - Word2vec Materi Kuliah`}</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      {similarityListsByClass.status ? (
        <div>
          <Breadcrumbs className="mt-4 md:mt-8">
            <Breadcrumbs.Content>
              <Breadcrumbs.Link>
                <button
                  onClick={useNavigateBack(navigate)}
                  className="mr-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 py-2 px-4 font-medium text-white hover:bg-blue-500">
                  <i className="fa-solid fa-arrow-left text-sm md:text-base"></i>
                </button>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <Link
                  to="/similarity-result"
                  className="inline-flex items-center justify-center text-sm font-normal text-neutral-40 hover:text-blue-600">
                  <i className="fa-solid fa-ballot-check mr-2 text-sm"></i>
                  Hasil Kesamaan
                </Link>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <svg
                  aria-hidden="true"
                  className="mx-1 h-6 w-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
                <Link
                  to={`/similarity-result/detail/${exam_name}`}
                  className="inline-flex items-center justify-center text-sm font-normal text-neutral-40 hover:text-blue-600">
                  <i className="fa-solid fa-pen-line mr-2 text-sm"></i>
                  {exam_name}
                </Link>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <svg
                  aria-hidden="true"
                  className="mx-1 h-6 w-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
                <p className="ml-1 text-sm font-semibold text-gray-800 hover:text-gray-800">
                  {student_class}
                </p>
              </Breadcrumbs.Link>
            </Breadcrumbs.Content>
          </Breadcrumbs>

          <div className="mt-5 w-full rounded-md border border-gray-300 bg-white">
            <div className="rounded-t-md bg-secondary-navy py-1"></div>
            <div className="border-b border-gray-200 bg-tertiary-7 py-3 px-6">
              <h4 className="text-sm font-medium text-neutral-100-2">Daftar Hasil Kesamaan</h4>
            </div>
            <div className="flex items-center py-4 px-6">
              <i className="fa-solid fa-graduation-cap text-sm"></i>
              <span className="ml-3 text-xs font-semibold text-gray-600 lg:text-sm">
                {exam_name}
              </span>
            </div>
          </div>
          <div className="mt-3 w-full rounded-md border border-gray-300 bg-white">
            <div className="rounded-t-md bg-secondary-green py-1"></div>
            <div className="w-full border-b border-gray-200 bg-tertiary-7 py-3 px-6">
              <div className="flex items-center">
                <div className="hidden min-w-0 flex-1 md:block">
                  <h4 className="text-sm font-medium text-neutral-100-2">
                    Daftar Nilai Mahasiswa Kelas {student_class}
                  </h4>
                </div>

                {searchTrigger ? (
                  <button
                    type="button"
                    className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-blue-500 hover:bg-blue-100 hover:text-blue-600 md:hidden"
                    onClick={handleSearchTrigger}>
                    <i className="fa-solid fa-arrow-left text-xl"></i>
                  </button>
                ) : (
                  <div className="block min-w-0 flex-1 md:hidden">
                    <h4 className="text-sm font-medium text-neutral-100-2">
                      Daftar Nilai Mahasiswa Kelas {student_class}
                    </h4>
                  </div>
                )}

                <div className="hidden items-center md:inline-flex">
                  <div className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full md:w-48 lg:w-80">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-dark-4">
                        <i className="fa-regular fa-magnifying-glass text-sm"></i>
                      </div>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-neutral-20 bg-transparent p-2 pl-10 pr-6 text-sm text-neutral-100-2 placeholder-neutral-80 placeholder:text-neutral-60 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Cari berdasarkan nim mahasiswa"
                        required
                        value={search_query}
                        onChange={(e) => setSearch_query(e.target.value)}
                      />
                      {search_query && (
                        <button
                          type="button"
                          className="absolute inset-y-0 bottom-0 top-0 right-0 mt-2 mr-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-gray-300"
                          onClick={handleClearSearchInput}>
                          <i className="fa-solid fa-xmark text-base text-gray-700"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className={searchTrigger ? "hidden" : "inline-flex items-center md:hidden"}>
                  <button
                    type="button"
                    className={
                      searchTrigger
                        ? "hidden"
                        : "inset-y-0 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200"
                    }
                    onClick={handleSearchTrigger}>
                    <i className="fa-regular fa-magnifying-glass text-sm text-gray-500"></i>
                  </button>
                </div>
                {searchTrigger && (
                  <div className="flex w-full items-center transition-all duration-300 md:hidden">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full md:w-48 lg:w-80">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-dark-4">
                        <i className="fa-regular fa-magnifying-glass text-sm"></i>
                      </div>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-neutral-20 bg-transparent p-2 pl-8 pr-6 text-sm text-neutral-100-2 placeholder-neutral-80 placeholder:text-neutral-60 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Cari berdasarkan nim mahasiswa"
                        required
                        value={search_query}
                        autoFocus
                        onChange={(e) => setSearch_query(e.target.value)}
                      />
                      {search_query && (
                        <button
                          type="button"
                          className="absolute inset-y-0 bottom-0 top-0 right-0 mt-2 mr-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-gray-300"
                          onClick={handleClearSearchInput}>
                          <i className="fa-solid fa-xmark text-base text-gray-700"></i>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative py-4 px-6">
              <table className="flex-no-wrap flex w-full flex-row overflow-hidden rounded-lg bg-white">
                {similarityListsByClass.data.length > 0 ? (
                  <thead className="text-white">
                    {similarityListsByStudentClass.map((i) => {
                      return (
                        <tr
                          className="mb-2 flex flex-col flex-nowrap rounded-l-lg border bg-primary-background text-sm text-primary-violet sm:mb-0 sm:table-row sm:rounded-none"
                          key={i}>
                          <th className="p-3 text-left">No</th>
                          <th className="p-3 text-left">NIM</th>
                          <th className="p-3 text-left">Aksi</th>
                        </tr>
                      );
                    })}
                  </thead>
                ) : (
                  <thead className="text-white">
                    <tr className="mb-2 flex flex-col flex-nowrap rounded-l-lg border bg-primary-background text-sm text-primary-violet sm:mb-0 sm:table-row sm:rounded-none">
                      <th className="p-3 text-left">No</th>
                      <th className="p-3 text-left">NIM</th>
                      <th className="p-3 text-left">Aksi</th>
                    </tr>
                  </thead>
                )}

                {similarityListsByClass.data.length > 0 ? (
                  <tbody className="flex-1 sm:flex-none">
                    {similarityListsByStudentClass.map((item, i) => {
                      return (
                        <tr
                          className="mb-2 flex flex-col flex-nowrap border text-sm sm:mb-0 sm:table-row sm:border-b"
                          key={item}>
                          <td className="p-3 text-neutral-100-2 hover:bg-gray-50">{i + 1}</td>
                          <td className="truncate p-3 text-neutral-100-2 hover:bg-gray-50">
                            {item}
                          </td>
                          <td className="relative p-3 font-medium text-secondary-green">
                            <Link
                              to={`/similarity-result/detail/${exam_name}/${student_class}/${item}`}
                              className="p-3 hover:bg-green-50 focus:bg-green-50">
                              <i className="fa-regular fa-circle-info"></i>
                              <span className="ml-3">Detail</span>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <tbody className="flex-1 sm:flex-none">
                    <tr className="mb-2 flex flex-col flex-nowrap border text-sm sm:mb-0 sm:table-row sm:border-b">
                      <td className="p-5 text-neutral-100-2 hover:bg-gray-50"></td>
                      <td className="p-3 text-center text-neutral-100-2 hover:bg-gray-50">
                        Data mahasiswa tidak ditemukan
                      </td>
                      <td className="p-6 text-neutral-100-2 hover:bg-gray-50"></td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonLoadingDetailSimilarityResultByClass />
      )}
    </div>
  );
};

export default DetailSimilarityResultByClass;
