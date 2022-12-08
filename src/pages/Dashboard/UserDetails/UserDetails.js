import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import './UserDetails.css'



function UserDetails() {
    return (
        <div style={{minHeight:'450px'}}>

            <div>
                <Accordion className='svgColor mb-2' style={{backgroundColor:'#272D47', color:'white'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>User Profile <CheckIcon id='rightMark' style={{ color: 'green !important', fontSize: '30px' }} /></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='container row '>

                            <div className='col-6 px-4'>
                                <div className="mb-2">
                                    <label htmlFor='membershipId'>Membership Id</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='membershipId' name="membershipId" className='form-control bg-transparent text-white' placeholder='membership id' />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='fullName'>Full Name</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='fullName' name="fullName" className='form-control bg-transparent text-white' placeholder='full name' />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='userName'>User Name</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='userName' name="userName" className='form-control bg-transparent text-white' placeholder='user name' />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='userName'>Gender</label>
                                    <div className='d-flex  input-group'>
                                        <input type='radio' /><span className='ms-1 me-3'>Male</span>
                                        <input type='radio' /><span className='ms-1 me-3'>Female</span>
                                        <input type='radio' /><span className='ms-1 me-3'>Other</span>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='registerDate'>Register Date</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='registerDate' name="registerDate" className='form-control bg-transparent text-white' placeholder='register date  ' />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='lastLoginIp'>Last Login Ip</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='lastLoginIp' name="lastLoginIp" className='form-control bg-transparent text-white' placeholder='last login ip' />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='remark'>Remark</label>
                                    <div className='d-flex  input-group'>
                                        <textarea id='remark' name="remark" className='form-control bg-transparent text-white' placeholder='remark' rows="3" cols="200"></textarea>
                                    </div>
                                </div>




                            </div>







                            <div className='col-6 px-4'>

                                <div className="mb-2">
                                    <label htmlFor='email'>Email <CheckIcon style={{ color: 'green', fontSize: '20px' }} /></label>
                                    <div className='d-flex  input-group'>
                                        <input type="email" id='email' name="email" className='form-control bg-transparent text-white' placeholder='email ' />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='mobile'>Mobile <CheckIcon style={{ color: 'green', fontSize: '20px' }} /></label>
                                    <div className='d-flex  input-group'>
                                        <input type="number" id='mobile' name="mobile" className='form-control bg-transparent text-white' placeholder='mobile' />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='dob'>Date of Birth</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='dob' name="dob" className='form-control bg-transparent text-white' placeholder='date of birth' />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='nationality'>Nationality</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='nationality' name="nationality" className='form-control bg-transparent text-white' placeholder='nationality' />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='lastLogin'>Last Login</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='lastLogin' name="lastLogin" className='form-control bg-transparent text-white' placeholder='last login' />
                                    </div>
                                </div>


                            </div>
                            <div className="mb-2">
                                <button className='btn btn-primary px-3 me-2 ms-3 rounded-0 text-uppercase'> Update profile</button>
                                <button className='btn btn-warning px-3 me-2 rounded-0 text-uppercase'> Disable user</button>
                                <button className='btn btn-success px-3 me-2 rounded-0 text-uppercase'> Enable pending kyc</button>
                                <button className='btn btn-danger px-3 me-2 rounded-0 text-uppercase'> Unverify user</button>
                                <button className='btn btn-danger px-3 me-2 rounded-0 text-uppercase'> Delete User</button>
                            </div>
                        </div>

                    </AccordionDetails>
                </Accordion>



                <Accordion  className='svgColor mb-2' style={{backgroundColor:'#272D47', color:'white'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Address Proof <CheckIcon id='rightMark'  style={{ color: 'green', fontSize: '30px' }} /></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='container row '>

                            <div className='col-6 px-4'>
                                <div className="mb-2">
                                    <label htmlFor='address1'>Address 1</label>
                                    <div className='d-flex  input-group'>
                                        <textarea id='address1' name="address1" className='form-control bg-transparent text-white' placeholder='address 1' rows="2" cols="200"></textarea>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='address2'>Address 2</label>
                                    <div className='d-flex  input-group'>
                                        <textarea id='address2' name="address2" className='form-control bg-transparent text-white' placeholder='address 2' rows="2" cols="200"></textarea>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='postalCode'>Postal Code</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='postalCode' name="postalCode" className='form-control bg-transparent text-white' placeholder='postal code' />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor='country'>Country</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='country' name="country" className='form-control bg-transparent text-white' placeholder='country' />
                                    </div>
                                </div>




                            </div>







                            <div className='col-6 px-4 mt-2'>
                                <label for="address proof image">Address Proof Image</label>
                                <img src="https://i.pinimg.com/originals/30/1e/8b/301e8b20ed4c67ba8fdc701322fbfa66.png" alt="address proof"/>
                                <input className='mt-3' type="file" accept='image/*'/>
                            </div>



                            <div className="mb-2">
                                <button className='btn btn-primary px-3 me-2 ms-3 rounded-0 text-uppercase'> Update address proof</button>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>



                <Accordion  className='svgColor mb-2' style={{backgroundColor:'#272D47', color:'white'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Photo ID <CheckIcon id='rightMark' s style={{ color: 'green', fontSize: '30px' }} /></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='container row '>

                            <div className='col-6 px-4'>
                                <div className="mb-2">
                                    <label htmlFor='photoIdNumber'>Photo Id Number</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='photoIdNumber' name="photoIdNumber" className='form-control bg-transparent text-white' placeholder='photo Id number' />
                                    </div>
                                </div>
                                
                                <div className="mb-2">
                                    <label htmlFor='photoIdType'>Photo Id Type</label>
                                    <div className='d-flex  input-group'>
                                        <input type="text" id='photoIdType' name="photoIdType" className='form-control bg-transparent text-white' placeholder='photo Id type' />
                                    </div>
                                </div>
                                




                            </div>







                            <div className='col-6 px-4 mt-2'>
                                <label for="address proof image">Front Image</label>
                                <img src="https://i.pinimg.com/originals/30/1e/8b/301e8b20ed4c67ba8fdc701322fbfa66.png" alt="address proof"/>
                                <input className='mt-3' type="file" accept='image/*'/>
                            </div>

                        </div>
                    </AccordionDetails>
                </Accordion>

            </div>
        </div>
    )
}

export default UserDetails
