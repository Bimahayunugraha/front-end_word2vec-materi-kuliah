import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  cancelDeleteButton,
  confirmDeleteButton,
  downloadButton,
} from "../../../utils/globalVariable";
import fileDownload from "js-file-download";
import { formatFileSize } from "../../../utils/formatFileSize";
import VectorAPI from "../../../apis/vector.api";
import { useDispatch } from "react-redux";
import { deleteSent2vec } from "../../../stores/features/sent2vecSlice";
import { expiratedFile } from "../../../utils/expiratedFile";
import DangerModal from "../../DangerModal";

const Sent2vecListItem = ({ data }) => {
  const { id, name, file_path, file_mimetype, createdAt, file_size } = data;
  const [modalDeleteTriggerScreenLg, setModalDeleteTriggerScreenLg] = useState(false);
  const [modalDeleteTriggerScreenSm, setModalDeleteTriggerScreenSm] = useState(false);
  const dispatch = useDispatch();

  const handleDownload = async (id, name, mimetype) => {
    VectorAPI.downloadWord2vec(id).then((res) => {
      fileDownload(res.data, name, mimetype);
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
        icon: "success",
        title: "File berhasil didownload",
      });
    });
  };

  const handleDelete = () => {
    try {
      dispatch(deleteSent2vec(id));
      setTimeout(
        () =>
          Swal.fire({
            icon: "success",
            title: "Dihapus",
            text: "Data word2vec berhasil dihapus",
            showConfirmButton: false,
            timer: 2000,
            background: "#ffffff",
          }),
        1000
      );
    } catch (error) {
      setTimeout(
        () =>
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Data word2vec gagal dihapus",
            showConfirmButton: false,
            timer: 2000,
            background: "#ffffff",
          }),
        1000
      );
    }
  };

  const handleModalDeleteTriggerScreenLg = () => {
    setModalDeleteTriggerScreenLg(!modalDeleteTriggerScreenLg);
  };

  const handleModalDeleteTriggerScreenSm = () => {
    setModalDeleteTriggerScreenSm(!modalDeleteTriggerScreenSm);
  };

  return (
    <div>
      <div className="hidden flex-col border-b border-gray-200 py-3 px-6 md:flex-row md:items-center lg:flex">
        <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-blue-100 text-sm text-secondary-navy">
          <i className="fa-regular fa-file-lines"></i>
        </div>
        <div className="min-w-0 flex-1 flex-col items-center">
          <span className="text-xs font-medium text-neutral-100-2 md:text-sm">{name}</span>
        </div>
        {expiratedFile(createdAt) === false ? (
          <div>
            <div className="inline-flex items-center">
              <div className="ml-2 grid grid-cols-4">
                <h4 className="rounded-10 border border-primary-100 px-2 py-1 text-sm font-normal text-primary-200">
                  Selesai
                </h4>
              </div>
            </div>
            <div className="mr-4 inline-flex items-center text-left font-medium md:mr-10 lg:w-32">
              <span className="text-xs text-neutral-80 md:text-sm">
                {formatFileSize(file_size)} |
              </span>
              <span className="ml-1 text-sm text-secondary-green md:text-base">
                {file_mimetype}
              </span>
            </div>
            <div className="inline-flex items-center space-x-6">
              <button
                type="button"
                className={`inline-block ${downloadButton}`}
                onClick={() => {
                  handleDownload(id, name, file_path, file_mimetype);
                }}>
                <i className="fa-light fa-download"></i>
              </button>
              <button
                className="inline-block text-secondary-red"
                type="button"
                onClick={handleModalDeleteTriggerScreenLg}>
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
              <DangerModal
                show={modalDeleteTriggerScreenLg}
                onClose={handleModalDeleteTriggerScreenLg}>
                <form className="p-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Apakah Anda yakin ingin menghapus data ini?
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Data yang telah dihapus tidak dapat dikembalikan.
                  </p>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleModalDeleteTriggerScreenLg}
                      className={cancelDeleteButton}>
                      Batal
                    </button>
                    <button type="submit" className={confirmDeleteButton} onClick={handleDelete}>
                      Hapus
                    </button>
                  </div>
                </form>
              </DangerModal>
            </div>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center pr-[400px]">
              <h4 className="rounded-10 border border-secondary-red px-2 py-1 text-sm font-medium text-secondary-soft-red">
                Kadaluarsa
              </h4>
            </div>
            <div className="inline-flex items-center">
              <button
                className="inline-block text-secondary-red"
                type="button"
                onClick={handleDelete}>
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="border-b border-gray-200 py-3 px-6 lg:border-none lg:px-0 lg:py-0">
        <div className="flex items-center justify-between lg:hidden">
          <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-blue-100 text-sm text-secondary-navy">
            <i className="fa-regular fa-file-lines"></i>
          </div>
          <div className="min-w-0 flex-1 flex-col items-center">
            <span className="text-xs font-medium text-neutral-100-2 md:text-sm">{name}</span>
          </div>
          <div className="inline-flex items-center">
            <button
              className="inline-block text-secondary-red"
              type="button"
              onClick={modalDeleteTriggerScreenSm}>
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
            <DangerModal
              show={modalDeleteTriggerScreenSm}
              onClose={handleModalDeleteTriggerScreenSm}>
              <form className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Apakah Anda yakin ingin menghapus data ini?
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Data yang telah dihapus tidak dapat dikembalikan.
                </p>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleModalDeleteTriggerScreenSm}
                    className={cancelDeleteButton}>
                    Batal
                  </button>
                  <button type="submit" className={confirmDeleteButton} onClick={handleDelete}>
                    Hapus
                  </button>
                </div>
              </form>
            </DangerModal>
          </div>
        </div>
        {expiratedFile(createdAt) === false ? (
          <div className="flex items-center justify-between pt-4 lg:hidden">
            <div className="inline-flex items-center">
              <h4 className="rounded-10 border border-primary-100 px-2 py-1 text-sm font-normal text-primary-200">
                Selesai
              </h4>
            </div>
            <div className="mr-4 inline-flex items-center md:mr-10">
              <p className="font-medium">
                <span className="text-xs text-neutral-80 md:text-sm">
                  {formatFileSize(file_size)} |{" "}
                </span>
                <span className="text-sm text-secondary-green md:text-base">{file_mimetype}</span>
              </p>
            </div>
            <div className="inline-flex items-center">
              <button
                type="button"
                className={`inline-block ${downloadButton}`}
                onClick={() => {
                  handleDownload(id, name, file_mimetype, file_path);
                }}>
                <i className="fa-light fa-download"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 lg:hidden">
            <div className="inline-flex items-center">
              <h4 className="rounded-10 border border-secondary-red px-2 py-1 text-sm font-medium text-secondary-soft-red">
                Kadaluarsa
              </h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sent2vecListItem;
