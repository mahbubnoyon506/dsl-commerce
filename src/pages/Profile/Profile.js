import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import swal from "sweetalert";
import "./Profile.css";
import MobileVerifyModal from "../../pages/Profile/MobileVerifyModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SocialIcon } from "react-social-icons";
import PhoneInput from "react-phone-number-input";
import copy from "copy-to-clipboard";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useTimer } from "react-timer-hook";
import EmailVerifyModal from "./EmailVerifyModal";

const Profile = ({ expiryTimestamp }) => {
  const { user, metamaskBalance, logOut, setUserRefetch, getBalanceTestnet } =
    useContext(DSLCommerceContext);
  const [email1, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [disableAfterActivation, setDisableAfterActivation] = useState(false);
  const [otpVerify, setOtpVerify] = useState();
  const [openEmail, setOpenEmail] = useState(false);
  const [isError, setError] = useState(false);
  const [copyTextWalletAddress, setCopyTextWalletAddress] = useState("");
  const [copyTextReferralID, setCopyTextReferralID] = useState("");
  const [copyTextAffiliateLink, setCopyTextAffiliateLink] = useState("");
  const [openMobile, setopenMobile] = useState(false);
  const [value, setValue] = useState();
  const [disableAfterActivationMobile, setDisableAfterActivationMobile] =
    useState(false);

  const navigate = useNavigate();
  // let history = useHistory();
  // const copyToClipboard = (text) => {
  //   navigator.clipboard.writeText(text);
  //   alert("Copied!");
  // };

  useEffect(() => {
    getBalanceTestnet();
    setCopyTextWalletAddress(user.walletAddress ? user.walletAddress : "");
    setCopyTextReferralID(user?.myReferralCode ? user?.myReferralCode : "");
    // setCopyTextAffiliateLink(
    //   window.location.origin || user?.myReferralCode
    //     ? window.location.origin + "/" + user?.myReferralCode
    //     : ""
    // );
    setCopyTextAffiliateLink(
      window.location.origin || user?.myReferralCode
        ? window.location.origin + "/" + user?.myReferralCode
        : ""
    );
    if (!user.email || !user.email === "undefined") {
      swal({
        text: "Please update your email before proceeding further. You stand to win attractive prizes monthly.",
        icon: "warning",
        button: "OK",
        dangerMode: true,
        className: "modal_class_success swal-text swal-footer",
      });
    }
  }, [user]);

  const LogOut = () => {
    logOut();
    navigate("/");
    swal({
      title: "Success",
      text: "You have successfully logged out",
      icon: "success",
      button: "OK",
      className: "modal_class_success",
    });
  };

  // Re-send OTP functionality
  const { seconds, minutes, resume, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  const restarting = (sec) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);
    restart(time);
  };
  const handleVerifyMobile = async (e) => {
    // console.log("handleVerifyMobile");
    setDisableAfterActivationMobile(true);
    // console.log("mobileNo" , value);
    if (value.length > 0) {
      // setLoading(true);
      // setEmailVerify(true);
      await axios
        .post("https://backend.dslcommerce.com/api/number/", {
          phone: value,
        })
        .then((res) => {
          console.log("res");
          console.log(res);

          if (res.status === 200) {
            // alert(res.data.message);
            // setSendMail(res.data.email)
            restarting(180);
            swal({
              text: res.data.message,
              icon: "success",
              button: "OK!",
              className: "modal_class_success",
            });

            setOtpVerify(res.data.otp);

            setTimeout(() => {
              setDisableAfterActivation(false);
            }, 120000);
          }
          console.log("setopenMobile");
          setopenMobile(true);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setopenMobile(false);
          swal({
            title: "Attention",
            text: err.response.data.message,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        })
        .finally(() => {
          console.log("finally");
          // setLoading(false);
        });
    } else {
      swal({
        title: "Attention",
        text: "Please enter a valid email address",
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    }
  };

  const handleVerifyMobileOTP = async (otpCode) => {
    console.log("handleVerifyMobileOTP");

    await axios
      .post(`https://backend.dslcommerce.com/api/number/otp`, {
        phone: value,
        otp: otpCode,
      })

      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setOtpVerify(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setOtpVerify(err.response.data.message);
      });
  };

  const handleVerifyEmail = async (e) => {
    // check if email is valid
    setDisableAfterActivation(true);
    if (email1.length > 0 && email1.includes("@" && ".")) {
      // setLoading(true);
      setEmailVerify(true);
      await axios
        .post("https://backend.dslcommerce.com/api/email/emailsend", {
          email: email1,
        })
        .then((res) => {
          if (res.status === 200) {
            // alert(res.data.message);
            // setSendMail(res.data.email)
            restarting(180);
            swal({
              text: res.data.message,
              icon: "success",
              button: "OK!",
              className: "modal_class_success",
            });
            setOtpVerify(res.data.otp);

            setTimeout(() => {
              setDisableAfterActivation(false);
            }, 120000);
          }
          setOpenEmail(true);
        })
        .catch((err) => {
          // alert(err.response.data.message);
          setEmailVerify(false);
          swal({
            title: "Attention",
            text: err.response.data.message,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        })
        .finally(() => {
          // setLoading(false);
        });
    } else {
      swal({
        title: "Attention",
        text: "Please enter a valid email address",
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    }
  };
  const handleVerifyOTP = async (otpCode) => {
    console.log("handleVerifyOTP");
    console.log(otpCode);
    await axios
      .post(`https://backend.dslcommerce.com/api/email/otp/${email1}`, {
        otp: otpCode,
      })

      .then((res) => {
        if (res.status === 200) {
          setOtpVerify(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setOtpVerify(err.response.data.message);
      });
  };
  const copyToClipboardWalletAddress = () => {
    copy(copyTextWalletAddress);
    // alert(`You have copied "${copyTextWalletAddress}"`);
    copyTextWalletAddress !== ""
      ? swal({
        title: "Copied",
        text: `You have copied "${copyTextWalletAddress}"`,
        icon: "success",
        button: "OK",
        className: "modal_class_success",
      })
      : swal({
        title: "Not Copied",
        text: "Nothing to Copy",
        icon: "warning",
        button: "OK",
        className: "modal_class_warning",
      });
  };

  const copyToClipboardReferralID = () => {
    copy(copyTextReferralID);
    // alert(`You have copied "${copyTextReferralID}"`);
    copyTextReferralID !== ""
      ? swal({
        title: "Copied",
        text: `You have copied "${copyTextReferralID}"`,
        icon: "success",
        button: "OK",
        className: "modal_class_success",
      })
      : swal({
        title: "Not Copied",
        text: "Nothing to Copy",
        icon: "warning",
        button: "OK",
        className: "modal_class_warning",
      });
  };

  const copyToClipboardAffiliateLink = () => {
    copy(copyTextAffiliateLink);
    // alert(`You have copied "${copyTextAffiliateLink}"`);
    copyTextAffiliateLink !== ""
      ? swal({
        title: "Copied",
        text: `You have copied "${copyTextAffiliateLink}"`,
        icon: "success",
        button: "OK",
        className: "modal_class_success",
      })
      : swal({
        title: "Not Copied",
        text: "Nothing to Copy",
        icon: "warning",
        button: "OK",
        className: "modal_class_warning",
      });
  };
  const updateProfile = (e) => {
    e.preventDefault();

    const verifiedEmail = e.target.email.value;
    // const VerifiedName = e.target.name.value;
    console.log(verifiedEmail);

    const email = JSON.stringify({ email: verifiedEmail });
    // const name = JSON.stringify({ name: VerifiedName });

    if (!otpVerify) {
      return swal({
        title: "Warning",
        text: "Before updating please verify your email!",
        icon: "warning",
        button: "OK",
        dangerMode: true,
        className: "modal_class_success",
      });
    } else {
      axios
        .put(
          `https://backendpub.celebrity.sg/api/v1/user/update/${user?._id}`,
          email,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            swal({
              title: "Success",
              text: "Profile updated successfully",
              icon: "success",
              button: "OK!",
              className: "modal_class_success",
            });
            setUserRefetch(true);
          }
          setUserRefetch(true);
        })
        .catch((err) => {
          swal({
            title: "Attention",
            text: `${err.response.data.message}`,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        });
    }
  };

  return (
    <div className="container py-3 profileContainer">
      <div className="container"></div>
      <h3 className="text-start text-dark-50 profileTitles mb-3">Profile</h3>

      <form
        className="mb-5 shadow-lg rounded-lg pt-3 pb-5 px-4 p-md-5 align-items-center"
        onSubmit={updateProfile}
      >
        <div className="text-center">
          <p>
            <a style={{ color: "#15407f" }}>
              <strong>Click here</strong>
            </a>{" "}
            for your SFF 2022 Wheel of Fortune QR Code
          </p>
        </div>

        <div className="row" style={{ rowGap: "10px" }}>
          <div className="col-md-6 px-3">
            <div className="mb-1">
              <label htmlFor="walletAddress" className="text-dark d-flex pt-2">
                Wallet Address
              </label>
              <div className="d-flex">
                <input
                  type="text"
                  id="walletAddress"
                  name="walletAddress"
                  value={user.walletAddress}
                  className="form-control profileInput text-dark"
                  disabled
                />
                <CopyToClipboard>
                  <button
                    className="copyBtn"
                    style={{ backgroundColor: "#15407f" }}
                    type="button"
                    onClick={copyToClipboardWalletAddress}
                  >
                    <ContentCopyIcon />
                  </button>
                </CopyToClipboard>
              </div>
            </div>

            <div className="mb-1">
              <label htmlFor="email" className="text-dark d-flex pb-1 pt-2">
                Email Address
              </label>
              <div className="d-flex">
                <input
                  style={{ textTransform: "lowercase" }}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailVerify(false);
                  }}
                  value={user.email ? user.email : email1}
                  disabled={user.email ? true : false}
                  required
                  className="form-control profileInput"
                />
                {!user.email && (
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={
                      email1.length === 0 || disableAfterActivation
                        ? true
                        : false
                    }
                    style={{
                      backgroundColor: "#15407f",
                      color: "#fff",
                    }}
                    className={
                      (email1.length === 0 || disableAfterActivation) &&
                      "border bg-secondary text-white"
                    }
                  >
                    {" "}
                    Verify
                  </button>
                )}
              </div>
            </div>

            {/* <div className="mb-1">
              <label htmlFor="email" className="text-dark d-flex pb-1 pt-2">
                Email Address
              </label>
              <div className="d-flex">
                <input
                  style={{ textTransform: "lowercase" }}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailVerify(false);
                  }}
                  value={user.email ? user.email : email1}
                  disabled={user.email ? true : false}
                  required
                  className="form-control profileInput"
                />
                {!user.email && (
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={
                      email1.length === 0 || disableAfterActivation
                        ? true
                        : false
                    }
                    style={{ backgroundColor: "#15407f", color: "#fff" }}
                    className={
                      (email1.length === 0 || disableAfterActivation) &&
                      "border bg-secondary text-white"
                    }
                  >
                    {" "}
                    Verify
                  </button>
                )}
              </div>
            </div> */}

            <div className="mb-1">
              <label htmlFor="USDSC" className="text-dark d-flex pb-1 pt-2">
                USDSC in wallet
              </label>
              <input
                type="number"
                id="USDSC"
                name="USDSC"
                className="form-control profileInput"
                value={
                  metamaskBalance?.usdsc
                    ? parseFloat(metamaskBalance?.usdsc).toFixed(4)
                    : "0.0000"
                }
              />
            </div>
            <div className="mb-1">
              <label htmlFor="BNB" className="text-dark d-flex pb-1 pt-2">
                BNB in wallet
              </label>
              <input
                type="number"
                id="BNB"
                name="BNB"
                value={
                  metamaskBalance?.bnb
                    ? parseFloat(metamaskBalance?.bnb).toFixed(4)
                    : "0.0000"
                }
                className="form-control profileInput"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="DSL" className="text-dark d-flex pb-1 pt-2">
                DSL in wallet
              </label>
              <input
                type="number"
                id="DSL"
                name="DSL"
                value={
                  metamaskBalance?.dsl
                    ? parseFloat(metamaskBalance?.dsl).toFixed(4)
                    : "0.0000"
                }
                className="form-control profileInput"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="S39" className="text-dark d-flex pb-1 pt-2">
                S39 in wallet
              </label>
              <input
                type="number"
                id="S39"
                name="S39"
                value={
                  metamaskBalance?.s39
                    ? parseFloat(metamaskBalance?.s39).toFixed(4)
                    : "0.0000"
                }
                className="form-control profileInput"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="FINQUEST" className="text-dark d-flex pb-1 pt-2">
                FINQUEST in wallet
              </label>
              <input
                type="number"
                id="FINQUEST"
                name="FINQUEST"
                value={
                  metamaskBalance?.Quest
                    ? parseFloat(metamaskBalance?.Quest).toFixed(4)
                    : "0.0000"
                }
                className="form-control profileInput"
              />
            </div>
          </div>
          <div className="col-md-6 px-3">
            <div className="mb-1">
              <label htmlFor="Mobile" className="text-dark d-flex pb-1 pt-2">
                Mobile
              </label>
              <div className="d-flex">
                <PhoneInput
                  international
                  defaultCountry="SG"
                  countryCallingCodeEditable={true}
                  className="form-control "
                  type="text"
                  onChange={setValue}
                  value={value}
                  disabled={user.mobileNo ? true : false}
                  required
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                />
                {!user.mobileNo && (
                  <button
                    type="button"
                    onClick={handleVerifyMobile}
                    disabled={
                      value?.length === 0 || disableAfterActivationMobile
                        ? true
                        : false
                    }
                    style={{
                      backgroundColor: "#15407f",
                      color: "#fff",
                    }}
                    className={
                      (value?.length === 0 || disableAfterActivationMobile) &&
                      "border bg-secondary text-white"
                    }
                  >
                    {" "}
                    Verify
                  </button>
                )}
              </div>
            </div>

            <div className="mb-1">
              <label htmlFor="ReferralID" className="text-dark d-flex pt-2">
                Referral ID
              </label>
              <div className="d-flex">
                <input
                  type="text"
                  id="ReferralID"
                  name="ReferralID"
                  value={user?.myReferralCode}
                  className="form-control profileInput text-dark"
                  disabled
                />
                <CopyToClipboard>
                  <button
                    className="copyBtn"
                    style={{ backgroundColor: "#15407f" }}
                    type="button"
                    onClick={copyToClipboardReferralID}
                  >
                    <ContentCopyIcon />
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            <div className="mb-1">
              <label htmlFor="AffiliateLink" className="text-dark d-flex pt-2">
                Affiliate Link
              </label>
              <div className="d-flex">
                <input
                  type="text"
                  id="AffiliateLink"
                  name="AffiliateLink"
                  value={window.location.origin + "/" + user?.myReferralCode}
                  className="form-control profileInput text-dark"
                  disabled
                />
                <CopyToClipboard>
                  <button
                    className="copyBtn"
                    style={{ backgroundColor: "#15407f" }}
                    type="button"
                    onClick={copyToClipboardAffiliateLink}
                  >
                    <ContentCopyIcon />
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            <div className="mb-1">
              <label htmlFor="AffiliateLink" className="text-dark d-flex pt-2">
                Share Affiliate Link
              </label>
              <div>
                <TwitterShareButton
                  url={window.location.origin + "/" + user?.myReferralCode}
                  title={`Get 10% discount at dslcommerce.com when you use my code.`}
                >
                  <TwitterIcon size={40} round={true} />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={window.location.origin + "/" + user?.myReferralCode}
                  summary={``}
                  title={`Get 10% discount at dslcommerce.com when you use my code.`}
                >
                  <LinkedinIcon size={40} round={true} />
                </LinkedinShareButton>
                <WhatsappShareButton
                  url={window.location.origin + "/" + user?.myReferralCode}
                  title={`Get 10% discount at dslcommerce.com when you use my code.`}
                >
                  <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>
              </div>
              <p className="text-dark">
                Share your affiliate code to earn 10% of our sales which comes
                from you. Your friend enjoy another 10% too.
              </p>

              <div className="d-flex"></div>
            </div>
          </div>
        </div>
        <div className="row" style={{ rowGap: "10px" }}>
          <div className="mt-4 d-flex justify-content-center">
            <Link
              to={-1}
              underline="none"
              style={{ backgroundColor: "#15407f" }}
              className="profileBtn fw-bold text-decoration-none"
            >
              Cancel
            </Link>
            <button
              style={{ backgroundColor: "#15407f" }}
              type="submit"
              className="profileBtn fw-bold"
              disabled={user.email ? true : false}
            >
              Update
            </button>
            <button
              style={{ backgroundColor: "#15407f" }}
              className="profileBtn fw-bold"
              type="button"
              onClick={LogOut}
            >
              Logout
            </button>
          </div>
        </div>
      </form>

      <EmailVerifyModal
        handleVerifyEmail={handleVerifyEmail}
        handleVerifyOTP={handleVerifyOTP}
        minutes={minutes}
        seconds={seconds}
        open={openEmail}
        setOpenEmail={setOpenEmail}
        otpVerify={otpVerify}
        setError={setError}
        email={setEmail}
        setOtpVerify={setOtpVerify}
        setDisableAfterActivation={setDisableAfterActivation}
      />
      <MobileVerifyModal
        handleVerifyMobile={handleVerifyMobile}
        handleVerifyOTP={handleVerifyMobileOTP}
        minutes={minutes}
        seconds={seconds}
        open={openMobile}
        setOpenMobile={setopenMobile}
        otpVerify={otpVerify}
        setError={setError}
        mobile={setValue}
        setOtpVerify={setOtpVerify}
        setDisableAfterActivationMobile={setDisableAfterActivationMobile}
      />
      {/* <EmailVerifyModal
        handleVerifyEmail={handleVerifyEmail}
        minutes={minutes}
        seconds={seconds}
        open={openEmail}
        setOpenEmail={setOpenEmail}
        otpVerify={otpVerify}
        setError={setError}
      /> */}
    </div>
  );
};

export default Profile;
