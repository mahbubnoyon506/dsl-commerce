import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { useState } from 'react';


const OrderDetails = ({ order, open, setOpen }) => {

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="orderDetailsModal mx-auto"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Order Details"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className=''>
                            <div className=''>
                                <div className='mb-3' style={{ maxWidth: '300px' }}>
                                    <img src={order?.orderItems[0]?.images[0]} alt="" />
                                </div>
                                <p>Status:   {order?.pendingStatus == false ? (
                                    <span className="">Pending</span>
                                ) : (
                                    <span className="">Delivered</span>
                                )}</p>
                                <p> Name: {order?.name}</p>
                                <p>Email:{order?.email} </p>
                                <p> Order Id:{order?.orderId} </p>
                                <p>Date: {order?.date.slice(0, 10)}</p>
                                <p>Post Code: {order?.postCode}</p>
                                <p>Address: {order.address}</p>
                                <p>Phone: {order.phone}</p>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{margin: '0 auto'}}>
                    <Button onClick={handleClose} variant='contained' sx={{background: '#113366', borderRadius: '0px'}}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrderDetails;