import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";

const KycPhotoId = () => {
  const [photoIdType, setPhotoIdType] = useState("photoId");
  const [photoIdNumber, setPhotoIdNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState("");
  const [countryOfIssue, setCountryOfIssue] = useState("");
  const [photoIdFrontImg, setPhotoIdFrontImage] = useState("");
  const [photoIdBackImg, setPhotoIdBackImage] = useState("");
  const [drivingLicenseFrontImg, setDrivingLicenseFrontImage] = useState("");
  const [drivingLicenseBackImg, setDrivingLicenseBackImage] = useState("");
  const [passportImg, setPassportImg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({
      photoIdType,
      photoIdNumber,
      passportNumber,
      drivingLicenseNumber,
      countryOfIssue,
      photoIdFrontImg,
      photoIdBackImg,
      drivingLicenseFrontImg,
      drivingLicenseBackImg,
      passportImg,
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="">
      <div
        className="mt-3"
        style={{
          background: "#fff",
          padding: "10px 20px",
          borderRadius: "3px",
        }}
      >
        <p className="text-danger">
          Note: If you change your ID with photo, your account will be
          downgraded till our admin approves it.
        </p>
      </div>
      <p className="pt-4">File size should not be more than 5 MB.</p>
      <p>
        Please upload a clear copy of your Government issued ID card, passport
        or driving licence.
      </p>
      <p className="fs-5 fw-bold">Do not upload your selfies here.</p>
      <Form onSubmit={(e) => onSubmit(e)} className="default-width-container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {photoIdType === "photoId" && (
            <>
              <Form.Label className="text-uppercase">
                Photo ID Number{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="photoIdNumber"
                type="text"
                placeholder="01687874697"
                required
                onChange={(e) => setPhotoIdNumber(e.target.value)}
              />
            </>
          )}
          {photoIdType === "passport" && (
            <>
              <Form.Label className="text-uppercase">
                Passport Number{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="passportNumber"
                type="text"
                placeholder="01687874697"
                required
                onChange={(e) => setPassportNumber(e.target.value)}
              />
            </>
          )}
          {photoIdType === "drivingLicense" && (
            <>
              <Form.Label className="text-uppercase">
                Driving license Number{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="drivingLicenseNumber"
                type="text"
                placeholder="01687874697"
                required
                onChange={(e) => setDrivingLicenseNumber(e.target.value)}
              />
            </>
          )}

          <Form.Label className="text-uppercase mt-4">
            Type of photo id{" "}
            <BsStarFill
              size={8}
              style={{ color: "#FF0000", marginTop: "-10px" }}
            />
          </Form.Label>

          <Form.Select
            onChange={(e) => setPhotoIdType(e.target.value)}
            aria-label="Default select example"
          >
            <option value="photoId">Photo ID</option>
            <option value="passport">Passport</option>
            <option value="drivingLicense">Driving license</option>
          </Form.Select>

          <Form.Label className="text-uppercase mt-4">
            Country of issue{" "}
            <BsStarFill
              size={8}
              style={{ color: "#FF0000", marginTop: "-10px" }}
            />
          </Form.Label>
          <Form.Control
            name="countryOfIssue"
            required
            type="text"
            placeholder="01687874697"
            onChange={(e) => setCountryOfIssue(e.target.value)}
          />

          {/* If the photo id type is photo id */}
          {photoIdType === "photoId" && (
            <>
              <Form.Label className="text-uppercase mt-4">
                Photo id front image{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="photoIdFrontImg"
                accept=".jpg, .jpeg, .png"
                type="file"
                placeholder=""
                required
                onChange={(e) => setPhotoIdFrontImage(e?.target?.files[0])}
              />
              <Form.Label className="text-uppercase mt-4">
                Photo id back image{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="photoIdBackImg"
                accept=".jpg, .jpeg, .png"
                type="file"
                placeholder=""
                required
                onChange={(e) => setPhotoIdBackImage(e?.target?.files[0])}
              />
            </>
          )}

          {/* If the photo id type is driving license */}
          {photoIdType === "drivingLicense" && (
            <>
              <Form.Label className="text-uppercase mt-4">
                Driving license front image{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="drivingLicenseFrontImg"
                type="file"
                placeholder=""
                accept=".jpg, .jpeg, .png"
                required
                onChange={(e) =>
                  setDrivingLicenseFrontImage(e?.target?.files[0])
                }
              />
              <Form.Label className="text-uppercase mt-4">
                Driving license back image{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="drivingLicenseBackImg"
                type="file"
                placeholder=""
                accept=".jpg, .jpeg, .png"
                required
                onChange={(e) =>
                  setDrivingLicenseBackImage(e?.target?.files[0])
                }
              />
            </>
          )}

          {/* If the photo id type is passport */}
          {photoIdType === "passport" && (
            <>
              <Form.Label className="text-uppercase mt-4">
                Passport image{" "}
                <BsStarFill
                  size={8}
                  style={{ color: "#FF0000", marginTop: "-10px" }}
                />
              </Form.Label>
              <Form.Control
                name="passportImg"
                type="file"
                accept=".jpg, .jpeg, .png"
                placeholder=""
                required
                onChange={(e) => setPassportImg(e?.target?.files[0])}
              />
            </>
          )}

          <Button
            className="my-4 text-uppercase"
            as="input"
            type="submit"
            value="Submit"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default KycPhotoId;
