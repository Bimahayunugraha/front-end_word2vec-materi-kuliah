import React from "react";
import { Link } from "react-router-dom";

const FilterAllEmbeddingFileListItem = ({ data }) => {
  const { id, course, book_title, out_name, out_file_url, conversion_type, user } = data;

  return (
    <div className="mb-3 h-full w-full border border-gray-200 bg-white px-6 py-4 shadow-4 md:rounded-20">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex flex-wrap items-center">
          <span className="text-xs text-gray-600 lg:text-sm">
            <span className="mr-3 inline-flex items-center justify-center sm:mr-0">
              <i className="fa-solid fa-lines-leaning mr-2"></i>
              {course}
            </span>
            <span className="mr-3 inline-flex items-center justify-center sm:ml-3 sm:mr-0">
              <i className="fa-solid fa-book mr-2"></i> {book_title}
            </span>
            <span className="mt-2 inline-flex items-center justify-center sm:ml-3 sm:mt-0">
              <i className="fa-solid fa-shapes mr-2"></i> {conversion_type}
            </span>
          </span>
        </div>
        <div className="inline-flex items-center">
          <div className="group relative">
            <Link
              to={`/w2v/all/detail?course=${course}&id=${id}`}
              className="text-base font-medium text-secondary-green transition-all duration-300 ease-in-out hover:text-blue-600 focus:border-gray-400 focus:text-blue-400">
              <i className="fa-solid fa-circle-info"></i>
            </Link>
            <div className="absolute top-0 left-0 right-0 mt-5 mr-1 hidden flex-col items-center tracking-wider shadow-2xl md:-top-4 md:mt-10 lg:group-hover:flex">
              <span className="relative z-10 rounded-lg bg-neutral-40 p-2 text-[10px] leading-tight text-white">
                Detail
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-1">
        <div className="relative inline-flex w-full items-center">
          <img
            className="h-7 w-7 rounded-full bg-gray-100 object-cover object-center p-0.5 ring-2 ring-gray-300"
            src={user.profile_image.image_url}
            alt={user.profile_image.image_name}
          />

          <span className="ml-3 min-w-0 flex-1 text-sm font-medium text-neutral-100-2">
            {user.name}
          </span>
        </div>
        <div className="relative mt-2 inline-flex w-full items-center">
          <i className="fa-regular fa-file-lines flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm text-secondary-navy"></i>

          <span className="ml-3">
            <a
              href={out_file_url}
              target="_blank"
              rel="nonreferrer noreferrer"
              className="min-w-0 flex-1 flex-col items-center transition-all duration-300 hover:border-b hover:border-primary-violet">
              <h4 className="text-xs font-medium text-neutral-100-2 transition-all duration-300 hover:border-b hover:border-primary-violet hover:text-primary-violet md:text-sm">
                {out_name}
              </h4>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterAllEmbeddingFileListItem;
