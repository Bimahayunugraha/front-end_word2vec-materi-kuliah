import React from "react";
import { Helmet } from "react-helmet";
import Sent2vecList from "../../components/Dosen/Sent2vec/Sent2vecList";

const Sent2vecListPage = () => {
  return (
    <>
      <Helmet>
        <title>Daftar File Sent2vec - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="px-0 pt-28 pb-16 md:px-28">
        <Sent2vecList />
      </div>
    </>
  );
};

export default Sent2vecListPage;
