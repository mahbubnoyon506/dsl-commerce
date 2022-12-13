import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "#1a1a25",
  // border: '2px solid white',
  boxShadow: 24,
  color: "white",
  borderRadius: "5px",
  p: 4,
};

export default function MobileVerifyModal({
  open,
  setOpenMobile,
  otpVerify,
  setError,
  handleVerifyMobile,
  minutes,
  seconds,
  mobile,
  handleVerifyOTP,
  setOtpVerify,
  setDisableAfterActivationMobile,
  otpCode,
  setOtpCode,
  setmobileNoVerify
}) {

  const [isOtpError, setOtpError] = useState(false);

  const handleClose = () => {
    setOpenMobile(false);
    setOtpError(false);
  };

  // Re-send OTP states
  const [forEnable, setForEnable] = useState(false);
  const [againEnable, setAgainEnable] = useState(true);
  const [count, setCount] = useState(2);
  const [disabled, setDisabled] = useState(false);
  const [otpVerified, setotpVerified] = useState();



  const hendelSubmit = async (e) => {

    setCount(count - 1);
    e.preventDefault();


    await axios
      .post(`https://backend.dslcommerce.com/api/number/otp`, {
        phone: mobile,
        otp: otpCode,
      })

      .then((res) => {
        console.log(res);
        if (res.status === 200) {

          console.log(res.data.message)
          setmobileNoVerify(true);
          setOpenMobile(false);
          setOtpVerify(res.data.message);
          swal({
            text: res.data.message,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setOtpVerify(err.response.data.message);


        if (count > 0) {

          console.log(count);
          let content2 = document.createElement("p");
          content2.innerHTML =
            'You have entered wrong OTP. Please try again. You have another <br/><span style="color: #0d6efd;">0' +
            count +
            "</span> more tries .";
          swal({
            content: content2,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });

          setDisableAfterActivationMobile(false);
          // setCount(2);
          setOtpVerify("");
          // setDisabled(false);
          setOtpError(false);
        } else {
          setDisabled(true);
          swal({
            text: "You have entered wrong OTP, And you have no more tries left. You can request another OTP again",
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });
        }

        setOtpVerify("");
        setError("Mobile OTP Code not matched");
        setOtpError(true);
      });



  };

  const verifyAlert = () => {
    swal({
      text: "Please verify your mobile number before closing!",
      icon: "warning",
      button: "OK!",
      className: "modal_class_success",
    });
  };

  return (
    <div>
      <Modal
        open={open}

        onClose={otpVerify == otpCode && handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="text-center"
      >
        <Box sx={style} id="">
          <div className="closeD text-right">
            <button
              style={{
                color: "white",
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={otpVerify == otpCode ? handleClose : verifyAlert}
            >
              <CloseIcon className="iconClose" />
            </button>
          </div>
          <Typography
            id="modal-modal-title text-light"
            className="text-light pt-1"
            variant="h6"
            component="h2"
            align="center"
          >
            Verify Mobile
          </Typography>
          <Typography id="modal-modal-description text-light" sx={{ mt: 2 }}>
            Check your mobile for OTP
          </Typography>
          <form className="d-flex input-group mt-2 mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="OTP code"
              aria-label="OTP code !!"
              aria-describedby="button-addon2"
              onChange={(e) =>

                setOtpCode(e.target.value)
              }
            />
            <button
              disabled={disabled ? true : false}
              className="btn btn-outline-secondary bg-danger text-light"
              onClick={hendelSubmit}
              type="submit"
              id="button-addon2"
            >
              Verify
            </button>
          </form>

          {isOtpError ? (
            <p style={{ color: "red" }}>You have entered wrong OTP</p>
          ) : (
            ""
          )}
          <div className="d-flex" style={{ justifyContent: "center" }}>
            <button
              disabled={minutes == 0 && seconds == 0 ? false : true}
              type="submit"
              onClick={() => { handleVerifyMobile(); setDisabled(false); }}
              className="submit banner-button2 font14 text-decoration-none p-2"
              style={
                minutes == 0 && seconds == 0
                  ? { backgroundColor: "#007bff", color: "#fff" }
                  : { backgroundColor: "#7b7b94", color: "#fff" }
              }
              id="font14"
            >
              Resend OTP
            </button>
          </div>
          <div className="text-center text-white mt-3">
            <span>{minutes}</span>:
            <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
