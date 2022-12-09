import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";

const KycPhotoId = () => {
  const [photoIdType, setPhotoIdType] = useState("photoId");

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
      <Form className="default-width-container">
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label className="text-uppercase">
            Photo ID Number{" "}
            <BsStarFill
              size={8}
              style={{ color: "#FF0000", marginTop: "-10px" }}
            />
          </Form.Label>

          <Form.Control type="text" placeholder="01687874697" />

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

          <Form.Control type="text" placeholder="01687874697" />

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
