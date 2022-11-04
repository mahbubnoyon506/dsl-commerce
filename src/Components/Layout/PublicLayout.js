import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import TopHeader from "./TopHeader";
import MiddleHeader from "./MiddleHeader";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";

const PublicLayout = () => {
  return (
    <div className="app">
      <Toaster />
      <TopHeader shippingMessage="Free shipping on all orders over USD 50" />
      <MiddleHeader />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
