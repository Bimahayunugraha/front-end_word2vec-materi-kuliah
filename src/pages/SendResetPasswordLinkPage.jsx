import React from "react";
import { Helmet } from "react-helmet";
import SendResetPasswordLink from "../components/ResetPassword/SendResetPasswordLink";

const SendResetPasswordLinkPage = () => {
  return (
    <>
      <Helmet>
        <title>Mengirim Tautan Atur Ulang Password - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <SendResetPasswordLink />
    </>
  );
};

export default SendResetPasswordLinkPage;
