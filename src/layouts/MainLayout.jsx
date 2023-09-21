import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import MobileNavbar from "../components/MobileNavbar";
import Navbar from "../components/Navbar";
import MobileDrawer from "../components/MobileDrawer";

const MainLayout = () => {
  const [mobileNavbarTrigger, setMobileNavbarTrigger] = useState(false);

  const handleMobileNavbarTrigger = () => {
    setMobileNavbarTrigger(!mobileNavbarTrigger);
  };
  return (
    <>
      <div className="flex h-full overflow-y-auto">
        <div className="flex w-full flex-1 flex-col">
          <MobileNavbar handleMobileNavbarTrigger={handleMobileNavbarTrigger} />
          <MobileDrawer
            mobileNavbarTrigger={mobileNavbarTrigger}
            handleMobileNavbarTrigger={handleMobileNavbarTrigger}
          />
          <Navbar />
          <div>
            <Outlet />
          </div>
          <div className="nt-2 pb-16 lg:pb-0">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
