import React from "react";
import { Helmet } from "react-helmet";
import CorpusList from "../../components/Dosen/Corpus/CorpusLists";

const CorpusListPage = () => {
  return (
    <>
      <Helmet>
        <title>Daftar File Corpus - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="px-0 pt-24 pb-16 md:px-28">
        <CorpusList />
      </div>
    </>
  );
};

export default CorpusListPage;
