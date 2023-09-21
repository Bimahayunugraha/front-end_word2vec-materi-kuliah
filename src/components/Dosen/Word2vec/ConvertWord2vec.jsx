import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import {
  convertButton,
  inputConvertForm,
  labelConvertForm,
  uploadButton,
} from "../../../utils/globalVariable";
import { formatFileSize } from "../../../utils/formatFileSize";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { maxLengthCheck } from "../../../utils/maxLengthCheck";
import { useDispatch, useSelector } from "react-redux";
import { convertWord2vec } from "../../../stores/features/word2vecSlice";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import InputError from "../../InputError";

const BASE_VALUES = {
  course: "",
  book_title: "",
};

const baseErrors = {
  course: "",
  book_title: "",
  file: "",
};

const ConvertWord2vec = () => {
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState(baseErrors);
  const [values, setValues] = useState(BASE_VALUES);

  const dropRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loaderSubmit = useSelector((state) => state.loaderSubmit);

  const fileMimeTypes = /\.(txt)$/;
  const MAX_FILE_SIZE = 10240;
  const MAX_JUDUL_BUKU = 30;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    validation(name, value);
  };

  const validation = (name, value) => {
    if (name === "course") {
      if (value.trim() === "") {
        setErrors({ ...errors, course: "Mata kuliah wajid diisi" });
      } else {
        setErrors({ ...errors, course: "" });
      }
    }

    if (name === "book_title") {
      if (value.trim() === "") {
        setErrors({ ...errors, book_title: "Judul buku wajib diisi" });
      } else {
        setErrors({ ...errors, book_title: "" });
      }
    }
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
    const fileSizeKiloBytes = uploadedFile.size / 1024;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedFile);

    if (!uploadedFile.name.match(fileMimeTypes)) {
      setErrors({ ...errors, file: "Tipe file yang diunggah harus .txt" });

      return;
    } else if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrors({ ...errors, file: "Ukuran file yang diunggah maksimal 10 MB" });
      return;
    } else {
      setErrors({ ...errors, file: "" });
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
    dispatch(setLoaderSubmit(true));

    try {
      if (!errors.file) {
        if (file !== null && values.book_title !== "" && values.course !== "") {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("course", values.course);
          formData.append("book_title", values.book_title);

          dispatch(convertWord2vec(formData))
            .then((result) => {
              if (!result.error) {
                navigate(`/download/vector/file/${result.payload.course}/${result.payload.id}`);
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
                  title: "Korpus berhasil dikonversi ke word2vec",
                });
                dispatch(setLoaderSubmit(false));
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
            icon: "info",
            title: "Mohon, isi semua data",
          });
          dispatch(setLoaderSubmit(false));
        }
      }
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

      Toast.fire({
        icon: "error",
        title: error.message,
      });
      dispatch(setLoaderSubmit(false));
    }
  };

  const handleCancelUpload = () => {
    setFile("");
    dropRef.current = "";
  };

  return (
    <div className="mx-auto md:container">
      {file && !errors.file ? (
        <div>
          {loaderSubmit ? (
            <div className="text-center">
              <h1 className="text-xl font-bold tracking-wide text-primary-soft-violet md:text-2xl">
                File sedang dikonversi
              </h1>
              <p className="text-sm font-normal text-neutral-60 md:text-base">
                Mohon tunggu sebentar
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-xl font-bold tracking-wide text-primary-soft-violet md:text-2xl">
                File telah siap dikonversi
              </h1>
              <p className="text-sm font-normal text-neutral-60 md:text-base">
                Klik pada button upload untuk memulai proses konversi
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-wide text-primary-soft-violet md:text-2xl">
            Konversi Word2vec
          </h1>
          <p className="text-sm font-normal text-neutral-60 md:text-base">
            Mengubah korpus teks dengan format file txt ke word2vec
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="pt-6 pb-6">
          <div className="convert-form grid grid-cols-6 gap-6 px-10 py-6 shadow-2xl drop-shadow-md md:rounded-t-xl">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="course" className={labelConvertForm}>
                <span className="block after:ml-1 after:text-gray-300 after:content-['*']">
                  Mata Kuliah
                </span>
              </label>
              <input
                type="text"
                name="course"
                id="course"
                className={inputConvertForm}
                placeholder="Masukkan mata kuliah"
                onChange={handleChange}
                value={values.course}
                onBlur={handleChange}
              />
              {errors.course && (
                <InputError className="mt-2 text-red-200" message={errors.course} />
              )}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <div className="flex items-center justify-between">
                <label htmlFor="book_title" className={labelConvertForm}>
                  <span className="block after:ml-1 after:text-gray-300 after:content-['*']">
                    Judul Buku
                  </span>
                </label>
                <h1 className="mb-2 text-end text-xs font-normal text-gray-100 md:text-sm">
                  {values.book_title.length}/{MAX_JUDUL_BUKU}
                </h1>
              </div>
              <input
                type="text"
                name="book_title"
                id="book_title"
                maxLength={MAX_JUDUL_BUKU}
                onInput={maxLengthCheck}
                className={inputConvertForm}
                placeholder="Masukkan judul buku"
                onChange={handleChange}
                value={values.book_title}
                onBlur={handleChange}
              />
              {errors.book_title && (
                <InputError className="mt-2 text-red-200" message={errors.book_title} />
              )}
            </div>
          </div>
          {!errors.file && file ? (
            <div className="w-full bg-white shadow-2xl md:rounded-xl">
              <div className="hidden bg-secondary-soft-white py-6 lg:block"></div>
              <div className="hidden flex-col rounded-t-xl bg-white px-10 py-4 shadow-4 md:flex-row md:items-center lg:flex">
                <div className="min-w-0 flex-1 flex-col">
                  <p className="text-xs font-medium text-neutral-100-2 md:text-sm">
                    <span className="font-bold">File yang dipilih:</span> {file.name}
                  </p>
                </div>
                {/* <div className="inline-flex items-center">
                  <label htmlFor="conversion" className="text-sm font-medium text-gray-900">
                    <span className="after:ml-1 after:text-red-500 after:content-['*']">
                      tipe konversi
                    </span>
                  </label>
                  <div className="ml-2 grid grid-cols-4">
                    <div className="col-span-2 sm:col-span-2">
                      <select
                        name="conversion"
                        id="conversion"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        onChange={(e) => {
                          setConversion(e.target.value);
                        }}>
                        <option value="">...</option>
                        <option value="word2vec">Word2vec</option>
                        <option value="sent2vec">Sent2vec</option>
                      </select>
                    </div>
                  </div>
                </div> */}

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
              <div className="bg-secondary-soft-white py-6 lg:hidden"></div>
              <div className="bg-white shadow-4">
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
                  {/* <div className="inline-flex items-center">
                    <label htmlFor="conversion" className="text-xs font-medium text-gray-900">
                      <span className="after:ml-1 after:text-red-500 after:content-['*']">
                        tipe konversi
                      </span>
                    </label>
                    <div className="grid-cols-0 ml-2 grid gap-3">
                      <div className="col-span-6 sm:col-span-2">
                        <select
                          name="conversion"
                          id="conversion"
                          className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                          onChange={(e) => {
                            setConversion(e.target.value);
                          }}>
                          <option value="">...</option>
                          <option value="word2vec">Word2vec</option>
                          <option value="sent2vec">Sent2vec</option>
                        </select>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="converter-wrapper flex justify-center px-10 md:rounded-b-xl">
                {loaderSubmit ? (
                  <button
                    className={`flex cursor-wait items-center justify-center ${convertButton}`}>
                    <PulseLoader size={5} color={"#ffffff"} />{" "}
                    <span className="pl-2">Mengkonversi...</span>
                  </button>
                ) : (
                  <button type="submit" className={uploadButton}>
                    Upload
                    <span className="ml-3">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="converter-wrapper w-full shadow-2xl md:rounded-b-xl">
                <div className="px-20 py-10">
                  <ul className="mb-3 max-w-xl list-inside list-disc space-y-1 text-sm text-gray-300">
                    <li>Upload materi kuliah yang sudah diubah menjadi korpus teks</li>
                    <li>
                      File yang diupload harus berformat{" "}
                      <span className="font-bold text-secondary-yellow">.txt</span>
                    </li>
                    <li>Ukuran file yang diupload maksimal 10 MB</li>
                  </ul>
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
                  {errors.file && (
                    <div className="absolute left-0 right-0 mt-2 text-center">
                      <span className="flex items-center justify-center text-xs font-normal text-secondary-subtle-yellow md:text-sm">
                        <i className="fa-regular fa-circle-info mr-2"></i> {errors.file}
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

export default ConvertWord2vec;
