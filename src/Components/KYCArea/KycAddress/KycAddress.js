import React from 'react'
import { Button, Form } from "react-bootstrap";
import { countryName } from '../CountryName/cData';
import './KycAddress.css'

const KycAddress = () => {

  const handleAddress = (e) => {
    e.preventDefault()
    console.log('click')
  }
  return (
    <div>

      <div style={{ background: '#fff', padding: '10px 20px', borderRadius: '3px' }}><p className='text-danger'>Note: If you change your Address, your account will be downgraded till our admin approves it.</p></div>
      <p className='pt-4'>File size should not be more than 5 MB.</p>


      <Form onSubmit={handleAddress}>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >Address Line 1 <span>★</span> </Form.Label>
          <Form.Control
            type="text"
            name='addressLine1'
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >Address Line 2 </Form.Label>
          <Form.Control
            type="text"
            name='addressLine2'
          />
        </Form.Group>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >City  <span>★</span> </Form.Label>
          <Form.Control
            type="text"
            name='city'
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >State / province  <span>★</span> </Form.Label>
          <Form.Control
            type="text"
            name='state'
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >country  <span>★</span> </Form.Label>
          <Form.Select
            name='country'
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

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >postal / zip code  <span>★</span>  </Form.Label>
          <Form.Control
            type="text"
            name='zipCode'
            required

          />
        </Form.Group>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
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