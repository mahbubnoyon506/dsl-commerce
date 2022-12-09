import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import KycAddress from "../../Components/KYCArea/KycAddress/KycAddress";
import KycEmail from "../../Components/KYCArea/KycEmail/KycEmail";
import KycMobile from "../../Components/KYCArea/KycMobile/KycMobile";
import KycPhotoId from "../../Components/KYCArea/KycPhotoId/KycPhotoId";
import KycProfile from "../../Components/KYCArea/KycProfile/KycProfile";

import "./KYC.css";

const KYC = () => {
  const [key, setKey] = useState("profile");
  return (
    <main
      className="kycMainArea"
      style={{ background: "#6f6f6f", minHeight: "100vh", color: "white" }}
    >
      <div className="container px-0">
        <div className="pt-3 mb-3">
          <p className="fs-4 fw-bold text-uppercase text-white pl-4">My profile</p>
          <hr />
        </div>
      </div>
      <div className="container p-4" style={{background:"rgb(38, 38, 38)" , minHeight:"100vh"}}>

        <Tabs
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
        </Tabs>
      </div>
    </main>
  );
};

export default KYC;