import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import icon from "../assets/img/png/icon.png";
import { PulseLoader } from "react-spinners";
import { regexEmailValidation } from "../utils/globalVariable";
import Auth from "../utils/auth";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderSubmit } from "../stores/features/loaderSubmitSlice";
import { login } from "../stores/features/authSlice";

const baseValue = {
  email: "",
  password: "",
};

const baseErrors = {
  email: "",
  password: "",
};

const FormLogin = () => {
  const [values, setValues] = useState(baseValue);
  const [errors, setErrors] = useState(baseErrors);
  const [passwordShown, setPasswordShown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loaderSubmit = useSelector((state) => state.loaderSubmit);

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

    if (name === "password") {
      if (value.trim() === "") {
        setErrors({ ...errors, password: "Kata sandi wajib diisi" });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (values.email === "" || values.password === "") {
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
        title: "Mohon, isi email dan password Anda",
      });
      dispatch(setLoaderSubmit(false));
    } else {
      if (!errors.email && !errors.password) {
        dispatch(login({ email, password }))
          .then((result) => {
            if (!result.error) {
              let userInfo = Auth.getUser();
              let user = JSON.parse(userInfo && userInfo);

              if (user.role === "admin") {
                const Toast = Swal.mixin({
                  customClass: {
                    title: "text-green-700",
                  },
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

                setTimeout(
                  () => navigate("/dashboard"),
                  Toast.fire({
                    icon: "success",
                    title: "Login Berhasil",
                  }),
                  1000
                );
                dispatch(setLoaderSubmit(false));
              } else {
                const Toast = Swal.mixin({
                  customClass: {
                    title: "text-green-700",
                  },
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

                setTimeout(
                  () => navigate("/"),
                  Toast.fire({
                    icon: "success",
                    title: "Login Berhasil",
                  }),
                  1000
                );
                dispatch(setLoaderSubmit(false));
              }
            } else {
              const Toast = Swal.mixin({
                customClass: {
                  title: "text-red-700",
                },
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
          })
          .catch((error) => {
            const Toast = Swal.mixin({
              customClass: {
                title: "text-red-700",
              },
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

            setTimeout(
              () =>
                Toast.fire({
                  icon: "error",
                  title: error.message,
                }),
              1000
            );
            dispatch(setLoaderSubmit(false));
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
          icon: "info",
          title: "Mohon, periksa email dan password yang Anda masukkan",
        });
        dispatch(setLoaderSubmit(false));
      }
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div className="w-full rounded-20 bg-white shadow-4 sm:max-w-md md:mt-0 xl:p-0">
        <Link
          to="/"
          className="flex items-center justify-center pt-6 text-2xl font-semibold text-gray-900">
          <img src={icon} className="h-14 w-14" alt="Logo" />
        </Link>
        <div className="space-y-4 p-6 sm:px-8 sm:pb-8 sm:pt-4 md:space-y-6">
          <h1 className="pb-2 text-center text-xl font-bold leading-tight tracking-wide text-gray-900 md:text-2xl">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
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
            <div>
              <div className="relative grid grid-flow-col grid-cols-2 gap-0">
                <TextInput
                  id="password"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  className={
                    errors.password
                      ? "flex-2 col-span-2 border border-secondary-red text-secondary-red focus:border-secondary-red"
                      : "flex-2 col-span-2 border border-neutral-20 text-neutral-60 focus:border-primary-violet"
                  }
                  placeholder=" "
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleChange}
                />

                <InputLabel
                  className={
                    errors.password
                      ? "text-secondary-red peer-focus:text-secondary-red"
                      : "text-neutral-60 peer-focus:text-dark-4"
                  }
                  htmlFor="password">
                  <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                    Password
                  </span>
                </InputLabel>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button type="button" onClick={togglePassword}>
                    {passwordShown ? (
                      <i className="fa-light fa-eye"></i>
                    ) : (
                      <i className="fa-light fa-eye-slash"></i>
                    )}
                  </button>
                </div>
              </div>
              {errors.password && <InputError className="mt-2" message={errors.password} />}
            </div>
            <div className="flex items-center justify-end">
              <Link
                to="/reset-password-link"
                className="text-sm font-medium text-primary-violet hover:underline">
                Lupa password?
              </Link>
            </div>
            {loaderSubmit ? (
              <PrimaryButton className="w-full px-4 py-2.5">
                <PulseLoader size={7} color={"#ffffff"} />
              </PrimaryButton>
            ) : (
              <PrimaryButton type="submit" className="w-full px-4 py-2.5">
                Login
              </PrimaryButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
