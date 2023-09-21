import React, { useEffect, useState } from "react";
import {
  regexEmailValidation,
  regexNameValidation,
  regexPasswordValidation,
  regexUsernameValidation,
} from "../../../utils/globalVariable";
import ManageDosenListItem from "./ManageDosenListItem";
import Modal from "../../Modal";
import TextInput from "../../TextInput";
import InputLabel from "../../InputLabel";
import InputError from "../../InputError";
import PrimaryButton from "../../PrimaryButton";
import SecondaryButton from "../../SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import UsersAPI from "../../../apis/users.api";
import { fetchRoles } from "../../../stores/features/rolesSlice";
import SelectInput from "../../SelectInput";
import Swal from "sweetalert2";
import { addNewUsaer } from "../../../stores/features/usersSlice";
import { maxLengthCheck } from "../../../utils/maxLengthCheck";
import { PulseLoader } from "react-spinners";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import SkeletonLoadingManageDosen from "./SkeletonLoadingManageDosen";
import Pagination from "../../Pagination";

const Initial_Users_Dosen = {
  data: [],
  page: 0,
  status: false,
};

const baseValue = {
  name: "",
  roleId: "",
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
  roleId: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const ManageDosenLists = () => {
  const [dosen, setDosen] = useState(Initial_Users_Dosen);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [modalCreateTrigger, setModalCreateTrigger] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [values, setValues] = useState(baseValue);
  const [errors, setErrors] = useState(baseErrors);
  const [search_query, setSearch_query] = useState("");
  const [debouncedKeyword] = useDebounce(search_query, 1300);

  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.data);
  const loading = useSelector((state) => state.users.loading);
  const loaderSubmit = useSelector((state) => state.loaderSubmit);

  useEffect(() => {
    if (debouncedKeyword) {
      UsersAPI.searchUsersByRoleDosen(debouncedKeyword.toLowerCase(), 10, page).then((result) => {
        setDosen({
          status: true,
          data: result.data.payload,
          page: result.data.meta.page,
        });
        setPage(result.data.meta.page);
        setPages(result.data.meta.totalPage);
        setRows(result.data.meta.totalRows);
      });
    } else {
      UsersAPI.getUsersByRoleDosen(10, page).then((result) => {
        setDosen({
          status: true,
          data: result.data.payload,
          page: result.data.meta.page,
        });
        setPage(result.data.meta.page);
        setPages(result.data.meta.totalPage);
        setRows(result.data.meta.totalRows);
      });
    }
  }, [loading, debouncedKeyword, page]);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

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
      } else if (value.trim() === "") {
        setErrors({ ...errors, name: "Nama wajib diisi" });
      } else {
        setErrors({ ...errors, name: "" });
      }
    }

    if (name === "username") {
      if (value.trim() === "") {
        setErrors({ ...errors, username: "Username wajib diisi" });
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
        setErrors({ ...errors, email: "Email wajib diisi" });
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

    if (name === "password") {
      if (value.trim() === "") {
        setErrors({ ...errors, password: "Password wajib diisi" });
      } else if (!regexPasswordValidation.test(value)) {
        setErrors({
          ...errors,
          password:
            "Kata sandi harus berisi minimal satu huruf kapital, satu huruf kecil, satu angka, dan satu spesial karakter (@$!%*?&)",
        });
      } else if (value.length <= 8) {
        setErrors({ ...errors, password: "Kata sandi minimal 8 karakter" });
      } else if (value.length > 12) {
        setErrors({ ...errors, password: "Kata sandi maksimal 12 karakter" });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }

    if (name === "confirmPassword") {
      if (value.trim() === "") {
        setErrors({ ...errors, confirmPassword: "Konfirmasi password wajib diisi" });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const username = formData.get("username");
    const roleId = formData.get("roleId");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const password = formData.get("password");

    if (
      values.name === "" ||
      values.username === "" ||
      values.email === "" ||
      values.phone === "" ||
      values.roleId === "" ||
      values.password === "" ||
      values.confirmPassword === ""
    ) {
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
    } else {
      if (
        !errors.name &&
        !errors.username &&
        !errors.email &&
        !errors.phone &&
        !errors.password &&
        !errors.confirmPassword
      ) {
        dispatch(addNewUsaer({ name, username, roleId, email, phone, password }))
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

              setTimeout(
                () =>
                  Toast.fire({
                    icon: "success",
                    title: "Dosen berhasil ditambahkan",
                  }),
                1000
              );
              dispatch(setLoaderSubmit(false));
              handleModalCreateTrigger();
              setValues(baseValue);
              setErrors(baseErrors);
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
            setTimeout(
              () =>
                Swal.fire({
                  icon: "error",
                  title: "Data dosen gagal ditambahkan",
                  text: error.message,
                  background: "#ffffff",
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
          icon: "warning",
          title: "Mohon isi data dengan benar",
        });
        dispatch(setLoaderSubmit(false));
      }
    }
  };

  const handleSearchTrigger = () => {
    setSearchTrigger(!searchTrigger);
    setSearch_query("");
  };

  const handleModalCreateTrigger = () => {
    setModalCreateTrigger(!modalCreateTrigger);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const handleClearSearchInput = () => {
    setSearch_query("");
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <div className="container mx-auto w-full px-6">
      <div className="fixed left-0 right-0 z-20 w-full bg-white bg-opacity-90 px-6 py-2">
        <div className="flex items-center">
          <div className="hidden min-w-0 flex-1 md:block">
            <h2 className="text-sm font-medium text-neutral-100-2 md:pl-52 md:text-lg">
              Mengelola Dosen
            </h2>
          </div>
          {searchTrigger ? (
            <button
              type="button"
              className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-blue-500 hover:bg-blue-100 hover:text-blue-600 md:hidden"
              onClick={handleSearchTrigger}>
              <i className="fa-solid fa-arrow-left text-xl"></i>
            </button>
          ) : (
            <div className="block min-w-0 flex-1 md:hidden">
              <h2 className="text-sm font-medium text-neutral-100-2 md:pl-52 md:text-lg">
                Mengelola Dosen
              </h2>
            </div>
          )}
          <div className="inline-flex items-center text-sm font-medium text-neutral-100-2">
            <div className="relative mt-1 mr-3 mb-1 hidden w-full md:block md:w-48 lg:w-80">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-dark-4">
                <i className="fa-regular fa-magnifying-glass text-sm"></i>
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-neutral-20 bg-transparent p-2 pl-10 pr-6 text-sm text-neutral-100-2 placeholder-neutral-80 placeholder:font-normal placeholder:text-neutral-60 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Cari data dosen"
                required
                value={search_query}
                onChange={(e) => setSearch_query(e.target.value)}
                title="Cari data dosen"
              />
              {search_query && (
                <button
                  type="button"
                  className="absolute inset-y-0 bottom-0 top-0 right-0 mt-2 mr-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-gray-300"
                  onClick={handleClearSearchInput}>
                  <i className="fa-solid fa-xmark text-base text-gray-700"></i>
                </button>
              )}
            </div>
            <div className={searchTrigger ? "hidden" : "mr-5 inline-flex items-center md:hidden"}>
              <button
                type="button"
                className={
                  searchTrigger
                    ? "hidden"
                    : "inset-y-0 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
                }
                onClick={handleSearchTrigger}>
                <i className="fa-regular fa-magnifying-glass text-base text-gray-500"></i>
              </button>
            </div>
            {searchTrigger ? null : (
              <PrimaryButton
                type="button"
                className="block px-3 py-1.5 md:hidden md:px-3 md:py-1"
                onClick={handleModalCreateTrigger}>
                <i className="fa-solid fa-plus text-sm md:text-lg"></i>
              </PrimaryButton>
            )}
            <PrimaryButton
              type="button"
              className="hidden px-3 py-1.5 md:block md:px-3 md:py-1"
              onClick={handleModalCreateTrigger}>
              <i className="fa-solid fa-plus text-sm md:text-lg"></i>
            </PrimaryButton>
          </div>

          {searchTrigger && (
            <div className="flex w-full items-center transition-all duration-300 md:hidden">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full md:w-48 lg:w-80">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-dark-4">
                  <i className="fa-regular fa-magnifying-glass text-sm"></i>
                </div>
                <input
                  type="text"
                  className="block w-full rounded-lg border border-neutral-20 bg-transparent p-2 pl-8 pr-6 text-sm text-neutral-100-2 placeholder-neutral-80 placeholder:text-neutral-60 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Cari data dosen"
                  required
                  value={search_query}
                  autoFocus
                  onChange={(e) => setSearch_query(e.target.value)}
                  title="Cari data dosen"
                />
                {search_query && (
                  <button
                    type="button"
                    className="absolute inset-y-0 bottom-0 top-0 right-0 mt-2 mr-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-gray-300"
                    onClick={handleClearSearchInput}>
                    <i className="fa-solid fa-xmark text-base text-gray-700"></i>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal show={modalCreateTrigger} onClose={handleModalCreateTrigger}>
        <form
          className="relative flex max-h-full w-full flex-col overflow-hidden"
          onSubmit={handleSubmit}>
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-xl border-b-2 border-neutral-100 border-opacity-100 p-3">
            <h2 className="p-1.5 text-center text-base font-medium text-gray-900 md:text-lg">
              Tambah Dosen
            </h2>
            <button
              type="button"
              className="cursor-pointer rounded-full bg-transparent p-2 text-xl hover:bg-gray-200"
              onClick={handleModalCreateTrigger}>
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
                  autoFocus
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleChange}
                />

                <InputLabel
                  className={
                    errors.name
                      ? "text-secondary-red peer-focus:text-secondary-red"
                      : "text-neutral-60 peer-focus:text-dark-4"
                  }
                  htmlFor="name">
                  <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                    Nama Dosen
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
                  onChange={handleChange}
                  value={values.username}
                  onBlur={handleChange}
                />

                <InputLabel
                  className={
                    errors.username
                      ? "text-secondary-red peer-focus:text-secondary-red"
                      : "text-neutral-60 peer-focus:text-dark-4"
                  }
                  htmlFor="username">
                  <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                    Username Dosen
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
                  onChange={handleChange}
                  value={values.phone}
                  onBlur={handleChange}
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
              </div>
              {errors.phone && <InputError className="mt-2" message={errors.phone} />}
            </div>
            <div className="relative">
              <InputLabel htmlFor="roleId">
                <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                  Role
                </span>
              </InputLabel>
              <SelectInput
                className="mt-1"
                id="roleId"
                name="roleId"
                onChange={handleChange}
                value={values.roleId}>
                <option>Pilih role</option>
                {roles
                  ?.map((role) => {
                    return (
                      <option value={role.id} key={role.id}>
                        {role.role_name}
                      </option>
                    );
                  })
                  .sort((a, b) => (a > b ? 1 : -1))}
              </SelectInput>
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
                      : "flex-2 col-span-2 border border-neutral-60 text-neutral-60 focus:border-primary-violet"
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
                    Konfirmasi Password
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

            <SecondaryButton type="button" onClick={handleModalCreateTrigger}>
              Batal
            </SecondaryButton>
          </div>
        </form>
      </Modal>
      {dosen.status ? (
        <div>
          {dosen.data?.length > 0 ? (
            <div>
              <div className="mb-6 grid grid-cols-1 gap-3 pt-20 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                {dosen.data?.map((dosen) => {
                  return <ManageDosenListItem key={dosen.id} dosenData={dosen} />;
                })}
              </div>
              <Pagination>
                <Pagination.PaginationContent key={rows}>
                  <Pagination.PaginationInfo>
                    <span>Total data: {dosen.data?.length} </span>
                    <span className="mr-1">
                      halaman: {rows ? page + 1 : 0} dari {pages}
                    </span>
                  </Pagination.PaginationInfo>
                  <Pagination.PaginationLink
                    pageCount={Math.min(10, pages)}
                    onPageChange={changePage}
                  />
                </Pagination.PaginationContent>
              </Pagination>
            </div>
          ) : (
            <div className="pt-20 pb-6">
              <div className="flex flex-wrap items-center justify-center py-4 text-xs font-semibold leading-7 text-neutral-80">
                <i className="fa-regular fa-circle-info mr-3 text-sm"></i>
                Data dosen tidak ditemukan
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-6 grid grid-cols-1 gap-3 pt-20 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          <SkeletonLoadingManageDosen />
          <SkeletonLoadingManageDosen />
          <SkeletonLoadingManageDosen />
          <SkeletonLoadingManageDosen />
          <SkeletonLoadingManageDosen />
          <SkeletonLoadingManageDosen />
        </div>
      )}
    </div>
  );
};

export default ManageDosenLists;
