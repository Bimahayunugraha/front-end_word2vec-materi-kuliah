import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import { formatFileSize } from "../../../utils/formatFileSize";
import { backButton, downloadButton } from "../../../utils/globalVariable";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import Word2vecAPI from "../../../apis/word2vec.api";

const Initial_Word2vec_Without_Content_File_By_Id = {
  data: [],
  status: false,
};

const DownloadWord2vec = () => {
  const [word2vecWithoutContentFileById, setWord2vecWithoutContentFileById] = useState(
    Initial_Word2vec_Without_Content_File_By_Id
  );
  const { id, course } = useParams();

  const loaderSubmit = useSelector((state) => state.loaderSubmit);

  const dispatch = useDispatch();

  useEffect(() => {
    Word2vecAPI.getFileWord2vecByIdWithoutContentFile(course, id).then((result) => {
      setWord2vecWithoutContentFileById({ status: true, data: result.data.payload });
    });
  }, []);

  const handleDownload = async () => {
    dispatch(setLoaderSubmit(true));

    Word2vecAPI.downloadWord2vec(id).then((res) => {
      const fileName = word2vecWithoutContentFileById.data.out_name;
      const blob = new Blob([res.data], { type: "text/plain" });
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
        title: "File word2vec berhasil didownload",
      });

      dispatch(setLoaderSubmit(false));
    });
  };

  return (
    <div className="mx-auto lg:container">
      {word2vecWithoutContentFileById.data.conversion_type === "word2vec" && (
        <Helmet>
          <title>{`Download Word2vec - ${word2vecWithoutContentFileById.data.out_name} - Word2vec Mata Kuliah`}</title>
          <meta name="website" content="Word2vec Mata Kuliah" />
        </Helmet>
      )}
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-wide text-secondary-green md:text-2xl">
          File Berhasil Dikonversi Menjadi Word2vec
        </h1>
        <p className="text-xs font-normal text-neutral-40 md:text-sm">
          Unduh file Anda yang telah dikonversi
        </p>
      </div>
      <div className="pt-6 pb-6">
        <div className="shadow-7 md:rounded-xl">
          {word2vecWithoutContentFileById.status ? (
            <div className="w-full bg-white px-10 py-4 drop-shadow-md md:rounded-t-xl">
              <div className="mb-3 hidden lg:flex lg:items-center">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500"></span>
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  {word2vecWithoutContentFileById.data.course} •{" "}
                  {word2vecWithoutContentFileById.data.book_title}
                </span>
              </div>
              <div className="hidden flex-col md:flex-row md:items-center lg:flex">
                <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-blue-100 text-sm text-secondary-navy">
                  <i className="fa-regular fa-file-lines"></i>
                </div>
                <div className="min-w-0 flex-1 flex-col items-center">
                  <span className="text-xs font-medium text-neutral-100-2 md:text-sm">
                    {word2vecWithoutContentFileById.data.out_name}
                  </span>
                </div>
                <div className="inline-flex items-center">
                  <div className="ml-2 grid grid-cols-4">
                    <h4 className="rounded-10 border border-primary-100 px-2 py-1 text-sm font-normal text-primary-200">
                      Selesai
                    </h4>
                  </div>
                </div>
                <div className="mr-4 inline-flex items-center md:mr-10">
                  <p className="font-medium">
                    <span className="text-xs text-neutral-80 md:text-sm">
                      {formatFileSize(word2vecWithoutContentFileById.data.out_file_size)} |{" "}
                    </span>
                    <span className="text-xs text-neutral-60 md:text-sm">
                      {word2vecWithoutContentFileById.data.conversion_type} |{" "}
                    </span>
                    <span className="text-sm text-secondary-green md:text-base">
                      {word2vecWithoutContentFileById.data.out_file_mimetype}
                    </span>
                  </p>
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
                      <i className="fa-light fa-download"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="mb-3 flex items-center lg:hidden">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  {word2vecWithoutContentFileById.data.course} •{" "}
                  {word2vecWithoutContentFileById.data.book_title}
                </span>
              </div>
              <div className="flex items-center justify-between lg:hidden">
                <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-blue-100 text-sm text-secondary-navy">
                  <i className="fa-regular fa-file-lines"></i>
                </div>
                <div className="min-w-0 flex-1 flex-col items-center">
                  <span className="text-xs font-medium text-neutral-100-2 md:text-sm">
                    {word2vecWithoutContentFileById.data.out_name}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 lg:hidden">
                <div className="inline-flex items-center">
                  <h4 className="rounded-10 border border-primary-100 px-2 py-1 text-sm font-normal text-primary-200">
                    Selesai
                  </h4>
                </div>
                <div className="mr-4 inline-flex items-center md:mr-10">
                  <p className="font-medium">
                    <span className="text-xs text-neutral-80 md:text-sm">
                      {formatFileSize(word2vecWithoutContentFileById.data.out_file_size)} |{" "}
                    </span>
                    <span className="text-xs text-neutral-60 md:text-sm">
                      {word2vecWithoutContentFileById.data.conversion_type} |{" "}
                    </span>
                    <span className="text-sm text-secondary-green md:text-base">
                      {word2vecWithoutContentFileById.data.out_file_mimetype}
                    </span>
                  </p>
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
                      <i className="fa-light fa-download"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="my-0 mx-auto flex items-center justify-center py-3 px-6">
              <PulseLoader size={10} color="#6FCBFD" />
            </div>
          )}
          <div className="bg-secondary-soft-white py-5 px-10">
            <h4 className="text-center text-xs text-neutral-60 md:text-sm">
              File akan disimpan, klik{" "}
              {word2vecWithoutContentFileById.data.conversion_type === "word2vec" && (
                <Link
                  to="/filelist/word2vec/file"
                  className="text-primary-300 hover:border-b hover:border-primary-400">
                  File Saya{" "}
                </Link>
              )}
              untuk melihat file yang telah dikonversi.
            </h4>
          </div>
          <div className="converter-wrapper flex justify-center px-10 pt-4 pb-4 md:rounded-b-xl">
            <Link to="/vector" className={backButton}>
              Konversi lagi ke word2vec
              <span className="ml-3">
                <i className="fa-light fa-arrow-rotate-left"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadWord2vec;
