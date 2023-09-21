import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import Drawer from "../components/Admin/Drawer";
import Header from "../components/Admin/Header";

const AdminLayout = () => {
  const [drawerTrigger, setdrawerTrigger] = useState(false);
  const handleDrawerTrigger = () => {
    setdrawerTrigger(!drawerTrigger);
  };

  return (
    <>
      <div className="flex h-full overflow-y-auto">
        <Sidebar />
        <Drawer drawerTrigger={drawerTrigger} handleDrawerTrigger={handleDrawerTrigger} />
        <div className="flex w-full flex-1 flex-col">
          <Header handleDrawerTrigger={handleDrawerTrigger} />
          <div className="pl-0 pt-14 md:pl-52 lg:pl-52">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
