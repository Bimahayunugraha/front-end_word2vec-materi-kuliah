import React from "react";
import { Helmet } from "react-helmet";
import Word2vecLists from "../../components/Dosen/Word2vec/Word2vecLists";

const Word2vecListPage = () => {
  return (
    <>
      <Helmet>
        <title>Daftar File Word2vec - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="px-0 pt-24 pb-16 md:px-28">
        <Word2vecLists />
      </div>
    </>
  );
};

export default Word2vecListPage;
