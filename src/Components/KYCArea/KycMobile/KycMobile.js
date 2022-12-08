import React from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const KycMobile = () => {
  return (
    <div>
      <Form className='default-width-container'>
        <Form.Group className="mb-3 customStyle" controlId="formBasicEmail">
          <Form.Label >mobile number <span>★</span> </Form.Label>
          <div className='d-flex'>
            <Form.Control type="text" placeholder="01687874697" />
            <Button style={{ marginLeft: '-65px' }} variant="secondary">Verify</Button>
          </div>
          <Button className='mt-4 text-uppercase' variant="primary"> Submit</Button>{' '}
        </Form.Group>
      </Form>

    </div>
  )
}

export default KycMobile