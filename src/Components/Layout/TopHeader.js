import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./TopHeader.css";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import swal from "sweetalert";
import companyLogo from "../../assets/img/logoDSL.jpeg";

function TopHeader({ shippingMessage, history }) {
  const {
    user,
    openWalletModal,
    logOut,
    closeWalletModal,
    closeCoinbaseModal,
  } = useContext(DSLCommerceContext);
  const Logout = () => {
    logOut();
    // setOpen(false);
    closeWalletModal();
    swal({
      // title: "S",
      text: "You have successfully logged out.",
      icon: "success",
      button: "OK!",
      className: "modal_class_success",
    });
  };
  return (
    <div className="top-header-area">
      <div className="container">
        <div className="row gy-4 ">
          <div className="col-md-4 pt-lg-0 float-start d-none d-md-block">
            <Link to="/">
              <img src={companyLogo} alt="dsl logo" style={{ width: '15%' }} />
            </Link>
          </div>
          <div className="col-md-4 text-center">
            <div className="top-header-content shippingMessage">
              <span>
                <i className="flaticon-check"></i>
                {shippingMessage}
              </span>
            </div>
          </div>
          <div className="border-top border-secondary d-md-none"></div>

          <div className="col-md-4 pt-lg-0 ">
            {user.walletAddress ? (
              <>
                <div className="float-start d-md-none">
                  <Link to="/">
                    <img src={companyLogo} alt="dsl logo" width={50} />
                  </Link>
                </div>
                <span className="float-end">
                  <button
                    onClick={Logout}
                    className="bg-danger text-white px-4 py-2 "
                    style={{border:'none',borderRadius:'100px'}}
                  >
                    <AccountBalanceWalletIcon className="walletIcon" />
                    <span className="pl-1">
                      Logout
                    </span>
                  </button>
                </span>
              </>
            ) : (
              <div className="text-center  float-md-end  mt-md-0">
                <div className="float-start d-md-none mt-1">
                  <Link to="/">
                    <img src={companyLogo} alt="dsl logo" width={45} />
                  </Link>
                </div>
                <div className="float-end">
                  <button
                    onClick={() => openWalletModal()}
                    className="bg-danger text-white px-4 py-2 "
                    style={{border:'none',borderRadius:'100px'}}
                  >
                    <AccountBalanceWalletIcon className="walletIcon" />
                    <span className="pl-1">
                      Login With Wallet
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
