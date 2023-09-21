import React from "react";
import { Helmet } from "react-helmet";
import CourseMaterialLists from "../../components/Dosen/CourseMaterial/CourseMaterialLists";

const CourseMaterialListPage = () => {
  return (
    <>
      <Helmet>
        <title>Daftar File Materi kuliah - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="px-0 pt-24 pb-16 md:px-28">
        <CourseMaterialLists />
      </div>
    </>
  );
};

export default CourseMaterialListPage;
