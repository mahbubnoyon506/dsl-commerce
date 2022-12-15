import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { allOrders } from './orderData';

const SingleOrderDetail = () => {
  const { orderId } = useParams()

  const [orderDetail, setOrderDetail] = useState({})

  useEffect(() => {
    axios
      .get(`https://backend.dslcommerce.com/api/order/data/get/${orderId}`)
      .then((res) => {
        console.log('eeeeeeeeeeefd', res.data[0]);
        setOrderDetail(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);



  return (
    <div className='container '>
      <h3 className='text-white py-3'> Order Detail For :  {orderDetail?.name}</h3>
      <div >
        <p className='text-white'>Order Id : {orderDetail?.orderId} </p>
        <p className='text-white'>Quantity : {orderDetail?.orderItems?.length}</p>
        <p className='text-white'> Item Name :
          <ol className='text-white'>
            {orderDetail?.orderItems?.map((p) => (
              <li>{p?.productName}</li>
            ))}
          </ol>
        </p>

        <p className='text-white'>Total Amount : {orderDetail?.amount}</p>
        <p className='text-white'>User Email : {orderDetail?.email}</p>
        <p className='text-white'>Contact Number : {orderDetail?.phone}</p>
        <p className='text-white'>Payment Method : {orderDetail?.paymentMethod}</p>
        <p className='text-white'>Order Time : {orderDetail?.date?.slice(0, 10)} </p>
        <p className='text-white'>
          Payment Status :
          {orderDetail?.pendingStatus === true && (<>Pending</>)}
          {orderDetail?.processingStatus === true && (<>Processing</>)}
          {orderDetail?.deliveredStatus === true && (<>Delivered</>)}
        </p>
        <p className='text-white'>
          Shipping Address : {" "}
           {orderDetail?.address} ,
          {orderDetail?.postCode} ,
          {orderDetail?.town} ,
          {orderDetail?.country}

        </p>
      </div>

    </div>

  )
}

export default SingleOrderDetail