import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Breadcrumbs from "../../Breadcrumbs";
import { Link, useNavigate, useParams } from "react-router-dom";
import classesBg from "../../../assets/img/svg/circuit-board.svg";
import SimilarityAPI from "../../../apis/similarity.api";
import SkeletonLoadingDetailSimilarityResultByExam from "./SkeletonLoadingDetailSimilarityResultByExam";
import { useNavigateBack } from "../../../hooks/useNavigateBack";

const Initial_Similarity_By_Exam_Name = {
  data: [],
  status: false,
};

const DetailSimilarityResultByExam = () => {
  const { exam_name } = useParams();
  const navigate = useNavigate();

  const [similarityListsByExam, setSimilarityListsByExam] = useState(
    Initial_Similarity_By_Exam_Name
  );

  const similarityListsByExamName = Array.from(
    new Set(similarityListsByExam.data?.map((value) => value.student_class))
  );

  useEffect(() => {
    SimilarityAPI.getSimilarityByExamName(exam_name).then((response) => {
      setSimilarityListsByExam({ status: true, data: response.data.payload });
    });
  }, []);

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>{`Detail Hasil Kesamaan ${exam_name} - Word2vec Materi Kuliah`}</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      {similarityListsByExam.status ? (
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
                <p className="ml-1 text-sm font-semibold text-neutral-100-2">{exam_name}</p>
              </Breadcrumbs.Link>
            </Breadcrumbs.Content>
          </Breadcrumbs>

          <div className="mt-5 w-full rounded-md border border-gray-300 bg-white">
            <div className="rounded-t-md bg-secondary-navy py-1"></div>
            <div className="border-b border-gray-200 bg-tertiary-7 py-3 px-6">
              <h4 className="text-sm font-medium text-neutral-100-2">Daftar Hasil Kesamaan</h4>
            </div>
            <div className="flex items-center py-4 px-6 text-gray-600">
              <i className="fa-solid fa-graduation-cap text-sm"></i>
              <span className="ml-3 text-xs font-semibold lg:text-sm">{exam_name}</span>
            </div>
          </div>
          <div className="mt-3 w-full rounded-md border border-gray-300 bg-white">
            <div className="rounded-t-md bg-secondary-green py-1"></div>
            <div className="border-b border-gray-200 bg-tertiary-7 py-3 px-6">
              <h4 className="text-sm font-medium text-neutral-100-2">Daftar Kelas</h4>
            </div>
            <div className="grid grid-cols-1 gap-3 py-4 px-6 md:grid-cols-2 xl:grid-cols-4">
              {similarityListsByExamName.map((exam) => {
                return (
                  <Link
                    to={`/similarity-result/detail/${exam_name}/${exam}`}
                    style={{
                      backgroundImage: `url(${classesBg})`,
                    }}
                    className="group relative z-[3] h-full w-full rounded-lg border border-gray-200 bg-cover bg-no-repeat p-6 hover:shadow-4"
                    key={exam}>
                    <div className="z-[1] flex flex-col items-center">
                      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-soft-white shadow-lg ring-2 ring-gray-100">
                        <i className="fa-solid fa-screen-users text-xl text-primary-violet"></i>
                      </div>
                      <h5 className="text-lg font-semibold text-neutral-100-2 group-hover:text-primary-violet md:text-xl">
                        {exam}
                      </h5>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <SkeletonLoadingDetailSimilarityResultByExam />
      )}
    </div>
  );
};

export default DetailSimilarityResultByExam;
