import React from "react";
import heroImage from "../assets/img/png/hero-image.png";
import decoratorBlob1 from "../assets/img/svg/svg-decorator-blob-1.svg";
import decoratorBlob2 from "../assets/img/svg/dot-pattern-1.svg";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Hero = () => {
  const imageDecoratorBlob = true;
  const auth = Auth.isAuthorization();
  let userName = null;

  const userInfo = Auth.getUser();
  if (auth) {
    const user = JSON.parse(userInfo);
    userName = user;
  }

  return (
    <div className="relative overflow-hidden">
      {auth && auth ? (
        <div className="container mx-auto flex flex-col items-center pt-24 sm:py-24">
          <div className="mb-5 w-11/12 flex-col items-center justify-center sm:mb-7 sm:w-2/3 lg:flex">
            <h1 className="text-center text-2xl font-black leading-7 text-primary-soft-violet sm:text-3xl md:text-3xl md:leading-10 lg:text-4xl xl:text-5xl">
              Selamat Datang
            </h1>
            <h2 className="w-full text-center text-xl font-black tracking-wide text-primary-soft-violet sm:text-2xl md:text-2xl">
              <span className="mt-2 inline-block -skew-x-12 transform bg-primary-500 px-4 py-2 text-gray-100">
                {userName.name && userName.name}
              </span>
            </h2>
            <p className="mt-7 text-center text-sm font-normal text-secondary-100 sm:mt-5 sm:text-base lg:w-1/2">
              Anda dapat melihat semua embedding file dari dosen dengan klik pada `Lihat Semua
              Embedding File` dibawah ini.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Link
              to="/w2v/all"
              className="mt-3 rounded-full bg-gray-200 px-8 py-3 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-300 hover:text-gray-800 hover:drop-shadow-xl sm:mt-0 sm:ml-4 lg:px-10"
              target="_blank">
              Lihat Semua Embedding File
            </Link>
          </div>
          <img
            src={decoratorBlob1}
            alt="decorate-2"
            className="pointer-events-none absolute left-20 bottom-0 z-10 h-64 w-64 -translate-x-2/3 transform opacity-5"
          />
        </div>
      ) : (
        <div className="container mx-auto px-6 pt-10 pb-20 md:px-10 md:py-16">
          <div className="flex max-w-screen-xl flex-col md:items-center lg:flex-row">
            <div className="relative flex-shrink-0 text-center lg:w-6/12 lg:pr-12 lg:text-left">
              <h1 className="max-w-3xl text-3xl font-black leading-snug text-primary-soft-violet md:text-3xl">
                Mengecek Kesamaan & Mengubah Materi Kuliah Menjadi
                <span className="inline-block -skew-x-12 transform bg-primary-500 px-4 py-2 text-sm text-gray-100 md:text-xl">
                  Korpus dan Word2vec
                </span>
              </h1>
              <p className="my-5 mx-auto max-w-lg text-sm font-medium text-secondary-100 lg:my-4 lg:mx-0 lg:text-base">
                Website ini menyediakan pengubahan materi kuliah menjadi korpus dan word2vec &
                mengecek kesamaan antara kunci jawaban dan jawaban mahasiswa.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center text-center transition duration-300 sm:flex-row lg:justify-start">
                <Link
                  to="/login"
                  className="rounded-full bg-primary-500 px-8 py-3 font-bold text-gray-100 transition-all duration-300 hover:bg-primary-700 hover:drop-shadow-xl lg:px-10">
                  Coba Sekarang
                </Link>
                <Link
                  to="/w2v/all"
                  className="mt-4 rounded-full bg-gray-200 px-8 py-3 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-300 hover:text-gray-800 hover:drop-shadow-xl sm:mt-0 sm:ml-4 lg:px-10"
                  target="_blank">
                  Lihat Semua Embedding File
                </Link>
              </div>
            </div>
            <div className="relative mt-12 flex flex-col justify-center lg:mt-0">
              <div className="relative flex max-w-3xl items-center justify-center md:justify-end lg:max-w-none">
                <img src={heroImage} alt="hero-image" className="rounded-4xl z-20" />
                {imageDecoratorBlob && (
                  <img
                    src={decoratorBlob2}
                    alt="decorate-1"
                    className="pointer-events-none absolute right-0 bottom-0 z-10 h-32 w-32 translate-x-10 translate-y-10 transform fill-current text-primary-500 opacity-25"
                  />
                )}
              </div>
            </div>
          </div>
          <img
            src={decoratorBlob1}
            alt="decorate-2"
            className="pointer-events-none absolute left-20 bottom-0 z-10 h-64 w-64 -translate-x-2/3 transform opacity-5"
          />
        </div>
      )}
    </div>
  );
};

export default Hero;
