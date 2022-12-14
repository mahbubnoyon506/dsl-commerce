import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AiFillDelete, AiFillEye } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PortraitIcon from '@mui/icons-material/Portrait';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";



const data = [
    { name: 'jahid', document: 'documents', email: 'jahid@gmail.com', phone: '+88015888' },
    { name: 'azim', document: 'documents', email: 'azim@gmail.com', phone: '+88015888' },
    { name: 'asad', document: 'documents', email: 'asad@gmail.com', phone: '+88015888' },
    { name: 'asad', document: 'documents', email: 'asad@gmail.com', phone: '+88015888' },
    { name: 'asad', document: 'documents', email: 'asad@gmail.com', phone: '+88015888' },
    { name: 'asad', document: 'documents', email: 'asad@gmail.com', phone: '+88015888' },
    { name: 'sajjad', document: 'documents', email: 'sajjad@gmail.com', phone: '+88015888' },
    { name: 'sajjad', document: 'documents', email: 'sajjad@gmail.com', phone: '+88015888' },
    { name: 'mahbub', document: 'documents', email: 'mahbub@gmail.com', phone: '+88015888' },
    { name: 'robiul', document: 'documents', email: 'robiul@gmail.com', phone: '+88015888' },
    { name: 'emam', document: 'documents', email: 'emam@gmail.com', phone: '+88015888' }
]

const Verified = () => {
    const [verifiedUser, setVerifiedUser] = useState([]);

    useEffect(() => {
        fetch('https://backend.dslcommerce.com/api/user-panel/all')
            .then(res => res.json())
            .then(data => setVerifiedUser(data?.result))
    }, [])


    console.log("verifiedUser", verifiedUser)

    return (
        <div className="">
            {/* <p className='text-start text-white fs-2 mb-3 p-0'>VERIFIED</p> */}
            <h5 className="text-white mb-3 text-start text-uppercase">VERIFIED</h5>
            <CSVLink data={verifiedUser} className="mt-4">
                <span className='my-3 text-white bolder bg-primary p-2 my-2 rounded' >GENNERATE CSV</span>
            </CSVLink>
            <TableContainer component={Paper} className="mt-4">
                <Table className='text-white' sx={{ minWidth: 800, maxWidth: "1300px", bgcolor: "#272D47" }} aria-label="simple table">

                    <thead>
                        <tr style={{ borderBottom: "2px solid white" }}>
                            <th style={{ padding: '15px 0px 15px 35px' }} className='text-start'>S.N.</th>
                            <th className='text-start'>Name</th>
                            <th className='text-start '>Email</th>
                            <th className='text-start'>PHONE</th>
                            <th className='text-start'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            verifiedUser?.map((d, index) => (
                                <tr style={{ borderBottom: "1px solid white" }} className=' ' >
                                    <td style={{ padding: '15px 0px 15px 35px' }} className=''>
                                        <input type="checkbox" /> {index + 1}</td>
                                    {/* <td className='text-start'>
                                        <span>$</span>
                                        <span><PersonIcon /></span>
                                        <span><EmailIcon /></span>
                                        <span><PhoneAndroidIcon /></span>
                                        <span><PortraitIcon /></span>
                                    </td> */}
                                    <td className='text-start' style={{ textTransform: 'uppercase' }} >{d.name}</td>
                                    <td className='text-start '>{d?.email}</td>
                                    <td className='text-start '>{d?.mobile}</td>
                                    {/* <td className='text-start adminHidden'>{d.kycPending === true ? 'PENDING' : ''}</td> */}
                                    <td className='text-start '>

                                        <Link to={`/admin/userDetails/${d.walletAddress
                                            }`}>
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

export default Verified;