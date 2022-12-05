import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
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
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useTimer } from 'react-timer-hook';
import { DSLCommerceContext } from '../../contexts/DSLCommerceContext';
import Preloader from '../../Components/Common/Preloader';
import EmailVerifyModal from './EmailVerifyModal';


const Profile = ({ expiryTimestamp }) => {
  const { user, logOut, metamaskBalance, metamaskBalanceLoading, userRefetch, setUserRefetch, getBalanceTestnet, mint } = useContext(DSLCommerceContext);
  const [email1, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [disableAfterActivation, setDisableAfterActivation] = useState(false);
  const [otpVerify, setOtpVerify] = useState();
  const [openEmail, setOpenEmail] = useState(false);
  const [openQRModal, setOpenQRModal] = useState(false);
  const [qRFromDatabase, setQRFromDatabase] = useState('');
  const [qRFromDatabaseGet, setQRFromDatabaseGet] = useState('');
  const [isError, setError] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  // let history = useHistory();
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!")
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getBalanceTestnet();
  }, []);

  useEffect(() => {
    if (metamaskBalanceLoading) {
      return <Preloader />
    }
  }, [])


  useEffect(() => {
    if (!user.email || !user.enail === "undefined") {
      swal({
        text: "Please update your email before proceeding further. You stand to win attractive prizes monthly.",
        icon: "warning",
        button: "OK",
        dangerMode: true,
        className: "modal_class_success",
      });
    }
  }, [user]);


  // console.log(metamaskBalance)
  // console.log(user?.email, '--user email');

  const LogOut = () => {
    logOut();
    navigate("/")
    swal({
      title: "Success",
      text: "You have successfully logged out",
      icon: "success",
      button: "OK",
      className: "modal_class_success",
    });
  }

  const backNavigate = () => {
    navigate(-1);
  }

  // Re-send OTP functionality
  const {
    seconds,
    minutes,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  const restarting = (sec) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);
    restart(time)

  }


  const handleVerifyEmail = async (e) => {
    // check if email is valid
    setDisableAfterActivation(true);
    if (email1.length > 0 && email1.includes("@" && ".")) {
      // setLoading(true);
      setEmailVerify(true);
      await axios.post('https://backend.dslcommerce.com/api/email/emailsend', {
        email: email1
      }).then(res => {
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
          console.log('emtiaz', res.data);
          setOtpVerify(res.data.otp);

          setTimeout(() => {
            setDisableAfterActivation(false);
          }, 120000);
        }
        setOpenEmail(true)
      }).catch(err => {
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
    }
    else {
      swal({
        title: "Attention",
        text: "Please enter a valid email address",
        icon: "warning",
        button: "OK!",
        className: "modal_class_success",
      });
    }
  }

  const updateProfile = async () => {


    const verifiedEmail = email1;
    console.log(verifiedEmail);

    const email = JSON.stringify({ email: verifiedEmail });

    await axios.put(`https://backend.dslcommerce.com/api/users/update/${user?._id}`, email, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then(res => {
        // swal({
        //   title: "Success",
        //   text: "Successfully updated",
        //   icon: "success",
        //   button: "OK!",
        //   className: "modal_class_success",
        // });
        setUserRefetch(!userRefetch);
        // setUserRefetch(true);
      })
      .catch(err => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      })

  }


  

  return (
    <>
      <div className='handleTheProfileBody ' >
        <div className="container pt-5  ">
          <div className='position-change text-info ms-md-2 '>
            <h3 className='mb-4 ms-4 ms-md-5  profileTitile' >Profile</h3>
          </div>

          <div className='shadow-lg rounded-lg py-5 px-4 p-md-5 align-items-center'>
            {/* <p className='text-center'><span onClick={profileClickHere} className='text-primary' style={{ textDecoration: 'underline', cursor: 'pointer' }}>Click here</span> for your SFF 2022 Wheel of Fortune QR Code</p> */}
            {/* <p className='text-center '><span className='text-primary ' style={{textDecoration: 'underline', cursor: 'pointer'}}>Click here</span> for your SFF 2022 Wheel of Fortune QR Code</p> */}
            <div className='row' style={{ rowGap: "10px" }}>
              <div className='col-md-6 px-4'>
                <div className="mb-2">
                  <label htmlFor='walletAddress'>Wallet Address</label>
                  <div className='d-flex'>
                    <input type="text" id='walletAddress' name="walletAddress" value={user?.walletAddress} className='form-control bg-transparent  rounded-0 rounded-start' disabled />
                    <button type="button" onClick={() => copyToClipboard(user?.walletAddress)} className="border bg-success rounded-0 rounded-end">
                      <FontAwesomeIcon icon={faCopy} className='text-white' />
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <label htmlFor='walletAddress'>Email Address</label>
                  <div className='d-flex'>
                    <input style={user.email ? { textTransform: 'lowercase' } : { textTransform: 'lowercase', borderTopRightRadius: 'inherit', borderBottomRightRadius: 'inherit' }}
                      type="email"
                      name="email"
                      className='form-control '
                      placeholder="Email Address"
                      onChange={e => { setEmail(e.target.value); setEmailVerify(false) }}
                      value={user.email ? user.email : email1}
                      disabled={(user.email) ? true : false}
                      required
                    />
                    {!user.email && <button
                      type="button"
                      onClick={handleVerifyEmail}
                      disabled={(email1.length === 0 || disableAfterActivation) ? true : false}
                      className={(email1.length === 0 || disableAfterActivation) ? "border bg-secondary  rounded-0 text-white rounded-end" : "border bg-success text-white rounded-0 rounded-end"}
                    >
                      Verify
                    </button>}
                  </div>
                </div>
                <div className="mb-2">
                  <label htmlFor='bnb'>BNB in wallet</label>
                  <input type="text" id='bnb' name="bnb" value={metamaskBalance?.bnb ? parseFloat(metamaskBalance?.bnb).toFixed(4) : "0.0000"} className='form-control bg-transparent ' disabled />
                </div>
                <div className="mb-2">
                  <label htmlFor='usdsc'>USDSC in wallet</label>
                  <input type="text" id='usdsc' name="usdsc" value={metamaskBalance?.usdsc ? parseFloat(metamaskBalance?.usdsc).toFixed(4) : "0.0000"} className='form-control bg-transparent ' disabled />
                </div>

                <div className="mb-2">
                  <label htmlFor='bnb'>DSL in wallet</label>
                  <input type="text" id='bnb' name="bnb" value={metamaskBalance?.dsl ? parseFloat(metamaskBalance?.dsl).toFixed(4) : "0.0000"} className='form-control bg-transparent ' disabled />
                </div>
                <div className="mb-2">
                  <label htmlFor='bnb'>S39 in wallet</label>
                  <input type="text" id='bnb' name="bnb" value={metamaskBalance?.s39 ? parseFloat(metamaskBalance?.s39).toFixed(4) : "0.0000"} className='form-control bg-transparent ' disabled />
                </div>
                <div className="mb-2">
                  <label htmlFor='bnb'>FINQUEST in wallet</label>
                  <input type="text" id='bnb' name="bnb" value={metamaskBalance?.Quest ? parseFloat(metamaskBalance?.Quest).toFixed(4) : "0.0000"} className='form-control bg-transparent ' disabled />
                </div>


              </div>
              <div className='col-md-6 px-4'>
                <div className="mb-2">
                  <label htmlFor='quantity-input'>Claim Membership NFT</label>
                  <div className='d-flex'>
                    <input type="text" id='quantity-input' name="memberShipNft" className='form-control bg-transparent  rounded-0 rounded-start' value={1} disabled />
                    <button type="button"  className="btn btn-success  text-light rounded-0 rounded-end text-uppercase" onClick={mint}>
                      Claim Now
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <label htmlFor='referralID'>Referral ID</label>
                  <div className='d-flex'>
                    <input type="text" id='referralID' name="referralID" value={user?.myReferralCode} className='form-control bg-transparent  rounded-0 rounded-start' disabled />
                    <button type="button" onClick={() => copyToClipboard(user?.myReferralCode)} className="border bg-success rounded-0 rounded-end">
                      <FontAwesomeIcon icon={faCopy} className='text-white' />
                    </button>
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor='referralID'>Affiliate Link</label>
                  <div className="d-flex">
                    <input type="text" id='referralID' name="referralID" value={window.location.origin + "/" + user?.myReferralCode} className='form-control bg-transparent  rounded-0 rounded-start' disabled />
                    <button type="button" onClick={() => copyToClipboard(window.location.origin + "/" + user?.myReferralCode)} className="border bg-success rounded-0 rounded-end">
                      <FontAwesomeIcon icon={faCopy} className='text-white' />
                    </button>

                  </div>
                </div>


                <div className="mb-2 social-div">
                  <div>
                    <label className=''>Share Affiliate Link</label>
                    <div className='d-flex gap-2 mt-1'>

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

                  </div>
                </div>
                <p className='text-start'>Share your affiliate code to earn 10% of our sales which comes from you. Your friend enjoy another 10% too.</p>


              </div>
              <div className='col-12 col-md-6 text-center d-flex justify-content-start align-items-center ms-0 button-margin' >
                {/* <button className='btn btn-success  me-2' type='submit' disabled={(user.email) ? true : false}>Update</button> */}
                <Link to={"/"}><button className='btn btn-danger me-2'>Cancel</button></Link>
                <button className='btn btn-warning text-light mx-2' type='button' onClick={LogOut}>Logout</button>
              </div>
              {/* <div className='col-4 text-center '>

              
            </div>
            <div className='col-4 text-center'>
             
            </div> */}

            </div>

          </div>
        </div >
      </div >

      <EmailVerifyModal
        userRefetch={userRefetch}
        updateProfile={updateProfile}
        handleVerifyEmail={handleVerifyEmail}
        minutes={minutes}
        seconds={seconds}
        open={openEmail}
        setOpenEmail={setOpenEmail}
        otpVerify={otpVerify}
        setError={setError}
      />

    </>

  );
};

export default Profile;