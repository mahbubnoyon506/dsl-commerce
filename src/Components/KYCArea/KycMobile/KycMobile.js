import React from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const KycMobile = () => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
          <div className='d-flex'>
            <Form.Control type="text" placeholder="01687874697" />
            <Button style={{marginLeft: '-65px'}} variant="secondary">Verify</Button>
          </div>
          <Button className='mt-4 text-uppercase' variant="primary"> Click here to change mobile.</Button>{' '}
        </Form.Group>
      </Form>

    </div>
  )
}

export default KycMobile