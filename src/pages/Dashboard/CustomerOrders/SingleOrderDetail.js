import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { allOrders } from './orderData';

const SingleOrderDetail = () => {
  const { id } = useParams()
  return (
    <div className='container '>
      <h3 className='text-white py-3'> Order Detail For :  {id}</h3>
      <div >
        <p className='text-white'>Order Id : 123456</p>
        <p className='text-white'>Product Name : Dummy Product</p>
        <p className='text-white'>User Email : user@abc.com</p>
        <p className='text-white'>Contact Number : +1485784554</p>
        <p className='text-white'>Payment Method : Paypal</p>
        <p className='text-white'>Order Quantity : 3</p>
        <p className='text-white'>Total Amount : $ 1324</p>
        <p className='text-white'>Order Time : 7-1-2022 </p>
        <p className='text-white'>Payment Status : Paid </p>
        <p className='text-white'>Shipping Address : 22 Sin Ming Lane #06-76 Midview City Singapore 573969 </p>
      </div>

    </div>

  )
}

export default SingleOrderDetail