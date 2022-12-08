import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { BsStarFill } from 'react-icons/bs'

const KycPhotoId = () => {
  return (
    <div className=''>
      <div style={{ background: '#fff', padding: '10px 20px', borderRadius: '3px' }}><p className='text-danger'>Note: If you change your ID with photo, your account will be downgraded till our admin approves it.</p></div>
      <p className='pt-4'>File size should not be more than 5 MB.</p>
      <p>Please upload a clear copy of your Government issued ID card, passport or driving licence.</p>
      <p className='fs-5 fw-bold'>Do not upload your selfies here.</p>
      <Form>
        <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
          <Form.Label className='text-uppercase'>Photo ID Number <BsStarFill size={8} style={{ color: '#FF0000', marginTop: '-10px' }} /></Form.Label>
          <Form.Control type="text" placeholder="01687874697" />
          <Form.Label className='text-uppercase mt-4'>Type of photo ID passport <BsStarFill size={8} style={{ color: '#FF0000', marginTop: '-10px' }} /></Form.Label>
          <Form.Control type="text" placeholder="01687874697" />
          <Form.Label className='text-uppercase mt-4'>Country of issue <BsStarFill size={8} style={{ color: '#FF0000', marginTop: '-10px' }} /></Form.Label>
          <Form.Control type="text" placeholder="01687874697" />
          <Form.Label className='text-uppercase mt-4'>Photo id front image <BsStarFill size={8} style={{ color: '#FF0000', marginTop: '-10px' }} /></Form.Label>
          <Form.Control type="file" placeholder="01687874697" />
          <Button className='mt-4' as="input" type="submit" value="Submit" />
        </Form.Group>
      </Form>
    </div>
  )
}

export default KycPhotoId