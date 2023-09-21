import React from "react";
import decorateBlob from "../assets/img/svg/svg-decorator-blob-3.svg";

const Features = () => {
  const featuresData = [
    {
      title: "Konversi Corpus",
      description: "Mengubah materi kuliah dengan format file pdf atau word menjadi korpus teks",
      icon: <i className="fa-regular fa-text-size inline text-xl"></i>,
    },
    {
      title: "Konversi Word2vec",
      description: "Mengubah korpus teks menjadi word2vec",
      icon: <i className="fa-regular fa-vector-circle inline text-xl"></i>,
    },
    {
      title: "Mengecek Kesamaan",
      description:
        "Mengecek kesamaan antara kunci jawaban dan jawaban mahasiswa menggunakan model word2vec",
      icon: <i className="fa-regular fa-arrow-up-arrow-down inline rotate-90 text-xl"></i>,
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto flex flex-col flex-wrap items-center px-6 pt-10 pb-20 md:flex-row md:items-stretch md:justify-center md:px-6 md:py-16">
        <span className="mb-4 font-bold uppercase tracking-widest text-primary-500">Fitur</span>
        <h2 className="w-full text-center text-3xl font-black tracking-wide text-primary-soft-violet sm:text-4xl md:text-4xl">
          Kami memiliki Fitur{" "}
          <span className="inline-block -skew-x-12 transform bg-primary-500 px-4 py-2 text-gray-100">
            Luar Biasa.
          </span>
        </h2>
        <p className="mt-4 w-full max-w-xl text-center text-sm font-medium leading-relaxed text-secondary-100 md:text-base lg:text-lg">
          Kami menyediakan sebuah fitur yang dapat membantu Anda dalam mengubah materi mata kuliah
          menjadi korpus dan word2vec & mengecek kesamaan antara kunci jawaban dan jawaban
          mahasiswa.
        </p>
        <div className="mt-10 w-full"></div>
        {featuresData.map((feature, index) => {
          return (
            <div className="w-full md:w-1/2 lg:w-1/2" key={index}>
              <div className="mx-4 flex h-full flex-col items-center justify-center px-2 py-8 text-center sm:flex-row sm:items-start sm:text-left">
                <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border p-5 text-center text-primary-700">
                  {feature.icon}
                </span>
                <span className="mt-4 sm:ml-4 sm:mt-2">
                  <span className="mt-4 text-2xl font-bold leading-none tracking-wide text-secondary-400">
                    {feature.title}
                  </span>
                  <p className="mt-1 font-medium leading-loose text-secondary-100 sm:mt-4">
                    {feature.description}
                  </p>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <img
        src={decorateBlob}
        alt="decorator"
        className="pointer-events-none absolute right-0 top-0 w-64 translate-x-32 -translate-y-12 transform opacity-25"
      />
    </div>
  );
};

export default Features;
