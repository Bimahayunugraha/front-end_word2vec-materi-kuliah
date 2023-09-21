import React, { useState } from "react";
import Swal from "sweetalert2";
import { downloadButton } from "../../../utils/globalVariable";
import { saveAs } from "file-saver";
import { formatFileSize } from "../../../utils/formatFileSize";
import { useDispatch, useSelector } from "react-redux";
import { deleteWord2vec } from "../../../stores/features/word2vecSlice";
import { Link } from "react-router-dom";
import { useSWRConfig } from "swr";
import DangerModal from "../../DangerModal";
import SecondaryButton from "../../SecondaryButton";
import DangerButton from "../../DangerButton";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import { PulseLoader } from "react-spinners";
import Word2vecAPI from "../../../apis/word2vec.api";

const Word2vecListItemByCourse = ({ data }) => {
  const { id, course, out_name, out_file_mimetype, out_file_size } = data;
  const [modalDeleteTriggerScreenLg, setModalDeleteTriggerScreenLg] = useState(false);
  const [modalDeleteTriggerScreenSm, setModalDeleteTriggerScreenSm] = useState(false);

  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();
  const loaderSubmit = useSelector((state) => state.loaderSubmit);

  const handleDownload = async () => {
    Word2vecAPI.downloadWord2vec(id).then((res) => {
      const fileName = out_name;
      const blob = new Blob([res.data], { type: "text/plain" });
      saveAs(blob, fileName);

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
        title: "File word2vec berhasil didownload",
      });
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    try {
      dispatch(deleteWord2vec(id)).then(() => {
        mutate("word2vec");
      });
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
            title: "Data word2vec berhasil dihapus",
          }),
        1000
      );
      dispatch(setLoaderSubmit(false));
      if (modalDeleteTriggerScreenLg) handleModalDeleteTriggerScreenLg();
      if (modalDeleteTriggerScreenSm) handleModalDeleteTriggerScreenSm();
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
            title: "Data word2vec gagal dihapus",
          }),
        1000
      );
      dispatch(setLoaderSubmit(false));
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
      <div className="hidden flex-col border-b border-gray-200 py-3 px-6 hover:bg-gray-50 md:flex-row md:items-center lg:flex">
        <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-yellow-50 text-sm text-secondary-yellow">
          <i className="fa-regular fa-file-lines"></i>
        </div>
        <div className="min-w-0 flex-1 flex-col items-center">
          <Link
            to={`/filelist/word2vec/file/${course}/${id}`}
            className="border-b border-transparent text-xs font-medium text-neutral-100-2 transition-all duration-300 hover:border-neutral-80 md:text-sm">
            {out_name}
          </Link>
        </div>
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
              {formatFileSize(out_file_size)} |
            </span>
            <span className="ml-1 text-sm text-secondary-green md:text-base">
              {out_file_mimetype}
            </span>
          </div>
          <div className="inline-flex items-center space-x-6">
            <button
              type="button"
              className={`inline-block ${downloadButton}`}
              onClick={handleDownload}>
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

                <div className="mt-6 flex justify-end">
                  <SecondaryButton type="button" onClick={handleModalDeleteTriggerScreenLg}>
                    Batal
                  </SecondaryButton>

                  {loaderSubmit ? (
                    <DangerButton type="submit" className="ml-3 px-4 py-2" onClick={handleDelete}>
                      <PulseLoader size={5} color={"#ffffff"} />
                    </DangerButton>
                  ) : (
                    <DangerButton type="submit" className="ml-3 px-4 py-2" onClick={handleDelete}>
                      Hapus Data
                    </DangerButton>
                  )}
                </div>
              </form>
            </DangerModal>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 py-3 px-6 lg:border-none lg:px-0 lg:py-0">
        <div className="flex items-center justify-between lg:hidden">
          <div className="mr-3 inline-flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-yellow-50 text-sm text-secondary-yellow">
            <i className="fa-regular fa-file-lines"></i>
          </div>
          <div className="min-w-0 flex-1 flex-col items-center">
            <Link
              to={`/filelist/word2vec/file/${course}/${id}`}
              className="border-b border-transparent text-xs font-medium text-neutral-100-2 transition-all duration-300 hover:border-neutral-80 md:text-sm">
              {out_name}
            </Link>
          </div>
          <div className="inline-flex items-center">
            <button
              className="inline-block text-secondary-red"
              type="button"
              onClick={handleModalDeleteTriggerScreenSm}>
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

                <div className="mt-6 flex justify-end">
                  <SecondaryButton type="button" onClick={handleModalDeleteTriggerScreenSm}>
                    Batal
                  </SecondaryButton>

                  {loaderSubmit ? (
                    <DangerButton type="submit" className="ml-3 px-4 py-2" onClick={handleDelete}>
                      <PulseLoader size={5} color={"#ffffff"} />
                    </DangerButton>
                  ) : (
                    <DangerButton type="submit" className="ml-3 px-4 py-2" onClick={handleDelete}>
                      Hapus Data
                    </DangerButton>
                  )}
                </div>
              </form>
            </DangerModal>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 lg:hidden">
          <div className="inline-flex items-center">
            <h4 className="rounded-10 border border-primary-100 px-2 py-1 text-xs font-normal text-primary-200 md:text-sm">
              Selesai
            </h4>
          </div>
          <div className="mr-4 inline-flex items-center md:mr-10">
            <p className="font-medium">
              <span className="text-xs text-neutral-80 md:text-sm">
                {formatFileSize(out_file_size)} |{" "}
              </span>
              <span className="text-sm text-secondary-green md:text-base">{out_file_mimetype}</span>
            </p>
          </div>
          <div className="items-cente inline-flex">
            <button
              type="button"
              className={`inline-block ${downloadButton}`}
              onClick={handleDownload}>
              <i className="fa-light fa-download"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Word2vecListItemByCourse;
