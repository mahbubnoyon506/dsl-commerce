import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsInfoCircleFill } from 'react-icons/bs';

const KycEmail = () => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
          <Form.Label>Email address <BsInfoCircleFill/> </Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted" style={{color: '#99701E'}}>
           Click here to change your email address.
          </Form.Text>
        </Form.Group>
      </Form>

    </div>
  )
}

export default KycEmail