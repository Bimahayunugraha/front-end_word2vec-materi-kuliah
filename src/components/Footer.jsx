import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/img/png/icon.png";
import decorateBlob from "../assets/img/svg/svg-decorator-blob-9.svg";

const Footer = () => {
  return (
    <div className="relative px-6 md:px-10">
      <div className="container relative z-10 mx-auto max-w-screen-xl pt-16 pb-10">
        <div className="flex flex-wrap justify-between">
          <div className="mb-16 w-full text-center md:text-left lg:mb-0 lg:w-1/5">
            <div className="flex items-center justify-center lg:justify-start">
              <img src={icon} alt="logo" className="w-8" />
              <h5 className="ml-2 text-xl font-black text-neutral-100-2 md:text-base">
                Word2vec Materi Kuliah.
              </h5>
            </div>
            <p className="mx-auto mt-4 max-w-xs text-center text-sm font-medium leading-loose text-gray-800 lg:mx-0 lg:mr-4 lg:text-left">
              Website untuk mengubah materi mata kuliah menjadi korpus teks dan word2vec & mengecek
              kesamaan.
            </p>
          </div>
          <div className="mb-8 w-1/2 text-center text-sm sm:text-base md:mb-0 md:w-1/5 md:text-left">
            <h5 className="font-bold uppercase text-neutral-100-2">Konversi</h5>
            <ul className="mt-4 text-sm font-medium text-gray-800">
              <li className="mt-3">
                <Link
                  to="/corpus"
                  className="border-b border-transparent pb-1 transition-all duration-300 ease-in-out hover:border-blue-500 hover:text-blue-600 focus:border-gray-400 focus:text-blue-400">
                  Konversi Korpus
                </Link>
              </li>

              <li className="mt-3">
                <Link
                  to="/vector"
                  className="border-b border-transparent pb-1 transition duration-300 hover:border-blue-500 hover:text-blue-600 focus:border-gray-400 focus:text-blue-400">
                  Konversi Word2vec
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-8 w-1/2 text-center text-sm sm:text-base md:mb-0 md:w-1/5 md:text-left">
            <h5 className="font-bold uppercase text-neutral-100-2">Lainnya</h5>
            <ul className="mt-4 text-sm font-medium">
              <li className="mt-3">
                <Link
                  to="/check-similarity"
                  className="border-b border-transparent pb-1 transition duration-300 hover:border-blue-500 hover:text-blue-600 focus:border-gray-400 focus:text-blue-400">
                  Periksa Kesamaan
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-8 w-1/2 text-center text-sm sm:text-base md:mb-0 md:w-1/5 md:text-left">
            <h5 className="font-bold uppercase text-neutral-100-2">Kantor</h5>
            <ul className="mt-4 text-sm font-medium">
              <li className="mt-3">
                <p className="mx-auto mt-4 max-w-xs text-center text-sm font-medium leading-loose text-gray-800 lg:mx-0 lg:mr-4 lg:text-left">
                  Kampus Terpadu UMY Jl. Brawijaya, Kasihan, Bantul Yogyakarta 55183
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="my-8 border-b border-neutral-20"></div>
        <div className="flex flex-col items-center justify-between pb-0 text-sm font-normal text-neutral-80 sm:flex-row">
          <div className="text-center">
            &copy; Copyright 2023, Word2vec Materi Kuliah. All Rights Reserved
          </div>
          <div>Bima Hayu Nugraha - 20190140031.</div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <img
          src={decorateBlob}
          alt="decorator-1"
          className="absolute top-0 left-0 h-80 w-80 -translate-x-20 -translate-y-32 transform opacity-10"
        />
        <img
          src={decorateBlob}
          alt="decorator-2"
          className="absolute bottom-0 right-0 h-80 w-80 translate-x-32  translate-y-48 transform opacity-10"
        />
      </div>
    </div>
  );
};

export default Footer;
