import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import error from "../assets/img/gif/error.gif";
import PrimaryButton from "../components/PrimaryButton";
import Auth from "../utils/auth";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const auth = Auth.isAuthorization();
  let userRole = null;

  const userInfo = Auth.getUser();
  if (auth) {
    const user = JSON.parse(userInfo);
    userRole = user;
  }

  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center px-6 py-8 md:h-screen md:py-10 lg:py-0">
      <Helmet>
        <title>Not Found - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full self-center px-4 lg:w-1/2">
            <h2 className="mb-1 text-center text-base font-bold text-neutral-100-2 md:text-start md:text-2xl lg:text-start">
              Ooops...
            </h2>
            <h4 className="mb-1 text-center text-sm font-medium text-neutral-80 md:text-start md:text-lg">
              Halaman Tidak Ditemukan
            </h4>
            <p className="mb-5 text-center text-xs font-normal leading-relaxed text-gray-500 md:text-start md:text-base lg:mb-4 lg:text-start">
              Halaman yang Anda cari tidak ditemukan atau terjadi kesalahan lainnya. Kami sarankan
              untuk kembali ke halaman utama.
            </p>
            {auth && auth ? (
              <div>
                {userRole.role === "admin" ? (
                  <div className="flex justify-center md:justify-start lg:justify-start">
                    <PrimaryButton
                      type="button"
                      className="px-4 py-2.5"
                      onClick={() => {
                        navigate("/dashboard");
                      }}>
                      <i className="fa-solid fa-arrow-left mr-3"></i>
                      Kembali
                    </PrimaryButton>
                  </div>
                ) : (
                  <div className="flex justify-center md:justify-start lg:justify-start">
                    <PrimaryButton
                      type="button"
                      className="px-4 py-2.5"
                      onClick={() => {
                        navigate("/");
                      }}>
                      <i className="fa-solid fa-arrow-left mr-3"></i>
                      Kembali
                    </PrimaryButton>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center md:justify-start lg:justify-start">
                <PrimaryButton
                  type="button"
                  className="px-4 py-2.5"
                  onClick={() => {
                    navigate("/");
                  }}>
                  <i className="fa-solid fa-arrow-left mr-3"></i>
                  Kembali
                </PrimaryButton>
              </div>
            )}
          </div>
          <div className="w-full self-end px-4 lg:w-1/2">
            <div className="mt-10 lg:right-0 lg:mt-0">
              <img src={error} alt="not-found" className="mx-auto w-96 max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
