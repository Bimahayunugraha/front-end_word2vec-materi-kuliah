import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatFileSize } from "../../../utils/formatFileSize";
import SkeletonLoadingDetailAllEmbeddingFile from "../../EmbeddingFiles/SkeletonLoadingDetailAllEmbeddingFile";
import ModalEditWord2vec from "./ModalEditWord2vec";
import Breadcrumbs from "../../Breadcrumbs";
import Word2vecAPI from "../../../apis/word2vec.api";

const Initial_Word2vec_By_Id = {
  data: [],
  status: false,
};

const DetailWord2vec = () => {
  const [word2vecById, setWord2vecById] = useState(Initial_Word2vec_By_Id);
  const [modalEditTrigger, setModalEditTrigger] = useState(false);
  const { id, course } = useParams();

  const loading = useSelector((state) => state.word2vec.loading);
  const navigate = useNavigate();

  useEffect(() => {
    Word2vecAPI.getFileWord2vecByIdWithContentFile(course, id).then((result) => {
      setWord2vecById({ status: true, data: result.data.payload });
    });
  }, [loading]);

  const handleModalEditTrigger = () => {
    setModalEditTrigger(!modalEditTrigger);
  };

  return (
    <div className="container mx-auto pt-16 pb-16 md:px-10">
      <Helmet>
        <title>{`Detail Word2vec - ${word2vecById.data.word2vec?.book_title} - Word2vec Mata Kuliah`}</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      {word2vecById.status ? (
        <div>
          <Breadcrumbs className="mt-4">
            <Breadcrumbs.Content>
              <Breadcrumbs.Link>
                <button
                  onClick={() =>
                    navigate(`/filelist/word2vec/file/${word2vecById.data.word2vec?.course}`)
                  }
                  className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 py-2 px-4 font-medium text-white hover:bg-blue-500">
                  <i className="fa-solid fa-arrow-left text-sm md:text-base"></i>
                </button>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <Link
                  to="/filelist/word2vec/file"
                  className="ml-1 text-xs font-normal text-neutral-40 hover:border-b hover:border-primary-violet hover:text-primary-violet md:text-sm">
                  Daftar word2vec
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
                  to={`/filelist/word2vec/file/${course}`}
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
                <p className="ml-1 text-xs font-normal text-neutral-40 md:text-sm">Detail</p>
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
                <p className="text-xs font-semibold text-neutral-100-2 md:text-sm">
                  {word2vecById.data.word2vec?.out_name}
                </p>
              </Breadcrumbs.Link>
            </Breadcrumbs.Content>
          </Breadcrumbs>
          <div className="border-b border-gray-300 py-2"></div>
          <div className="mt-5 w-full rounded-md border border-gray-300 bg-white">
            <div className="flex items-center justify-between rounded-md border-b border-gray-200 bg-tertiary-7 py-3 px-6">
              <div className="flex items-center space-x-3">
                <img
                  className="h-7 w-7 rounded-full bg-white object-cover object-center ring-2 ring-white"
                  src={word2vecById.data.word2vec?.user.profile_image.image_url}
                  alt={word2vecById.data.word2vec?.user.profile_image.image_name}
                />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-neutral-100-2">
                    {word2vecById.data.word2vec?.user.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-md border border-gray-300 px-2 py-1 hover:border-blue-500 hover:bg-blue-400 hover:text-white"
                onClick={handleModalEditTrigger}
                title="Edit Corpus">
                <i className="fa-light fa-pen text-sm"></i>
              </button>
              {modalEditTrigger && (
                <ModalEditWord2vec
                  handleModalEditTrigger={handleModalEditTrigger}
                  modalEditTrigger={modalEditTrigger}
                  update={word2vecById.data.word2vec}
                />
              )}
            </div>
            <div className="flex items-center py-4 px-6">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </span>
              <span className="ml-3 text-xs text-gray-600 lg:text-sm">
                {word2vecById.data.word2vec?.course} • {word2vecById.data.word2vec?.book_title}
              </span>
            </div>
          </div>
          <div className="mt-3 w-full rounded-md border border-gray-300 bg-white">
            <div className="flex items-center justify-between space-x-3 rounded-md border-b border-gray-200 bg-tertiary-7 py-3 px-6">
              <div className="text-sm font-normal text-neutral-80">
                <span className="font-semibold">{word2vecById.data.word2vec?.out_name}</span> |{" "}
                {formatFileSize(word2vecById.data.word2vec?.out_file_size)} |{" "}
                {word2vecById.data.word2vec?.conversion_type} |{" "}
                <span className="font-medium text-secondary-green">
                  {word2vecById.data.word2vec?.out_file_mimetype}
                </span>
                <a
                  href={word2vecById.data.word2vec?.out_file_url}
                  target="_blank"
                  className="ml-3 font-medium text-primary-violet hover:underline"
                  rel="noreferrer">
                  Lihat file asli
                </a>
              </div>
            </div>
            <div className="relative h-[90vh] overflow-y-auto">
              <div className="h-full">
                <table className="flex w-full items-center py-4">
                  <tbody>
                    {word2vecById.data.content?.map((line, index) => (
                      <tr className="border-b border-gray-300 py-2 " key={index}>
                        <td className="whitespace-pre-line break-words py-2 px-6 text-justify text-sm font-normal">
                          {line}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonLoadingDetailAllEmbeddingFile />
      )}
    </div>
  );
};

export default DetailWord2vec;
