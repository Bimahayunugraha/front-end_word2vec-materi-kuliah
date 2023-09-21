import React, { useState } from "react";
import { regexEmailValidation } from "../../utils/globalVariable";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderSubmit } from "../../stores/features/loaderSubmitSlice";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import icon from "../../assets/img/png/icon.png";
import TextInput from "../TextInput";
import InputLabel from "../InputLabel";
import InputError from "../InputError";
import PrimaryButton from "../PrimaryButton";
import { sendResetPasswordLink } from "../../stores/features/authSlice";

const baseValue = {
  email: "",
};

const baseErrors = {
  email: "",
};

const SendResetPasswordLink = () => {
  const [values, setValues] = useState(baseValue);
  const [errors, setErrors] = useState(baseErrors);

  const loaderSubmit = useSelector((state) => state.loaderSubmit);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    validation(name, value);
  };

  const validation = (name, value) => {
    if (name === "email") {
      if (value.trim() === "") {
        setErrors({ ...errors, email: "Email wajib diisi" });
      } else if (!regexEmailValidation.test(value)) {
        setErrors({ ...errors, email: "Email tidak valid" });
      } else if (value == "") {
        setErrors({ ...errors, email: "Email wajib diisi" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const email = formData.get("email");

    if (values.email !== "") {
      if (!errors.email) {
        dispatch(sendResetPasswordLink({ email })).then((result) => {
          if (!result.error) {
            const Toast = Swal.mixin({
              customClass: {
                title: "text-green-700",
              },
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            setTimeout(
              () =>
                Toast.fire({
                  icon: "success",
                  title:
                    "Tautan atur ulang password berhasil dikirim. Silahkan periksa email Anda.",
                }),
              1000
            );
            dispatch(setLoaderSubmit(false));
            setValues(baseValue);
          } else {
            const Toast = Swal.mixin({
              customClass: {
                title: "text-red-700",
              },
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            setTimeout(
              () =>
                Toast.fire({
                  icon: "error",
                  title: result.error.message.split(":")[1],
                }),
              1000
            );
            dispatch(setLoaderSubmit(false));
          }
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: "Mohon masukkan email dengan benar",
        });
        dispatch(setLoaderSubmit(false));
      }
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "info",
        title: "Mohon masukkan email Anda!",
      });
      dispatch(setLoaderSubmit(false));
    }
  };

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div className="w-full rounded-20 bg-white shadow-4 sm:max-w-md md:mt-0 xl:p-0">
        <div className="flex items-center justify-center pt-6 text-2xl font-semibold text-gray-900">
          <img src={icon} className="h-14 w-14" alt="Logo" />
        </div>
        <div className="space-y-4 p-6 sm:px-8 sm:pb-8 sm:pt-4 md:space-y-4">
          <h1 className="text-center text-xl font-bold leading-tight tracking-wide text-gray-900 md:text-xl">
            Atur Ulang Password Anda
          </h1>
          <h5 className="text-center text-xs font-normal tracking-wide text-gray-900">
            Masukkan alamat email yang didaftarkan dan kami akan mengirimkan tautan untuk mengatur
            ulang password.
          </h5>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <div className="relative">
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  className={
                    errors.email
                      ? "border border-secondary-red text-secondary-red focus:border-secondary-red"
                      : "border border-neutral-20 text-neutral-60 focus:border-primary-violet"
                  }
                  placeholder=" "
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleChange}
                />

                <InputLabel
                  className={
                    errors.email
                      ? "text-secondary-red peer-focus:text-secondary-red"
                      : "text-neutral-60 peer-focus:text-dark-4"
                  }
                  htmlFor="email">
                  <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                    Email
                  </span>
                </InputLabel>
              </div>
              {errors.email && <InputError className="mt-2" message={errors.email} />}
            </div>
            {loaderSubmit ? (
              <PrimaryButton className="w-full px-4 py-2.5">
                <PulseLoader size={7} color={"#ffffff"} />
              </PrimaryButton>
            ) : (
              <PrimaryButton type="submit" className="w-full px-4 py-2.5">
                Kirim Link
              </PrimaryButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendResetPasswordLink;
