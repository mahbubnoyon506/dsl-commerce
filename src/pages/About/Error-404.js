import React, { useState, useEffect } from "react";
import Preloader from "../../components/Common/Preloader";
import ErrorArea from "../../components/About/ErrorArea";
import PageTitle from "../../components/Common/PageTitle";
import Footer from "../../components/Layout/Footer/Footer";
import { Toaster } from "react-hot-toast";
import TopHeader from "../../components/Layout/TopHeader";
import MiddleHeader from "../../components/Layout/MiddleHeader";
import Navbar from "../../components/Layout/Navbar";

function Error404() {
  // const [isLoading, setisLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setisLoading(false);
  //   }, 1000);
  // }, []);

  return (
    <>
      {/* {isLoading === true ? (
        <Preloader />
      ) : ( */}
        <div className="app">
          <Toaster />
          <TopHeader shippingMessage="Free shipping on all orders over USD 50" />
          <MiddleHeader />
          <Navbar />
          <div className="error-404-wrapper">
            <PageTitle title="404 Error" />
            <ErrorArea />
          </div>
          <Footer />
        </div>
      {/* )} */}
    </>
  );
}

export default Error404;
