import React from 'react'
import Form from 'react-bootstrap/Form';

const KycMobile = () => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="01687874697" />
          <Form.Text className="text-muted" style={{ color: '#99701E' }}>
            Click here to change your email address.
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  )
}

export default KycMobile