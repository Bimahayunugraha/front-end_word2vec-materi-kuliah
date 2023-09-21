import React from "react";

const SkeletonLoadingDetailSimilarityResultByColleger = () => {
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
          <div className="flex items-center space-x-3 border-b border-gray-200 bg-blue-50 py-3 px-6">
            <div className="w-56 min-w-0 animate-pulse rounded-xl bg-skeleton py-2">
              <p className="text-sm font-medium text-neutral-100-2"></p>
            </div>
          </div>
          <div className="py-4 px-6">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="leading-6 text-gray-900 sm:col-span-2 ">
                  <h4 className="mb-2 w-32 animate-pulse rounded-xl bg-skeleton py-2.5 text-base font-semibold md:text-lg"></h4>
                  <h5 className="mt-4 w-20 animate-pulse rounded-xl bg-skeleton py-2 text-sm font-medium underline md:text-base"></h5>
                  <p className="mt-3 h-32 w-full animate-pulse whitespace-pre-line break-words rounded-xl bg-skeleton py-2 text-justify text-xs md:text-sm"></p>
                </dt>
                <dd className="mt-4 text-sm font-medium leading-6 text-gray-700 sm:mt-0">
                  <h4 className="mb-2 w-32 animate-pulse rounded-xl bg-skeleton py-2.5 text-base font-semibold md:text-lg"></h4>
                  <p className="w-52 animate-pulse rounded-xl bg-skeleton py-2 text-base font-medium"></p>
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="leading-6 text-gray-900 sm:col-span-2 ">
                  <h4 className="mb-2 w-32 animate-pulse rounded-xl bg-skeleton py-2.5 text-base font-semibold md:text-lg"></h4>
                  <h5 className="mt-4 w-20 animate-pulse rounded-xl bg-skeleton py-2 text-sm font-medium underline md:text-base"></h5>
                  <p className="mt-3 h-32 w-full animate-pulse whitespace-pre-line break-words rounded-xl bg-skeleton py-2 text-justify text-xs md:text-sm"></p>
                </dt>
                <dd className="mt-4 text-sm font-medium leading-6 text-gray-700 sm:mt-0">
                  <h4 className="mb-2 w-32 animate-pulse rounded-xl bg-skeleton py-2.5 text-base font-semibold md:text-lg"></h4>
                  <p className="w-52 animate-pulse rounded-xl bg-skeleton py-2 text-base font-medium"></p>
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="leading-6 text-gray-900 sm:col-span-2 ">
                  <h4 className="mb-2 w-32 animate-pulse rounded-xl bg-skeleton py-2.5 text-base font-semibold md:text-lg"></h4>
                  <h5 className="mt-4 w-20 animate-pulse rounded-xl bg-skeleton py-2 text-sm font-medium underline md:text-base"></h5>
                  <p className="mt-3 h-32 w-full animate-pulse whitespace-pre-line break-words rounded-xl bg-skeleton py-2 text-justify text-xs md:text-sm"></p>
                </dt>
                <dd className="mt-4 text-sm font-medium leading-6 text-gray-700 sm:mt-0">
                  <h4 className="mb-2 w-32 animate-pulse rounded-xl bg-skeleton py-2.5 text-base font-semibold md:text-lg"></h4>
                  <p className="w-52 animate-pulse rounded-xl bg-skeleton py-2 text-base font-medium"></p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingDetailSimilarityResultByColleger;
