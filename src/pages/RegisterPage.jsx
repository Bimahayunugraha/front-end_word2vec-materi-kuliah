import React from "react";
import { Helmet } from "react-helmet";
import FormRegister from "../components/FormRegister";

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Register - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <FormRegister />
    </>
  );
};

export default RegisterPage;
