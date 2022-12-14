import React, { useContext, useEffect, useState } from "react";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
import KycAddress from "../../Components/KYCArea/KycAddress/KycAddress";
import KycEmail from "../../Components/KYCArea/KycEmail/KycEmail";
import KycMobile from "../../Components/KYCArea/KycMobile/KycMobile";
import KycPhotoId from "../../Components/KYCArea/KycPhotoId/KycPhotoId";
import KycProfile from "../../Components/KYCArea/KycProfile/KycProfile";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./KYC.css";
import { DoneOutline } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import { KycContext } from "../../contexts/KycContext";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import axios from "axios";
import KycAddProduct from "../../Components/KYCArea/KycAddProduct/KycAddProduct";
const KYC = () => {
  const [key, setKey] = useState("profile");
  const [photoIddata, setphotoIddata] = useState({});
  const [photoIddataRefetch, setphotoIddataRefetch] = useState(false);
  const [addressDataRefetch, setaddressDataRefetch] = useState(false);
  const [addressData, setaddressData] = useState({});
  const [userProfileData, setuserProfileData] = useState({});
  const [userProfileDataRefetch, setuserProfileDataRefetch] = useState(false);
  const {
    kycUser,
    handleUpdateUser,
    emailVerified,
    mobileNoVerify,
    isVerifiedAddress,
    isVerifiedPhotId,
    isVerifiedProfile,
  } = useContext(KycContext);
  const { user, openWalletModal } = useContext(DSLCommerceContext);

  console.log("from kycs", photoIddata, addressData, "user", kycUser);
  // console.log(kycUser)

  useEffect(() => {
    const getPhotoIddata = async () => {
      await axios
        .get(
          `https://backend.dslcommerce.com/api/photo-id/data/${kycUser?.walletAddress}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setphotoIddata(res.data.result);
        });
    };
    getPhotoIddata();
  }, [kycUser?.walletAddress, isVerifiedPhotId]);

  useEffect(() => {
    const getAddressData = async () => {
      await axios
        .get(
          `https://backend.dslcommerce.com/api/address/data/${kycUser?.walletAddress}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
            },
          }
        )
        .then((res) => {
          setaddressData(res.data.result);
        });
    };
    getAddressData();
  }, [kycUser?.walletAddress, isVerifiedAddress]);

  useEffect(() => {
    const getProfile = async () => {
      await axios
        .get(
          `https://backend.dslcommerce.com/api/user-panel/user/${kycUser?.walletAddress}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setuserProfileData(res.data.result);
        });
    };
    getProfile();
  }, [kycUser?.walletAddress, isVerifiedProfile]);

  const isPhotoidPosted = localStorage.getItem("photoIdPosted");
  const isaddressPosted = localStorage.getItem("addressPosted");

  return (
    <main
      className="kycMainArea"
      style={{ background: "#6f6f6f", minHeight: "100vh", color: "white" }}
    >
      <div className="container px-0">
        <div className="pt-3 mb-3">
          <p className="fs-4 fw-bold text-uppercase text-white pl-4">
            My profile
          </p>
          <hr />
        </div>
      </div>
      <div
        className="container p-4"
        style={{ background: "rgb(38, 38, 38)", minHeight: "100vh" }}
      >
        <Tabs>
          <TabList classNam="gridFilter text-start mb-50 md-mb-30">
            <Tab>
              PROFILE
              {isVerifiedProfile == false && !userProfileData?.nationality && (
                <CloseIcon
                  className="text-danger ms-1"
                  style={{ fontSize: "18px" }}
                />
              )}
              {/* {(isVerifiedProfile == true && userProfileData?.isVerified == false) &&
                < ErrorIcon className="text-warning" />
              } */}
              {(isVerifiedProfile == true || userProfileData?.nationality) && (
                <DoneIcon
                  className="text-success ms-1"
                  style={{ fontSize: "18px" }}
                />
              )}
            </Tab>
            <Tab>
              EMAIL
              {kycUser?.emailVerified == false && (
                <CloseIcon
                  className="text-danger ms-1"
                  style={{ fontSize: "18px" }}
                />
              )}
              {kycUser?.emailVerified == true && (
                <DoneIcon
                  className="text-success ms-1"
                  style={{ fontSize: "18px" }}
                />
              )}
            </Tab>
            <Tab>
              MOBILE
              {kycUser?.mobileVerified == false && (
                <CloseIcon
                  className="text-danger ms-1"
                  style={{ fontSize: "18px" }}
                />
              )}
              {kycUser?.mobileVerified == true && (
                <DoneIcon
                  className="text-success ms-1"
                  style={{ fontSize: "18px" }}
                />
              )}
            </Tab>
            {console.log(
              "testnet",
              isPhotoidPosted != "true",
              isPhotoidPosted,
              // isVerifiedPhotId == false,  
              photoIddata?.isVerified == false,
              photoIddata?.isVerified == undefined,
              // photoIddata?.isPending == true,
              // photoIddata?.isPending == undefined,
              // photoIddata?.isVerified == undefined
            )}
            {/* {console.log(isVerifiedPhotId == false, photoIddata?.isVerified == false)} */}

            <Tab>
              PHOTO ID
              {isPhotoidPosted != "true" &&
                isVerifiedPhotId == false &&
                (photoIddata?.isVerified == undefined ||
                  photoIddata?.isVerified == false) && (
                  <CloseIcon
                    className="text-danger ms-1"
                    style={{ fontSize: "18px" }}
                  />
                )}

              {console.log(
                photoIddata?.isVerified == false, photoIddata?.isPending == true
              )}
              {photoIddata?.isVerified == false && photoIddata?.isPending == true && (
                <ErrorIcon
                  className="text-warning ms-1"
                  style={{ fontSize: "18px" }}
                />
              )}
              {photoIddata?.isVerified == true && photoIddata?.isPending == false && (
                <DoneIcon
                  className="text-success ms-1"
                  style={{ fontSize: "18px" }}
                />
              )}
            </Tab>
            {console.log(
              isVerifiedAddress == false,
              addressData?.isVerified,
              "test"
            )}

            <Tab>
              ADDRESS PROOF
              {isaddressPosted != "true" && isVerifiedAddress == false &&
                (addressData?.isVerified == undefined ||
                  addressData?.isVerified == false) && (
                  <CloseIcon
                    className="text-danger ms-1"
                    style={{ fontSize: "18px" }}
                  />
                )}
              {addressData?.isPending == true &&
                addressData?.isVerified == false && (
                  <ErrorIcon
                    className="text-warning ms-1"
                    style={{ fontSize: "18px" }}
                  />
                )}
              {addressData?.isVerified == true && addressData?.isPending == false && (
                <DoneIcon
                  className="text-success ms-1"
                  style={{ fontSize: "18px" }}
                />
              )}
            </Tab>

            <Tab>
              ADD PRODUCTS
              {/* {(isVerifiedAddress == false && addressData?.isVerified == false) &&
                <CloseIcon className="text-danger ms-1" style={{ fontSize: "18px" }} />
              }

              {(isVerifiedAddress == true && addressData?.isVerified == false) &&
                <ErrorIcon className="text-warning ms-1" style={{ fontSize: "18px" }} />
              }

              {addressData?.isVerified == true &&
                <DoneIcon className="text-success ms-1" style={{ fontSize: "18px" }} />
              } */}
            </Tab>
          </TabList>

          <TabPanel>
            <KycProfile setuserProfileDataRefetch={setuserProfileDataRefetch} userProfileDataRefetch={userProfileDataRefetch} />
          </TabPanel>

          <TabPanel>
            <KycEmail />
          </TabPanel>

          <TabPanel>
            <KycMobile />
          </TabPanel>

          <TabPanel>
            <KycPhotoId photoIddata={photoIddata} setphotoIddataRefetch={setphotoIddataRefetch} photoIddataRefetch={photoIddataRefetch} />
          </TabPanel>

          <TabPanel>
            <KycAddress addressData={addressData} setaddressDataRefetch={setaddressDataRefetch} addressDataRefetch={addressDataRefetch} />
          </TabPanel>

          <TabPanel>
            <KycAddProduct />
          </TabPanel>
        </Tabs>

        {/* <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          style={{ background: '#262626' }}
        >
          <Tab eventKey="profile" title="PROFILE" >
            <KycProfile />
          </Tab>
          <Tab eventKey="email" title="EMAIL">
            <KycEmail />
          </Tab>
          <Tab eventKey="mobile" title="MOBILE">
            <KycMobile />
          </Tab>
          <Tab eventKey="photoId" title="PHOTO ID">
            <KycPhotoId />
          </Tab>
          <Tab eventKey="address" title="ADDRESS PROOF">
            <KycAddress />
          </Tab>
        </Tabs> */}
      </div>
    </main>
  );
};

export default KYC;
