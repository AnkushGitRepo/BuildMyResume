import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <Navbar activeMenu={activeMenu} />

      {user && <div className="flex-grow h-full">{children}</div>}

      <Footer />
    </div>
  );
};

export default DashboardLayout;
