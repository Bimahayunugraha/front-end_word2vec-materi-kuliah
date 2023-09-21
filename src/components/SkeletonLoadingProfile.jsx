import React from "react";

const SkeletonLoadingProfile = () => {
  return (
    <div>
      <div className="mx-auto w-full max-w-sm rounded-lg bg-skeleton bg-opacity-10 px-4">
        <div className="flex justify-end px-4 pt-4">
          <div className="group relative">
            <div className="inline-flex flex-shrink-0 animate-pulse items-center justify-center rounded-full bg-skeleton">
              <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <div className="relative mb-3">
            <div className="flex h-32 w-32 animate-pulse items-center justify-center rounded-full bg-skeleton bg-opacity-50 shadow-lg">
              <i className="fa-light fa-user text-4xl text-gray-50"></i>
            </div>

            <div className="absolute bottom-0 right-0 flex items-center justify-center">
              <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-skeleton">
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>
          <h5 className="mb-2 w-48 animate-pulse rounded-xl bg-skeleton py-3"></h5>
          <span className="w-28 animate-pulse rounded-xl bg-skeleton py-2"></span>
          <div className="mt-4 grid grid-cols-1 gap-3 md:mt-6 md:grid-cols-1">
            <div className="mx-4 flex items-center justify-center">
              <span className="text-gray-400"></span>
              <p className="w-36 animate-pulse rounded-xl bg-skeleton py-1.5"></p>
            </div>
            <div className="mx-4 flex items-center justify-center">
              <span className="text-gray-400"></span>
              <p className="w-32 animate-pulse rounded-xl bg-skeleton py-1.5"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingProfile;
