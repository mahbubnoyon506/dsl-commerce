import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import './UserDetails.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';


function UserDetails() {
    const { walletAddress } = useParams()
    const [userInfo, setUserInfo] = useState();
    const [userAddress, setUserAddress] = useState();
    const [photoId, setPhotoId] = useState()
    // console.log('eeeeeeeeeeee', userInfo)
    // console.log('eeeeeeeeeeee', userAddress)
    console.log('eeeeeeeeeeee', photoId)


    // console.log(walletAddress);

    useEffect(() => {
        fetch(`https://backend.dslcommerce.com/api/user-panel/user/${walletAddress}`)
            .then(res => res.json())
            .then(data => setUserInfo(data.result))
    }, [walletAddress]);


    useEffect(() => {
        fetch(`https://backend.dslcommerce.com/api/address/data/${walletAddress}`)
            .then(res => res.json())
            .then(data => setUserAddress(data.result))
    }, [walletAddress]);


    console.log("userAddress", userAddress)

    useEffect(() => {
        fetch(`https://backend.dslcommerce.com/api/photo-id/data/${walletAddress}`)
            .then(res => res.json())
            .then(data => setPhotoId(data.result))
    }, [walletAddress]);

    const registrationDate = new Date(userInfo?.createdAt).toLocaleString().split(",")?.[0];
    // console.log(registrationDate)

    let validRegDate;

    if (registrationDate == "Invalid Date") {
        validRegDate = ""
    } else {
        validRegDate = registrationDate;
    }

    return (
        <div style={{ minHeight: '450px' }}>

            <div>
                <Accordion defaultExpanded className='svgColor  mb-2' style={{ backgroundColor: '#272D47', color: 'white' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='ps-4'
                    >
                        <Typography>User Profile <CheckIcon id='rightMark' style={{ color: 'green !important', fontSize: '30px', }} /></Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <div className='container row '>
                            <div className='col-12 col-lg-6 px-4'>
                                <div className="mb-2">
                                    <label htmlFor='membershipId'>Membership Id</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='membershipId' name="membershipId"
                                            className='form-control bg-transparent text-white'
                                            placeholder='membership id'
                                            defaultValue={userInfo?.memberId ? userInfo?.memberId : ''} />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='fullName'>Full Name</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='fullName' name="fullName"
                                            className='form-control bg-transparent text-white'
                                            placeholder='full name'
                                            defaultValue={userInfo?.name ? userInfo?.name : ''} />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='userName'>User Name</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='userName' name="userName"
                                            className='form-control bg-transparent text-white'
                                            placeholder='user name'
                                            defaultValue={userInfo?.username ? userInfo?.username : ''} />
                                    </div>
                                </div>
                                <div className="mb-2 d-flex py-2">
                                    <label htmlFor='userName'>Gender</label>

                                    <form action="" className=' ps-2'>
                                        <select style={{ backgroundColor: '#272D47', border: '1px solid #fff' }} className='p-1 text-white  rounded'>
                                            <option value="Male" selected={userInfo?.gender == "Male" && true}>Male</option>
                                            <option value="Female" selected={userInfo?.gender == "Female" && true}>Female</option>
                                            <option value="Others" selected={userInfo?.gender == "Others" && true}>Others</option>
                                        </select>
                                    </form>

                                </div>
                                <div className="mb-2">
                                    <label htmlFor='registerDate'>Registration Date</label>
                                    <div className='d-flex  input-group'>
                                        <input
                                            defaultValue={validRegDate || ''}
                                            type="text" id='registerDate' name="registerDate"
                                            className='form-control bg-transparent text-white'
                                            placeholder='register date  ' />
                                    </div>
                                </div>
                                {/* <div className="mb-2">
                                    <label htmlFor='lastLoginIp'>Last Login Ip</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='lastLoginIp' name="lastLoginIp"
                                            className='form-control bg-transparent text-white'
                                            defaultValue={userInfo?.ip ? userInfo?.ip : ''} />
                                    </div>
                                </div> */}
                                {/* <div className="mb-2">
                                    <label htmlFor='remark'>Remark</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='remark' name="remark"
                                            className='form-control bg-transparent text-white'
                                            placeholder='remark' />
                                    </div>
                                </div> */}
                            </div>







                            <div className='col-12 col-lg-6 px-4'>

                                <div className="mb-2">
                                    <label htmlFor='email'>Email <CheckIcon
                                        style={{ color: 'green', fontSize: '20px' }} /></label>
                                    <div className='d-flex  input-group'>
                                        <input type="email" id='email' name="email"
                                            className='form-control bg-transparent text-white'
                                            placeholder='email '
                                            defaultValue={userInfo?.email ? userInfo?.email : ''} />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='mobile'>Mobile <CheckIcon
                                        style={{ color: 'green', fontSize: '20px' }} /></label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='mobile' name="mobile"
                                            className='form-control bg-transparent text-white'
                                            value={userInfo?.mobile} />
                                        {/* {console.log("userInfo?.mobile", userInfo?.mobile)} */}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='dob'>Date of Birth</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='dob' name="dob"
                                            className='form-control bg-transparent text-white'
                                            defaultValue={userInfo?.birthday ? userInfo?.birthday : ''}
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='nationality'>Nationality</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='nationality' name="nationality"
                                            className='form-control bg-transparent text-white'
                                            defaultValue={userInfo?.nationality ? userInfo?.nationality : ''}
                                        />
                                    </div>
                                </div>
                                {/* <div className="mb-2">
                                    <label htmlFor='lastLogin'>Last Login</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='lastLogin' name="lastLogin"
                                            className='form-control bg-transparent text-white'
                                            placeholder='last login' />
                                    </div>
                                </div> */}

                            </div>

                            <div className="my-2 px-4 mt-4 ps-4 ">
                                <div className=' d-lg-flex '>
                                    <div className='text-center pt-2'>
                                        <button className=' btn btn-primary  px-4 me-2 rounded text-uppercase '>UPDATE</button>
                                    </div>
                                    <div className='text-center pt-2'>
                                        <button className=' btn btn-warning px-4 me-2 rounded text-uppercase'>PENDING </button>
                                    </div>
                                    <div className='text-center pt-2'>
                                        <button className=' btn btn-success px-4 me-2 rounded text-uppercase'>VERIFY</button>
                                    </div>
                                    <div className='text-center pt-2'>
                                        <button className=' btn btn-danger px-4 me-2 rounded text-uppercase' >DELETE </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </AccordionDetails>
                </Accordion>



                <Accordion className='svgColor mb-2' style={{ backgroundColor: '#272D47', color: 'white' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className='ps-4'
                    >
                        <Typography>Address Proof <CheckIcon id='rightMark' style={{ color: 'green', fontSize: '30px' }} /></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='container row '>

                            <div className='col-12 col-lg-6 px-4'>
                                <div className="mb-2">
                                    <label htmlFor='address1'>Address 1</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='address1' name="address1" className='form-control bg-transparent text-white' defaultValue={userAddress?.address1} />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='address2'>Address 2</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='postaladdress2Code' name="address2" className='form-control bg-transparent text-white' defaultValue={userAddress?.address2} />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='postalCode'>Postal Code</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='postalCode' name="postalCode" className='form-control bg-transparent text-white' defaultValue={userAddress?.zipCode} />
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label htmlFor='country'>Country</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='country' name="country" className='form-control bg-transparent text-white' defaultValue={userAddress?.country} />
                                    </div>
                                </div>

                            </div>

                            <div className='col-12 col-lg-6 max-w-100 px-4 mt-2'>
                                <label for="address proof image">Address Proof Image</label>
                                <img className='max-w-100' src={userAddress?.file} alt="address proof" />
                                <input className='mt-3 ms-1 w-100' type="file" accept='image/*' />
                            </div>


                            <div className="my-2 ms-3">
                                <button className='btn btn-primary rounded-0 text-uppercase'> Update address proof</button>
                            </div>

                        </div>
                    </AccordionDetails>
                </Accordion>


                <Accordion className='svgColor mb-2' style={{ backgroundColor: '#272D47', color: 'white' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className='ps-4'
                    >
                        <Typography>Photo ID <CheckIcon id='rightMark' s style={{ color: 'green', fontSize: '30px' }} /></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='container row '>

                            <div className='col-12 col-lg-6'>
                                <div className="mb-2">
                                    <label htmlFor='photoIdNumber'>Photo Id Number</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='photoIdNumber' name="photoIdNumber" className='form-control bg-transparent text-white' defaultValue={photoId?.photoId} placeholder='photo Id number' />
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label htmlFor='photoIdType'>Photo Id Type</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='photoIdType' defaultValue={photoId?.photoIdType} name="photoIdType" className='form-control bg-transparent text-white' placeholder='photo Id type' />
                                    </div>
                                </div>
                            </div>


                            <div className='col-12 col-lg-6 px-4 mt-2'>
                                <label for="address proof image">Front Image</label>
                                <img src={photoId?.file} alt="address proof" />
                                {/* <input className='mt-3 w-100' type="file" accept='image/*' /> */}
                            </div>

                        </div>
                    </AccordionDetails>
                </Accordion>

            </div>
        </div>
    )
}

export default UserDetails
