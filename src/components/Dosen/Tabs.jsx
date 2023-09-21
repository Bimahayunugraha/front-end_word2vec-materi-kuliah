import React from "react";
import { NavLink } from "react-router-dom";
import { tabCollections } from "../../mocks/tabCollections";
import { activeLinkTab, inActiveLinkTab } from "../../utils/globalVariable";

const Tabs = () => {
  return (
    <ul className="converter-wrapper -mb-px flex flex-wrap text-center text-xs shadow-6 drop-shadow-lg md:rounded-t-xl md:text-sm">
      {tabCollections.map((item, idx) => {
        return (
          <li key={idx}>
            <NavLink to={item.path} title={item.name}>
              {({ isActive }) => (
                <div className={isActive ? activeLinkTab : inActiveLinkTab}>
                  <span>{item.name}</span>
                </div>
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default Tabs;
