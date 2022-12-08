import React from 'react'
import Form from 'react-bootstrap/Form';
import './KycAddress.css'

const KycAddress = () => {
  return (
    <div>
      <Form>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >Address Line 1 <span>★</span> </Form.Label>
          <Form.Control type="text" name='addressLine1' />
        </Form.Group>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >Address Line 2 </Form.Label>
          <Form.Control type="text" name='addressLine2' />
        </Form.Group>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >City  <span>★</span> </Form.Label>
          <Form.Control type="text" name='city' />
        </Form.Group>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >State / province  <span>★</span> </Form.Label>
          <Form.Control type="text" name='state'  />
        </Form.Group>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >country  <span>★</span> </Form.Label>
          <Form.Control type="text" name='country'  />
        </Form.Group>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >postal / zip code  <span>★</span>  </Form.Label>
          <Form.Control type="text" name='zipCode'  />
        </Form.Group>

        <Form.Group className="mb-3 w-50 customStyle" controlId="formBasicEmail">
          <Form.Label >address proof   <span>★</span> </Form.Label>
          <Form.Control type="file" name='addressProof'  />
        </Form.Group>

      </Form>
    </div>
  )
}

export default KycAddress