import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { KycContext } from "../../../contexts/KycContext";
import { time_zone } from "../CountryName/cData";
import "./KycProfile.css";

const KycProfile = () => {
  const { kycUser, handleUpdateUser } = useContext(KycContext);

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [timeZone, setTimeZone] = useState([]);
  const [timeZ, setTimeZ] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  useEffect(() => {
    setUserName(kycUser?.username);
    setFullName(kycUser?.name);
    setDateOfBirth(kycUser?.birthday);
    setGender(kycUser?.gender);
    setNationality(kycUser?.nationality);
    setTimeZ(kycUser?.timezone);
    setAboutMe(kycUser?.description);
  }, [kycUser]);

  useEffect(() => {
    if (nationality) {
      const selectedCountry = time_zone.find(
        (country) => country.country === nationality
      );
      console.log(selectedCountry);
      setTimeZone(selectedCountry.zones);
    } else {
      setTimeZone([]);
    }
  }, [nationality]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (gender === "choose" || gender === "Gender") {
      toast.error("Gender is required ! ");
      return;
    }
    if (nationality === "choose") {
      toast.error("Nationality is required ! ");
      return;
    }

    const data = {
      walletAddress: kycUser?.walletAddress,
      username: userName,
      name: fullName,
      birthday: dateOfBirth,
      gender: gender,
      nationality: nationality,
      timezone: timeZ,
      description: aboutMe,
    };

    handleUpdateUser(data);
  };

  return (
    <div className="merchant-profile-container">
      <Form
        className="default-width-container"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>MEMBERSHIP ID</Form.Label>
          <Form.Control
            name="memberShipId"
            value={kycUser?.memberId}
            type="text"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>USERNAME</Form.Label>
          <Form.Control
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value.toLocaleLowerCase())}
            type="text"
            placeholder=""
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>FULL NAME AS PER YOUR PHOTO ID*</Form.Label>
          <Form.Control
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder=""
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>DATE OF BIRTH*</Form.Label>
          <Form.Control
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            type="date"
            placeholder=""
            maxLength={10}
            required
          />
          <Form.Label>Use DD/MM/YYYY formate for date of birth</Form.Label>
        </Form.Group>
        <Form.Label>GENDER*</Form.Label>
        <Form.Select
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mb-3"
          required
        >
          <option value="choose"> Gender </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Form.Select>
        <Form.Label>NATIONALITY*</Form.Label>
        <Form.Select
          value={nationality}
          name="nationality"
          onChange={(e) => setNationality(e.target.value)}
          className="mb-3"
          required
        >
          <option value="choose"> Nationality </option>
          {time_zone?.map((country, index) => (
            <option
              key={index}
              style={{ padding: "5px" }}
              value={country.country}
            >
              {country?.country}
            </option>
          ))}
        </Form.Select>
        <Form.Label>TIME ZONE*</Form.Label>
        <Form.Select
          name="timeZone"
          value={timeZ}
          onChange={(e) => setTimeZ(e.target.value)}
          className="mb-3"
          required
        >
          <option value="choose"> -- Select time zone -- </option>
          {timeZone?.map((eachZone) => (
            <option value={eachZone}>{eachZone}</option>
          ))}
        </Form.Select>
        <Form.Group className="mb-6" controlId="exampleForm.ControlTextarea1">
          <Form.Label>ABOUT ME</Form.Label>
          <Form.Control
            name="aboutMe"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            as="textarea"
            rows={3}
            required
          />
        </Form.Group>
        <Button className="my-3" variant="primary" type="submit">
          SAVE
        </Button>
      </Form>
    </div>
  );
};

export default KycProfile;
