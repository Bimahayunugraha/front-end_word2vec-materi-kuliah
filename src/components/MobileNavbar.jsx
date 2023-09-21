import React from "react";
import { NavLink } from "react-router-dom";
import { mobileNavbarCollections } from "../mocks/navbarCollections";

const MobileNavbar = ({ handleMobileNavbarTrigger }) => {
  return (
    <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white bg-opacity-95 shadow-4 backdrop-blur-sm sm:block md:block lg:hidden">
      <div className="grid h-full grid-cols-5 gap-4 p-2 lg:grid-cols-5">
        {mobileNavbarCollections.map((item, idx) => {
          return (
            <NavLink to={item.path} key={idx}>
              {({ isActive }) => (
                <div className="mx-auto cursor-pointer">
                  <div
                    className={
                      isActive
                        ? "mx-auto flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-primary-violet bg-opacity-10 text-primary-violet transition-all duration-300 ease-in-out"
                        : "mx-auto flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-gray-50 transition-all duration-300 ease-in-out"
                    }>
                    {isActive ? item.iconActive : item.iconInActive}
                  </div>
                  <div
                    className={
                      isActive
                        ? "text-center text-[10px] font-medium text-primary-violet transition-all duration-300 ease-in-out"
                        : "text-center text-[10px] font-normal text-gray-500 transition-all duration-300 ease-in-out"
                    }>
                    {item.name}
                  </div>
                </div>
              )}
            </NavLink>
          );
        })}
        <div className="mx-auto">
          <div onClick={handleMobileNavbarTrigger} className="cursor-pointer">
            <button
              type="button"
              className="mx-auto flex h-8 w-8 max-w-[48px] items-center justify-center rounded-full bg-gray-50 transition-all duration-300 ease-in-out focus:bg-primary-violet focus:bg-opacity-10 focus:text-primary-violet focus:outline-none">
              <i className="fa-solid fa-ellipsis inline text-xs"></i>
            </button>
            <div className="text-center text-[10px] font-normal text-gray-500 transition-all duration-300 ease-in-out focus:text-primary-violet">
              Lainnya
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
