import { saveAs } from "file-saver";
import React from "react";
import Swal from "sweetalert2";
import { formatFileSize } from "../../../utils/formatFileSize";
import { downloadButton } from "../../../utils/globalVariable";
import CourseMaterialAPI from "../../../apis/courseMaterial.api";
import { PulseLoader } from "react-spinners";
import { useSelector } from "react-redux";

const CourseMaterialListItemByCourse = ({ data }) => {
  const { id, name, file_mimetype, file_size, file_url } = data;
  const loaderSubmit = useSelector((state) => state.loaderSubmit);

  const handleDownload = () => {
    CourseMaterialAPI.downloadCourseMaterialFile(id).then((res) => {
      const fileName = name;
      const blob = new Blob([res.data]);
      saveAs(blob, fileName);

      const Toast = Swal.mixin({
        customClass: {
          title: "text-green-700",
        },
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "File berhasil didownload",
      });
    });
  };

  return (
    <div>
      <div className="hidden flex-col border-b border-gray-200 py-3 px-4 hover:bg-gray-50 md:flex-row md:items-center lg:flex">
        <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-green-200 text-sm text-secondary-green">
          {file_mimetype === ".pdf" ? (
            <i className="fa-regular fa-file-pdf"></i>
          ) : (
            <i className="fa-regular fa-file-word"></i>
          )}
        </div>
        <div className="min-w-0 flex-1 flex-col items-center">
          <a
            href={file_url}
            className="border-b border-transparent text-xs font-medium text-neutral-100-2 transition-all duration-300 hover:border-primary-400 md:text-sm"
            target="_blank"
            rel="noreferrer"
            title={name}>
            {name}
          </a>
        </div>
        <div>
          <div className="mr-4 inline-flex items-center text-left font-medium md:mr-10 lg:w-32">
            <span className="text-xs text-neutral-80 md:text-sm">
              {formatFileSize(file_size)} |
            </span>
            <span className="ml-1 text-sm text-secondary-green md:text-base">{file_mimetype}</span>
          </div>
          <div className="inline-flex items-center space-x-6">
            {loaderSubmit ? (
              <button
                type="button"
                className={`inline-block ${downloadButton}`}
                onClick={handleDownload}>
                <PulseLoader size={3} color={"#ffffff"} />
              </button>
            ) : (
              <button
                type="button"
                className={`inline-block ${downloadButton}`}
                onClick={handleDownload}
                title="Unduh File">
                <i className="fa-light fa-download"></i>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 py-3 px-6 lg:border-none lg:px-0 lg:py-0">
        <div className="flex items-center justify-between lg:hidden">
          <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-green-200 text-sm text-secondary-green">
            <i className="fa-regular fa-file-pdf"></i>
          </div>
          <div className="min-w-0 flex-1 flex-col items-center">
            <a
              href={file_url}
              className="border-b border-transparent text-xs font-medium text-neutral-100-2 transition-all duration-300 hover:border-primary-400 md:text-sm"
              target="_blank"
              rel="noreferrer"
              title={name}>
              {name}
            </a>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 lg:hidden">
          <div className="mr-4 inline-flex items-center text-left font-medium md:mr-10 lg:w-32">
            <span className="text-xs text-neutral-80 md:text-sm">
              {formatFileSize(file_size)} |{" "}
            </span>
            <span className="ml-1 text-sm text-secondary-green md:text-base">{file_mimetype}</span>
          </div>
          <div className="inline-flex items-center space-x-2">
            {loaderSubmit ? (
              <button
                type="button"
                className={`inline-block ${downloadButton}`}
                onClick={handleDownload}>
                <PulseLoader size={3} color={"#ffffff"} />
              </button>
            ) : (
              <button
                type="button"
                className={`inline-block ${downloadButton}`}
                onClick={handleDownload}>
                <i className="fa-light fa-download" title="Unduh File"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMaterialListItemByCourse;
