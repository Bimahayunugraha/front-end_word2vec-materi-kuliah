import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/EmbeddingFiles/Header";
import Footer from "../components/Footer";

const AllEmbeddingFileLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <div className="nt-2 pb-16 lg:pb-0">
        <Footer />
      </div>
    </>
  );
};

export default AllEmbeddingFileLayout;
