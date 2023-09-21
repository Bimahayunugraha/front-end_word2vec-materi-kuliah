import React from "react";
import examIcon from "../../../assets/img/png/exam-icon.png";
import { Link } from "react-router-dom";

const SimilarityResultListItem = ({ data }) => {
  return (
    <Link
      to={`/similarity-result/detail/${data}`}
      className="group h-auto rounded-xl bg-white p-4 shadow-4 transition-all duration-300 ease-in-out hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <img src={examIcon} alt="exam-icon" className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-brand-primary text-sm font-semibold tracking-normal text-neutral-100-2 transition-all duration-300 group-hover:text-primary-violet">
            <span className="link-underline link-underline-blue">{data}</span>
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default SimilarityResultListItem;
