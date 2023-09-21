import React from "react";
import { Helmet } from "react-helmet";
import Faqs from "../components/Faqs";
import Features from "../components/Features";
import Hero from "../components/Hero";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Home - Word2vec Mata Kuliah</title>
        <meta name="website" content="Word2vec Mata Kuliah" />
      </Helmet>
      <section className="pt-24 pb-16">
        <Hero />
      </section>
      <section className="pt-24 pb-16">
        <Features />
      </section>
      <section className="pt-24 pb-16">
        <Faqs />
      </section>
    </div>
  );
};

export default HomePage;
