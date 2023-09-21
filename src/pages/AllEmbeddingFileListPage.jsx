import React from "react";
import { Helmet } from "react-helmet";
import AllEmbeddingFileLists from "../components/EmbeddingFiles/AllEmbeddingFileLists";

const AllEmbeddingFileListPage = () => {
  return (
    <div className="w2v-all-files">
      <Helmet>
        <title>Semua Daftar Embedding File - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <AllEmbeddingFileLists />
    </div>
  );
};

export default AllEmbeddingFileListPage;
