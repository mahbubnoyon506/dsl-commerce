import React, { useContext, useEffect, useState } from "react";
// import CartContext from "../../contexts/cart-context";
// import AuthContext from "../../contexts/auth-context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { CartContext } from "../../contexts/cart-context";
import swal from "sweetalert";
import { useTimer } from "react-timer-hook";
import EmailVerifyModal from "../../pages/Profile/EmailVerifyModal";
import MobileVerifyModal from "../../pages/Profile/MobileVerifyModal";
import PhoneInput from 'react-phone-number-input';
import CryptoMethod from "./PaymentMethod/CryptoMethod";
import PayNowMethod from "./PaymentMethod/PayNowMethod";

function CheckoutArea({ expiryTimestamp }) {
  const { totalPrice } = useParams();
  // console.log(totalPrice)
  let navigate = useNavigate();
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { carts } = useContext(CartContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [message, setMessage] = useState("");
  const [transactionId, settransactionId] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [email1, setEmail] = useState("");
  // const [mobileNo, setmobileNo] = useState("");
  const [value, setValue] = useState();
  const [mobileNoVerify, setmobileNoVerify] = useState(false);
  const [disableAfterActivation, setDisableAfterActivation] = useState(false);
  const [disableAfterActivationMobile, setDisableAfterActivationMobile] = useState(false);
  const [otpVerify, setOtpVerify] = useState();
  const [openEmail, setOpenEmail] = useState(false);
  const [openMobile, setopenMobile] = useState(false);
  const [isError, setError] = useState(false);
  const [cryptoPayment, setCryptoPayment] = useState(null)
  const [payNowPayment, setPayNowPayment] = useState(null)

  const submitOrder = (e) => {
    const walletAddress = user?.walletAddress;
    const totalPay = parseFloat(totalPrice);
    const phone = value
    const email = email1
    const orderItems = carts;
    e.preventDefault();
    if (!user?.walletAddress) {
      openWalletModal();
      return;
    }

    const OrderData = {
      firstName,
      lastName,
      email,
      phone,
      country,
      address,
      city,
      postCode,
      orderNotes,
      walletAddress,
      totalPay,
      orderItems,
      transactionId,
    };
    console.log(OrderData);
    // axios
    //   .post("/order/add-order-info", {
    //     // userId: authContext.userId,
    //     firstName,
    //     lastName,
    //     companyName,
    //     email,
    //     phone,
    //     country,
    //     address,
    //     city,
    //     postCode,
    //     orderNotes,
    //     // totalPrice:   context.cartItems.itemsPrice
    //   })
    //   .then((res) => {
    //     if (res?.data?.message === "Order successfully added") {
    //       localStorage.removeItem("cart-items");
    //       setFirstName("");
    //       setLastName("");
    //       setCompanyName("");
    //       setEmail("");
    //       setPhone("");
    //       setCountry("");
    //       setAddress("");
    //       setCity("");
    //       setPostCode("");
    //       setOrderNotes("");
    //       setMessage(res.data.message);
    //     }
    //   })
    //   .catch((err) => console.log(err));
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

  const handleVerifyOTP = async (otpCode) => {
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

  const handleVerifyEmail = async (e) => {
    console.log("handleVerifyEmail");
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

  return (
    <section className="checkout-area ptb-50">
      <div className="container">
        {message !== "" && (
          <div
            className={`
        ${message === "Order successfully added"
              } ? alert alert-success : alert alert-danger 
      `}
            role="alert"
          >
            {message}
          </div>
        )}
        <form onSubmit={submitOrder}>
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="billing-details">
                <h3 className="title">Billing Details</h3>

                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Email */}

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="email"
                        className="text-dark d-flex pb-1 pt-2"
                      >
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
                  </div>

                  {/* Phone */}

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="Mobile"
                        className="text-dark d-flex pb-1 pt-2"
                      >
                        Phone
                      </label>
                      <div className="d-flex">
                        {/* <input
                          type="tel"
                          id="Mobile"
                          name="Mobile"
                          placeholder="Enter Mobile Number"
                          className="form-control profileInput"
                          onChange={(e) => {
                            setmobileNo(e.target.value);
                            setmobileNoVerify(false);
                          }}
                          value={user.mobileNo ? user.mobileNo : mobileNo}
                          disabled={user.mobileNo ? true : false}
                          required
                        /> */}
                        <PhoneInput
                          international
                          defaultCountry="SG"
                          countryCallingCodeEditable={true}
                          className='form-control '
                          type="text"
                          onChange={setValue}
                          value={value}
                          disabled={user.mobileNo ? true : false}
                          required
                          inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true
                          }}
                        />
                        {!user.mobileNo && (
                          <button
                            type="button"
                            onClick={handleVerifyMobile}
                            disabled={
                              value?.length === 0 ||
                                disableAfterActivationMobile
                                ? true
                                : false
                            }
                            style={{
                              backgroundColor: "#15407f",
                              color: "#fff",
                            }}
                            className={
                              (value?.length === 0 ||
                                disableAfterActivationMobile) &&
                              "border bg-secondary text-white"
                            }
                          >
                            {" "}
                            Verify
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Country <span className="required">*</span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Address <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Town / City <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Town / City"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Postcode <span className="required">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Postcode"
                        required
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Order Note <span className="required">*</span>
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        name="notes"
                        id="notes"
                        cols="30"
                        rows="5"
                        placeholder="Order Notes"
                        required
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="order-details">
                <div className="payment-box">
                  <h3 className="title">Payment Method</h3>

                  <div className="payment-method">
                    {/* <p>
                      <input
                        type="radio"
                        id="cash-on-delivery"
                        name="radio-group"
                        checked
                      />
                      <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                    </p> */}
                    <p>
                      <input
                        type="radio"
                        id="pay-by-crypto"
                        name="radio-group"
                        onChange={(e) => {
                          setCryptoPayment(e.target.value)
                          setPayNowPayment(null)
                        }}
                      />
                      <label htmlFor="pay-by-crypto">Pay by Crypto</label>
                    </p>
                    <p>
                      <input
                        type="radio"
                        id="pay-by-paynow"
                        name="radio-group"
                        onChange={(e) => {
                          setCryptoPayment(null)
                          setPayNowPayment(e.target.value)
                        }}
                      />
                      <label htmlFor="pay-by-paynow">Pay by PayNow</label>
                    </p>
                  </div>
                  {/* Crypto payment method */}
                  {
                    cryptoPayment &&
                    <CryptoMethod totalPrice={totalPrice} />
                  }
                  {/* PayNow payment method */}
                  {
                    payNowPayment &&
                    <PayNowMethod totalPrice={totalPrice} />
                  }
                  <button
                    type="submit"
                    className="default-btn"
                    style={{ cursor: "pointer" }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
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
      </div>
    </section>
  );
}

export default CheckoutArea;
