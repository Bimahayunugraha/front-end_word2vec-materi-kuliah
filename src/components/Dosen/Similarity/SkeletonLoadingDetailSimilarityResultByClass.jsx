import React from "react";

const SkeletonLoadingDetailSimilarityResultByClass = () => {
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
          <div className="py-4 px-6">
            <table className="flex-no-wrap flex w-full flex-row overflow-hidden rounded-lg">
              <thead className="text-white">
                <tr className="mb-2 flex animate-pulse flex-col flex-nowrap rounded-l-lg border bg-skeleton bg-opacity-10 text-sm text-primary-violet sm:mb-0 sm:table-row sm:rounded-none">
                  <th className="w-10 animate-pulse bg-skeleton p-3 text-left">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </th>
                  <th className="w-10 animate-pulse bg-skeleton p-3 text-left">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </th>
                  <th className="w-10 animate-pulse bg-skeleton p-3 text-left">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </th>
                  <th className="w-10 animate-pulse bg-skeleton p-3 text-left">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </th>
                </tr>
              </thead>

              <tbody className="flex-1 sm:flex-none">
                <tr className="mb-2 flex flex-col flex-nowrap border text-sm sm:mb-0 sm:table-row sm:border-b">
                  <td className="w-10 animate-pulse p-3 text-neutral-100-2">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </td>
                  <td className="w-10 animate-pulse truncate p-3 text-neutral-100-2">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </td>
                  <td className="w-10 animate-pulse truncate p-3 text-neutral-100-2">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </td>
                  <td className="relative w-10 animate-pulse p-3 font-medium">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </td>
                </tr>
                <tr className="mb-2 flex flex-col flex-nowrap border text-sm sm:mb-0 sm:table-row sm:border-b">
                  <td className="w-10 animate-pulse p-3 text-neutral-100-2">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </td>
                  <td className="w-10 animate-pulse truncate p-3 text-neutral-100-2">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </td>
                  <td className="w-10 animate-pulse truncate p-3 text-neutral-100-2">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </td>
                  <td className="relative w-10 animate-pulse p-3 font-medium">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </td>
                </tr>
                <tr className="mb-2 flex flex-col flex-nowrap border text-sm sm:mb-0 sm:table-row sm:border-b">
                  <td className="w-10 animate-pulse p-3 text-neutral-100-2">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </td>
                  <td className="w-10 animate-pulse truncate p-3 text-neutral-100-2">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </td>
                  <td className="w-10 animate-pulse truncate p-3 text-neutral-100-2">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </td>
                  <td className="relative w-10 animate-pulse p-3 font-medium">
                    <div className="animate-pulse rounded-xl bg-gray-300 py-2"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingDetailSimilarityResultByClass;
