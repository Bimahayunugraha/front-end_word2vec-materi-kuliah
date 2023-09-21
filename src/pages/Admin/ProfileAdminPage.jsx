import React from "react";
import { Helmet } from "react-helmet";
import ProfileAdmin from "../../components/Admin/ProfileAdmin";

const ProfileAdminPage = () => {
  return (
    <>
      <Helmet>
        <title>Profile Admin - Word2vec Materi Kuliah</title>
        <meta name="website" content="WorkFit" />
      </Helmet>
      <ProfileAdmin />
    </>
  );
};

export default ProfileAdminPage;
