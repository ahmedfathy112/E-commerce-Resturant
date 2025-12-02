import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <fragment>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </fragment>
  );
};

export default Layout;
