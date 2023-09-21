import React from "react";

const SkeletonLoadingSearchAllEmbeddingFile = () => {
  return (
    <div className="h-full w-full animate-pulse border border-gray-200 bg-white px-6 py-4 shadow-md md:rounded-20">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center transition-all duration-300 ease-in-out">
          <span className="w-56 animate-pulse rounded-xl bg-skeleton py-2">
            <p className="text-base font-medium text-gray-900"></p>
          </span>
        </div>
        <div className="inline-flex items-center">
          <div className="h-6 w-6 animate-pulse rounded-full bg-skeleton transition-all duration-300 ease-in-out"></div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="inline-flex h-7 w-7 animate-pulse items-center justify-center rounded-full bg-skeleton">
          <span className="text-sm text-gray-50">
            <i className="fa-regular fa-user"></i>
          </span>
        </div>

        <div className="w-28 min-w-0 animate-pulse rounded-xl bg-skeleton py-2">
          <p className="text-sm font-medium text-neutral-100-2"></p>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingSearchAllEmbeddingFile;
