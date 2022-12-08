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

const Verifide = () => {
    return (
        <div className="py-3">
            <span className='my-3 text-white bolder bg-primary p-2 my-2 rounded' >GENNERATE CSV</span>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550, maxWidth: "1300px" }} aria-label="simple table">

                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >
                                    <div className='d-flex'>
                                        <input type="checkbox" /> <span className='ms-2'> {index + 1}</span>
                                    </div>
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>

                                <TableCell align="right" className='d-flex gap-3'>

                                    <span className='bg-danger px-3 py-3 rounded'>
                                        < AiFillDelete className='fs-3  text-white rounded' />
                                    </span>
                                    <span className='px-3 py-3 rounded' style={{ background: '#4ed292' }}>
                                        < BiUserPlus className='fs-3 text-white rounded' />
                                    </span>
                                    <span className='bg-primary px-3 py-3 rounded'>
                                        < AiFillEye className='fs-3 text-white rounded' />
                                    </span>

                                </TableCell>
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

export default Verifide;