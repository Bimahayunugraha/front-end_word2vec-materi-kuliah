import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import icon from "../assets/img/png/icon.png";
import { PulseLoader } from "react-spinners";
import {
  inputError,
  inputNotError,
  labelError,
  labelNotError,
  regexEmailValidation,
  regexNameValidation,
  regexPasswordValidation,
  regexUsernameValidation,
} from "../utils/globalVariable";
import { maxLengthCheck } from "../utils/maxLengthCheck";
import { addNewUsaer } from "../stores/features/usersSlice";
import Swal from "sweetalert2";

const baseValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const baseErrors = {
  name: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const FormRegister = () => {
  const [values, setValues] = useState(baseValue);
  const [errors, setErrors] = useState(baseErrors);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const maxLengthPhoneNumber = 13;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    validation(name, value);
  };

  const validation = (name, value) => {
    if (name === "name") {
      if (!regexNameValidation.test(value)) {
        setErrors({ ...errors, name: "Nama harus dalam bentuk huruf" });
      } else if (value == "") {
        setErrors({ ...errors, name: "Nama wajib diisi" });
      } else if (value.length <= 3) {
        setErrors({ ...errors, name: "Nama harus lebih dari 3 karakter" });
      } else {
        setErrors({ ...errors, name: "" });
      }
    }

    if (name === "username") {
      if (!regexUsernameValidation.test(value)) {
        setErrors({ ...errors, username: "Harap masukkan username dengan benar" });
      } else if (value == "") {
        setErrors({ ...errors, username: "Username wajib diisi" });
      } else if (value.length <= 8) {
        setErrors({ ...errors, username: "Username harus lebih dari 8 karakter" });
      } else {
        setErrors({ ...errors, username: "" });
      }
    }

    if (name === "email") {
      if (!regexEmailValidation.test(value)) {
        setErrors({ ...errors, email: "Email tidak valid" });
      } else if (value == "") {
        setErrors({ ...errors, email: "Email wajib diisi" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }

    if (name === "phone") {
      if (value == "") {
        setErrors({ ...errors, phone: "Nomor telepon wajib diisi" });
      } else if (value.length <= 11) {
        setErrors({ ...errors, phone: "Nomor telepon harus lebih dari 11 karakter" });
      } else {
        setErrors({ ...errors, phone: "" });
      }
    }

    if (name === "password") {
      if (!regexPasswordValidation.test(value)) {
        setErrors({
          ...errors,
          password: "Kata sandi harus berisi minimal satu huruf kapital dan satu angka",
        });
      } else if (value.length <= 8) {
        setErrors({ ...errors, password: "Kata sandi harus lebih dari 8 karakter" });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }

    if (name === "confirmPassword") {
      if (value !== values.password) {
        setErrors({
          ...errors,
          confirmPassword: "Konfirmasi kata sandi harus sama dengan kata sandi yang dimasukkan",
        });
      } else {
        setErrors({ ...errors, confirmPassword: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");

    if (
      !errors.name &&
      !errors.username &&
      !errors.email &&
      !errors.phone &&
      !errors.password &&
      !errors.confirmPassword
    ) {
      dispatch(addNewUsaer({ name, username, email, phone, password }))
        .then((result) => {
          if (!result.error) {
            setTimeout(
              () => navigate("/login"),
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Register berhasil",
                showConfirmButton: false,
                timer: 2000,
                background: "#ffffff",
              }),
              1000
            );
            setLoading(false);
          } else {
            Swal.fire("Maaf", result.error.message.split(":")[1], "error");
            setLoading(false);
          }
        })
        .catch((error) => {
          setTimeout(
            () =>
              Swal.fire({
                icon: "error",
                title: "Registe gagal",
                text: error.message,
                background: "#ffffff",
              }),
            1000
          );
          setLoading(false);
        });
    } else {
      setTimeout(
        () =>
          Swal.fire({
            icon: "error",
            title: "Registe gagal",
            text: "Harap isi form dengan benar",
            background: "#ffffff",
          }),
        1000
      );
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div className="w-full rounded-20 bg-white shadow-4 dark:border sm:max-w-md md:mt-0 xl:max-w-xl xl:p-0">
        <Link
          to="/"
          className="flex items-center justify-center pt-6 text-2xl font-semibold text-gray-900">
          <img src={icon} className="h-14 w-14" alt="Logo" />
        </Link>
        <form onSubmit={handleSubmit} className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="pb-2 text-center text-xl font-bold leading-tight tracking-wide text-gray-900 md:text-2xl">
            Register
          </h1>
          <div className="md:col-span-2">
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="name" className={errors.name ? labelError : labelNotError}>
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                      Nama Lengkap
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className={errors.name ? inputError : inputNotError}
                    placeholder="Masukkan nama"
                    required
                    autoFocus
                    onChange={handleChange}
                    value={values.name}
                  />
                  {errors.name && (
                    <span className="mt-2 block text-sm text-red-700">{errors.name}</span>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="username" className={errors.name ? labelError : labelNotError}>
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                      Username
                    </span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className={errors.username ? inputError : inputNotError}
                    placeholder="Masukkan username"
                    required
                    onChange={handleChange}
                    value={values.username}
                  />
                  {errors.username && (
                    <span className="mt-2 block text-sm text-red-700">{errors.username}</span>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="email" className={errors.name ? labelError : labelNotError}>
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Masukkan nama belakang"
                    className={errors.name ? inputError : inputNotError}
                    required
                    onChange={handleChange}
                    value={values.email}
                  />
                  {errors.email && (
                    <span className="mt-2 block text-sm text-red-700">{errors.email}</span>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="phone" className={errors.name ? labelError : labelNotError}>
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                      Nomor Telepon
                    </span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="phone"
                    id="phone"
                    placeholder="Masukkan nomor telepon"
                    className={errors.name ? inputError : inputNotError}
                    maxLength={maxLengthPhoneNumber}
                    onInput={maxLengthCheck}
                    required
                    onChange={handleChange}
                    value={values.phone}
                  />
                  {errors.phone && (
                    <span className="mt-2 block text-sm text-red-700">{errors.phone}</span>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="password" className={errors.name ? labelError : labelNotError}>
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                      Password
                    </span>
                  </label>
                  <div className="relative w-full">
                    <input
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      id="password"
                      className={
                        errors.name
                          ? `flex-2 col-span-2 pr-10 ${inputError}`
                          : `flex-2 col-span-2 pr-10 ${inputNotError}`
                      }
                      placeholder="Masukkan password"
                      required
                      onChange={handleChange}
                      value={values.password}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button type="button" onClick={togglePassword}>
                        {passwordShown ? (
                          <i className="fa-light fa-eye mt-1"></i>
                        ) : (
                          <i className="fa-light fa-eye-slash mt-1"></i>
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <span className="mt-2 block text-sm text-red-700">{errors.password}</span>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="confirmPassword"
                    className={errors.name ? labelError : labelNotError}>
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                      Konfirmasi Password
                    </span>
                  </label>
                  <div className="relative w-full">
                    <input
                      type={confirmPasswordShown ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className={
                        errors.name
                          ? `flex-2 col-span-2 pr-10 ${inputError}`
                          : `flex-2 col-span-2 pr-10 ${inputNotError}`
                      }
                      placeholder="Masukkan konfirmasi password"
                      required
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button type="button" onClick={toggleConfirmPassword}>
                        {confirmPasswordShown ? (
                          <i className="fa-light fa-eye mt-1"></i>
                        ) : (
                          <i className="fa-light fa-eye-slash mt-1"></i>
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <span className="mt-2 block text-sm text-red-700">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>
              {loading ? (
                <button className="w-full rounded-lg bg-primary-violet px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
                  <PulseLoader size={7} color={"#ffffff"} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary-violet px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
                  Register
                </button>
              )}
              <p className="text-center text-sm font-light text-gray-500 ">
                Sudah memiliki akun?
                <Link to="/login" className="ml-1 font-medium text-indigo-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRegister;
