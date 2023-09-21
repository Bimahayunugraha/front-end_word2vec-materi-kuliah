import React from "react";
import { Helmet } from "react-helmet";
import ResetPassword from "../components/ResetPassword/ResetPassword";

const ResetPasswordPage = () => {
  return (
    <>
      <Helmet>
        <title>Ubah Password - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;
