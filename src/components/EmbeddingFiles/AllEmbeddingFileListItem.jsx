import React from "react";
import { Link } from "react-router-dom";

const AllEmbeddingFileListItem = ({ data }) => {
  const { id, course, book_title, out_name, out_file_url, user } = data;
  return (
    <div className="h-full w-full border border-gray-200 bg-white px-6 py-4 shadow-4 md:rounded-20">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
          <span className="ml-3 text-xs text-gray-600 lg:text-sm">
            <span className="inline-flex items-center justify-center">
              <i className="fa-solid fa-lines-leaning mr-2"></i>
              {course}
            </span>
            <span className="ml-3 inline-flex items-center justify-center">
              <i className="fa-solid fa-book mr-2"></i> {book_title}
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
              className="min-w-0 flex-1 flex-col items-center transition-all duration-300">
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

export default AllEmbeddingFileListItem;
