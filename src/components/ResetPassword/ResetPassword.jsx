import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { regexPasswordValidation } from "../../utils/globalVariable";
import { setLoaderSubmit } from "../../stores/features/loaderSubmitSlice";
import useQuery from "../../hooks/useQuery";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../PrimaryButton";
import { PulseLoader } from "react-spinners";
import InputLabel from "../InputLabel";
import InputError from "../InputError";
import TextInput from "../TextInput";
import icon from "../../assets/img/png/icon.png";
import { resetPassword, verifyResetPasswordToken } from "../../stores/features/authSlice";
import AuthAPI from "../../apis/auth.api";

const baseValue = {
  password: "",
  confirmPassword: "",
};

const baseErrors = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const [values, setValues] = useState(baseValue);
  const [errors, setErrors] = useState(baseErrors);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const loaderSubmit = useSelector((state) => state.loaderSubmit);
  const statusVerify = useSelector((state) => state.auth.status);
  const verifyTokenResetPassword = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let query = useQuery();
  const token = query.get("token");
  const id = query.get("id");

  const verifyUser = () => {
    AuthAPI.verifyResetPasswordToken({ id, token })
      .then((result) => {
        if (result.data.meta.status === 201) {
          if (result.data.payload.used === 1) {
            navigate("*");
          }
        }
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          navigate("/resetPassword/status?token=expired");
        }
      });
  };

  useEffect(() => {
    dispatch(verifyResetPasswordToken({ id, token }));
  }, [dispatch, verifyTokenResetPassword]);

  useEffect(() => {
    verifyUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    validation(name, value);
  };

  const validation = (name, value) => {
    if (name === "password") {
      if (value.trim() === "") {
        setErrors({ ...errors, password: "Kata sandi baru wajib diisi" });
      } else if (!regexPasswordValidation.test(value)) {
        setErrors({
          ...errors,
          password:
            "Kata sandi harus berisi minimal satu huruf kapital, satu huruf kecil, satu angka, dan satu spesial karakter (@$!%*?&)",
        });
      } else if (value.length <= 8) {
        setErrors({ ...errors, password: "Kata sandi baru minimal 8 karakter" });
      } else if (value.length > 12) {
        setErrors({ ...errors, password: "Kata sandi maksimal 12 karakter" });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }

    if (name === "confirmPassword") {
      if (value.trim() === "") {
        setErrors({ ...errors, confirmPassword: "Konfirmasi kata sandi wajib diisi" });
      } else if (value !== values.password) {
        setErrors({
          ...errors,
          confirmPassword:
            "Konfirmasi kata sandi harus sama dengan kata sandi yang dimasukkan sebelumnya",
        });
      } else {
        setErrors({ ...errors, confirmPassword: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const password = formData.get("password");

    if (values.password !== "" && values.confirmPassword !== "") {
      if (!errors.password && !errors.confirmPassword) {
        dispatch(resetPassword({ id, token, password }))
          .then((result) => {
            if (!result.error) {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton:
                    "focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2",
                  cancelButton:
                    "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800",
                },
                buttonsStyling: false,
              });

              swalWithBootstrapButtons
                .fire({
                  title: "Password berhasil di atur ulang",
                  text: "Silahkan login kembali",
                  icon: "success",
                  showCancelButton: true,
                  confirmButtonText: "Login",
                  cancelButtonText: "Batal",
                  reverseButtons: true,
                })
                .then(async (result) => {
                  if (result.isConfirmed) {
                    navigate("/login");
                  } else {
                    setValues(baseValue);
                  }
                }),
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
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "error",
                title: result.error.message.split(":")[1],
              });
              dispatch(setLoaderSubmit(false));
            }
          })
          .catch(() => {
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

            Toast.fire({
              icon: "error",
              title: "Password gagal diatur ulang",
            });
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
          icon: "warning",
          title: "Mohon isi data dengan benar",
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
        title: "Mohon, isi semua data",
      });
      dispatch(setLoaderSubmit(false));
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
    <div>
      {statusVerify === "succeeded" ? (
        <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="w-full rounded-20 bg-white shadow-4 sm:max-w-md md:mt-0 xl:p-0">
            <div className="flex items-center justify-center pt-6 text-2xl font-semibold text-gray-900">
              <img src={icon} className="h-14 w-14" alt="Logo" />
            </div>
            <div className="space-y-4 p-6 sm:px-8 sm:pb-8 sm:pt-4 md:space-y-6">
              <h1 className="pb-2 text-center text-xl font-bold leading-tight tracking-wide text-gray-900 md:text-xl">
                Atur Ulang Password
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
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
                        Password Baru
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
                <div>
                  <div className="relative grid grid-flow-col grid-cols-2 gap-0">
                    <TextInput
                      id="confirmPassword"
                      type={confirmPasswordShown ? "text" : "password"}
                      name="confirmPassword"
                      className={
                        errors.confirmPassword
                          ? "flex-2 col-span-2 border border-secondary-red text-secondary-red focus:border-secondary-red"
                          : "flex-2 col-span-2 border border-neutral-20 text-neutral-60 focus:border-primary-violet"
                      }
                      placeholder=" "
                      onChange={handleChange}
                      onBlur={handleChange}
                    />

                    <InputLabel
                      className={
                        errors.confirmPassword
                          ? "text-secondary-red peer-focus:text-secondary-red"
                          : "text-neutral-60 peer-focus:text-dark-4"
                      }
                      htmlFor="confirmPassword">
                      <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                        Konfirmasi Password Baru
                      </span>
                    </InputLabel>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button type="button" onClick={toggleConfirmPassword}>
                        {confirmPasswordShown ? (
                          <i className="fa-light fa-eye"></i>
                        ) : (
                          <i className="fa-light fa-eye-slash"></i>
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <InputError className="mt-2" message={errors.confirmPassword} />
                  )}
                </div>
                {loaderSubmit ? (
                  <PrimaryButton className="w-full px-4 py-2.5">
                    <PulseLoader size={7} color={"#ffffff"} />
                  </PrimaryButton>
                ) : (
                  <PrimaryButton type="submit" className="w-full px-4 py-2.5">
                    Atur Ulang Password
                  </PrimaryButton>
                )}
              </form>
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

export default ResetPassword;
