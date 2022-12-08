import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const KycLogin = () => {
  const [isVisible, setVisible] = useState(false);

  const handleShow = () => {
    setVisible(!isVisible);
  };
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
      <Card className='shadow bg-white rounded' style={{ width: '25rem', border: 'none', }}>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className='mb-3'>
                <Form.Label className='text-uppercase fw-bold'>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </div>
              <div className='mb-3'>
                <div className='d-flex justify-content-between'>
                  <Form.Label className='text-uppercase fw-bold'>Password</Form.Label>
                  <Link to='#'>Forgot Password?</Link>
                </div>
                <div className='d-flex align-items-center'>
                  <Form.Control type={!isVisible ? "password" : "text"} />
                  <div onClick={handleShow} style={{ marginLeft: '-40px', background: 'transparent', cursor:'pointer' }} >
                    {isVisible ? <AiFillEye size={30} className='text-dark' /> : <AiFillEyeInvisible size={30} className='text-dark' />}
                  </div>
                </div>
              </div>
              <div className='mb-3'>
                <Form.Check
                  type='checkbox'
                  id='checkbox'
                  label='Remember me on this computer'
                />
              </div>
              <Button className='mt-1 w-100 bg-success' as="input" type="submit" value="LOG IN" />
            </Form.Group>
          </Form>
          <hr />
          <p>Don't have an account? <Link to='/kyc/sign-up'>Signup</Link></p>
        </Card.Body>
      </Card>
    </div>
  )
}

export default KycLogin