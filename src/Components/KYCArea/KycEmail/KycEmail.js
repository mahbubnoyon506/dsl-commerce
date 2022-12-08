import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsInfoCircleFill } from 'react-icons/bs';

const KycEmail = () => {
  return (
    <div>
      <Form className='default-width-container mt-3'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='text-uppercase'>Email address <BsInfoCircleFill /> </Form.Label>
          <div className='d-flex'>
            <Form.Control type="email" placeholder="Enter email" />
            <Button style={{ marginLeft: '-65px' }} variant="secondary">Verify</Button>
          </div>
          <p className="" style={{ color: '#99701E' }}>
            Click here to change your email address.
          </p>
          <Button className='mt-1 text-uppercase' as="input" type="submit" value="Submit" />
        </Form.Group>
      </Form>

    </div>
  )
}

export default KycEmail