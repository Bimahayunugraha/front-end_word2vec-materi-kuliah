import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../assets/img/png/icon.png";
import PrimaryButton from "../PrimaryButton";

const Header = () => {
  const [query, setQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();

  const handleSearchTrigger = () => {
    setSearchTrigger(!searchTrigger);
    setQuery("");
  };

  const searchData = (e) => {
    e.preventDefault();
    navigate(`/w2v/all/results?search_query=${query.replace(/ /g, "+")}`);
    setQuery(query);
  };

  const handleClearSearchInput = () => {
    setQuery("");
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyNavbar);

    return () => window.removeEventListener("scroll", stickyNavbar);
  });

  const stickyNavbar = () => {
    if (window.scrollY > 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  return (
    <nav
      className={
        scroll
          ? "nav-container active absolute top-0 left-0 right-0 z-20 w-full border-b border-gray-200 px-0 py-2.5 sm:px-4 md:px-2"
          : "gradient-1 fixed top-0 left-0 z-20 w-full bg-white px-0 py-2.5 sm:px-4 md:px-2"
      }>
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between">
          <Link to="/w2v/all" className="hidden items-center md:inline-flex">
            <img src={icon} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center whitespace-nowrap text-lg font-semibold text-gray-900 md:text-xl">
              Semua Data Embedding File
            </span>
          </Link>
          {searchTrigger ? (
            <button
              type="button"
              className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-blue-500 transition-all duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-600 md:hidden"
              onClick={handleSearchTrigger}>
              <i className="fa-solid fa-arrow-left text-xl"></i>
            </button>
          ) : (
            <Link
              to="/w2v/all"
              className="inline-flex items-center transition-all duration-300 ease-in-out md:hidden">
              <img src={icon} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center whitespace-nowrap text-sm font-semibold text-neutral-100-2">
                Semua Data Embedding File
              </span>
            </Link>
          )}

          <div className="hidden items-center transition-all duration-300 ease-in-out md:inline-flex">
            <form className="flex items-center" onSubmit={searchData}>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fa-regular fa-magnifying-glass text-sm text-neutral-40"></i>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="block w-44 rounded-lg border border-neutral-20 bg-transparent p-2 pl-10 pr-8 text-sm text-gray-900 placeholder:text-neutral-40 focus:border-blue-500 focus:ring-blue-500 md:w-[400px]"
                  placeholder="Cari"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onInvalid={(e) => e.target.setCustomValidity("Mohon isi kolom pencarian")}
                  onInput={(e) => e.target.setCustomValidity("")}
                  title="Cari data embedding file"
                />
                {query && (
                  <button
                    type="button"
                    className="absolute inset-y-0 bottom-0 top-2 right-0 mr-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-gray-300"
                    onClick={handleClearSearchInput}>
                    <i className="fa-solid fa-xmark text-lg text-gray-700"></i>
                  </button>
                )}
              </div>
              <PrimaryButton className="ml-2 py-2 px-3" title="Cari">
                <i className="fa-regular fa-magnifying-glass text-sm"></i>
              </PrimaryButton>
            </form>
          </div>
          <div
            className={
              searchTrigger
                ? "hidden transition-all duration-300 ease-in-out"
                : "inline-flex items-center transition-all duration-300 ease-in-out md:hidden"
            }>
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
            <form
              className="flex w-full items-center transition-all duration-300 ease-in-out md:hidden"
              onSubmit={searchData}>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fa-regular fa-magnifying-glass text-sm text-neutral-40"></i>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="block w-full rounded-lg border border-neutral-20 bg-transparent p-2 pl-10 pr-8 text-sm text-gray-900 placeholder:text-neutral-40 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Cari"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  onInvalid={(e) => e.target.setCustomValidity("Mohon isi kolom pencarian")}
                  onInput={(e) => e.target.setCustomValidity("")}
                  title="Cari data embedding file"
                />
                {query && (
                  <button
                    type="button"
                    className="absolute inset-y-0 bottom-0 top-2 right-0 mr-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-gray-300"
                    onClick={handleClearSearchInput}>
                    <i className="fa-solid fa-xmark text-lg text-gray-700"></i>
                  </button>
                )}
              </div>
              <PrimaryButton className="ml-2 py-2 px-3" title="Cari">
                <i className="fa-regular fa-magnifying-glass text-sm"></i>
              </PrimaryButton>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
