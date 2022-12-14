import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AiFillDelete, AiFillEye } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';

import { CSVLink } from "react-csv";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PortraitIcon from '@mui/icons-material/Portrait';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const data = [
    { name: 'jahid', document: 'documents', email: 'jahid@gmail.com', kycPending: true },
    { name: 'azim', document: 'documents', email: 'azim@gmail.com', kycPending: true },
    { name: 'asad', document: 'documents', email: 'asad@gmail.com', kycPending: true },
    { name: 'asad', document: 'documents', email: 'asad@gmail.com', kycPending: true },
    { name: 'asad', document: 'documents', email: 'asad@gmail.com', kycPending: true },
    { name: 'asad', document: 'documents', email: 'asad@gmail.com', kycPending: true },
    { name: 'sajjad', document: 'documents', email: 'sajjad@gmail.com', kycPending: true },
    { name: 'sajjad', document: 'documents', email: 'sajjad@gmail.com', kycPending: true },
    { name: 'mahbub', document: 'documents', email: 'mahbub@gmail.com', kycPending: true },
    { name: 'robiul', document: 'documents', email: 'robiul@gmail.com', kycPending: true },
    { name: 'emam', document: 'documents', email: 'emam@gmail.com', kycPending: true }
]

const NonVerified = () => {
    const [NonVerifiedUser, setNonVerifiedUser] = useState([]);

    useEffect(() => {
        fetch('https://backend.dslcommerce.com/api/user-panel/all')
            .then(res => res.json())
            .then(data => setNonVerifiedUser(data?.result))
    }, [])


    return (
        <div className="nonverifide" style={{ backgroundColor: '#1a1c33', color: "#ffff" }}>
            {/* <p className='text-start text-white fs-2 m-0 p-0'>NON VERIFIED</p> */}
            <h5 className="text-white mb-3 text-start text-uppercase">NON VERIFIED</h5>
            <div className='d-flex gap-3'>

                <CSVLink data={NonVerifiedUser} className="mt-4">
                    <span className='my-3 text-white bolder bg-primary p-2 my-2 rounded' >GENNERATE CSV</span>
                </CSVLink>

                <span className='my-3 text-white bolder bg-danger p-2 my-2 rounded' >DELETE</span>

            </div>
            <div className='text-white row g-2'>

                <div className='col-12 col-lg-6'>
                    <form action="" className=''>
                        <label for="number">Display</label>
                        <select style={{ backgroundColor: '#272D47' }} className='mx-2 p-1 text-white border-0' name="number" id="number">
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="400">400</option>
                            <option value="500">500</option>
                        </select>
                        <label for="cars">records per page</label>

                    </form>
                </div>

                <div className='col-12 col-lg-6 text-lg-end'>
                    <label className='pe-1' for="number">Search: </label>
                    <input style={{ backgroundColor: '#272D47' }} className="border-0 p-1 rounded w-75 w-md-50 text-white" name="search" />
                </div>
            </div>

            <TableContainer className='mt-3' component={Paper}>
                <Table className=' text-white'
                    sx={{ minWidth: 950, maxWidth: "1300px", bgcolor: "#272D47" }} aria-label="simple table">

                    <thead>
                        <tr style={{ borderBottom: "2px solid white" }}>
                            <th style={{ padding: '15px 0px 15px 35px' }} className='text-start'>
                                <input type="checkbox" /> S.N.</th>
                            <th className='text-start'>Document</th>
                            <th className='text-start'>Full Name</th>
                            <th className='text-start'>Email</th>

                            <th className='text-start'>KYC Pending</th>
                            <th className='text-start'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            NonVerifiedUser?.map((d, index) => (
                                <tr style={{ borderBottom: "1px solid white" }} className=' ' >
                                    <td style={{ padding: '15px 0px 15px 35px' }} className=''>
                                        <input type="checkbox" /> {index + 1}</td>
                                    <td className='text-start'>
                                        <span>$</span>
                                        <span><PersonIcon /></span>
                                        <span><EmailIcon /></span>
                                        <span><PhoneAndroidIcon /></span>
                                        <span><PortraitIcon /></span>
                                    </td>
                                    <td className='text-start' style={{ textTransform: 'uppercase' }} >
                                        {d?.name}</td>
                                    <td className='text-start'>{d?.email}</td>
                                    <td className='text-start'> PENDING </td>
                                    <td className='text-start'>

                                        <Link to={`/admin/userDetails/${d.walletAddress}`}>
                                            <span className='bg-primary p-2 me-3 rounded'>
                                                < AiFillEye className='fs-5 text-white rounded' />
                                            </span>
                                        </Link>

                                        <span className='bg-success p-2 me-3 rounded'>
                                            < BiUserPlus className='fs-5 text-white rounded' />
                                        </span>

                                        <span className='bg-danger p-2 rounded'>
                                            < AiFillDelete className='fs-5  text-white rounded' />
                                        </span>

                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>


                </Table>
            </TableContainer>
        </div>
    );
};

export default NonVerified;