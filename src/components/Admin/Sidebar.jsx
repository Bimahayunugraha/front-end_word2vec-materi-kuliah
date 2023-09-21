import React from "react";
import { mainSidebarCollections } from "../../mocks/sidebarCollections";
import { NavLink } from "react-router-dom";
import { sidebarActive, sidebarInActive } from "../../utils/globalVariable";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 bottom-0 left-0 z-30 mt-14 hidden w-52 leading-none transition-all duration-300 sm:hidden md:block">
      <div className="relative z-40 hidden h-full flex-col justify-between overflow-y-auto bg-white py-2 px-3 sm:flex md:h-full">
        <div className="relative">
          <ul>
            {mainSidebarCollections.map((item, idx) => {
              return (
                <li key={idx}>
                  <NavLink to={item.path} title={item.name}>
                    {({ isActive }) => (
                      <div className={isActive ? sidebarActive : sidebarInActive}>
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
    </aside>
  );
};

export default Sidebar;
