import React, { useState } from "react";
import ActionDropdown from "../../ActionDropdown";
import DangerModal from "../../DangerModal";
import SecondaryButton from "../../SecondaryButton";
import DangerButton from "../../DangerButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserByIdForRoleDosen } from "../../../stores/features/usersSlice";
import Swal from "sweetalert2";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import { PulseLoader } from "react-spinners";

const ManageDosenListItem = ({ dosenData }) => {
  const { id, name, username, roles, email, phone, profile_image } = dosenData;
  const [modalDeleteTrigger, setModalDeleteTrigger] = useState(false);

  const dispatch = useDispatch();
  const loaderSubmit = useSelector((state) => state.loaderSubmit);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    try {
      dispatch(deleteUserByIdForRoleDosen(id));
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
            title: "Dosen berhasil dihapus",
          }),
        1000
      );
      dispatch(setLoaderSubmit(false));
      handleModalDeleteTrigger();
    } catch (error) {
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
            title: "Dosen gagal dihapus",
          }),
        1000
      );
      dispatch(setLoaderSubmit(false));
    }
  };

  const handleModalDeleteTrigger = () => {
    setModalDeleteTrigger(!modalDeleteTrigger);
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-4">
      <div className="flex items-center space-x-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-3">
            <img
              className="h-12 w-12 rounded-full object-cover object-center"
              src={profile_image.image_url}
              alt={profile_image.image_name}
            />
            <div className="min-w-0 flex-1">
              <div className="text-base">
                <span className="truncate font-normal not-italic text-neutral-100-2">{name}</span>
              </div>
              <div className="flex flex-wrap">
                <p className="truncate text-xs font-normal not-italic text-neutral-80">
                  {username}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center">
          <div className="group relative">
            <ActionDropdown>
              <ActionDropdown.Trigger>
                <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-100-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
                  <i className="fa-regular fa-ellipsis-vertical"></i>
                </button>
              </ActionDropdown.Trigger>

              <ActionDropdown.Content>
                <ActionDropdown.Link
                  className="relative inline-flex items-center text-red-700 hover:bg-red-50 focus:bg-red-50"
                  onClick={handleModalDeleteTrigger}>
                  <i className="fa-regular fa-trash-can flex h-4 w-4 items-center justify-center"></i>

                  <span className="ml-3">Hapus</span>
                </ActionDropdown.Link>
              </ActionDropdown.Content>
            </ActionDropdown>
          </div>
        </div>
      </div>
      <div className="pb-2 pt-4">
        <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-secondary-navy">
          {roles.role_name}
        </span>
      </div>
      <div className="flex items-center space-x-3 pb-2 text-sm">
        <div className="inline-flex flex-shrink-0 items-center justify-center">
          <span className="text-secondary-green">
            <i className="fa-solid fa-phone"></i>
          </span>
        </div>
        <div className="flex-1">
          <p className="font-normal not-italic text-neutral-100-2">{phone}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3 text-sm">
        <div className="inline-flex flex-shrink-0 items-center justify-center">
          <span className="text-secondary-navy">
            <i className="fa-solid fa-envelope"></i>
          </span>
        </div>
        <div className="flex-1">
          <p className="font-normal not-italic text-neutral-100-2">{email}</p>
        </div>
      </div>
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

export default ManageDosenListItem;
