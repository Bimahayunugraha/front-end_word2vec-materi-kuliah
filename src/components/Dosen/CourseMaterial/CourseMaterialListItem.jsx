import React from "react";
import { Link } from "react-router-dom";

const CourseMaterialListItem = ({ data }) => {
  return (
    <div className="flex flex-row items-center border-b border-gray-200 py-3 px-6 hover:bg-gray-50">
      <div className="mr-3 inline-flex max-w-[48px] items-center justify-center text-sm text-secondary-green">
        <i className="fa-solid fa-folder"></i>
      </div>
      <div className="min-w-0 flex-1 flex-col items-center">
        <Link
          to={`/filelist/course-material/file/${data}`}
          className="border-b border-transparent text-xs font-medium text-neutral-100-2 transition-all duration-300 ease-in-out hover:border-neutral-80 hover:text-primary-violet md:text-sm">
          {data}
        </Link>
      </div>
    </div>
  );
};

export default CourseMaterialListItem;
