import React from "react";

const SkeletonLoadingManageRole = () => {
  return (
    <div className="w-full animate-pulse rounded-xl bg-skeleton bg-opacity-10 shadow-4">
      <div>
        <div className="hidden flex-col rounded-xl border-b border-gray-200 px-6 py-3 md:flex-row md:items-center lg:flex">
          <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] animate-pulse items-center justify-center rounded-full bg-skeleton text-sm text-secondary-navy">
            <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300"></div>
          </div>
          <div className="min-w-0 flex-1 flex-col items-center">
            <p className="w-16 animate-pulse rounded-10 bg-skeleton py-2 text-xs font-medium text-neutral-100-2 transition-all duration-300 md:text-sm"></p>
          </div>
          <div>
            <div className="inline-flex items-center space-x-6">
              <div className="animate-pulse rounded-10 bg-skeleton px-3 py-2 text-skeleton md:px-3 md:py-2">
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300"></div>
              </div>
              <div className="animate-pulse rounded-10 bg-skeleton px-3 py-2 text-skeleton md:px-3 md:py-2">
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200 px-6 py-3 lg:border-none lg:px-0 lg:py-0">
          <div className="flex items-center justify-between lg:hidden">
            <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] animate-pulse items-center justify-center rounded-full bg-skeleton text-sm text-secondary-navy">
              <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300"></div>
            </div>
            <div className="min-w-0 flex-1 flex-col items-center">
              <p className="w-16 animate-pulse rounded-10 bg-skeleton py-2 text-xs font-medium text-neutral-100-2 transition-all duration-300 md:text-sm"></p>
            </div>
            <div className="inline-flex items-center space-x-6">
              <div className="animate-pulse rounded-10 bg-skeleton px-3 py-2 text-skeleton md:px-3 md:py-2">
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300"></div>
              </div>
              <div className="animate-pulse rounded-10 bg-skeleton px-3 py-2 text-skeleton md:px-3 md:py-2">
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingManageRole;
