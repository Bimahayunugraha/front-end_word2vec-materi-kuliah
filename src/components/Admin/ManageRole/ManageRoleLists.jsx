import React, { useState, useEffect } from "react";
import ManageRoleListItem from "./ManageRoleListItem";
import Modal from "../../Modal";
import TextInput from "../../TextInput";
import InputLabel from "../../InputLabel";
import InputError from "../../InputError";
import PrimaryButton from "../../PrimaryButton";
import SecondaryButton from "../../SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import { addRole, fetchRoles } from "../../../stores/features/rolesSlice";
import SkeletonLoadingManageRole from "./SkeletonLoadingManageRole";
import Swal from "sweetalert2";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import { PulseLoader } from "react-spinners";

const baseValue = {
  role_name: "",
};

const baseErrors = {
  role_name: "",
};

const ManageRoleLists = () => {
  const [modalCreateTrigger, setModalCreateTrigger] = useState(false);
  const [values, setValues] = useState(baseValue);
  const [errors, setErrors] = useState(baseErrors);

  const roles = useSelector((state) => state.roles.data);
  const status = useSelector((state) => state.roles.status);
  const loading = useSelector((state) => state.roles.loading);
  const loaderSubmit = useSelector((state) => state.loaderSubmit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
  }, [loading, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    validation(name, value);
  };

  const validation = (name, value) => {
    if (name === "role_name") {
      if (value.trim() === "") {
        setErrors({ ...errors, role_name: "Nama role wajib diisi" });
      } else {
        setErrors({ ...errors, role_name: "" });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const role_name = formData.get("role_name").toLocaleLowerCase();

    if (values.role_name === "") {
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
        title: "Mohon, isi data nama role",
      });
      dispatch(setLoaderSubmit(false));
    } else {
      dispatch(addRole({ role_name }))
        .then((res) => {
          if (!res.error) {
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
                  title: "Role berhasil ditambahkan",
                }),
              1000
            );
            dispatch(setLoaderSubmit(false));
            handleModalCreateTrigger();
            setValues(baseValue);
          }
        })
        .catch(() => {
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
          setTimeout(
            () =>
              Toast.fire({
                icon: "error",
                title: "Role gagal ditambahkan",
              }),
            1000
          );
          dispatch(setLoaderSubmit(false));
        });
    }
  };

  const handleModalCreateTrigger = () => {
    setModalCreateTrigger(!modalCreateTrigger);
  };

  return (
    <div className="container mx-auto w-full px-6">
      <div className="fixed left-0 right-0 z-20 w-full bg-white bg-opacity-90 px-6 py-2">
        <div className="flex items-center space-x-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-medium text-neutral-100-2 md:pl-52 md:text-lg">
              Mengelola Role
            </h2>
          </div>
          <PrimaryButton
            type="button"
            className={roles?.length === 2 ? "hidden" : "px-3 py-1.5 md:px-3 md:py-1"}
            onClick={handleModalCreateTrigger}>
            <i className="fa-solid fa-plus text-sm md:text-lg"></i>
          </PrimaryButton>
        </div>
      </div>
      <Modal show={modalCreateTrigger} onClose={handleModalCreateTrigger}>
        <form
          className="relative flex max-h-full w-full flex-col overflow-hidden"
          onSubmit={handleSubmit}>
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-xl border-b-2 border-neutral-100 border-opacity-100 p-3">
            <h2 className="p-1.5 text-center text-base font-medium text-gray-900 md:text-lg">
              Tambah Role
            </h2>
            <button
              type="button"
              className="cursor-pointer rounded-full bg-transparent p-2 text-xl hover:bg-gray-200"
              onClick={handleModalCreateTrigger}>
              <i className="fa-solid fa-xmark flex h-6 w-6 items-center justify-center text-gray-800"></i>
            </button>
          </div>
          <div className="space-y-6 overflow-y-auto scroll-smooth p-6">
            <div>
              <div className="relative">
                <TextInput
                  id="role_name"
                  type="text"
                  name="role_name"
                  className={
                    errors.role_name
                      ? "border border-secondary-red text-secondary-red focus:border-secondary-red"
                      : "border border-neutral-60 text-neutral-60 focus:border-primary-violet"
                  }
                  placeholder=" "
                  onChange={handleChange}
                  value={values.role_name}
                  onBlur={handleChange}
                />
                <InputLabel
                  className={
                    errors.role_name
                      ? "text-secondary-red peer-focus:text-secondary-red"
                      : "text-neutral-60 peer-focus:text-dark-4"
                  }
                  htmlFor="role_name">
                  <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                    Nama Role
                  </span>
                </InputLabel>
              </div>
              {errors.role_name && <InputError className="mt-2" message={errors.role_name} />}
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
      <div className="mb-6 pt-20">
        {status === "succeeded" ? (
          <div className="w-full rounded-xl bg-white shadow-4">
            {roles?.length > 0 ? (
              <div>
                {roles?.map((role) => {
                  return <ManageRoleListItem key={role.id} roleData={role} />;
                })}
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center py-4 text-xs font-semibold leading-7 text-neutral-80">
                <i className="fa-regular fa-circle-info mr-3 text-sm"></i>
                Data role tidak ditemukan
              </div>
            )}
          </div>
        ) : (
          <div>
            <SkeletonLoadingManageRole />
            <SkeletonLoadingManageRole />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRoleLists;
