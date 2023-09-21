import React, { useState } from "react";
import PrimaryButton from "../../PrimaryButton";
import DangerButton from "../../DangerButton";
import Modal from "../../Modal";
import TextInput from "../../TextInput";
import InputLabel from "../../InputLabel";
import InputError from "../../InputError";
import SecondaryButton from "../../SecondaryButton";
import DangerModal from "../../DangerModal";
import TertiaryButton from "../../TertiaryButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteRole, editRole } from "../../../stores/features/rolesSlice";
import Swal from "sweetalert2";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import { PulseLoader } from "react-spinners";
import QuartenaryButton from "../../QuartenaryButton";

const UPDATE_VALUE = {
  role_name: "",
};

const ManageRoleListItem = ({ roleData }) => {
  const { id, role_name } = roleData;
  const [modalEditTrigger, setModalEditTrigger] = useState(false);
  const [value, setValue] = useState(UPDATE_VALUE);
  const [modalDeleteTrigger, setModalDeleteTrigger] = useState(false);

  const dispatch = useDispatch();
  const loaderSubmit = useSelector((state) => state.loaderSubmit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const role_name = formData.get("role_name");

    dispatch(editRole({ id, role_name }))
      .then((res) => {
        if (!res.error) {
          const Toast = Swal.mixin({
            customClass: {
              title: "text-blue-700",
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
                title: "Role berhasil diperbarui",
              }),
            1000
          );
          dispatch(setLoaderSubmit(false));
          handleModalEditTrigger();
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
              title: "Role gagal diperbarui",
            }),
          1000
        );
        dispatch(setLoaderSubmit(false));
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    try {
      dispatch(deleteRole(id));
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
            icon: "success",
            title: "Role berhasil dihapus",
          }),
        1000
      );
      dispatch(setLoaderSubmit(false));
    } catch (error) {
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
            title: "Role gagal dihapus",
          }),
        1000
      );
      dispatch(setLoaderSubmit(false));
    }
  };

  const handleModalEditTrigger = () => {
    setModalEditTrigger(!modalEditTrigger);
    setValue(UPDATE_VALUE);
  };

  const handleModalDeleteTrigger = () => {
    setModalDeleteTrigger(!modalDeleteTrigger);
  };

  return (
    <div>
      <div className="hidden flex-col border-b border-gray-200 px-6 py-3 md:flex-row md:items-center lg:flex">
        <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-blue-100 text-sm text-secondary-navy">
          <i className="fa-solid fa-user-gear"></i>
        </div>
        <div className="min-w-0 flex-1 flex-col items-center">
          <p className="text-xs font-medium text-neutral-100-2 transition-all duration-300 md:text-sm">
            {role_name}
          </p>
        </div>
        <div>
          <div className="inline-flex items-center space-x-6">
            <TertiaryButton
              type="button"
              className="px-3 py-1 md:px-3 md:py-2"
              onClick={handleModalEditTrigger}>
              <i className="fa-solid fa-pen text-xs md:text-sm"></i>
            </TertiaryButton>
            <DangerButton className="px-3 py-1 md:px-3 md:py-2" onClick={handleModalDeleteTrigger}>
              <i className="fa-solid fa-trash text-xs md:text-sm"></i>
            </DangerButton>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 px-6 py-3 lg:border-none lg:px-0 lg:py-0">
        <div className="flex items-center justify-between lg:hidden">
          <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-blue-100 text-sm text-secondary-navy">
            <i className="fa-solid fa-user-gear"></i>
          </div>
          <div className="min-w-0 flex-1 flex-col items-center">
            <p className="text-xs font-medium text-neutral-100-2 transition-all duration-300 md:text-sm">
              {role_name}
            </p>
          </div>
          <div className="inline-flex items-center space-x-6">
            <TertiaryButton
              type="button"
              className="px-3 py-2 md:px-3 md:py-1.5"
              onClick={handleModalEditTrigger}>
              <i className="fa-solid fa-pen text-xs md:text-base"></i>
            </TertiaryButton>
            <DangerButton
              className="px-3 py-2 md:px-3 md:py-1.5"
              onClick={handleModalDeleteTrigger}>
              <i className="fa-solid fa-trash text-xs md:text-base"></i>
            </DangerButton>
          </div>
        </div>
      </div>

      <Modal show={modalEditTrigger} onClose={handleModalEditTrigger}>
        <form
          className="relative flex max-h-full w-full flex-col overflow-hidden"
          onSubmit={handleUpdate}>
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-xl border-b-2 border-neutral-100 border-opacity-100 p-3">
            <h2 className="p-1.5 text-center text-base font-medium text-gray-900 md:text-lg">
              Edit Role
            </h2>
            <button
              type="button"
              className="cursor-pointer rounded-full bg-transparent p-2 text-xl hover:bg-gray-200"
              onClick={handleModalEditTrigger}>
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
                  className="border border-neutral-60 text-neutral-60 focus:border-primary-violet"
                  placeholder=" "
                  required
                  defaultValue={role_name}
                  onChange={handleChange}
                />

                <InputLabel className="text-neutral-60 peer-focus:text-dark-4" htmlFor="role_name">
                  <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                    Nama Role
                  </span>
                </InputLabel>
              </div>
              <InputError className="mt-2" />
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
                  !value.role_name
                    ? "cursor-not-allowed rounded-10 bg-neutral-20 px-4 py-2.5 text-center text-xs font-semibold text-neutral-60 md:text-sm"
                    : "bg-secondary-navy px-4 py-2.5 font-semibold text-white hover:bg-blue-800 focus:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-secondary-navy "
                }
                disabled={!value.role_name}>
                Simpan Perubahan
              </QuartenaryButton>
            )}

            <SecondaryButton type="button" onClick={handleModalEditTrigger}>
              Batal
            </SecondaryButton>
          </div>
        </form>
      </Modal>

      <DangerModal show={modalDeleteTrigger} onClose={handleModalDeleteTrigger}>
        <form className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Apakah Anda yakin ingin menghapus data ini?
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Data yang telah dihapus tidak dapat dikembalikan.
          </p>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={handleModalDeleteTrigger}>Batal</SecondaryButton>

            {loaderSubmit ? (
              <DangerButton className="ml-3 px-4 py-2">
                <PulseLoader size={7} color={"#ffffff"} />
              </DangerButton>
            ) : (
              <DangerButton className="ml-3 px-4 py-2" onClick={handleDelete}>
                Hapus Data
              </DangerButton>
            )}
          </div>
        </form>
      </DangerModal>
    </div>
  );
};

export default ManageRoleListItem;
