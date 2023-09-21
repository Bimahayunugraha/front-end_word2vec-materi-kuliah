import React from "react";
import { Helmet } from "react-helmet";
import FormLogin from "../components/FormLogin";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <FormLogin />
    </>
  );
};

export default LoginPage;
