import React from "react";
import { Link } from "react-router-dom";

const SkeletonLoadingEditCorpusFileContent = () => {
  return (
    <div>
      <div className="z-10 mt-4 w-full px-4 md:mt-8 md:px-0">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/w2v"
                className="inline-flex w-48 animate-pulse items-center rounded-xl border-b border-transparent bg-skeleton py-3 text-sm font-medium"></Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="border-b-2 border-gray-200 py-2"></div>
      <div className="pt-2 pb-16">
        <div className="mt-3 w-full animate-pulse rounded-md border border-gray-200 bg-white">
          <div className="flex items-center space-x-3 border-b border-gray-200 bg-blue-50 py-3 px-6">
            <div className="w-56 min-w-0 animate-pulse rounded-xl bg-skeleton py-2">
              <p className="text-sm font-medium text-neutral-100-2"></p>
            </div>
          </div>
          <div className="flex h-[90vh] w-full items-center overflow-y-auto py-4 px-6">
            <div className="h-full w-full">
              <div className="h-full w-full animate-pulse rounded-xl bg-skeleton py-2 px-6">
                <span className="break-all text-justify"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingEditCorpusFileContent;
