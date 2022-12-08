import React from "react";
import { Button, Form } from "react-bootstrap";

const KycSignUp = () => {
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
        className="w-50 bg-white"
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
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold">Confirm your Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm your Password"
              required
            />
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
