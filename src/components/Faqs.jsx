import React, { useState } from "react";
import { motion } from "framer-motion";
import decorateBlob1 from "../assets/img/svg/svg-decorator-blob-7.svg";
import decorateBlob2 from "../assets/img/svg/svg-decorator-blob-8.svg";

const Faqs = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  const faqs = [
    {
      question: "Bagaimana caranya mengubah materi mata kuliah menjadi korpus teks ?",
      answer:
        "Anda dapat mengubah materi mata kuliah ke corpus dengan cara mengupload file materi mata kuliah dalam bentu format .pdf, .doc, atau .docs. Kemudian, Anda dapat memulai proses pengubahannya dan hasilnya dalam bentuk file berformat .txt yang isinya sudah diatur sesuai dengan format yang telah ditentukan.",
    },
    {
      question: "Bagaimana caranya mengubah korpus teks menjadi word2vec ?",
      answer:
        "Anda dapat mengubah corpus menjadi word2vec dengan cara mengupload file corpus yang telah diubah sebelumnya. Kemudian, Anda dapat memulai proses pengubahannya dengan memilih tipe konversi (word2vec) dan hasilnya dalam bentuk file berformat .txt yang isinya berupa vector-vector yang nantinya akan digunakan oleh bagian AI.",
    },
    {
      question: "Bagaimana caranya mengecek kesamaan antara kunci jawaban dan jawaban mahasiswa ?",
      answer:
        "Anda dapat mengecek kesamaan antara kunci jawaban dan jawaban mahasiswa dengan melakukan load model word2vec yang sudah di trained terlebih dahulu. Kemudian, Anda dapat mengisi form yang tersedia seperti nama mahasiswa, nama ujian, dan nomor soal. Selanjutnya, Anda dapat memasukkan kunci jawaban dan jawaban mahasiswa, lalu memulai proses pengecekan. Hasil dari pengecekan yatu total nilai dari kemiripan antara kunci jawaban dan jawaban mahasiswa.",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto max-w-screen-xl px-6 pt-10 pb-20 md:py-16">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h5 className="mb-4 font-bold uppercase tracking-widest text-primary-500">Faqs</h5>
            <h2 className="w-full text-3xl font-black tracking-wide text-primary-soft-violet sm:text-4xl md:text-4xl">
              Anda memiliki {""}
              <span className="inline-block -skew-x-12 transform bg-primary-500 px-4 py-2 text-gray-100">
                Pertanyaan?
              </span>
            </h2>
            <p className="mt-4 w-full max-w-xl text-sm font-medium leading-relaxed text-secondary-100 md:text-base lg:text-lg">
              Pertanyaan dibawah ini akan membantu Anda untuk mengetahui lebih lanjut tentang cara
              mengubah materi kuliah menjadi korpus dan word2vec & mengecek kesamaan.
            </p>
          </div>
          <dl className="relative mt-12 max-w-4xl">
            {faqs.map((faq, index) => {
              return (
                <div
                  className="group mt-5 cursor-pointer select-none rounded-lg bg-gray-100 px-8 py-5 text-gray-800 transition duration-300 hover:bg-gray-200 hover:text-gray-900 sm:px-10 sm:py-4"
                  key={index}
                  onClick={() => {
                    toggleQuestion(index);
                  }}>
                  <dt className="flex items-center justify-between">
                    <span className="text-base font-semibold lg:text-lg">{faq.question}</span>
                    <motion.span
                      className="ml-2 transition duration-300"
                      variants={{
                        collapsed: { rotate: 0 },
                        open: { rotate: -180, content: "-" },
                      }}
                      initial="collapsed"
                      animate={activeQuestionIndex === index ? "open" : "collapsed"}
                      transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}>
                      {activeQuestionIndex === index ? (
                        <i className="fa-regular fa-minus text-xl"></i>
                      ) : (
                        <i className="fa-regular fa-plus text-xl text-primary-700"></i>
                      )}
                    </motion.span>
                  </dt>
                  <motion.dd
                    className="pointer-events-none text-sm leading-relaxed sm:text-base"
                    variants={{
                      open: { opacity: 1, height: "auto", marginTop: "16px" },
                      collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === index ? "open" : "collapsed"}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}>
                    {faq.answer}
                  </motion.dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
      <img
        src={decorateBlob1}
        alt="decorator-1"
        className="pointer-events-none absolute right-0 top-0 -z-20 h-64 w-64 translate-x-32 transform opacity-25"
      />
      <img
        src={decorateBlob2}
        alt="decorator-2"
        className="pointer-events-none absolute left-0 bottom-0 -z-20 h-64 w-64 -translate-x-32 transform opacity-25"
      />
    </div>
  );
};

export default Faqs;
