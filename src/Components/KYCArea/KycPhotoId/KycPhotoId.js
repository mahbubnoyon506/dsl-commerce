import { Close } from "@mui/icons-material";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { BsStarFill } from "react-icons/bs";
import swal from "sweetalert";
import { DSLCommerceContext } from "../../../contexts/DSLCommerceContext";
import { KycContext } from "../../../contexts/KycContext";

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
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { kycUser, handleUpdateUser, setisVerifiedPhotId, isVerifiedPhotId } = useContext(KycContext);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log({
  //     photoIdType,
  //     photoIdNumber,
  //     passportNumber,
  //     drivingLicenseNumber,
  //     countryOfIssue,
  //     photoIdFrontImg,
  //     photoIdBackImg,
  //     drivingLicenseFrontImg,
  //     drivingLicenseBackImg,
  //     passportImg,
  //   });
  // };



  const handlePhotoIdFrontImage = async (e) => {

    const image = e?.target?.files[0];

    const formdata = new FormData();
    formdata.append("file", image);


    await axios
      .post(`https://backend.dslcommerce.com/api/photo-id/upload`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {

          setPhotoIdFrontImage(res.data.result)
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  }
  const handlePhotoIdBackImage = async (e) => {
    const image = e?.target?.files[0];

    const formdata = new FormData();
    formdata.append("file", image);


    await axios
      .post(`https://backend.dslcommerce.com/api/photo-id/upload`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {

          setPhotoIdBackImage(res.data.result)
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  }
  const handleDrivingFrontImage = async (e) => {
    const image = e?.target?.files[0];

    const formdata = new FormData();
    formdata.append("file", image);


    await axios
      .post(`https://backend.dslcommerce.com/api/photo-id/upload`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {

          setDrivingLicenseFrontImage(res.data.result)
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });

  }
  const handleDrivingBackImage = async (e) => {
    const image = e?.target?.files[0];

    const formdata = new FormData();
    formdata.append("file", image);


    await axios
      .post(`https://backend.dslcommerce.com/api/photo-id/upload`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {

          setDrivingLicenseBackImage(res.data.result)
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  }
  const handlePassportImage = async (e) => {
    const image = e?.target?.files[0];

    const formdata = new FormData();
    formdata.append("file", image);


    await axios
      .post(`https://backend.dslcommerce.com/api/photo-id/upload`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {

          setPassportImg(res.data.result)
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const dataObj =
    {
      walletAddress: user?.walletAddress,
      photoId: photoIdNumber,
      photoIdType: photoIdType,
      countryOfIssue: countryOfIssue,
      photoIdFrontImg: photoIdFrontImg,
      photoIdBackImg: photoIdBackImg,
      passportNum: passportNumber,
      passportImg: passportImg,
      drivingNum: drivingLicenseNumber,
      drivingFrontImg: drivingLicenseFrontImg,
      drivingBackImg: drivingLicenseBackImg,

    }




    await axios
      .post(`https://backend.dslcommerce.com/api/photo-id`, dataObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setisVerifiedPhotId(!isVerifiedPhotId);
          setPassportImg("")
          setDrivingLicenseBackImage("")
          setDrivingLicenseFrontImage("")
          setPhotoIdBackImage("")
          setPhotoIdFrontImage("")
          setCountryOfIssue("")
          setDrivingLicenseNumber("")
          setPassportNumber("")
          // setPhotoIdType("")
          setPhotoIdNumber("")

          // setRefetch(!refetch);
          toast.success("Successfully updated your photo id.");
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  const handleRemoveImage = (img) => {

    if (img == "photoIdFrontImg") {

      setPhotoIdFrontImage("")
    }
    else if (img == "photoIdBackImage") {
      setPhotoIdBackImage("");
    }
    else if (img == "drivingLicenseFrontImg") {
      setDrivingLicenseFrontImage("")
    }
    else if (img == "drivingLicenseBackImg") {
      setDrivingLicenseBackImage("")
    }
    else if (img == "passportImg") {
      setPassportImg("")
    }


  };


  // useEffect(() => {}, []);

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
                placeholder="Photo ID Number"
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
                placeholder="Passport Number"
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
                placeholder="Driving license Number"
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
            placeholder="Country of issue"
            onChange={(e) => setCountryOfIssue(e.target.value)}
          />

          {/* If the photo id type is photo id */}
          {photoIdType === "photoId" && (
            <>

              <>
                {console.log(photoIdFrontImg)}
                {photoIdFrontImg && (
                  <div className="selected-video-container mt-4">
                    {/* {selectedImage?.map((image, index) => ( */}
                    <div
                      // key={index}
                      className='each-selected-video-for-priview'>
                      <div className="each-selected-video-container">
                        <img
                          className="each-selected-image"
                          // src={URL.createObjectURL(image)}
                          src={photoIdFrontImg}
                          alt=""
                        />
                        <Close
                          className="selected-image-remove-button"
                          fontSize="small"
                          onClick={() => handleRemoveImage("photoIdFrontImage")}
                        />
                      </div>

                    </div>
                    {/* ))} */}
                  </div>
                )}
              </>



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
                onChange={(e) => handlePhotoIdFrontImage(e)}
              />

              <>

                {photoIdBackImg && (
                  <div className="selected-video-container mt-4">
                    {/* {selectedImage?.map((image, index) => ( */}
                    <div
                      // key={index}
                      className='each-selected-video-for-priview'>
                      <div className="each-selected-video-container">
                        <img
                          className="each-selected-image"
                          // src={URL.createObjectURL(image)}
                          src={photoIdBackImg}
                          alt=""
                        />
                        <Close
                          className="selected-image-remove-button"
                          fontSize="small"
                          onClick={() => handleRemoveImage("photoIdBackImage")}
                        />
                      </div>

                    </div>
                    {/* ))} */}
                  </div>
                )}
              </>

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
                onChange={(e) => handlePhotoIdBackImage(e)}
              />
            </>
          )}

          {/* If the photo id type is driving license */}
          {photoIdType === "drivingLicense" && (
            <>

              <>

                {drivingLicenseFrontImg && (
                  <div className="selected-video-container mt-4">
                    {/* {selectedImage?.map((image, index) => ( */}
                    <div
                      // key={index}
                      className='each-selected-video-for-priview'>
                      <div className="each-selected-video-container">
                        <img
                          className="each-selected-image"
                          // src={URL.createObjectURL(image)}
                          src={drivingLicenseFrontImg}
                          alt=""
                        />
                        <Close
                          className="selected-image-remove-button"
                          fontSize="small"
                          onClick={() => handleRemoveImage("drivingLicenseFrontImg")}
                        />
                      </div>

                    </div>
                    {/* ))} */}
                  </div>
                )}
              </>



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
                  handleDrivingFrontImage(e)
                }
              />

              <>

                {drivingLicenseBackImg && (
                  <div className="selected-video-container mt-4">
                    {/* {selectedImage?.map((image, index) => ( */}
                    <div
                      // key={index}
                      className='each-selected-video-for-priview'>
                      <div className="each-selected-video-container">
                        <img
                          className="each-selected-image"
                          // src={URL.createObjectURL(image)}
                          src={drivingLicenseBackImg}
                          alt=""
                        />
                        <Close
                          className="selected-image-remove-button"
                          fontSize="small"
                          onClick={() => handleRemoveImage("drivingLicenseBackImg")}
                        />
                      </div>

                    </div>
                    {/* ))} */}
                  </div>
                )}
              </>


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
                  handleDrivingBackImage(e)
                }
              />
            </>
          )}

          {/* If the photo id type is passport */}
          {photoIdType === "passport" && (
            <>

              <>

                {passportImg && (
                  <div className="selected-video-container mt-4">
                    {/* {selectedImage?.map((image, index) => ( */}
                    <div
                      // key={index}
                      className='each-selected-video-for-priview'>
                      <div className="each-selected-video-container">
                        <img
                          className="each-selected-image"
                          // src={URL.createObjectURL(image)}
                          src={passportImg}
                          alt=""
                        />
                        <Close
                          className="selected-image-remove-button"
                          fontSize="small"
                          onClick={() => handleRemoveImage("passportImg")}
                        />
                      </div>

                    </div>
                    {/* ))} */}
                  </div>
                )}
              </>

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
                onChange={(e) => handlePassportImage(e)}
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
