import React, { useEffect, useState } from "react";
import Select from "react-select";
import { select } from "../../../utils/globalVariable";
import { useDispatch, useSelector } from "react-redux";
import { checkSimilarity, loadModelWord2vec } from "../../../stores/features/similaritySlice";
import Swal from "sweetalert2";
import PrimaryButton from "../../PrimaryButton";
import TextInput from "../../TextInput";
import InputLabel from "../../InputLabel";
import { maxLengthCheck } from "../../../utils/maxLengthCheck";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import { PulseLoader } from "react-spinners";
import { fetchWord2vec } from "../../../stores/features/word2vecSlice";

const BASE_VALUES = {
  modelFile: "",
  answer_key: "",
  student_answer: "",
  student_nim: "",
  student_class: "",
  exam_name: "",
  question_number: "",
};

const CheckSimilarity = () => {
  const [similarity, setSimilarity] = useState(0);
  const [values, setValues] = useState(BASE_VALUES);

  const loaderSubmit = useSelector((state) => state.loaderSubmit);
  const word2vecLists = useSelector((state) => state.word2vec.data);
  const dispatch = useDispatch();

  const MAX_LENGTH_STUDENT_CLASS = 1;
  const MAX_LENGTH_STUDENT_NIM = 11;

  useEffect(() => {
    dispatch(fetchWord2vec());
  }, [dispatch]);

  const handleLoadModel = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const modelFile = String(formData.get("modelFile"));

    dispatch(loadModelWord2vec({ modelFile })).then((result) => {
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
          title: "Model berhasil dimuat",
        });
        dispatch(setLoaderSubmit(false));
      } else {
        const Toast = Swal.mixin({
          customClass: {
            title: "text-yellow-700",
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
          icon: "warning",
          title: result.error.message.split(":")[1],
        });
        dispatch(setLoaderSubmit(false));
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleChecker = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const answer_key = formData.get("answer_key");
    const student_answer = formData.get("student_answer");
    const student_nim = formData.get("student_nim");
    const student_class = formData.get("student_class");
    const exam_name = formData.get("exam_name");
    const question_number = Number(formData.get("question_number"));

    if (
      values.student_nim !== "" &&
      values.student_class !== "" &&
      values.exam_name !== "" &&
      values.question_number !== "" &&
      values.answer_key !== "" &&
      values.student_answer !== ""
    ) {
      dispatch(
        checkSimilarity({
          answer_key,
          student_answer,
          student_nim,
          student_class,
          exam_name,
          question_number,
        })
      ).then((result) => {
        if (!result.error) {
          setSimilarity(result.payload.similarity);
          dispatch(setLoaderSubmit(false));
          values.student_answer = "";
          values.answer_key = "";
          values.question_number = "";
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
  };

  return (
    <div className="mx-auto">
      <div className="container text-center">
        <h1 className="text-xl font-bold tracking-wide text-primary-soft-violet md:text-2xl">
          Periksa Kesamaan Teks
        </h1>
        <p className="text-sm font-normal text-neutral-60 md:text-base">
          Periksa kesamaan antara kunci jawaban dan jawaban mahasiswa dengan perbandingan nilai 0-1
        </p>
      </div>

      <div className="pt-6 pb-6">
        <div className="container mx-auto">
          <div
            id="alert-additional-content-1"
            className="mb-4 rounded-lg border border-blue-300 bg-blue-50 p-4 text-blue-800"
            role="alert">
            <div className="flex items-center">
              <span className="relative mr-2 flex h-3 w-3 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-700 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-800"></span>
              </span>

              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium">Informasi</h3>
            </div>
            <div className="mt-2 text-sm">
              <ul className="mt-1.5 list-outside list-disc pl-4">
                <li>
                  Sebelum melakukan pemeriksaan kesamaan antara kunci jawaban dan jawaban mahasiswa,
                  Anda harus load model word2vec terlebih dahulu. Model word2vec dapat Anda pilih
                  sesuai dengan mata kuliah dan buku yang digunakan.
                </li>
                <li>
                  Setiap melakukan pemeriksaan kesamaan pada ujian yang berbeda-beda, Anda juga
                  dapat meload kembali model word2vec yang sesuai dengan materi pada ujian tersebut.
                </li>
              </ul>
            </div>
          </div>
          <form
            className="mb-4 flex flex-col transition-all duration-300 md:flex-row md:space-x-2"
            onSubmit={handleLoadModel}>
            <div className="relative md:w-96">
              <Select
                className={`z-30 ${select} cursor-pointer`}
                options={word2vecLists
                  ?.map((item) => {
                    return {
                      value: item.out_file_path,
                      label: `${item.course} - ${item.book_title}`,
                    };
                  })
                  .sort((a, b) => a.label.localeCompare(b.label))}
                name="modelFile"
                placeholder="Pilih model word2vec"
                noOptionsMessage={() => "Model Word2vec tidak ditemukan"}
                isClearable
              />
            </div>
            {loaderSubmit ? (
              <PrimaryButton className="mt-2 py-2 px-3 md:mt-0">
                <PulseLoader size={7} color={"#ffffff"} />
              </PrimaryButton>
            ) : (
              <PrimaryButton type="submit" className="mt-2 py-2 px-3 capitalize md:mt-0">
                Load Model
              </PrimaryButton>
            )}
          </form>
        </div>
        <div className="md:container">
          <div className="mx-auto mb-4 border-b border-neutral-40"></div>
        </div>
        <div className="mx-auto md:container">
          <form onSubmit={handleChecker}>
            <div className="mb-4 grid grid-cols-1 gap-6 px-4 md:grid-cols-12 md:px-0">
              <div className="col-span-6 sm:col-span-3">
                <div className="relative">
                  <TextInput
                    id="student_nim"
                    type="number"
                    min="1"
                    name="student_nim"
                    className="border border-neutral-20 text-neutral-60 focus:border-primary-violet"
                    placeholder=" "
                    onChange={handleChange}
                    maxLength={MAX_LENGTH_STUDENT_NIM}
                    onInput={maxLengthCheck}
                    value={values.student_nim}
                  />

                  <InputLabel
                    className="text-neutral-60 peer-focus:text-dark-4"
                    htmlFor="student_nim">
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                      NIM Mahasiswa
                    </span>
                  </InputLabel>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <div className="relative">
                  <TextInput
                    id="student_class"
                    type="text"
                    name="student_class"
                    className="border border-neutral-20 text-neutral-60 focus:border-primary-violet"
                    placeholder=" "
                    maxLength={MAX_LENGTH_STUDENT_CLASS}
                    onInput={maxLengthCheck}
                    onChange={handleChange}
                    value={values.student_class}
                  />

                  <InputLabel
                    className="text-neutral-60 peer-focus:text-dark-4"
                    htmlFor="student_class">
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                      Kelas Mahasiswa
                    </span>
                  </InputLabel>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <div className="relative">
                  <TextInput
                    id="exam_name"
                    type="text"
                    name="exam_name"
                    className="border border-neutral-20 text-neutral-60 focus:border-primary-violet"
                    placeholder=" "
                    onChange={handleChange}
                    value={values.exam_name}
                  />

                  <InputLabel
                    className="text-neutral-60 peer-focus:text-dark-4"
                    htmlFor="exam_name">
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                      Nama Ujian
                    </span>
                  </InputLabel>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <div className="relative">
                  <TextInput
                    id="question_number"
                    type="number"
                    min="1"
                    name="question_number"
                    className="border border-neutral-20 text-neutral-60 focus:border-primary-violet"
                    placeholder=" "
                    onChange={handleChange}
                    value={values.question_number}
                  />

                  <InputLabel
                    className="text-neutral-60 peer-focus:text-dark-4"
                    htmlFor="question_number">
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                      Nomor Soal
                    </span>
                  </InputLabel>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-0 xl:grid-cols-11">
              <div className="w-full border border-gray-200 bg-gray-50 md:mb-4 md:rounded-lg lg:col-span-5">
                <div className="flex items-center justify-between border-b px-3 py-2">
                  <h2 className="text-sm font-semibold text-neutral-80">Kunci Jawaban</h2>
                </div>
                <div className="rounded-t-lg bg-white px-4 py-2">
                  <label htmlFor="answer_key" className="sr-only">
                    Kunci Jawaban
                  </label>
                  <textarea
                    id="answer_key"
                    name="answer_key"
                    rows="15"
                    className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0"
                    placeholder="Masukkan kunci jawaban..."
                    onChange={handleChange}
                    value={values.answer_key}></textarea>
                </div>
              </div>
              <i className="fa-regular fa-arrow-up-arrow-down flex w-full items-center justify-center md:rotate-90 lg:col-span-1"></i>
              <div className="mb-4 w-full border border-gray-200 bg-gray-50 md:rounded-lg lg:col-span-5">
                <div className="flex items-center justify-between border-b px-3 py-2">
                  <h2 className="text-sm font-semibold text-neutral-80">Jawaban Mahasiswa</h2>
                </div>
                <div className="rounded-t-lg bg-white px-4 py-2">
                  <label htmlFor="student_answer" className="sr-only">
                    Jawaban Mahasiswa
                  </label>
                  <textarea
                    id="student_answer"
                    name="student_answer"
                    rows="15"
                    className="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0"
                    placeholder="Masukkan jawaban mahasiswa..."
                    onChange={handleChange}
                    value={values.student_answer}></textarea>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center border border-gray-200 bg-transparent p-4 md:rounded-lg">
              {loaderSubmit ? (
                <PrimaryButton className="px-4 py-2.5">
                  <PulseLoader size={7} color={"#ffffff"} />
                </PrimaryButton>
              ) : (
                <PrimaryButton type="submit" className="mb-3 py-2 px-3 capitalize">
                  Cek Kesamaan
                </PrimaryButton>
              )}

              <h3 className="mb-1 text-base font-medium text-neutral-100-2 md:text-lg">
                Total Nilai Kesamaan
              </h3>
              <h4 className="text-sm font-normal text-neutral-80 md:text-base">{similarity}</h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckSimilarity;
