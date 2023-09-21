import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { maxLengthCheck } from "../../../utils/maxLengthCheck";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import { PulseLoader } from "react-spinners";
import { editWord2vec } from "../../../stores/features/word2vecSlice";
import QuartenaryButton from "../../QuartenaryButton";
import PrimaryButton from "../../PrimaryButton";
import SecondaryButton from "../../SecondaryButton";
import InputError from "../../InputError";
import InputLabel from "../../InputLabel";
import TextInput from "../../TextInput";

const UPDATE_VALUE = {
  course: "",
  book_title: "",
};

const ModalEditWord2vec = ({
  modalEditTrigger,
  handleModalEditTrigger,
  update,
  maxWidth = "2xl",
}) => {
  const { id, course, book_title } = update;
  const [value, setValue] = useState(UPDATE_VALUE);
  const dispatch = useDispatch();
  const loaderSubmit = useSelector((state) => state.loaderSubmit);
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
  }[maxWidth];

  useEffect(() => {
    function disableScroll() {
      document.body.style.overflow = "hidden";
    }
    function enableScroll() {
      document.body.style.overflow = "auto";
    }

    if (modalEditTrigger) {
      disableScroll();
    } else {
      enableScroll();
    }
    return () => {
      enableScroll();
    };
  }, [modalEditTrigger]);

  const MAX_JUDUL_BUKU = 30;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const book_title = formData.get("book_title");

    dispatch(editWord2vec({ id, book_title })).then((res) => {
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
              title: "Informasi word2vec berhasil diubah",
            }),
          1000
        );

        dispatch(setLoaderSubmit(false));
        handleModalEditTrigger();
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
          title: res.error.message.split(":")[1],
        });
        dispatch(setLoaderSubmit(false));
      }
    });
  };

  return (
    <div className="duration-200">
      <div className="relative">
        <div
          className="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 transition-opacity duration-300 ease-in-out"
          onClick={handleModalEditTrigger}></div>
        <div className="fixed inset-0 z-50 flex transform items-center justify-center overflow-y-auto overflow-x-hidden outline-none">
          <div className="pointer-events-none relative mx-auto flex h-[calc(100%-1rem)] w-full items-center justify-center p-4 min-[576px]:h-[calc(100%-3.5rem)]">
            <div
              className={`pointer-events-auto relative flex max-h-full w-full transform flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`}>
              <form
                className="relative flex max-h-full w-full flex-col overflow-hidden"
                onSubmit={handleUpdate}>
                <div className="flex flex-shrink-0 items-center justify-between rounded-t-xl border-b-2 border-neutral-100 border-opacity-100 p-3">
                  <h2 className="p-1.5 text-center text-base font-medium text-gray-900 md:text-lg">
                    Edit Informasi Word2vec
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
                        id="course"
                        type="text"
                        name="course"
                        className="cursor-not-allowed border border-neutral-20 bg-neutral-20 text-neutral-60"
                        placeholder=" "
                        required
                        defaultValue={course}
                        onChange={handleChange}
                        disabled
                      />

                      <InputLabel
                        className="bg-neutral-20 text-neutral-60 peer-focus:text-dark-4"
                        htmlFor="course">
                        <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                          Mata Kuliah
                        </span>
                      </InputLabel>
                    </div>
                    <InputError className="mt-2" />
                  </div>
                  <div>
                    {value.book_title ? (
                      <h1 className="mb-1 text-end text-xs font-normal text-dark-4 md:text-sm">
                        {value.book_title.length}/{MAX_JUDUL_BUKU}
                      </h1>
                    ) : (
                      <h1 className="mb-1 text-end text-xs font-normal text-dark-4 md:text-sm">
                        {book_title.length}/{MAX_JUDUL_BUKU}
                      </h1>
                    )}
                    <div className="relative">
                      <TextInput
                        id="book_title"
                        type="text"
                        name="book_title"
                        className="border border-neutral-60 text-neutral-60 focus:border-primary-violet"
                        placeholder=" "
                        required
                        defaultValue={book_title}
                        onChange={handleChange}
                        maxLength={MAX_JUDUL_BUKU}
                        onInput={maxLengthCheck}
                      />

                      <InputLabel
                        className="text-neutral-60 peer-focus:text-dark-4"
                        htmlFor="book_title">
                        <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                          Judul Buku
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
                        !value.book_title && !value.course
                          ? "cursor-not-allowed rounded-10 bg-neutral-20 px-4 py-2.5 text-center text-xs font-semibold text-neutral-60 md:text-sm"
                          : "bg-secondary-navy px-4 py-2.5 font-semibold text-white hover:bg-blue-800 focus:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-secondary-navy "
                      }
                      disabled={!value.book_title && !value.course}>
                      Simpan Perubahan
                    </QuartenaryButton>
                  )}

                  <SecondaryButton type="button" onClick={handleModalEditTrigger}>
                    Batal
                  </SecondaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditWord2vec;
