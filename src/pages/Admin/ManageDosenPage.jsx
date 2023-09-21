import React from "react";
import { Helmet } from "react-helmet";
import ManageDosenLists from "../../components/Admin/ManageDosen/ManageDosenLists";

const ManageDosenPage = () => {
  return (
    <>
      <Helmet>
        <title>Mengelola Dosen - Word2vec Materi Kuliah</title>
        <meta name="website" content="Word2vec Materi Kuliah" />
      </Helmet>
      <ManageDosenLists />
    </>
  );
};

export default ManageDosenPage;
