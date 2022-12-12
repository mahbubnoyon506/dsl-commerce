import { Close } from '@mui/icons-material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import swal from 'sweetalert';
import { DSLCommerceContext } from '../../../contexts/DSLCommerceContext';
import { KycContext } from '../../../contexts/KycContext';
import { countryName } from '../CountryName/cData';
import './KycAddress.css'

const KycAddress = () => {

  const { kycUser, handleAddress, refetch, setRefetch, isVerifiedAddress, setisVerifiedAddress } = useContext(KycContext)
  const { user, openWalletModal } = useContext(DSLCommerceContext);

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [file, setFile] = useState("");




  useEffect(() => {
    setAddress1(kycUser?.address1)
    setAddress2(kycUser?.address2)
    setCity(kycUser?.city)
    setState(kycUser?.state)
    setCountry(kycUser?.country)
    setZipCode(kycUser?.zipCode)
  }, [kycUser])

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const data = {
      walletAddress: user?.walletAddress,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      country: country,
      zipCode: zipCode,
      file: file
    };


    await axios
      .post(`https://backend.dslcommerce.com/api/address`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kycUserToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setisVerifiedAddress(!isVerifiedAddress);
          // setRefetch(!refetch);
          toast.success("Successfully updated your address .");
        }
      })
      .catch((err) => {
        console.dir(err)
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });

    // console.log(data);
    // handleAddress(data)


  }




  const handleRemoveImage = () => {


    setFile("")

  };
  return (
    <div>

      <div style={{ background: '#fff', padding: '10px 20px', borderRadius: '3px' }}><p className='text-danger'>Note: If you change your Address, your account will be downgraded till our admin approves it.</p></div>
      <p className='pt-4'>File size should not be more than 5 MB.</p>


      <Form onSubmit={(e) => handleFormSubmit(e)} className="default-width-container">

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label >Address Line 1 <span>★</span> </Form.Label>
          <Form.Control
            type="text"
            defaultValue={address1}
            onChange={(e) => setAddress1(e.target.value)}
            name='address1'
            required
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label >Address Line 2 </Form.Label>
          <Form.Control
            type="text"
            defaultValue={address2}
            onChange={(e) => setAddress2(e.target.value)}
            name='address2'
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label >City  <span>★</span> </Form.Label>
          <Form.Control
            type="text"
            name='city'
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label >State / province  <span>★</span> </Form.Label>
          <Form.Control
            type="text"
            defaultValue={state}
            onChange={(e) => setState(e.target.value)}
            name='state'
            required
          />
        </Form.Group>

        <Form.Group className="mb-3  customStyle" controlId="formBasicEmail">
          <Form.Label >country  <span>★</span> </Form.Label>
          <Form.Select
            name='country'
            defaultValue={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option defaultValue="" > Country </option>
            {countryName?.map((country, index) => (
              <option
                key={index}
                style={{ padding: "5px" }}
                defaultValue={country}
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
            defaultValue={zipCode}
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

          <>

            {file && (
              <div className="selected-video-container mb-3">
                {/* {selectedImage?.map((image, index) => ( */}
                <div
                  // key={index}
                  className='each-selected-video-for-priview'>
                  <div className="each-selected-video-container">
                    <img
                      className="each-selected-image"
                      src={URL.createObjectURL(file)}

                      alt=""
                    />
                    <Close
                      className="selected-image-remove-button"
                      fontSize="small"
                      onClick={handleRemoveImage}
                    />
                  </div>

                </div>
                {/* ))} */}
              </div>
            )}
          </>


          <Form.Control
            type="file"
            defaultValue={file}
            onChange={(e) => setFile(e?.target?.files[0])}
            name='addressProof'
            required
          />
        </Form.Group>

        <Button className="my-3" variant="primary"
          type="submit
        
        ">
          SAVEs
        </Button>

      </Form>
    </div>
  )
}

export default KycAddress