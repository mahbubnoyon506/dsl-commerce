import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import swal from 'sweetalert';
import { KycContext } from '../../../contexts/KycContext';
import { countryName } from '../CountryName/cData';
import './KycAddress.css'

const KycAddress = () => {

  const { kycUser, handleUpdateUser } = useContext(KycContext)

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [file, setFile] = useState("");
  // console.log(kycUser?._id)

  // useEffect(() => {
  //   setAddress1(kycUser?.address1)
  //   setAddress2(kycUser?.address2)
  //   setCity(kycUser?.city)
  //   setState(kycUser?.state)
  //   setCountry(kycUser?.country)
  //   setZipCode(kycUser?.zipCode)
  // }, [kycUser])

  const handleAddress = async(e) => {
    e.preventDefault()

    const data = {
      address1: address1,
      address2: address2,
      // city: city,
      // state: state,
      // country: country,
      // file:file
    };

    console.log(data);
    

  }
  return (
    <div>

      <div style={{ background: '#fff', padding: '10px 20px', borderRadius: '3px' }}><p className='text-danger'>Note: If you change your Address, your account will be downgraded till our admin approves it.</p></div>
      <p className='pt-4'>File size should not be more than 5 MB.</p>


      <Form onSubmit={handleAddress} className="default-width-container">

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label >Address Line 1 <span>★</span> </Form.Label>
          <Form.Control
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            name='address1'
            required
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label >Address Line 2 </Form.Label>
          <Form.Control
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            name='address2'
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label >City  <span>★</span> </Form.Label>
          <Form.Control
            type="text"
            name='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label >State / province  <span>★</span> </Form.Label>
          <Form.Control
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            name='state'
            required
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label >country  <span>★</span> </Form.Label>
          <Form.Select
            name='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="" > Country </option>
            {countryName?.map((country, index) => (
              <option
                key={index}
                style={{ padding: "5px" }}
                value={country}
              >
                {country}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label >postal / zip code  <span>★</span>  </Form.Label>
          <Form.Control
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            name='zipCode'
            required

          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label >address proof   <span>★</span> </Form.Label>
          <p className='pt-1'>Please provide the following documents which clearly reflects your Full Name and Address . The document must not be order than 3 months  from the date this verification.</p>
          <ol>
            <li>Utilities Bill</li>
            <li>Mobile Phone Bill</li>
            <li>Bank Statement</li>
            <li>Government Letter</li>
          </ol>
          <Form.Control
            type="file"
            value={file}
            onChange={(e) => setFile(e.target.value)}
            name='addressProof'
            required
          />
        </Form.Group>

        <Button className="my-3" variant="primary"
          type="submit
        
        ">
          SAVE
        </Button>

      </Form>
    </div>
  )
}

export default KycAddress