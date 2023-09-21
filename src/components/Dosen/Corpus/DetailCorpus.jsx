import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatFileSize } from "../../../utils/formatFileSize";
import SkeletonLoadingDetailAllEmbeddingFile from "../../EmbeddingFiles/SkeletonLoadingDetailAllEmbeddingFile";
import Modal from "../../Modal";
import TextInput from "../../TextInput";
import InputLabel from "../../InputLabel";
import InputError from "../../InputError";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../PrimaryButton";
import { PulseLoader } from "react-spinners";
import SecondaryButton from "../../SecondaryButton";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import { editCorpus } from "../../../stores/features/corpusSlice";
import Swal from "sweetalert2";
import { maxLengthCheck } from "../../../utils/maxLengthCheck";
import QuartenaryButton from "../../QuartenaryButton";
import Breadcrumbs from "../../Breadcrumbs";
import { editInformationCourseMaterial } from "../../../stores/features/courseMaterialSlice";
import CorpusAPI from "../../../apis/corpus.api";

const UPDATE_VALUE = {
  course: "",
  book_title: "",
};

const Initial_Corpus_With_Content_File_By_Id = {
  data: [],
  status: false,
};

const DetailCorpus = () => {
  const [corpusWithContentFileById, setCorpusWithContentFileById] = useState(
    Initial_Corpus_With_Content_File_By_Id
  );
  const [modalEditTrigger, setModalEditTrigger] = useState(false);
  const [value, setValue] = useState(UPDATE_VALUE);

  const { id, course } = useParams();

  const loading = useSelector((state) => state.corpus.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loaderSubmit = useSelector((state) => state.loaderSubmit);

  const MAX_JUDUL_BUKU = 30;

  useEffect(() => {
    CorpusAPI.getFileCorpusByIdWithContent(course, id).then((result) => {
      setCorpusWithContentFileById({ status: true, data: result.data.payload });
    });
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(setLoaderSubmit(true));

    const formData = new FormData(e.target);
    const book_title = formData.get("book_title");

    dispatch(editCorpus({ id, book_title })).then((res) => {
      dispatch(editInformationCourseMaterial({ id, book_title }));
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

        Toast.fire({
          icon: "success",
          title: "Informasi korpus berhasil diubah",
        });
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

  const handleModalEditTrigger = () => {
    setModalEditTrigger(!modalEditTrigger);
    setValue(UPDATE_VALUE);
  };

  return (
    <div className="container mx-auto pt-16 pb-16 md:px-10">
      <Helmet>
        <title>{`Detail Corpus - ${corpusWithContentFileById.data.corpus?.book_title} - Word2vec Mata Kuliah`}</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      {corpusWithContentFileById.status ? (
        <div>
          <Breadcrumbs className="mt-4">
            <Breadcrumbs.Content>
              <Breadcrumbs.Link>
                <button
                  onClick={() => navigate(`/filelist/corpus/file/${course}`)}
                  className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 py-2 px-4 font-medium text-white hover:bg-blue-500">
                  <i className="fa-solid fa-arrow-left text-sm md:text-base"></i>
                </button>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <Link
                  to="/filelist/corpus/file"
                  className="ml-1 text-xs font-normal text-neutral-40 hover:border-b hover:border-primary-violet hover:text-primary-violet md:text-sm">
                  Daftar korpus
                </Link>
                <svg
                  aria-hidden="true"
                  className="mx-1 h-6 w-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <Link
                  to={`/filelist/corpus/file/${course}`}
                  className="text-xs font-normal text-neutral-40 hover:border-b hover:border-primary-violet hover:text-primary-violet md:text-sm">
                  {course}
                </Link>
                <svg
                  aria-hidden="true"
                  className="mx-1 h-6 w-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <p className="text-xs font-normal text-neutral-40 md:text-sm">Detail</p>
                <svg
                  aria-hidden="true"
                  className="mx-1 h-6 w-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
              </Breadcrumbs.Link>
              <Breadcrumbs.Link>
                <p className="text-xs font-semibold text-neutral-100-2 md:text-sm">
                  {corpusWithContentFileById.data.corpus?.out_name}
                </p>
              </Breadcrumbs.Link>
            </Breadcrumbs.Content>
          </Breadcrumbs>
          <div className="border-b border-gray-300 py-2"></div>
          <div className="mt-5 w-full rounded-md border border-gray-300 bg-white">
            <div className="flex items-center justify-between rounded-md border-b border-gray-200 bg-tertiary-7 py-3 px-6">
              <div className="flex items-center space-x-3">
                <img
                  className="h-7 w-7 rounded-full bg-white object-cover object-center ring-2 ring-white"
                  src={corpusWithContentFileById.data.corpus?.user.profile_image.image_url}
                  alt={corpusWithContentFileById.data.corpus?.user.profile_image.image_name}
                />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-neutral-100-2">
                    {corpusWithContentFileById.data.corpus?.user.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-md border border-gray-300 px-2 py-1 text-gray-900 hover:border-blue-500 hover:bg-blue-400 hover:text-white"
                onClick={handleModalEditTrigger}
                title="Edit Corpus">
                <i className="fa-light fa-pen text-sm"></i>
              </button>
            </div>
            <div className="flex items-center py-4 px-6">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </span>
              <span className="ml-3 text-xs text-gray-600 lg:text-sm">
                {corpusWithContentFileById.data.corpus?.course} •{" "}
                {corpusWithContentFileById.data.corpus?.book_title}
              </span>
            </div>
          </div>
          <div className="mt-3 w-full rounded-md border border-gray-300 bg-white">
            <div className="flex items-center justify-between space-x-3 rounded-md border-b border-gray-200 bg-tertiary-7 py-3 px-6">
              <div className="text-sm font-normal text-neutral-80">
                <span className="font-semibold">
                  {corpusWithContentFileById.data.corpus?.out_name}
                </span>{" "}
                | {formatFileSize(corpusWithContentFileById.data.corpus?.out_file_size)} |{" "}
                {corpusWithContentFileById.data.corpus?.conversion_type} |{" "}
                <span className="font-medium text-secondary-green">
                  {corpusWithContentFileById.data.corpus?.out_file_mimetype}
                </span>
                <a
                  href={corpusWithContentFileById.data.corpus?.out_file_url}
                  target="_blank"
                  className="ml-3 font-medium text-primary-violet hover:underline"
                  rel="noreferrer">
                  Lihat file asli
                </a>
              </div>
              <Link
                to={`/filelist/corpus/file/edit?course=${corpusWithContentFileById.data.corpus?.course}&id=${corpusWithContentFileById.data.corpus?.id}`}
                className="rounded-md border border-gray-300 px-2 py-1 text-gray-900 hover:border-blue-500 hover:bg-blue-400 hover:text-white"
                title="Edit Corpus File Content">
                <i className="fa-light fa-pen text-sm"></i>
              </Link>
            </div>
            <Modal show={modalEditTrigger} onClose={handleModalEditTrigger}>
              <form
                className="relative flex max-h-full w-full flex-col overflow-hidden"
                onSubmit={handleUpdate}>
                <div className="flex flex-shrink-0 items-center justify-between rounded-t-xl border-b-2 border-neutral-100 border-opacity-100 p-3">
                  <h2 className="p-1.5 text-center text-base font-medium text-gray-900 md:text-lg">
                    Edit Informasi Korpus
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
                        defaultValue={corpusWithContentFileById.data.corpus?.course}
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
                        {corpusWithContentFileById.data.corpus?.book_title.length}/{MAX_JUDUL_BUKU}
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
                        defaultValue={corpusWithContentFileById.data.corpus?.book_title}
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
            </Modal>
            {!corpusWithContentFileById.data.content ? (
              <div className="flex h-[90vh] w-full items-center overflow-y-auto py-4 px-6">
                <div className="h-full w-full">
                  <div className="h-full w-full animate-pulse rounded-xl bg-skeleton py-2 px-6">
                    <span className="break-all text-justify"></span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-[90vh] overflow-y-auto">
                <div className="h-full">
                  <table className="flex w-full items-center py-4">
                    <tbody>
                      {corpusWithContentFileById.data.content?.map((line, index) => (
                        <tr className="py-2" key={index}>
                          <td className="whitespace-pre-line break-words border-b border-gray-300 py-2 px-6 text-justify text-sm font-normal text-neutral-100-2 ">
                            {line}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <SkeletonLoadingDetailAllEmbeddingFile />
      )}
    </div>
  );
};

export default DetailCorpus;
