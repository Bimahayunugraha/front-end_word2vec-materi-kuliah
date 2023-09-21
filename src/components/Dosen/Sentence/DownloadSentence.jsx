import React, { useEffect, useState } from "react";
import SentenceAPI from "../../../apis/sentence.api";
import fileDownload from "js-file-download";
import { Link, useParams } from "react-router-dom";
import { backButton, downloadButton } from "../../../utils/globalVariable";
import { Helmet } from "react-helmet";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { formatFileSize } from "../../../utils/formatFileSize";

const INITIAL_LIST_SENTENCE = {
  data: [],
  status: false,
};

const DownloadSentence = () => {
  const { id } = useParams();
  const [listSentence, setListSentence] = useState(INITIAL_LIST_SENTENCE);

  useEffect(() => {
    SentenceAPI.getFileSenteceById(id).then((result) =>
      setListSentence({ data: result.data.payload, status: true })
    );
  }, []);

  const handleDownload = async (id, name, mimetype) => {
    SentenceAPI.downloadSentence(id).then((res) => {
      fileDownload(res.data, name, mimetype);
      const Toast = Swal.mixin({
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
    <div className="mx-auto lg:container">
      <Helmet>
        <title>{`Download Sentence | ${listSentence.data.name} - Word2vec Mata Kuliah`}</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="text-center">
        <h1 className="text-xl font-semibold tracking-wide text-secondary-green md:text-2xl">
          File Berhasil Dikonversi
        </h1>
        <p className="text-xs font-normal text-neutral-40 md:text-sm">
          Unduh file Anda yang telah dikonversi
        </p>
      </div>
      <div className="pt-6 pb-6">
        <div className="shadow-7 md:rounded-xl">
          {listSentence.status ? (
            <div className="w-full bg-white px-10 py-4 drop-shadow-md md:rounded-t-xl">
              <div className="hidden flex-col md:flex-row md:items-center lg:flex">
                <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-blue-100 text-sm text-secondary-navy">
                  <i className="fa-regular fa-file-lines"></i>
                </div>
                <div className="min-w-0 flex-1 flex-col items-center">
                  <span className="text-xs font-medium text-neutral-100-2 md:text-sm">
                    {listSentence.data.name}
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
                      {formatFileSize(listSentence.data.file_size)} |{" "}
                    </span>
                    <span className="text-sm text-secondary-green md:text-base">
                      {listSentence.data.file_mimetype}
                    </span>
                  </p>
                </div>
                <div className="inline-flex items-center space-x-2">
                  <button
                    type="button"
                    className={`inline-block ${downloadButton}`}
                    onClick={() => {
                      handleDownload(
                        id,
                        listSentence.data.name,
                        listSentence.data.file_mimetype,
                        listSentence.data.file_path
                      );
                    }}>
                    <i className="fa-light fa-download"></i>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between lg:hidden">
                <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-blue-100 text-sm text-secondary-navy">
                  <i className="fa-regular fa-file-lines"></i>
                </div>
                <div className="min-w-0 flex-1 flex-col items-center">
                  <span className="text-xs font-medium text-neutral-100-2 md:text-sm">
                    {listSentence.data.name}
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
                      {formatFileSize(listSentence.data.file_size)} |{" "}
                    </span>
                    <span className="text-sm text-secondary-green md:text-base">
                      {listSentence.data.file_mimetype}
                    </span>
                  </p>
                </div>
                <div className="inline-flex items-center space-x-2">
                  <button
                    type="button"
                    className={`inline-block ${downloadButton}`}
                    onClick={() => {
                      handleDownload(
                        id,
                        listSentence.data.name,
                        listSentence.data.file_mimetype,
                        listSentence.data.file_path
                      );
                    }}>
                    <i className="fa-light fa-download"></i>
                  </button>
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
              File akan disimpan dan dapat didownload dalam waktu 24 jam, klik{" "}
              <Link
                to="/filelist/sentence"
                className="text-primary-300 hover:border-b hover:border-primary-400">
                File Saya{" "}
              </Link>
              untuk melihat file yang telah dikonversi.
            </h4>
          </div>
          <div className="converter-wrapper flex justify-center px-10 pt-4 pb-4 md:rounded-b-xl">
            <Link to="/sentence" className={backButton}>
              Konversi lagi ke sentence
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

export default DownloadSentence;
