import React from "react";
import { Helmet } from "react-helmet";
import ConvertSentence from "../../components/Dosen/Sentence/ConvertSentence";

const ConvertSentencePage = () => {
  return (
    <>
      <Helmet>
        <title>Konversi Sentence - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="px-0 pt-28 pb-16 md:px-28">
        <ConvertSentence />
      </div>
    </>
  );
};

export default ConvertSentencePage;
