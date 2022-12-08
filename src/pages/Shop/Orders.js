import PageTitle from "../../Components/Common/PageTitle";
import OrderArea from "../../Components/Shop/OrderArea";
import cart1 from "../../assets/img/collection/collection-1.png";
import cart2 from "../../assets/img/collection/collection-1.png";
import cart3 from "../../assets/img/collection/collection-2.png";
import cart4 from "../../assets/img/collection/collection-1.png";
import cart5 from "../../assets/img/collection/collection-2.png";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Orders = () => {
  const [open, setOpen] = useState(false);

  const [myOrders, setMyOrders] = useState([])
  const { user } = useContext(DSLCommerceContext)
  // console.log(user?.walletAddress);

  useEffect(() => {
    fetch(`https://backend.dslcommerce.com/api/order/data/${user?.walletAddress}`)
      .then(res => res.json())
      .then(data => setMyOrders(data.result))
  }, [user?.walletAddress])

  console.log(myOrders);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <PageTitle title="My Orders" />
      {/* <OrderArea /> */}

      <div className="container">
        <div className="wishlist-table table-responsive">
          {myOrders.length ? (
            <>
              {myOrders?.map((order, index) => (
                <table className="table table-bordered" key={index}>

                  <tbody>
                    <tr>
                      <th className="border-0 text-start">Date</th>
                      <th className="border-0 text-start">Order Id</th>
                      <th className="border-0 text-start">Amount</th>
                      <th className="border-0 text-start">Payment Method</th>
                      <th className="border-0 text-start">Status</th>
                      <th className="border-0 text-end">Details</th>

                      {/* <td className="product-btn">
                        <span className="default-btn">
                          <TbListDetails className="me-2" />
                          Details
                        </span>
                      </td> */}
                    </tr>

                  </tbody>

                  <tbody>
                    <tr>
                      <td className="">{order?.date.slice(0, 10)}</td>
                      <td className="">{order?.orderId}</td>
                      <td className="">{order?.amount}</td>
                      <td className="text-center">{order?.paymentMethod}</td>
                      {order?.pendingStatus == false ? (
                        <td className="">Pending</td>
                      ) : (
                        <td className="">Delivered</td>
                      )}
                      <td className="product-btn " style={{ cursor: 'pointer' }}>
                        <span onClick={handleClickOpen} className="default-btn">
                          <TbListDetails className="me-2" />
                          Details
                        </span>
                      </td>
                    </tr>

                  </tbody>
                  <div>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      className="orderDetailsModal mx-auto"
                      style={{ width: "500px" }}
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Order Details"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                          <div className='row w-100'>
                            <div className=' col-12 col-lg-6'>
                              <img src={order.orderItems[0].product_images} alt="" />
                            </div>
                            <div className='col-12 col-lg-6'>
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
                      <DialogActions>
                        <Button onClick={handleClose}>Close</Button>

                      </DialogActions>
                    </Dialog>
                  </div>

                </table>

              ))}
            </>

          ) : (
            <div>
              <h2 className="text-center py-5 font-bold"> No Order Found</h2>
            </div>
          )}

        </div>

      </div>





    </div>
  );
};

export default Orders;
