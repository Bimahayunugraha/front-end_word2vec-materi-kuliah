export const mainNavbarCollections = [
  {
    name: "Konversi Corpus",
    path: "/corpus",
    type: "anchor",
  },
  {
    name: "Konversi Vektor",
    path: "/vector",
    type: "anchor",
  },
];

export const mobileNavbarCollections = [
  {
    name: "Home",
    path: "/",
    iconActive: <i className="fa-solid fa-grid-2 inline text-xs"></i>,
    iconInActive: <i className="fa-light fa-grid-2 inline text-xs"></i>,
    type: "anchor",
  },
  {
    name: "Korpus",
    path: "/corpus",
    iconActive: <i className="fa-solid fa-text-size inline text-xs"></i>,
    iconInActive: <i className="fa-light fa-text-size inline text-xs"></i>,
    type: "anchor",
  },
  {
    name: "Word2vec",
    path: "/vector",
    iconActive: <i className="fa-solid fa-vector-circle inline text-xs"></i>,
    iconInActive: <i className="fa-light fa-vector-circle inline text-xs"></i>,
    type: "anchor",
  },
  {
    name: "Kesamaan",
    path: "/check-similarity",
    iconActive: <i className="fa-solid fa-arrow-up-arrow-down inline rotate-90 text-xs"></i>,
    iconInActive: <i className="fa-light fa-arrow-up-arrow-down inline rotate-90 text-xs"></i>,
    type: "anchor",
  },
];
