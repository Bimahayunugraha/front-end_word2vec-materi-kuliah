import React from "react";

const SkeletonLoadingDetailSimilarityResultByExam = () => {
  return (
    <div>
      <div className="z-10 mt-4 w-full px-0 md:mt-8 md:px-0">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <div className="inline-flex w-56 animate-pulse items-center rounded-xl border-b border-transparent bg-skeleton py-3 text-sm font-medium"></div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="pt-2 pb-16">
        <div className="mt-3 w-full animate-pulse rounded-md border border-gray-200 bg-white">
          <div className="flex items-center space-x-3 border-b border-gray-200 bg-gray-50 py-3 px-6">
            <div className="w-32 min-w-0 animate-pulse rounded-xl bg-skeleton py-2">
              <p className="text-sm font-medium text-neutral-100-2"></p>
            </div>
          </div>
          <div className="flex items-center py-4 px-6 transition-all duration-300 ease-in-out">
            <span className="relative flex h-5 w-5">
              <span className="inline-flex h-full w-full animate-pulse rounded-full bg-gray-300 opacity-75"></span>
            </span>
            <span className="ml-4 w-32 animate-pulse rounded-xl bg-skeleton py-2">
              <p className="text-base font-medium text-gray-900"></p>
            </span>
          </div>
        </div>
        <div className="mt-3 w-full animate-pulse rounded-md border border-gray-200 bg-white">
          <div className="flex items-center space-x-3 border-b border-gray-200 bg-blue-50 py-3 px-6">
            <div className="w-56 min-w-0 animate-pulse rounded-xl bg-skeleton py-2">
              <p className="text-sm font-medium text-neutral-100-2"></p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 py-4 px-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="group relative z-[3] h-full w-full animate-pulse rounded-lg bg-skeleton bg-opacity-30 bg-cover bg-no-repeat p-6 hover:shadow-4">
              <div className="z-[1] flex flex-col items-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-skeleton">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
                </div>
                <div className="w-14 animate-pulse rounded-xl bg-skeleton py-2 text-lg font-semibold text-neutral-100-2 md:text-xl"></div>
              </div>
            </div>
            <div className="group relative z-[3] h-full w-full animate-pulse rounded-lg bg-skeleton bg-opacity-30 bg-cover bg-no-repeat p-6 hover:shadow-4">
              <div className="z-[1] flex flex-col items-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-skeleton">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
                </div>
                <div className="w-14 animate-pulse rounded-xl bg-skeleton py-2 text-lg font-semibold text-neutral-100-2 md:text-xl"></div>
              </div>
            </div>
            <div className="group relative z-[3] h-full w-full animate-pulse rounded-lg bg-skeleton bg-opacity-30 bg-cover bg-no-repeat p-6 hover:shadow-4">
              <div className="z-[1] flex flex-col items-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-skeleton">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
                </div>
                <div className="w-14 animate-pulse rounded-xl bg-skeleton py-2 text-lg font-semibold text-neutral-100-2 md:text-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingDetailSimilarityResultByExam;
