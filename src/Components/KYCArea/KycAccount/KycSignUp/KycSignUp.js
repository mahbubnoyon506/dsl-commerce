import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const KycSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const referralId = e.target.referralId.value;
    const fullName = e.target.fullName.value;
    const userName = e.target.userName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    console.log(
      referralId,
      fullName,
      userName,
      email,
      password,
      confirmPassword
    );
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(111, 111, 111)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="merchant-sign-up-container"
    >
      <div
        style={{ paddingBlock: "30px", paddingInline: "30px" }}
        className="default-width-container bg-white"
      >
        <Form onSubmit={(e) => handleFormSubmit(e)}>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold">Referral ID</Form.Label>
            <Form.Control
              name="referralId"
              type="text"
              placeholder="Referral ID"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold">
              Enter your Full Name as per your PhotoId
            </Form.Label>
            <Form.Control
              name="fullName"
              type="text"
              placeholder="Enter your Full Name as per your PhotoId"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold">Enter your User Name</Form.Label>
            <Form.Control
              name="userName"
              type="text"
              placeholder="Enter your User Name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold">Enter your email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold">Enter your Password</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                name="password"
                placeholder="Enter your Password"
                required
                type={!showPassword ? "password" : "text"}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  marginLeft: "-40px",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <AiFillEye size={30} className="text-dark" />
                ) : (
                  <AiFillEyeInvisible size={30} className="text-dark" />
                )}
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold">Confirm your Password</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                name="password"
                placeholder="Enter your Password"
                required
                type={!showConfirmPassword ? "password" : "text"}
              />
              <div
                onClick={() => setShowConfirmPassword(!showPassword)}
                style={{
                  marginLeft: "-40px",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {showConfirmPassword ? (
                  <AiFillEye size={30} className="text-dark" />
                ) : (
                  <AiFillEyeInvisible size={30} className="text-dark" />
                )}
              </div>
            </div>
          </Form.Group>
          <Button className="my-3 w-100" variant="primary" type="submit">
            SING UP
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default KycSignUp;
