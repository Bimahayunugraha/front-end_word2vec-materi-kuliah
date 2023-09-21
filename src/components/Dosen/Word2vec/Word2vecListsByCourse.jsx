import React, { useEffect, useState } from "react";
import Tabs from "../Tabs";
import { PulseLoader } from "react-spinners";
import { useDebounce } from "use-debounce";
import { Link, useNavigate, useParams } from "react-router-dom";
import Word2vecAPI from "../../../apis/word2vec.api";
import Word2vecListItemByCourse from "./Word2vecListItemByCourse";
import Pagination from "../../Pagination";
import Breadcrumbs from "../../Breadcrumbs";
import { useSelector } from "react-redux";

const Initial_Word2vec_Lists_By_Course = {
  data: [],
  page: 0,
  status: false,
};

const Word2vecListsByCourse = () => {
  const [word2vecListsByCourse, setWord2vecListsByCourse] = useState(
    Initial_Word2vec_Lists_By_Course
  );
  const [search_query, setSearch_query] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const { course } = useParams();

  const [debouncedKeyword] = useDebounce(search_query, 1300);
  const loading = useSelector((state) => state.word2vec.loading);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedKeyword) {
      Word2vecAPI.searchFileListsWord2vecByCourse(
        course,
        debouncedKeyword.toLowerCase(),
        10,
        page
      ).then((result) => {
        setWord2vecListsByCourse({
          status: true,
          data: result.data.payload,
          page: result.data.meta.page,
        });
        setPage(result.data.meta.page);
        setPages(result.data.meta.totalPage);
        setRows(result.data.meta.totalRows);
      });
    } else {
      Word2vecAPI.getFileListsWord2vecByCourse(course, 10, page).then((result) => {
        setWord2vecListsByCourse({
          status: true,
          data: result.data.payload,
          page: result.data.meta.page,
        });
        setPage(result.data.meta.page);
        setPages(result.data.meta.totalPage);
        setRows(result.data.meta.totalRows);
      });
    }
  }, [loading, debouncedKeyword, page]);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const handleSearchTrigger = () => {
    setSearchTrigger(!searchTrigger);
    setSearch_query("");
  };

  const handleClearSearchInput = () => {
    setSearch_query("");
  };

  return (
    <div className="mx-auto md:container">
      <div className="text-center">
        <h1 className="mb-1 text-xl font-bold tracking-wide text-primary-soft-violet md:text-2xl">
          Daftar File yang Dikonversi
        </h1>
        <p className="text-sm font-normal text-neutral-60 md:text-base">
          File yang telah dikonversi akan disimpan disini.
        </p>
      </div>
      <div className="pt-6 pb-6">
        <div className="flex items-center">
          <div className="min-w-0 flex-1">
            <Tabs />
          </div>
        </div>
        <div className="flex items-center bg-secondary-soft-white py-2 px-4">
          <Breadcrumbs className="hidden md:block">
            <Breadcrumbs.Content>
              <Breadcrumbs.Link>
                <button
                  onClick={() => navigate("/filelist/word2vec/file")}
                  className="mr-2 inline-flex items-center justify-center py-2 font-medium text-neutral-60 hover:text-primary-violet">
                  <i className="fa-solid fa-arrow-left text-sm md:text-base"></i>
                </button>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <p className="ml-1 text-xs font-normal text-neutral-40 md:text-sm">
                  Daftar word2vec
                </p>
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
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <p className="text-xs font-semibold text-neutral-100-2 sm:mt-0 md:text-sm">
                  {course}
                </p>
              </Breadcrumbs.Link>
            </Breadcrumbs.Content>
          </Breadcrumbs>
          {searchTrigger ? (
            <button
              type="button"
              className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-blue-500 hover:bg-blue-100 hover:text-blue-600 md:hidden"
              onClick={handleSearchTrigger}>
              <i className="fa-solid fa-arrow-left text-xl"></i>
            </button>
          ) : (
            <Breadcrumbs className="block md:hidden">
              <Breadcrumbs.Content>
                <Breadcrumbs.Link>
                  <Link
                    to="/filelist/word2vec/file"
                    className="mr-2 inline-flex items-center justify-center py-2 font-medium text-neutral-60 hover:text-primary-violet">
                    <i className="fa-solid fa-arrow-left text-sm md:text-base"></i>
                  </Link>
                </Breadcrumbs.Link>
                <Breadcrumbs.Link>
                  <p className="ml-1 text-xs font-normal text-neutral-40 md:text-sm">
                    Daftar word2vec
                  </p>
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
                </Breadcrumbs.Link>
                <Breadcrumbs.Link>
                  <p className="text-xs font-semibold text-neutral-100-2 sm:mt-0 md:text-sm">
                    {course}
                  </p>
                </Breadcrumbs.Link>
              </Breadcrumbs.Content>
            </Breadcrumbs>
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
                  placeholder="Cari data word2vec"
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
                  placeholder="Cari data word2vec"
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
        <div className="w-full bg-white shadow-6 md:rounded-b-xl">
          <div>
            {word2vecListsByCourse.status ? (
              <div>
                {word2vecListsByCourse.data.length > 0 ? (
                  <div>
                    <div className="max-h-80 overflow-y-auto">
                      {word2vecListsByCourse.data.map((item) => {
                        return <Word2vecListItemByCourse key={item.id} data={item} />;
                      })}
                    </div>
                    <Pagination className="flex items-center justify-center pb-3">
                      <Pagination.PaginationContent key={rows}>
                        <Pagination.PaginationLink
                          pageCount={Math.min(10, pages)}
                          onPageChange={changePage}
                        />
                      </Pagination.PaginationContent>
                    </Pagination>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-center py-6 text-xs font-semibold leading-7 text-neutral-80">
                    <i className="fi fi-rr-info mr-3 text-sm"></i>
                    Data file word2vec berdasarkan mata kuliah tidak ditemukan
                  </div>
                )}
              </div>
            ) : (
              <div className="my-0 mx-auto flex items-center justify-center py-4 px-6">
                <PulseLoader size={10} color="#6FCBFD" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Word2vecListsByCourse;
