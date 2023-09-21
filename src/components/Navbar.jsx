import React, { Fragment, createContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { mainNavbarCollections } from "../mocks/navbarCollections";
import { navbarActive, navbarInActive } from "../utils/globalVariable";
import icon from "../assets/img/png/icon.png";
import Auth from "../utils/auth";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import { fetchUserById } from "../stores/features/usersSlice";
import { logout } from "../stores/features/authSlice";

const Navbar = ({ align = "right", width = "48", contentClasses = "py-1 bg-white" }) => {
  const [activeLink, setActiveLink] = useState([]);
  const [dropdownProfileTrigger, setDropdownProfileTrigger] = useState(false);

  const [scroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);
  const user = useSelector((state) => state.users.data);

  const { username, profile_image } = user;

  const location = useLocation();
  const navigate = useNavigate();
  const DropDownProfileContext = createContext();

  useEffect(() => {
    dispatch(fetchUserById());
  }, [loading, dispatch]);

  let rt = null;

  const auth = Auth.isAuthorization();

  if (auth) {
    const refreshToken = Auth.getRefreshToken();
    rt = refreshToken;
  }

  let alignmentClasses = "origin-top";

  if (align === "left") {
    alignmentClasses = "origin-top-left left-0";
  } else if (align === "right") {
    alignmentClasses = "origin-top-right right-0";
  }

  let widthClasses = "";

  if (width === "48") {
    widthClasses = "w-48";
  }

  const handleLogout = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "focus:outline-none text-white bg-red-700 uppercase hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
        cancelButton:
          "text-gray-700 transition duration-150 ease-in-out uppercase border border-gray-300 bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Apakah Anda yakin ingin logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Logout",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          try {
            dispatch(logout({ rt }));
            Auth.signOut();
            navigate("/login");
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
              title: "Berhasil Logout",
            });
          } catch (error) {
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
              title: "Gagal Logout",
            });
          }
        }
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyNavbar);

    return () => window.removeEventListener("scroll", stickyNavbar);
  });

  const stickyNavbar = () => {
    if (window.scrollY > 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleDropdownProfileTrigger = () => {
    setDropdownProfileTrigger(!dropdownProfileTrigger);
  };

  return (
    <nav
      className={
        scroll
          ? "nav-container active absolute top-0 left-0 right-0 z-20 w-full border-b border-gray-200 px-0 py-2.5 sm:px-4 md:px-2"
          : "gradient-1 fixed top-0 left-0 z-20 w-full bg-white px-0 py-2.5 sm:px-4 md:px-2"
      }>
      <div className="container mx-auto">
        <div className="relative flex flex-wrap items-center justify-between">
          <Link to="/" className="flex items-center" title="Word2vec Materi Kuliah">
            <img src={icon} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center whitespace-nowrap text-base font-semibold md:text-xl">
              Word2vec Materi Kuliah
            </span>
          </Link>
          <div className="flex md:order-2">
            <div>
              <NavLink
                to="filelist/course-material/file"
                className={
                  activeLink === "/filelist/course-material/file" ||
                  activeLink === "/filelist/corpus/file" ||
                  activeLink === "/filelist/word2vec/file"
                    ? "mr-3 hidden rounded-lg px-2 py-2.5 text-center text-sm font-semibold text-primary-violet transition-all duration-150 ease-in-out hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-violet lg:flex"
                    : "mr-3 hidden rounded-lg px-2 py-2.5 text-center text-sm font-normal text-neutral-80 transition-all duration-150 ease-in-out hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-violet lg:flex"
                }
                title="File Saya">
                File Saya
              </NavLink>
            </div>
            <div>
              <NavLink
                to="similarity-result"
                className={
                  activeLink === "/similarity-result"
                    ? "mr-3 hidden rounded-lg px-5 py-2.5 text-center text-sm font-semibold text-primary-violet transition-all duration-150 ease-in-out hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-violet lg:flex"
                    : "mr-3 hidden rounded-lg px-5 py-2.5 text-center text-sm font-normal text-neutral-80 transition-all duration-150 ease-in-out hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-violet lg:flex"
                }
                title="Hasil Kesamaan">
                Hasil Kesamaan
              </NavLink>
            </div>

            {auth ? (
              <DropDownProfileContext.Provider
                value={{
                  dropdownProfileTrigger,
                  setDropdownProfileTrigger,
                  handleDropdownProfileTrigger,
                }}>
                <div className="relative">
                  <button
                    className="flex items-center justify-center rounded-full bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={handleDropdownProfileTrigger}>
                    <img
                      src={profile_image?.image_url}
                      alt={profile_image?.image_name}
                      className="h-10 w-10 cursor-pointer rounded-full object-cover object-center p-1 ring-2 ring-gray-300"
                    />
                  </button>

                  {dropdownProfileTrigger && (
                    <div
                      className={"fixed inset-0 z-50 h-screen"}
                      onClick={handleDropdownProfileTrigger}></div>
                  )}
                  <Transition
                    as={Fragment}
                    show={dropdownProfileTrigger}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <div
                      className={`absolute z-50 mt-2 divide-y divide-gray-100 rounded-md shadow-4 ${alignmentClasses} ${widthClasses}`}>
                      <div
                        className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>
                        <h4
                          className="hover:rounded-y-xl block border-b border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-600 transition-all duration-300 ease-in-out hover:bg-gray-100"
                          title={`Login sebagai ${username && username}`}>
                          Login sebagai {username && username}
                        </h4>
                        <NavLink
                          to={`/dosen-profile/${username}`}
                          onClick={handleDropdownProfileTrigger}
                          title="Profile Anda">
                          {({ isActive }) => (
                            <div
                              className={
                                isActive
                                  ? "block border-b border-gray-200 bg-primary-violet bg-opacity-10 px-4 py-2 text-left text-sm font-normal text-primary-violet transition-all duration-300 ease-in-out hover:bg-indigo-200"
                                  : "block border-b border-gray-200 px-4 py-2 text-left text-sm font-normal text-gray-600 transition-all duration-300 ease-in-out hover:bg-gray-100"
                              }>
                              Profile Anda
                            </div>
                          )}
                        </NavLink>
                        <button
                          className="block w-full py-2 px-4 text-left text-sm font-medium text-red-700 transition-all duration-300 ease-in-out hover:bg-red-100"
                          onClick={handleLogout}
                          title="Logout">
                          Logout
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>
              </DropDownProfileContext.Provider>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0"
                title="Login">
                Login
              </Link>
            )}
          </div>
          <div
            className="hidden w-full items-center justify-between md:order-1 lg:flex lg:w-auto"
            id="navbar-sticky">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium">
              <li>
                <NavLink to="/" title="Home">
                  {({ isActive }) => (
                    <div
                      className={isActive ? `${navbarActive} md:p-0` : `${navbarInActive} md:p-0`}>
                      <span className="ml-3">Home</span>
                    </div>
                  )}
                </NavLink>
              </li>
              <li>
                <div onMouseLeave={() => setOpen(false)} className="relative">
                  <button
                    onMouseOver={() => setOpen(true)}
                    type="button"
                    className={`${navbarInActive} md:p-0`}>
                    <span className="ml-3 flex items-center justify-center">
                      Konversi{" "}
                      <i
                        className={
                          open
                            ? "fa-regular fa-angle-down ml-2.5 rotate-180 text-sm transition-all duration-300 ease-in-out"
                            : "fa-regular fa-angle-down ml-2.5 rotate-0 text-sm transition-all duration-300 ease-in-out"
                        }></i>
                    </span>
                  </button>
                  <div
                    className={`absolute z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow ${
                      open ? "block" : "hidden"
                    }`}>
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownLargeButton">
                      {mainNavbarCollections.map((item, idx) => {
                        return (
                          <li key={idx}>
                            <NavLink to={item.path} title={item.name}>
                              {({ isActive }) => (
                                <div
                                  className={
                                    isActive
                                      ? navbarActive
                                      : `${navbarInActive} py-2 px-4 hover:bg-gray-100`
                                  }>
                                  <span className="ml-3">{item.name}</span>
                                </div>
                              )}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <NavLink to="/check-similarity" title="Periksa Kesamaan">
                  {({ isActive }) => (
                    <div
                      className={isActive ? `${navbarActive} md:p-0` : `${navbarInActive} md:p-0`}>
                      <span className="ml-3">Periksa Kesamaan</span>
                    </div>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
