import React from "react";
import icon from "../../assets/img/png/icon.png";
import { Link, NavLink } from "react-router-dom";
import { mainSidebarCollections } from "../../mocks/sidebarCollections";
import { sidebarActive, sidebarInActive } from "../../utils/globalVariable";

const Drawer = ({ drawerTrigger, handleDrawerTrigger }) => {
  return (
    <div className="sm:block md:hidden">
      <div
        className={
          drawerTrigger
            ? "pointer-events-auto fixed inset-0 z-50 bg-gray-600 opacity-75 transition-opacity duration-300 ease-linear"
            : "pointer-events-none fixed inset-0 z-50 bg-gray-600 opacity-0 transition-opacity duration-300 ease-linear"
        }
        onClick={handleDrawerTrigger}></div>
      <div
        className={
          drawerTrigger
            ? "fixed inset-0 left-0 z-50 h-screen w-full max-w-[250px] translate-x-0 transform overflow-hidden bg-white p-4 shadow-lg duration-300 ease-in-out"
            : "fixed inset-0 left-0 z-50 h-screen w-full max-w-[250px] -translate-x-full transform overflow-hidden bg-white p-4 duration-300 ease-in-out"
        }>
        <Link to="/dashboard" className="flex items-center pl-2.5" onClick={handleDrawerTrigger}>
          <img src={icon} alt="Brand Masjid Nurul Asfar" className="mr-3 h-6 sm:h-8" />
          <span className="self-center whitespace-nowrap text-xs font-semibold md:text-base">
            Word2vec Materi Kuliah
          </span>
        </Link>
        <button
          type="button"
          className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-gray-400 hover:rounded-lg hover:bg-gray-200 hover:text-gray-900"
          onClick={handleDrawerTrigger}>
          <i className="fa-regular fa-xmark flex items-center justify-center text-base"></i>
        </button>
        <div className="flex-col justify-between overflow-y-auto py-4 sm:relative sm:flex md:h-full">
          <div className="relative">
            <ul>
              {mainSidebarCollections.map((item, idx) => {
                return (
                  <li key={idx}>
                    <NavLink to={item.path}>
                      {({ isActive }) => (
                        <div
                          className={isActive ? sidebarActive : sidebarInActive}
                          onClick={handleDrawerTrigger}>
                          {isActive ? item.iconActive : item.iconInactive}
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
      </div>
    </div>
  );
};

export default Drawer;
