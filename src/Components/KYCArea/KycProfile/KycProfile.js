import React from "react";
import { Button, Form } from "react-bootstrap";

const KycProfile = () => {
  return (
    <div className="merchant-profile-container">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>MEMBERSHIP ID</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>USERNAME</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>FULL NAME AS PER YOUR PHOTO ID*</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>DATE OF BIRTH*</Form.Label>
          <Form.Control type="text" placeholder="" />
          <Form.Label>Use DD/MM/YYYY formate for date of birth</Form.Label>
        </Form.Group>
        <Form.Label>GENDER*</Form.Label>
        <Form.Select className="mb-3" aria-label="Default select example">
          <option> -- Select -- </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Form.Select>
        <Form.Label>NATIONALITY*</Form.Label>
        <Form.Select className="mb-3" aria-label="Default select example">
          <option> -- Select -- </option>
          <option value="Male">Bangladesh</option>
          <option value="Female">India</option>
        </Form.Select>
        <Form.Label>TIME ZONE*</Form.Label>
        <Form.Select className="mb-3" aria-label="Default select example">
          <option> -- Select -- </option>
          <option value="Male">Bangladesh</option>
          <option value="Female">India</option>
        </Form.Select>
        <Form.Group className="mb-6" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>
    </div>
  );
};

export default KycProfile;
