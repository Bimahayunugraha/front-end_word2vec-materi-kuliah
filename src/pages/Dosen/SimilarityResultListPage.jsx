import React from "react";
import { Helmet } from "react-helmet";
import SimilarityResulLists from "../../components/Dosen/Similarity/SimilarityResulLists";

const SimilarityResultListPage = () => {
  return (
    <>
      <Helmet>
        <title>Hasil Kesamaan - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="pt-24 pb-16">
        <SimilarityResulLists />
      </div>
    </>
  );
};

export default SimilarityResultListPage;
