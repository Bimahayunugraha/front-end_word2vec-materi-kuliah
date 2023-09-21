import React from "react";
import { Helmet } from "react-helmet";
import ConvertCorpus from "../../components/Dosen/Corpus/ConvertCorpus";

const ConvertCorpusPage = () => {
  return (
    <>
      <Helmet>
        <title>Konversi Corpus - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="px-0 pt-24 pb-16 md:px-28">
        <ConvertCorpus />
      </div>
    </>
  );
};

export default ConvertCorpusPage;
