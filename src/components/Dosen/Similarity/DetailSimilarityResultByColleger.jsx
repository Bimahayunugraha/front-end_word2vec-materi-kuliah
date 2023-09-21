import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Breadcrumbs from "../../Breadcrumbs";
import { Link, useNavigate, useParams } from "react-router-dom";
import SimilarityAPI from "../../../apis/similarity.api";
import SkeletonLoadingDetailSimilarityResultByColleger from "./SkeletonLoadingDetailSimilarityResultByColleger";
import { useNavigateBack } from "../../../hooks/useNavigateBack";

const Initial_Similarity_Student = {
  data: [],
  status: false,
};

const DetailSimilarityResultByColleger = () => {
  const { exam_name, student_class, student_nim } = useParams();
  const [similarityStudent, setSimilarityStudent] = useState(Initial_Similarity_Student);
  const navigate = useNavigate();

  useEffect(() => {
    SimilarityAPI.getDetailSimilarityStudent(exam_name, student_class, student_nim).then(
      (response) => {
        setSimilarityStudent({ status: true, data: response.data.payload });
      }
    );
  }, []);

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>{`Detail Hasil Kesamaan ${exam_name} Kelas ${student_class} NIM ${student_nim} - Word2vec Materi Kuliah`}</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      {similarityStudent.status ? (
        <div>
          <Breadcrumbs className="mt-4 md:mt-8">
            <Breadcrumbs.Content>
              <Breadcrumbs.Link>
                <button
                  onClick={useNavigateBack(navigate)}
                  className="mr-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 py-2 px-4 font-medium text-white hover:bg-blue-500">
                  <i className="fa-solid fa-arrow-left text-sm md:text-base"></i>
                </button>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <Link
                  to="/similarity-result"
                  className="inline-flex items-center justify-center text-sm font-normal text-neutral-40 hover:text-blue-600">
                  <i className="fa-solid fa-ballot-check mr-2 text-sm"></i>
                  Hasil Kesamaan
                </Link>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
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
                <Link
                  to={`/similarity-result/detail/${exam_name}`}
                  className="inline-flex items-center justify-center text-sm font-normal text-neutral-40 hover:text-blue-600">
                  <i className="fa-solid fa-pen-line mr-2 text-sm"></i>
                  {exam_name}
                </Link>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
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
                <Link
                  to={`/similarity-result/detail/${exam_name}/${student_class}`}
                  className="inline-flex items-center justify-center text-sm font-normal text-neutral-40 hover:text-blue-600">
                  <i className="fa-solid fa-screen-users mr-2 text-sm"></i>
                  {student_class}
                </Link>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
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
                <p className="ml-1 text-sm font-semibold text-gray-800 hover:text-gray-800">
                  {student_nim}
                </p>
              </Breadcrumbs.Link>
            </Breadcrumbs.Content>
          </Breadcrumbs>
          <div className="mt-5 w-full rounded-md border border-gray-300 bg-white">
            <div className="rounded-t-md bg-secondary-yellow py-1"></div>
            <div className="border-b border-gray-200 bg-tertiary-7 py-3 px-6">
              <h4 className="text-sm font-medium text-neutral-100-2">
                Jawaban • {exam_name} • Kelas {student_class} • {student_nim}
              </h4>
            </div>
            <div className="px-6">
              <div>
                <dl className="divide-y divide-gray-100">
                  {similarityStudent.data?.map((item) => {
                    return (
                      <div
                        className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                        key={item.id}>
                        <dt className="leading-6 text-gray-900 sm:col-span-2">
                          <h4 className="mb-2 text-base font-semibold md:text-lg">
                            Soal nomor {item.question_number}
                          </h4>
                          <h5 className="text-sm font-medium underline md:text-base">Jawaban</h5>
                          <p className="whitespace-pre-line break-words text-justify text-xs md:text-sm">
                            {item.student_answer}
                          </p>
                        </dt>
                        <dd className="mt-4 text-sm font-medium leading-6 text-gray-700 sm:mt-0">
                          <h4 className="mb-2 text-base font-semibold md:text-lg">
                            Nilai Kesamaan
                          </h4>
                          <p className="text-base font-medium">
                            {item.total_score} <i className="fa-regular fa-arrow-right px-2"></i>
                            {Math.round(item.total_score * 100).toFixed(2)}
                          </p>
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonLoadingDetailSimilarityResultByColleger />
      )}
    </div>
  );
};

export default DetailSimilarityResultByColleger;
