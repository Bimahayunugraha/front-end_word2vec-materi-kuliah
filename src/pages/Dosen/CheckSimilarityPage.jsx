import React from "react";
import CheckSimilarity from "../../components/Dosen/Similarity/CheckSimilarity";
import { Helmet } from "react-helmet";

const CheckSimilarityPage = () => {
  return (
    <>
      <Helmet>
        <title>Periksa Kesamaan - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="px-0 pt-24 pb-16 md:px-20">
        <CheckSimilarity />
      </div>
    </>
  );
};

export default CheckSimilarityPage;
