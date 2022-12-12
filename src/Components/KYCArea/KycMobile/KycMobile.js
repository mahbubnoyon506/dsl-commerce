import axios from 'axios';
import React, { useContext } from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PhoneInput from 'react-phone-number-input';
import { useTimer } from 'react-timer-hook';
import swal from 'sweetalert';
import { KycContext } from '../../../contexts/KycContext';
import MobileVerifyModal from '../../../pages/Profile/MobileVerifyModal';

const KycMobile = ({ expiryTimestamp }) => {
  const [openMobile, setopenMobile] = useState(false);
  const [otpVerify, setOtpVerify] = useState();
  const [isError, setError] = useState(false);
  const [mobile, setMobile] = useState();
  const [disableAfterActivationMobile, setDisableAfterActivationMobile] = useState(false);
  const [disableAfterActivation, setDisableAfterActivation] = useState(false);
  // const [mobileNoVerify, setmobileNoVerify] = useState(false);
  const { kycUser, handleUpdateUser, setmobileNoVerify, mobileNoVerify, setRefetch, refetch } = useContext(KycContext);


  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  const restarting = (sec) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);
    restart(time);
  };

  const handleVerifyMobileOTP = async (otpCode) => {
    console.log("handleVerifyMobileOTP");

    await axios
      .post(`https://backend.dslcommerce.com/api/number/otp`, {
        phone: mobile,
        otp: otpCode,
      })

      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setmobileNoVerify(true);
          setOtpVerify(res.data.message);
          setRefetch(!refetch);
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
      });
  };

  const handleVerifyMobile = async (e) => {
    // console.log("handleVerifyMobile");
    setDisableAfterActivationMobile(true);
    // console.log("mobileNo" , value);
    if (mobile.length > 0) {
      // setLoading(true);
      // setEmailVerify(true);
      await axios
        .post("https://backend.dslcommerce.com/api/number/", {
          phone: mobile,
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

  return (
    <div>
      <Form className='default-width-container'>
        <Form.Group className="mb-3 customStyle" controlId="formBasicEmail">
          <Form.Label >mobile number <span>★</span> </Form.Label>
          <div className='d-flex'>
            <PhoneInput
              international
              defaultCountry="SG"
              countryCallingCodeEditable={true}
              className='form-control'

              type="text"
              onChange={setMobile}
              value={mobile}
              style={{ border: 'none' }}
              // disabled={user.mobileNo ? true : false}
              required
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true
              }}
            />
            <Button
              type="button"
              onClick={handleVerifyMobile}
              disabled={
                mobile?.length === 0 ||
                  disableAfterActivationMobile
                  ? true
                  : false
              }
              className={
                (mobile?.length === 0 ||
                  disableAfterActivationMobile) &&
                "border bg-secondary text-white"
              }
              style={{ marginLeft: '-68px' }}
              variant="secondary">Verify</Button>
          </div>
          {
            !mobileNoVerify ? <Button className='mt-4 text-uppercase' variant="primary" disabled> Submit</Button> :
              <Button className='mt-4 text-uppercase' variant="primary"> Submit</Button>
          }
        </Form.Group>
      </Form>
      <MobileVerifyModal
        handleVerifyMobile={handleVerifyMobile}
        handleVerifyOTP={handleVerifyMobileOTP}
        minutes={minutes}
        seconds={seconds}
        open={openMobile}
        setOpenMobile={setopenMobile}
        otpVerify={otpVerify}
        setError={setError}
        mobile={setMobile}
        setOtpVerify={setOtpVerify}
        setDisableAfterActivationMobile={setDisableAfterActivationMobile}
      />
    </div>
  )
}

export default KycMobile