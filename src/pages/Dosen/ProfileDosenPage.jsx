import React from "react";
import ProfileDosen from "../../components/Dosen/ProfileDosen";
import { Helmet } from "react-helmet";

const ProfileDosenPage = () => {
  return (
    <>
      <Helmet>
        <title>Profile Anda - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>

      <div className="pt-24 pb-16">
        <ProfileDosen />
      </div>
    </>
  );
};

export default ProfileDosenPage;
