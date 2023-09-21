import React from "react";

const SkeletonLoadingSimilarityResultLists = () => {
  return (
    <div className="group h-auto rounded-xl bg-skeleton bg-opacity-10 p-4 transition-all duration-300 ease-in-out">
      <div className="flex items-center space-x-4">
        <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-skeleton">
          <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300"></div>
        </div>
        <div className="w-32 min-w-0 flex-1 animate-pulse rounded-xl bg-skeleton py-2">
          <h2 className="text-sm font-semibold tracking-normal text-neutral-100-2 transition-all duration-300"></h2>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingSimilarityResultLists;
