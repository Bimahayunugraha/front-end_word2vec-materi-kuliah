import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useQuery from "../../../hooks/useQuery";
import { editCorpusFileContent } from "../../../stores/features/corpusSlice";
import SkeletonLoadingEditCorpusFileContent from "./SkeletonLoadingEditCorpusFileContent";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import QuartenaryButton from "../../QuartenaryButton";
import PrimaryButton from "../../PrimaryButton";
import Breadcrumbs from "../../Breadcrumbs";
import CorpusAPI from "../../../apis/corpus.api";

const Initial_Corpus_With_Content_File_By_Id = {
  data: [],
  status: false,
};

const EditCorpus = () => {
  const [corpusWithContentFileById, setCorpusWithContentFileById] = useState(
    Initial_Corpus_With_Content_File_By_Id
  );
  const [fileContent, setFileContent] = useState("");

  const query = useQuery();
  const id = query.get("id");
  const course = query.get("course");
  const dispatch = useDispatch();
  const loaderSubmit = useSelector((state) => state.loaderSubmit);
  const navigate = useNavigate();

  const loading = useSelector((state) => state.corpus.loading);

  useEffect(() => {
    CorpusAPI.getFileCorpusByIdWithContent(course, id).then((result) => {
      setCorpusWithContentFileById({ status: true, data: result.data.payload });
    });
  }, [loading]);

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const content = Array(formData.get("content"));

    dispatch(editCorpusFileContent({ id, content }));
    navigate(`/filelist/corpus/file/${course}/${id}`);

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
      title: "Isi file korpus berhasil diubah",
    });
    dispatch(setLoaderSubmit(false));
  };

  return (
    <div className="container mx-auto pt-16 pb-16 md:px-10">
      <Helmet>
        <title>{`Edit Corpus - ${corpusWithContentFileById.data.corpus?.out_name} - Word2vec Mata Kuliah`}</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      {corpusWithContentFileById.status ? (
        <div>
          <Breadcrumbs className="mt-4">
            <Breadcrumbs.Content>
              <Breadcrumbs.Link>
                <button
                  onClick={() => navigate(`/filelist/corpus/file/${course}/${id}`)}
                  className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 py-2 px-4 font-medium text-white hover:bg-blue-500">
                  <i className="fa-solid fa-arrow-left text-sm md:text-base"></i>
                </button>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <Link
                  to="/filelist/corpus/file"
                  className="ml-1 text-xs font-normal text-neutral-40 hover:border-b hover:border-primary-violet hover:text-primary-violet md:text-sm">
                  Daftar korpus
                </Link>
                <svg
                  aria-hidden="true"
                  className="mx-1 h-6 w-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <Link
                  to={`/filelist/corpus/file/${course}`}
                  className="text-xs font-normal text-neutral-40 hover:border-b hover:border-primary-violet hover:text-primary-violet md:text-sm">
                  {course}
                </Link>
                <svg
                  aria-hidden="true"
                  className="mx-1 h-6 w-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <p className="ml-1 text-sm font-normal text-neutral-40">Edit</p>
                <svg
                  aria-hidden="true"
                  className="mx-1 h-6 w-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <p className="mt-1 text-sm font-semibold text-neutral-100-2 sm:mt-0">
                  {corpusWithContentFileById.data.corpus?.out_name}
                </p>
              </Breadcrumbs.Link>
            </Breadcrumbs.Content>
          </Breadcrumbs>
          <div className="border-b border-gray-300 py-2"></div>
          <form onSubmit={handleEdit}>
            <div className="mt-5 w-full rounded-md bg-white">
              <div className="flex items-center justify-between space-x-3 rounded-t-md border border-gray-300 bg-tertiary-7 py-3 px-6">
                <div className="text-sm font-normal text-neutral-80">
                  Edit Isi File |{" "}
                  <span className="font-semibold">
                    {corpusWithContentFileById.data.corpus?.out_name}
                  </span>
                </div>
              </div>
              <div className="relative h-full">
                <textarea
                  name="content"
                  type="text"
                  rows="25"
                  cols="200"
                  defaultValue={corpusWithContentFileById.data.content?.join("\n")}
                  className="mb-2 whitespace-pre-line break-words rounded-b-md border border-gray-300 text-justify text-sm font-normal focus:outline-none"
                  required
                  onChange={(e) => setFileContent(e.target.value)}></textarea>
              </div>
            </div>
            <div className="flex items-center space-x-2 rounded-b">
              {loaderSubmit ? (
                <PrimaryButton className="px-4 py-2.5">
                  <PulseLoader size={7} color={"#ffffff"} />
                </PrimaryButton>
              ) : (
                <QuartenaryButton
                  type="submit"
                  className={
                    !fileContent
                      ? "cursor-not-allowed rounded-10 bg-neutral-20 px-4 py-2.5 text-center text-xs font-semibold text-neutral-60 md:text-sm"
                      : "bg-secondary-navy px-4 py-2.5 font-semibold text-white hover:bg-blue-800 focus:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-secondary-navy "
                  }
                  disabled={!fileContent}>
                  Simpan Perubahan
                </QuartenaryButton>
              )}

              <Link
                to={`/filelist/corpus/file/${corpusWithContentFileById.data.corpus?.course}/${corpusWithContentFileById.data.corpus?.id}`}
                className="inline-block items-center justify-center rounded-10 border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 md:text-sm ">
                Batal
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <SkeletonLoadingEditCorpusFileContent />
      )}
    </div>
  );
};

export default EditCorpus;
