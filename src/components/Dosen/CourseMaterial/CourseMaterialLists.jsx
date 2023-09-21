import React from "react";
import { PulseLoader } from "react-spinners";
import Tabs from "../Tabs";
import CourseMaterialListItem from "./CourseMaterialListItem";
import useCourseMaterial from "../../../hooks/CourseMaterial/useCourseMaterial";

const CourseMaterialLists = () => {
  const { dataCourseMaterialFiles, loadingCourseMaterialFiles } = useCourseMaterial();

  const courseMaterialLists = Array.from(
    new Set(dataCourseMaterialFiles?.map((value) => value.course))
  );

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
            {loadingCourseMaterialFiles ? (
              <div className="my-0 mx-auto flex items-center justify-center py-4 px-6">
                <PulseLoader size={10} color="#6FCBFD" />
              </div>
            ) : (
              <div>
                {dataCourseMaterialFiles?.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto">
                    {courseMaterialLists?.map((item, index) => {
                      return <CourseMaterialListItem key={index} data={item} />;
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-center py-6 text-xs font-semibold leading-7 text-neutral-80">
                    <i className="fi fi-rr-info mr-3 text-sm"></i>
                    Data file materi mata kuliah tidak ditemukan
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

export default CourseMaterialLists;
