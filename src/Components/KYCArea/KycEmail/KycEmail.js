import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsInfoCircleFill } from 'react-icons/bs';
import { useTimer } from 'react-timer-hook';
import swal from 'sweetalert';
import EmailVerifyModal from '../../../pages/Profile/EmailVerifyModal';

const KycEmail = ({expiryTimestamp}) => {

  const [disableAfterActivation, setDisableAfterActivation] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [otpVerify, setOtpVerify] = useState();
  const [openEmail, setOpenEmail] = useState(false);
  const [isError, setError] = useState(false);


  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  const restarting = (sec) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);
    restart(time);
  };

  const handleVerifyEmail = async (e) => {
    console.log("handleVerifyEmail");
    setDisableAfterActivation(true);
    if (email.length > 0 && email.includes("@" && ".")) {
      // setLoading(true);
      await axios
        .post("https://backend.dslcommerce.com/api/email/emailsend", {
          email: email,
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
    await axios
      .post(`https://backend.dslcommerce.com/api/email/otp/${email}`, {
        otp: otpCode,
      })

      .then((res) => {
        if (res.status === 200) {
          setOtpVerify(res.data.message);
          setEmailVerify(true);
          swal({
            text: res.data.message,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
        }
        setOpenEmail(false)
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setOtpVerify(err.response.data.message);
      });
  };


  return (
    <div>
      <Form className='default-width-container mt-3'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='text-uppercase'>Email address <BsInfoCircleFill /> </Form.Label>
          <div className='d-flex'>
            <Form.Control
              style={{ textTransform: "lowercase" }}
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailVerify(false);
              }}
              value={email}
              // disabled={user.email ? true : false}
              required
            />
            <Button
              onClick={handleVerifyEmail}
              disabled={
                email.length === 0 || disableAfterActivation
                  ? true
                  : false
              }
              style={{ marginLeft: '-68px' }}
              variant="secondary">Verify

            </Button>
          </div>
          <p className="" style={{ color: '#99701E' }}>
            Click here to change your email address.
          </p>
          {
            !emailVerify ?  <Button className='mt-1 text-uppercase' as="input" type="submit" value="Submit" disabled/> :
            <Button className='mt-1 text-uppercase' as="input" type="submit" value="Submit" />
          }
        </Form.Group>
      </Form>
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
    </div>
  )
}

export default KycEmail