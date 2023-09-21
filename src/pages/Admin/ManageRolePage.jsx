import React from "react";
import { Helmet } from "react-helmet";
import ManageRoleLists from "../../components/Admin/ManageRole/ManageRoleLists";

const ManageRolePage = () => {
  return (
    <>
      <Helmet>
        <title>Mengelola Role - Word2vec Materi Kuliah</title>
        <meta name="website" content="Word2vec Materi Kuliah" />
      </Helmet>
      <ManageRoleLists />
    </>
  );
};

export default ManageRolePage;
