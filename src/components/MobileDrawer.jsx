import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MobileDrawer = ({
  mobileNavbarTrigger,
  handleMobileNavbarTrigger,
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-white",
}) => {
  const [activeLink, setActiveLink] = useState([]);
  const location = useLocation();
  let alignmentClasses = "origin-top";

  if (align === "left") {
    alignmentClasses = "origin-top-left left-0";
  } else if (align === "right") {
    alignmentClasses = "origin-top-right right-0 bottom-0";
  }

  let widthClasses = "";

  if (width === "48") {
    widthClasses = "w-48";
  }

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    function disableScroll() {
      document.body.style.overflow = "hidden";
    }
    function enableScroll() {
      document.body.style.overflow = "auto";
    }

    if (mobileNavbarTrigger) {
      disableScroll();
    } else {
      enableScroll();
    }
    return () => {
      enableScroll();
    };
  }, [mobileNavbarTrigger]);

  return (
    <div className="relative block lg:hidden">
      <div
        className={
          mobileNavbarTrigger
            ? "pointer-events-auto fixed inset-0 z-40 transition-opacity duration-300 ease-linear"
            : "pointer-events-none fixed inset-0 z-40 transition-opacity duration-300 ease-linear"
        }
        onClick={handleMobileNavbarTrigger}></div>
      <div
        className={
          mobileNavbarTrigger
            ? `fixed bottom-2 z-40 mt-2 mb-16 mr-2 translate-y-0 transform overflow-hidden rounded-md shadow-4 duration-300 ease-in-out ${alignmentClasses} ${widthClasses}`
            : `fixed bottom-0 z-40 mt-2 mb-16 mr-2 translate-y-full transform overflow-hidden rounded-md shadow-4 duration-300 ease-in-out ${alignmentClasses} ${widthClasses}`
        }>
        <div className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>
          <Link
            to="/filelist/course-material/file"
            className={
              activeLink === "/filelist/course-material/file" ||
              activeLink === "/filelist/corpus/file" ||
              activeLink === "/filelist/word2vec/file"
                ? "relative inline-flex w-full items-center bg-primary-violet bg-opacity-10 px-4 py-3 text-left text-sm leading-5 text-primary-violet transition duration-300 ease-in-out hover:bg-primary-violet hover:bg-opacity-20 focus:bg-gray-50"
                : "relative inline-flex w-full items-center px-4 py-3 text-left text-sm leading-5 text-gray-700 transition duration-300 ease-in-out hover:bg-gray-50 focus:bg-gray-50"
            }
            onClick={handleMobileNavbarTrigger}>
            {activeLink === "/filelist/course-material/file" ||
            activeLink === "/filelist/corpus/file" ||
            activeLink === "/filelist/word2vec/file" ? (
              <i className="fa-solid fa-files flex h-4 w-4 items-center justify-center"></i>
            ) : (
              <i className="fa-light fa-files flex h-4 w-4 items-center justify-center"></i>
            )}
            <span className="ml-3">File Saya</span>
          </Link>
          <Link
            to="/similarity-result"
            className={
              activeLink === "/similarity-result"
                ? "relative inline-flex w-full items-center bg-primary-violet bg-opacity-10 px-4 py-3 text-left text-sm leading-5 text-primary-violet transition duration-300 ease-in-out hover:bg-primary-violet hover:bg-opacity-20 focus:bg-gray-50"
                : "relative inline-flex w-full items-center px-4 py-3 text-left text-sm leading-5 text-gray-700 transition duration-300 ease-in-out hover:bg-gray-50 focus:bg-gray-50"
            }
            onClick={handleMobileNavbarTrigger}>
            {activeLink === "/similarity-result" ? (
              <i className="fa-solid fa-arrow-up-arrow-down flex h-4 w-4 rotate-90 items-center justify-center"></i>
            ) : (
              <i className="fa-light fa-arrow-up-arrow-down flex h-4 w-4 rotate-90 items-center justify-center"></i>
            )}

            <span className="ml-3">Hasil Kesamaan</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
