import React, { Fragment, createContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import icon from "../../assets/img/png/icon.png";
import Swal from "sweetalert2";
import Auth from "../../utils/auth";
import { Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/features/authSlice";

const Header = ({
  handleDrawerTrigger,
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-white",
}) => {
  const [dropdownProfileTrigger, setDropdownProfileTrigger] = useState(false);
  const auth = Auth.isAuthorization();
  const dispatch = useDispatch();

  let userProfile = null;
  let rt = null;

  const userInfo = Auth.getUser();
  if (auth) {
    const user = JSON.parse(userInfo);
    userProfile = user;

    const refreshToken = Auth.getRefreshToken();
    rt = refreshToken;
  }

  const navigate = useNavigate();
  const DropDownProfileContext = createContext();

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

  const handleDropdownProfileTrigger = () => {
    setDropdownProfileTrigger(!dropdownProfileTrigger);
  };

  return (
    <header className="fixed left-0 top-0 z-40 flex h-14 w-full items-center justify-between bg-white bg-opacity-90 px-4 py-2 backdrop-blur-sm md:px-6">
      <div className="flex w-1/2 items-center">
        <button
          type="button"
          className="cursor-pointer rounded-full p-2 hover:bg-gray-200 md:hidden"
          onClick={handleDrawerTrigger}>
          <i className="fa-solid fa-bars flex h-6 w-6 items-center justify-center text-gray-800"></i>
        </button>
        <Link
          to="/dashboard"
          className="flex items-center self-center whitespace-nowrap pl-2 md:hidden">
          <img src={icon} alt="Word2vec Materi Kuliah" className="mr-3 h-6 sm:h-8" />
          <span className="self-center whitespace-nowrap text-sm font-semibold md:text-base">
            Word2vec Materi Kuliah
          </span>
        </Link>
        <Link
          to="/dashboard"
          className="flex cursor-pointer items-center self-center whitespace-nowrap pl-1">
          <img
            src={icon}
            alt="Word2vec Materi Kuliah"
            className="mr-3 hidden h-8 sm:h-10 md:block"
          />
          <span className="hidden self-center whitespace-nowrap text-sm font-semibold md:block md:text-base">
            Word2vec Materi Kuliah
          </span>
        </Link>
      </div>
      <div className="flex items-center transition-all duration-300">
        <DropDownProfileContext.Provider
          value={{
            dropdownProfileTrigger,
            setDropdownProfileTrigger,
            handleDropdownProfileTrigger,
          }}>
          <div className="relative">
            <button
              className="relative flex items-center justify-center rounded-full bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={handleDropdownProfileTrigger}>
              <img
                src={userProfile.profile && userProfile.profile}
                alt="avatar"
                className="h-9 w-9 cursor-pointer rounded-full object-cover object-center p-1 ring-2 ring-gray-300"
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
                <div className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>
                  <h4
                    className="hover:rounded-y-xl block border-b border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-600 transition-all duration-300 ease-in-out hover:bg-gray-100"
                    title={`Login sebagai ${userProfile.username && userProfile.username}`}>
                    Login sebagai {userProfile.username && userProfile.username}
                  </h4>
                  <NavLink
                    to="/admin-profile"
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
      </div>
    </header>
  );
};

export default Header;
