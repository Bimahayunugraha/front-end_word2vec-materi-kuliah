import React, { useEffect, useState } from "react";
import expiredImage from "../assets/img/gif/expired-token.gif";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

const ResetPasswordTokenExpiredPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verifyTokenResetPassword = useSelector((state) => state.auth.error);

  useEffect(() => {
    setLoading(true);
    if (!verifyTokenResetPassword) {
      navigate("*");
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <div className="container mx-auto flex min-h-screen items-center px-6 py-12">
          <div className="mx-auto flex max-w-sm flex-col items-center text-center">
            <img src={expiredImage} alt="expired-image" className="w-40" />
            <h1 className="mt-3 text-xl font-semibold text-gray-800 md:text-2xl">
              Token Kadaluwarsa
            </h1>
            <p className="mt-4 text-gray-500">
              Token untuk mereset password telah kadaluwarsa. Anda dapat mengirimkan link reset
              password kembali melalui email.
            </p>

            <div className="mt-6 flex w-auto shrink-0 items-center gap-x-3 sm:w-auto">
              <PrimaryButton
                type="button"
                className="px-4 py-2.5"
                onClick={() => {
                  navigate("/reset-password-link");
                }}>
                <i className="fa-solid fa-arrow-left mr-3"></i>
                Input Email Kembali
              </PrimaryButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-0 mx-auto flex h-screen w-full items-center justify-center">
          <PulseLoader size={10} color="#6FCBFD" />
        </div>
      )}
    </div>
  );
};

export default ResetPasswordTokenExpiredPage;
