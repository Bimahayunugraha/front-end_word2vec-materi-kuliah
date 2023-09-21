import React from "react";
import { PulseLoader } from "react-spinners";
import useWord2vec from "../../../hooks/Word2vec/useWord2vec";
import Tabs from "../Tabs";
import Word2vecListItem from "./Word2vecListItem";

const Word2vecLists = () => {
  const { dataWord2vec, loadingWord2vec } = useWord2vec();

  const word2vecLists = Array.from(new Set(dataWord2vec?.map((value) => value.course)));

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
        <div className="bg-secondary-soft-white py-4"></div>
        <div className="w-full bg-white shadow-6 md:rounded-b-xl">
          <div>
            {loadingWord2vec ? (
              <div className="my-0 mx-auto flex items-center justify-center py-4 px-6">
                <PulseLoader size={10} color="#6FCBFD" />
              </div>
            ) : (
              <div>
                {dataWord2vec?.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto">
                    {word2vecLists.map((item, index) => {
                      return <Word2vecListItem key={index} data={item} />;
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-center py-6 text-xs font-semibold leading-7 text-neutral-80">
                    <i className="fi fi-rr-info mr-3 text-sm"></i>
                    Data file word2vec tidak ditemukan
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Word2vecLists;
