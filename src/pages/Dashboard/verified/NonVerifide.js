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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', "email21@gmail.com", '+484538454564',),
    createData('Frozen yoghurt', "email21@gmail.com", '+484538454564',),
    createData('Frozen yoghurt', "email21@gmail.com", '+484538454564',),
    createData('Frozen yoghurt', "userEmail@gmail.com", '+484538454564',),
    createData('Frozen yoghurt', "userEmail@gmail.com", '+484538454564',),
    createData('Frozen yoghurt', "userEmail@gmail.com", '+484538454564',),

];

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
            <TableContainer className='text-white' component={Paper} style={{ backgroundColor: "#1a1c33", Color: "#fff" }}>
                <Table sx={{ minWidth: 650, maxWidth: 1200, }} aria-label="simple table" style={{ Color: '#fff' }}>
                    <TableHead className='text-white'>
                        <TableRow>
                            <TableCell className='text-white'>
                                <div className='d-flex'>
                                    <input type="checkbox" /> <span className='ms-2'> S.N.</span>
                                </div>
                            </TableCell>
                            <TableCell className='text-white' align="right">DOCUMENT</TableCell>
                            <TableCell className='text-white' align="right">FULL NAME</TableCell>
                            <TableCell className='text-white' align="right">EMAIL USERNAME</TableCell>
                            <TableCell className='text-white' align="right">KYC PENDING</TableCell>
                            <TableCell className='text-white' align="right">ACTION</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className=''>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell className='text-white' component="th" scope="row" >
                                    <div className='d-flex'>
                                        <input type="checkbox" /> <span className='ms-2'> {index + 1}</span>
                                    </div>
                                </TableCell>

                                <TableCell className='text-white' align="right">D icon</TableCell>
                                <TableCell className='text-white' component="th" scope="row">{row.name}</TableCell>
                                <TableCell className='text-white' align="right">{row.calories}</TableCell>
                                <TableCell className='text-white' align="right">{row.protein}</TableCell>
                                <TableCell className='text-white' align="right">No</TableCell>

                                {/* <TableCell align="right" className=''>
                                    <div className='d-flex gap-3'>

                                        <span className='bg-primary px-3 py-3 rounded'>
                                            < AiFillEye className='fs-4 text-white rounded' />
                                        </span>

                                        <span className='bg-primary px-3 py-3 rounded'>
                                            < BiUserPlus className='fs-4 text-white rounded' />
                                        </span>

                                        <span className='bg-danger px-3 py-3 rounded'>
                                            < AiFillDelete className='fs-4  text-white rounded' />
                                        </span>
                                    </div>
                                </TableCell> */}
                                {/* <TableCell align="right"><BiUserPlus className='fs-3 bg-primary p-1 text-white rounded' /> </TableCell>
                                <TableCell align="right"><AiFillDelete className='fs-3 bg-danger p-1 text-white rounded' /> </TableCell> */}

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default NonVerifide;