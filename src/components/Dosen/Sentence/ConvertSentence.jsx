import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { convertButton, uploadButton } from "../../../utils/globalVariable";
import { formatFileSize } from "../../../utils/formatFileSize";
import Auth from "../../../utils/auth";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import SentenceAPI from "../../../apis/sentence.api";

const ConvertSentence = () => {
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const dropRef = useRef();
  const navigate = useNavigate();
  const userId = Auth.getUserId();
  // eslint-disable-next-line no-useless-escape
  const fileMimeTypes = /\.(txt)$/;
  const MAX_FILE_SIZE = 10240;

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
    const fileSizeKiloBytes = uploadedFile.size / 1024;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedFile);

    if (!uploadedFile.name.match(fileMimeTypes)) {
      setErrors("Tipe file harus txt");
      return;
    } else if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrors("Ukuran file lebih besar dari batas maksimum");
      return;
    } else {
      setErrors("");
    }
    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "1px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!errors) {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("userId", userId);

          SentenceAPI.convertSentence(formData)
            .then((result) => {
              navigate(`/download/sentence/${result.data.payload.id}`);
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
                title: result.data.message,
              });
              setLoading(false);
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
              setLoading(false);
            });
        }
      }
    } catch (error) {
      error.response && setErrors(error.response.data);
      setLoading(false);
    }
  };

  const handleCancelUpload = () => {
    setFile("");
    dropRef.current = "";
  };

  return (
    <div className="mx-auto md:container">
      {file ? (
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-wide text-primary-soft-violet md:text-2xl">
            File telah siap dikonversi
          </h1>
          <p className="text-sm font-normal text-neutral-60 md:text-base">
            Klik pada button upload untuk memulai proses konversi
          </p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-wide text-primary-soft-violet md:text-2xl">
            Konversi Sentence text
          </h1>
          <p className="text-sm font-normal text-neutral-60 md:text-base">
            Mengubah corpus text menjadi sentence text
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="pt-6 pb-6">
          {!errors && file ? (
            <div className="w-full bg-white shadow-xl md:rounded-xl">
              <div className="hidden flex-col rounded-t-xl bg-white px-10 py-4 drop-shadow-md md:flex-row md:items-center lg:flex">
                <div className="min-w-0 flex-1 flex-col">
                  <p className="text-xs font-medium text-neutral-100-2 md:text-sm">
                    <span className="font-bold">File yang dipilih:</span> {file.name}
                  </p>
                </div>

                <div className="mr-4 inline-flex items-center">
                  <p className="rounded-full border border-secondary-green bg-tertiary-4 bg-opacity-25 px-2 py-0 font-medium text-secondary-green md:px-3">
                    <span className="text-[10px] md:text-xs">{formatFileSize(file.size)}</span>
                  </p>
                </div>
                <div className="inline-flex items-center">
                  <button
                    className="inline-block text-neutral-80"
                    type="button"
                    onClick={handleCancelUpload}>
                    <i className="fa-solid fa-xmark text-lg"></i>
                  </button>
                </div>
              </div>
              <div className="hidden bg-secondary-soft-white py-5 lg:block"></div>
              <div className="bg-white drop-shadow-md">
                <div className="flex items-center justify-between px-7 pt-4 lg:hidden">
                  <div className="mr-3 min-w-0 flex-1 flex-col">
                    <p className="text-xs font-medium text-neutral-100-2 md:text-sm">
                      <span className="font-bold">File yang dipilih:</span> {file.name}
                    </p>
                  </div>

                  <div className="inline-flex items-center">
                    <button
                      className="inline-block text-neutral-80"
                      type="button"
                      onClick={handleCancelUpload}>
                      <i className="fa-solid fa-xmark text-lg"></i>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between px-7 pt-3 pb-4 lg:hidden">
                  <div className="flex items-center justify-end">
                    <p className="rounded-full border border-secondary-green bg-tertiary-4 bg-opacity-25 px-2 py-0 font-medium text-secondary-green md:px-3">
                      <span className="text-[10px] md:text-xs">{formatFileSize(file.size)}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-secondary-soft-white py-5 lg:hidden"></div>
              <div className="converter-wrapper flex justify-center px-10 md:rounded-b-xl">
                {loading ? (
                  <button
                    className={`flex cursor-wait items-center justify-center ${convertButton}`}>
                    <PulseLoader size={5} color={"#ffffff"} />{" "}
                    <span className="pl-2">Mengkonversi ...</span>
                  </button>
                ) : (
                  <button type="submit" className={uploadButton}>
                    Upload
                    <span className="ml-3">
                      <i className="fa-sharp fa-solid fa-arrow-right"></i>
                    </span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="information px-4 py-4 text-start drop-shadow-2xl md:rounded-t-xl">
                <h3 className="text-base font-medium text-gray-100">
                  <i className="fa-regular fa-circle-info mr-2"></i> Informasi
                </h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                  <li>
                    Upload file corpus text yang telah diubah sebelumnya disini untuk diubah menjadi
                    sentence text
                  </li>
                  <li>
                    File corpus text yang diupload harus berformat{" "}
                    <span className="font-bold text-secondary-yellow">.txt</span>
                  </li>
                </ul>
              </div>
              <div className="converter-wrapper w-full shadow-4 md:rounded-b-xl">
                <div className="px-20 py-10">
                  <Dropzone
                    onDrop={onDrop}
                    onDragEnter={() => updateBorder("over")}
                    onDragLeave={() => updateBorder("leave")}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: "drop-zone" })} ref={dropRef}>
                        <input {...getInputProps()} name="file" />
                        <div className="flex items-center gap-5 pb-5 text-white">
                          <i className="fa-light fa-file-lines text-3xl md:text-5xl"></i>
                        </div>
                        <p className="text-center text-sm font-medium text-white md:text-base">
                          Drag dan drop file atau klik disini untuk memilih file
                        </p>
                      </div>
                    )}
                  </Dropzone>
                  {errors && (
                    <div className="absolute left-0 right-0 mt-2 text-center">
                      <span className="flex items-center justify-center text-xs font-normal text-secondary-subtle-yellow md:text-sm">
                        <i className="fa-regular fa-circle-info mr-2"></i> {errors}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ConvertSentence;
