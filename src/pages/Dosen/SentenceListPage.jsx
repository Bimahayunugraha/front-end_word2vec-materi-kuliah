import React from "react";
import { Helmet } from "react-helmet";
import SentenceList from "../../components/Dosen/Sentence/SentenceList";

const SentenceListPage = () => {
  return (
    <>
      <Helmet>
        <title>Daftar File Sentence - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="px-0 pt-28 pb-16 md:px-28">
        <SentenceList />
      </div>
    </>
  );
};

export default SentenceListPage;
