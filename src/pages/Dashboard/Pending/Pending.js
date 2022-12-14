import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PortraitIcon from '@mui/icons-material/Portrait';
import { AiFillDelete, AiFillEye } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";


const data = [
    { name: 'jahid', document: 'documents', email: 'jahid@gmail.com', kycPending: true },
    { name: 'azim', document: 'documents', email: 'azim@gmail.com', kycPending: true },
    { name: 'asad', document: 'documents', email: 'asad@gmail.com', kycPending: true },
    { name: 'sajjad', document: 'documents', email: 'sajjad@gmail.com', kycPending: true },
    { name: 'emon', document: 'documents', email: 'emon@gmail.com', kycPending: true },
    { name: 'mahbub', document: 'documents', email: 'mahbub@gmail.com', kycPending: true },
    { name: 'shahadat', document: 'documents', email: 'shahadat@gmail.com', kycPending: true },
    { name: 'rakib', document: 'documents', email: 'rakib@gmail.com', kycPending: true },
    { name: 'sanju', document: 'documents', email: 'sanju@gmail.com', kycPending: true },
    { name: 'srayo', document: 'documents', email: 'srayo@gmail.com', kycPending: true },
    { name: 'habib', document: 'documents', email: 'habib@gmail.com', kycPending: true },
    { name: 'robiul', document: 'documents', email: 'robiul@gmail.com', kycPending: true },
    { name: 'emam', document: 'documents', email: 'emam@gmail.com', kycPending: true }
]




const Pending = () => {
    return (
        <div className="">
            <h5 className="text-white mb-3 text-start text-uppercase">Pending</h5>
            {/* <p className='text-start fs-2 text-white my-0 mb-3 py-0'>Pending</p> */}
            <div className='mb-3'>
                <CSVLink data={data} className="mt-4">
                    <span className='my-3 text-white bolder bg-primary p-2 my-2 rounded' >GENNERATE CSV</span>
                </CSVLink> 
                <span className=' text-white bolder bg-danger p-2  px-2 rounded' >DELETE</span>
            </div>

            <div className='text-white row d-flex g-2 mb-2 justify-content-between align-items-center py-2'>
                <form action="" className='col-12 col-md-6'>
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

                <div className='col-12 col-md-6 text-lg-end'>
                    <label className='pe-1' for="number">Search: </label>
                    <input style={{ backgroundColor: '#272D47' }} className="border-0 p-1 rounded w-75 w-md-50  text-white" name="search" />
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table className='text-white' sx={{ minWidth: 750, maxWidth: "1300px", bgcolor: "#272D47" }} aria-label="simple table">

                    <thead>
                        <tr style={{ borderBottom: "2px solid white" }}>
                            <th style={{ padding: '15px 0px 15px 35px' }} className='text-start'>S.N.</th>
                            <th className='text-start'>Document</th>
                            <th className='text-start'>Full Name</th>
                            <th className='text-start '>Email</th>
                            <th className='text-start'>KYC Pending</th>
                            <th className='text-start'>Action</th>
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
                                    <td className='text-start '>{d.email}</td>
                                    <td className='text-start '>Pending</td>
                                    <td className='text-start '>

                                        <Link to='/admin/userDetails'>
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

export default Pending;