import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editInformationProfileUserRoleDosen,
  editPassword,
  editPhotoProfileUserRoleDosen,
  fetchUserById,
} from "../../stores/features/usersSlice";
import ActionDropdown from "../ActionDropdown";
import {
  imageMimeType,
  regexEmailValidation,
  regexNameValidation,
  regexPasswordValidation,
  regexUsernameValidation,
} from "../../utils/globalVariable";
import Modal from "../Modal";
import TextInput from "../TextInput";
import InputLabel from "../InputLabel";
import InputError from "../InputError";
import { maxLengthCheck } from "../../utils/maxLengthCheck";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import { PulseLoader } from "react-spinners";
import editProfileIcon from "../../assets/img/png/edit-image.png";
import Swal from "sweetalert2";
import Auth from "../../utils/auth";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import QuartenaryButton from "../QuartenaryButton";
import UploadPhotoProfileDropdown from "./UploadPhotoProfileDropdown";
import { setLoaderSubmit } from "../../stores/features/loaderSubmitSlice";
import SkeletonLoadingProfile from "../SkeletonLoadingProfile";
import { useNavigate } from "react-router-dom";

const baseValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
  image: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const baseErrors = {
  name: "",
  username: "",
  email: "",
  phone: "",
  image: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ProfileDosen = ({ maxWidth = "2xl" }) => {
  const [values, setValues] = useState(baseValue);
  const [errors, setErrors] = useState(baseErrors);
  const [editImage, setEditImage] = useState(null);
  const [imageDataURL, setImageDataURL] = useState(null);
  const [modalEditProfileTrigger, setModalEditProfileTrigger] = useState(false);
  const [modalEditPasswordTrigger, setModalEditPasswordTrigger] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.data);
  const loading = useSelector((state) => state.users.loading);
  const status = useSelector((state) => state.users.status);
  const loaderSubmit = useSelector((state) => state.loaderSubmit);

  const { id, name, username, email, phone, profile_image, roles } = user;

  const maxLengthPhoneNumber = 13;
  const MAX_FILE_SIZE_IMAGE = 3072;
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
  }[maxWidth];

  const decodeRefreshToken = jwt_decode(Auth.getRefreshToken());
  const expireRefreshToken = new Date(decodeRefreshToken.exp * 1000);
  const newDecode = JSON.stringify({
    id: id,
    role: roles?.role_name,
    name: name,
    username: username,
    email: email,
    profile: user.profile_images?.image_url,
  });

  useEffect(() => {
    function disableScroll() {
      document.body.style.overflow = "hidden";
    }
    function enableScroll() {
      document.body.style.overflow = "auto";
    }

    if (imageDataURL) {
      disableScroll();
    } else {
      enableScroll();
    }
    return () => {
      enableScroll();
    };
  }, [imageDataURL]);

  useEffect(() => {
    dispatch(fetchUserById());
  }, [loading, dispatch]);

  if (loading) {
    Cookies.set("connect", newDecode, { expires: expireRefreshToken, secure: true });
  }

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
      if (value.trim() === "") {
        setErrors({ ...errors, name: "Nama wajib diisi" });
      } else if (!regexNameValidation.test(value)) {
        setErrors({ ...errors, name: "Nama harus dalam bentuk huruf" });
      } else if (value.length <= 3) {
        setErrors({ ...errors, name: "Nama harus lebih dari 3 karakter" });
      } else {
        setErrors({ ...errors, name: "" });
      }
    }

    if (name === "username") {
      if (value.trim() === "") {
        setErrors({ ...errors, username: "Nama wajib diisi" });
      } else if (!regexUsernameValidation.test(value)) {
        setErrors({ ...errors, username: "Username hanya berisi huruf dan angka" });
      } else if (value.length <= 8) {
        setErrors({ ...errors, username: "Username minimal 8 karakter" });
      } else {
        setErrors({ ...errors, username: "" });
      }
    }

    if (name === "email") {
      if (value.trim() === "") {
        setErrors({ ...errors, email: "Nama wajib diisi" });
      } else if (!regexEmailValidation.test(value)) {
        setErrors({ ...errors, email: "Email tidak valid" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }

    if (name === "phone") {
      if (value.trim() === "") {
        setErrors({ ...errors, phone: "Nomor telepon wajib diisi" });
      } else if (value.length <= 11) {
        setErrors({ ...errors, phone: "Nomor telepon minimal 11 karakter" });
      } else {
        setErrors({ ...errors, phone: "" });
      }
    }

    if (name === "oldPassword") {
      if (value.trim() === "") {
        setErrors({ ...errors, oldPassword: "Kata sandi lama wajib diisi" });
      } else {
        setErrors({ ...errors, oldPassword: "" });
      }
    }

    if (name === "newPassword") {
      if (value.trim() === "") {
        setErrors({ ...errors, newPassword: "Kata sandi baru wajib diisi" });
      } else if (!regexPasswordValidation.test(value)) {
        setErrors({
          ...errors,
          newPassword:
            "Kata sandi harus berisi minimal satu huruf kapital, satu huruf kecil, satu angka, dan satu spesial karakter (@$!%*?&)",
        });
      } else if (value.length <= 8) {
        setErrors({ ...errors, newPassword: "Kata sandi minimal 8 karakter" });
      } else if (value.length > 12) {
        setErrors({ ...errors, newPassword: "Kata sandi maksimal 12 karakter" });
      } else {
        setErrors({ ...errors, newPassword: "" });
      }
    }

    if (name === "confirmPassword") {
      if (value.trim() === "") {
        setErrors({ ...errors, confirmPassword: "Konfirmasi kata sandi baru wajib diisi" });
      } else if (value !== values.newPassword) {
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

  const handleUploadImage = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (!file) return;

    const fileSizeKiloBytes = file.size / 1024;

    if (!file.type.match(imageMimeType)) {
      setErrors({
        ...errors,
        image: "Tipe file yang diunggah harus .png, .jpg atau .jpeg",
      });
      return;
    } else if (fileSizeKiloBytes > MAX_FILE_SIZE_IMAGE) {
      setErrors({
        ...errors,
        image: "Ukuran file yang diunggah maksimal 3 MB",
      });
      return;
    } else {
      setErrors({ ...errors, image: "" });
    }

    setEditImage(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (editImage) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setImageDataURL(result);
        }
      };
      fileReader.readAsDataURL(editImage);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [editImage]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const phone = formData.get("phone");

    if (!errors.name && !errors.username && !errors.email && !errors.phone) {
      dispatch(editInformationProfileUserRoleDosen({ id, name, username, email, phone })).then(
        () => {
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
            () =>
              Toast.fire({
                icon: "success",
                title: "Informasi profile berhasil diubah",
              }),
            1000
          );
          dispatch(setLoaderSubmit(false));
          handleModalEditProfileTrigger();
        }
      );
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
            title: "Mohon periksa kembali data yang diubah",
          }),
        1000
      );
      dispatch(setLoaderSubmit(false));
    }
  };

  const handleUpdateProfileImage = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const image = formData.get("image");

    if (!errors.image) {
      dispatch(editPhotoProfileUserRoleDosen({ id, image })).then((result) => {
        if (result) {
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
            () =>
              Toast.fire({
                icon: "success",
                title: "Foto profile berhasil diubah",
              }),
            1000
          );
          dispatch(setLoaderSubmit(false));
          setImageDataURL(null);
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
        title: "Mohon pilih gambar dengan format yang sesuai",
      });
      dispatch(setLoaderSubmit(false));
    }
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");

    if (values.oldPassword !== "" && values.newPassword !== "" && values.confirmPassword !== "") {
      if (!errors.newPassword && !errors.confirmPassword) {
        dispatch(editPassword({ id, oldPassword, newPassword }))
          .then((result) => {
            if (!result.error) {
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

              Toast.fire({
                icon: "success",
                title: "Password berhasil diubah",
              });
              dispatch(setLoaderSubmit(false));
              Auth.signOut();
              navigate("/login");
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
          .catch((error) => {
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
              icon: "error",
              title: error.message,
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
        title: "Mohon, isi semua data!",
      });
      dispatch(setLoaderSubmit(false));
    }
  };

  const handleModalEditProfileTrigger = () => {
    setModalEditProfileTrigger(!modalEditProfileTrigger);
    setErrors(baseErrors);
    setValues(baseValue);
  };

  const handleModalEditPasswordTrigger = () => {
    setModalEditPasswordTrigger(!modalEditPasswordTrigger);
    setErrors(baseErrors);
    setValues(baseValue);
  };

  const toggleNewPassword = () => {
    setNewPasswordShown(!newPasswordShown);
  };

  const toggleOldPassword = () => {
    setOldPasswordShown(!oldPasswordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
    <div className="px-6">
      {status === "succeeded" ? (
        <div className="mx-auto w-full max-w-sm rounded-lg border border-gray-200 bg-white bg-opacity-90 px-4 shadow-4">
          <div className="flex justify-end px-4 pt-4">
            <div className="group relative">
              <ActionDropdown>
                <ActionDropdown.Trigger>
                  <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-100-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
                    <i className="fa-regular fa-ellipsis"></i>
                  </button>
                </ActionDropdown.Trigger>

                <ActionDropdown.Content>
                  <ActionDropdown.Link
                    as="button"
                    className="relative inline-flex items-center text-yellow-700 hover:bg-yellow-50 focus:bg-yellow-50"
                    onClick={handleModalEditProfileTrigger}>
                    <i className="fa-regular fa-pen flex h-4 w-4 items-center justify-center"></i>

                    <span className="ml-3">Edit Profile</span>
                  </ActionDropdown.Link>
                  <ActionDropdown.Link
                    as="button"
                    className="relative inline-flex items-center text-green-700 hover:bg-green-50 focus:bg-yellow-50"
                    onClick={handleModalEditPasswordTrigger}>
                    <i className="fa-regular fa-lock-keyhole flex h-4 w-4 items-center justify-center"></i>

                    <span className="ml-3">Edit Password</span>
                  </ActionDropdown.Link>
                </ActionDropdown.Content>
              </ActionDropdown>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10">
            <div className="relative mb-1">
              <img
                className="h-32 w-32 rounded-full object-cover object-center shadow-lg"
                src={profile_image?.image_url}
                alt={profile_image?.image_name}
              />

              <form onSubmit={handleUpdateProfileImage} encType="multipart/form-data">
                {imageDataURL && (
                  <div className="duration-200">
                    <div className="relative z-50">
                      <div className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity duration-300 ease-in-out"></div>

                      <div className="fixed inset-0 z-50 flex transform items-center justify-center overflow-y-auto overflow-x-hidden outline-none">
                        <div className="pointer-events-none relative mx-auto flex h-[calc(100%-1rem)] w-full items-center justify-center p-4 min-[576px]:h-[calc(100%-3.5rem)]">
                          <div
                            className={`pointer-events-auto relative flex max-h-full w-full transform flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`}>
                            <div className="relative flex max-h-full w-full flex-col overflow-hidden">
                              <div className="flex flex-shrink-0 items-center justify-between rounded-t-xl border-b-2 border-neutral-100 border-opacity-100 p-3">
                                <h2 className="p-1.5 text-center text-base font-medium text-gray-900 md:text-lg">
                                  Edit Foto Profile
                                </h2>
                                <button
                                  type="button"
                                  className="cursor-pointer rounded-full bg-transparent p-2 text-xl hover:bg-gray-200"
                                  onClick={() => setImageDataURL(null)}>
                                  <i className="fa-solid fa-xmark flex h-6 w-6 items-center justify-center text-gray-800"></i>
                                </button>
                              </div>

                              <div className="space-y-2 overflow-y-auto scroll-smooth p-2">
                                <div className="relative">
                                  <div className="flex w-full items-center justify-center">
                                    <div className="flex flex-col items-center justify-center">
                                      <img
                                        src={imageDataURL}
                                        alt=""
                                        className="objec h-36 w-36 rounded-full border border-dashed border-neutral-80 object-cover object-center md:h-48 md:w-48"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-shrink-0 flex-wrap items-center justify-end space-x-2 rounded-b-xl border-t-2 border-neutral-100 border-opacity-100 py-3 pl-3 pr-6">
                                {loaderSubmit ? (
                                  <PrimaryButton className="px-4 py-2.5">
                                    <PulseLoader size={7} color={"#ffffff"} />
                                  </PrimaryButton>
                                ) : (
                                  <PrimaryButton type="submit" className="px-4 py-2.5">
                                    Simpan
                                  </PrimaryButton>
                                )}

                                <SecondaryButton
                                  type="button"
                                  onClick={() => setImageDataURL(null)}>
                                  Batal
                                </SecondaryButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 right-0 flex items-center justify-center">
                  <UploadPhotoProfileDropdown>
                    <UploadPhotoProfileDropdown.Trigger>
                      <img
                        src={editProfileIcon}
                        alt="edit-image"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-secondary-soft-white object-cover object-center p-1 ring-2 ring-gray-300"
                      />
                    </UploadPhotoProfileDropdown.Trigger>

                    <UploadPhotoProfileDropdown.Content>
                      <UploadPhotoProfileDropdown.Input>
                        <label
                          htmlFor="image"
                          className="absolute inline-flex h-full w-full cursor-pointer items-center justify-center">
                          <i className="fa-regular fa-hand-back-point-up flex h-4 w-4 items-center justify-center"></i>
                          <span className="ml-3">Pilih gambar</span>
                        </label>
                      </UploadPhotoProfileDropdown.Input>
                    </UploadPhotoProfileDropdown.Content>
                    <input
                      id="image"
                      name="image"
                      className="invisible absolute h-full w-full"
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                    />
                  </UploadPhotoProfileDropdown>
                </div>
              </form>
            </div>
            {errors.image && <InputError className="mt-2 mb-3" message={errors.image} />}
            <h5 className="mb-1 text-xl font-semibold text-gray-900">{name}</h5>
            <span className="text-sm text-gray-500">{username}</span>
            <div className="mt-4 grid grid-cols-1 gap-3 md:mt-6 md:grid-cols-1">
              <div className="mx-4 text-center">
                <span className="font-semibold text-gray-400">Email</span>
                <p className="font-medium text-gray-900">{email}</p>
              </div>
              <div className="mx-4 text-center">
                <span className="font-semibold text-gray-400">Nomor Telepon</span>
                <p className="font-medium text-gray-900">{phone}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonLoadingProfile />
      )}

      <Modal show={modalEditProfileTrigger} onClose={handleModalEditProfileTrigger}>
        <form
          className="relative flex max-h-full w-full flex-col overflow-hidden"
          onSubmit={handleUpdate}>
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-xl border-b-2 border-neutral-100 border-opacity-100 p-3">
            <h2 className="p-1.5 text-center text-base font-medium text-gray-900 md:text-lg">
              Edit Profile
            </h2>
            <button
              type="button"
              className="cursor-pointer rounded-full bg-transparent p-2 text-xl hover:bg-gray-200"
              onClick={handleModalEditProfileTrigger}>
              <i className="fa-solid fa-xmark flex h-6 w-6 items-center justify-center text-gray-800"></i>
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto scroll-smooth p-6">
            <div>
              <div className="relative">
                <TextInput
                  id="name"
                  type="text"
                  name="name"
                  className={
                    errors.name
                      ? "border border-secondary-red text-secondary-red focus:border-secondary-red"
                      : "border border-neutral-60 text-neutral-60 focus:border-primary-violet"
                  }
                  placeholder=" "
                  required
                  autoFocus
                  onChange={handleChange}
                  defaultValue={user?.name}
                />

                <InputLabel
                  className={
                    errors.name
                      ? "text-secondary-red peer-focus:text-secondary-red"
                      : "text-neutral-60 peer-focus:text-dark-4"
                  }
                  htmlFor="name">
                  <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                    Nama
                  </span>
                </InputLabel>
              </div>
              {errors.name && <InputError className="mt-2" message={errors.name} />}
            </div>
            <div>
              <div className="relative">
                <TextInput
                  id="username"
                  type="text"
                  name="username"
                  className={
                    errors.username
                      ? "border border-secondary-red text-secondary-red focus:border-secondary-red"
                      : "border border-neutral-60 text-neutral-60 focus:border-primary-violet"
                  }
                  placeholder=" "
                  required
                  onChange={handleChange}
                  defaultValue={user?.username}
                />

                <InputLabel
                  className={
                    errors.username
                      ? "text-secondary-red peer-focus:text-secondary-red"
                      : "text-neutral-60 peer-focus:text-dark-4"
                  }
                  htmlFor="username">
                  <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                    Username
                  </span>
                </InputLabel>
              </div>
              {errors.username && <InputError className="mt-2" message={errors.username} />}
            </div>
            <div>
              <div className="relative">
                <TextInput
                  id="phone"
                  type="number"
                  min="1"
                  name="phone"
                  className={
                    errors.phone
                      ? "border border-secondary-red text-secondary-red focus:border-secondary-red"
                      : "border border-neutral-60 text-neutral-60 focus:border-primary-violet"
                  }
                  placeholder=" "
                  maxLength={maxLengthPhoneNumber}
                  onInput={maxLengthCheck}
                  required
                  onChange={handleChange}
                  defaultValue={user?.phone}
                />

                <InputLabel
                  className={
                    errors.phone
                      ? "text-secondary-red peer-focus:text-secondary-red"
                      : "text-neutral-60 peer-focus:text-dark-4"
                  }
                  htmlFor="phone">
                  <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                    Nomor Telepon
                  </span>
                </InputLabel>

                {errors.phone && <InputError className="mt-2" message={errors.phone} />}
              </div>
            </div>
            <div>
              <div className="relative">
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  className={
                    errors.email
                      ? "border border-secondary-red text-secondary-red focus:border-secondary-red"
                      : "border border-neutral-60 text-neutral-60 focus:border-primary-violet"
                  }
                  placeholder=" "
                  required
                  onChange={handleChange}
                  defaultValue={user?.email}
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

                {errors.email && <InputError className="mt-2" message={errors.email} />}
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end space-x-2 rounded-b-xl border-t-2 border-neutral-100 border-opacity-100 py-3 pl-3 pr-6">
            {loaderSubmit ? (
              <PrimaryButton className="px-4 py-2.5">
                <PulseLoader size={7} color={"#ffffff"} />
              </PrimaryButton>
            ) : (
              <QuartenaryButton
                type="submit"
                className={
                  !values.name && !values.username && !values.email && !values.phone
                    ? "cursor-not-allowed rounded-10 bg-neutral-20 px-4 py-2.5 text-center text-xs font-semibold text-neutral-60 md:text-sm"
                    : "bg-secondary-navy px-4 py-2.5 font-semibold text-white hover:bg-blue-800 focus:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-secondary-navy "
                }
                disabled={!values.name && !values.username && !values.email && !values.phone}>
                Simpan Perubahan
              </QuartenaryButton>
            )}

            <SecondaryButton type="button" onClick={handleModalEditProfileTrigger}>
              Batal
            </SecondaryButton>
          </div>
        </form>
      </Modal>
      <Modal show={modalEditPasswordTrigger} onClose={handleModalEditPasswordTrigger}>
        <form
          className="relative flex max-h-full w-full flex-col overflow-hidden"
          onSubmit={handleUpdatePassword}>
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-xl border-b-2 border-neutral-100 border-opacity-100 p-3">
            <h2 className="p-1.5 text-center text-base font-medium text-gray-900 md:text-lg">
              Edit Password
            </h2>

            <button
              type="button"
              className="cursor-pointer rounded-full bg-transparent p-2 text-xl hover:bg-gray-200"
              onClick={handleModalEditPasswordTrigger}>
              <i className="fa-solid fa-xmark flex h-6 w-6 items-center justify-center text-gray-800"></i>
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto scroll-smooth p-6">
            <div>
              <div className="relative grid grid-flow-col grid-cols-2 gap-0">
                <TextInput
                  id="oldPassword"
                  type={oldPasswordShown ? "text" : "password"}
                  name="oldPassword"
                  className={
                    errors.password
                      ? "flex-2 col-span-2 border border-secondary-red text-secondary-red focus:border-secondary-red"
                      : "flex-2 col-span-2 border border-neutral-60 text-neutral-60 focus:border-primary-violet"
                  }
                  placeholder=" "
                  onChange={handleChange}
                  value={values.oldPassword}
                  onBlur={handleChange}
                />

                <InputLabel
                  className={
                    errors.oldPassword
                      ? "text-secondary-red peer-focus:text-secondary-red"
                      : "text-neutral-60 peer-focus:text-dark-4"
                  }
                  htmlFor="oldPassword">
                  <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                    Password Lama
                  </span>
                </InputLabel>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button type="button" onClick={toggleOldPassword}>
                    {oldPasswordShown ? (
                      <i className="fa-light fa-eye"></i>
                    ) : (
                      <i className="fa-light fa-eye-slash"></i>
                    )}
                  </button>
                </div>
              </div>
              {errors.oldPassword && <InputError className="mt-2" message={errors.oldPassword} />}
            </div>
            <div>
              <div className="relative grid grid-flow-col grid-cols-2 gap-0">
                <TextInput
                  id="newPassword"
                  type={newPasswordShown ? "text" : "password"}
                  name="newPassword"
                  className={
                    errors.newPassword
                      ? "flex-2 col-span-2 border border-secondary-red text-secondary-red focus:border-secondary-red"
                      : "flex-2 col-span-2 border border-neutral-60 text-neutral-60 focus:border-primary-violet"
                  }
                  placeholder=" "
                  onChange={handleChange}
                  value={values.newPassword}
                  onBlur={handleChange}
                />

                <InputLabel
                  className={
                    errors.newPassword
                      ? "text-secondary-red peer-focus:text-secondary-red"
                      : "text-neutral-60 peer-focus:text-dark-4"
                  }
                  htmlFor="newPassword">
                  <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                    Password Baru
                  </span>
                </InputLabel>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button type="button" onClick={toggleNewPassword}>
                    {newPasswordShown ? (
                      <i className="fa-light fa-eye"></i>
                    ) : (
                      <i className="fa-light fa-eye-slash"></i>
                    )}
                  </button>
                </div>
              </div>
              {errors.newPassword && <InputError className="mt-2" message={errors.newPassword} />}
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
                      : "flex-2 col-span-2 border border-neutral-60 text-neutral-60 focus:border-primary-violet"
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
          </div>
          <div className="border-t-2 border-neutral-100 border-opacity-100">
            <div className="inline-flex items-center px-6 pt-2">
              <i className="fa-regular fa-circle-info mr-3 text-xs text-gray-900 md:text-sm"></i>
              <h5 className="text-xs font-normal text-gray-900 md:text-sm">
                Setelah update password, akan otomatis logout
              </h5>
            </div>
            <div className="flex flex-shrink-0 flex-wrap items-center justify-end space-x-2 rounded-b-xl py-3 pl-3 pr-6">
              {loaderSubmit ? (
                <PrimaryButton className="px-4 py-2.5">
                  <PulseLoader size={7} color={"#ffffff"} />
                </PrimaryButton>
              ) : (
                <PrimaryButton type="submit" className="px-4 py-2.5">
                  Update Password
                </PrimaryButton>
              )}

              <SecondaryButton type="button" onClick={handleModalEditPasswordTrigger}>
                Batal
              </SecondaryButton>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfileDosen;
