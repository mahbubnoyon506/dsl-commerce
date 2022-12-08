import * as React from 'react';
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

const NonVerifide = () => {
    return (
        <div className="nonverifide py-3" style={{ backgroundColor: '#1a1c33', color: "#ffff" }}>
            <div className='d-flex gap-3'>

                <span className='my-3 text-white bolder bg-primary p-2 my-2 rounded' >GENNERATE CSV</span>
                <span className='my-3 text-white bolder bg-danger p-2 my-2 rounded' >DELETE</span>

            </div>
            <div className='d-flex justify-content-between'>
                <div>
                    <span>Display</span>
                    <select name="" id="" className='mx-2'>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                    </select>
                    <span>record per page</span>
                </div>
                <div className='text-end'>
                    <span>Search:</span>
                    <input type="text" />
                </div>

            </div>
            <TableContainer className='mt-3' component={Paper}>
                <Table className=' text-white' sx={{ minWidth: 700, maxWidth: "1300px", bgcolor: "#272D47" }} aria-label="simple table">

                    <thead>
                        <tr style={{ borderBottom: "2px solid white" }}>
                            <th style={{ padding: '15px 0px 15px 35px' }} className='text-start'> <input type="checkbox" /> S.N.</th>
                            <th className='text-start'>Document</th>
                            <th className='text-start'>Full Name</th>
                            <th className='text-start adminHidden'>Email</th>

                            <th className='text-start'>KYC Pending</th>
                            <th className='text-start'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((d, index) => (
                                <tr style={{ borderBottom: "1px solid white" }} className=' ' >
                                    <td style={{ padding: '15px 0px 15px 35px' }} className=''> <input type="checkbox" /> {index + 1}</td>
                                    <td className='text-start'>
                                        <span>$</span>
                                        <span><PersonIcon /></span>
                                        <span><EmailIcon /></span>
                                        <span><PhoneAndroidIcon /></span>
                                        <span><PortraitIcon /></span>
                                    </td>
                                    <td className='text-start' style={{ textTransform: 'uppercase' }} >{d.name}</td>
                                    <td className='text-start adminHidden'>{d.email}</td>
                                    <td className='text-start adminHidden'>{d.kycPending === true ? 'PENDING' : ''}</td>
                                    <td className='text-start adminHidden'>
                                        <div className='d-flex gap-3'>
                                            <span className='bg-primary px-2 py-2 rounded'>
                                                < AiFillEye className='fs-4 text-white rounded' />
                                            </span>
                                            <span className=' px-2 py-2 rounded' style={{ backgroundColor: "#4bd395" }}>
                                                < BiUserPlus className='fs-4 text-white rounded' />
                                            </span>
                                            <span className='bg-danger px-2 py-2 rounded'>
                                                < AiFillDelete className='fs-4  text-white rounded' />
                                            </span>
                                        </div>

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

export default NonVerifide;