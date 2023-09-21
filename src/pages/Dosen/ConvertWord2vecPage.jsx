import React from "react";
import { Helmet } from "react-helmet";
import ConvertWord2vec from "../../components/Dosen/Word2vec/ConvertWord2vec";

const ConvertWord2vecPage = () => {
  return (
    <>
      <Helmet>
        <title>Konversi Vektor - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="px-0 pt-24 pb-16 md:px-28">
        <ConvertWord2vec />
      </div>
    </>
  );
};

export default ConvertWord2vecPage;
