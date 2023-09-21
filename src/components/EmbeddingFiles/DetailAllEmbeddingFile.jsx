import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import useQuery from "../../hooks/useQuery";
import { formatFileSize } from "../../utils/formatFileSize";
import SkeletonLoadingDetailAllEmbeddingFile from "./SkeletonLoadingDetailAllEmbeddingFile";
import Breadcrumbs from "../Breadcrumbs";
import Word2vecAPI from "../../apis/word2vec.api";
import { useNavigateBack } from "../../hooks/useNavigateBack";
import { useNavigate } from "react-router-dom";

const Initial_Word2vec_With_Content_File_By_Id = {
  data: [],
  status: false,
};

const DetailAllEmbeddingFile = () => {
  const [word2vecWithContentFileById, setWord2vecWithContentFileById] = useState(
    Initial_Word2vec_With_Content_File_By_Id
  );
  let query = useQuery();
  const id = query.get("id");
  const course = query.get("course");
  const navigate = useNavigate();

  const loading = useSelector((state) => state.word2vec.loading);

  useEffect(() => {
    Word2vecAPI.getAllFileWord2vecById(course, id).then((result) => {
      setWord2vecWithContentFileById({ status: true, data: result.data.payload });
    });
  }, [loading]);

  return (
    <div className="container mx-auto pt-20 pb-16 md:px-10">
      <Helmet>
        <title>{`Detail Embedding File ${word2vecWithContentFileById.data.word2vec?.user.name} - ${word2vecWithContentFileById.data.word2vec?.book_title} - Word2vec Mata Kuliah`}</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      {word2vecWithContentFileById.status ? (
        <div>
          <Breadcrumbs>
            <Breadcrumbs.Content>
              <Breadcrumbs.Link>
                <button
                  onClick={useNavigateBack(navigate)}
                  className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 py-2 px-4 font-medium text-white hover:bg-blue-500">
                  <i className="fa-solid fa-arrow-left text-sm md:text-base"></i>
                </button>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <p className="ml-1 text-sm font-normal text-neutral-40">Detail</p>
                <i className="fa-solid fa-angle-right mx-1 text-gray-400"></i>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <p className="mt-1 text-sm font-semibold text-neutral-100-2 sm:mt-0">
                  {word2vecWithContentFileById.data.word2vec?.out_name}
                </p>
              </Breadcrumbs.Link>
            </Breadcrumbs.Content>
          </Breadcrumbs>
          <div className="border-b border-gray-300 py-2"></div>
          <div className="pt-2">
            <div className="mt-3 w-full rounded-md border border-gray-200 bg-white">
              <div className="flex items-center space-x-3 border-b border-gray-200 bg-tertiary-7 py-3 px-6">
                <img
                  className="h-7 w-7 rounded-full bg-white object-cover object-center ring-2 ring-white"
                  src={word2vecWithContentFileById.data.word2vec?.user.profile_image.image_url}
                  alt={word2vecWithContentFileById.data.word2vec?.user.profile_image.image_name}
                />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-neutral-100-2">
                    {word2vecWithContentFileById.data.word2vec?.user.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center py-4 px-6">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                </span>
                <span className="ml-3 text-xs text-gray-600 lg:text-sm">
                  {word2vecWithContentFileById.data.word2vec?.course} •{" "}
                  {word2vecWithContentFileById.data.word2vec?.book_title}
                </span>
              </div>
            </div>
            <div className="mt-3 w-full rounded-md border border-gray-200 bg-white">
              <div className="flex items-center space-x-3 border-b border-gray-200 bg-tertiary-7 py-3 px-6">
                <div className="text-sm font-normal text-neutral-80">
                  <span className="font-semibold">
                    {word2vecWithContentFileById.data.word2vec?.out_name}
                  </span>{" "}
                  | {formatFileSize(word2vecWithContentFileById.data.word2vec?.out_file_size)} |{" "}
                  {word2vecWithContentFileById.data.word2vec?.conversion_type} |{" "}
                  <span className="font-medium text-secondary-green">
                    {word2vecWithContentFileById.data.word2vec?.out_file_mimetype}
                  </span>
                </div>
              </div>
              <div className="relative h-[90vh] overflow-y-auto">
                <div className="h-full">
                  <table className="flex w-full items-center py-4">
                    <tbody>
                      {word2vecWithContentFileById.data.content?.map((line, index) => (
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
        </div>
      ) : (
        <SkeletonLoadingDetailAllEmbeddingFile />
      )}
    </div>
  );
};

export default DetailAllEmbeddingFile;
