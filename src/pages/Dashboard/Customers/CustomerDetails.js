import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CustomerDetails = () => {
    const { walletaddress } = useParams();
    const [customerData, setCustomerData] = useState('')

    useEffect(() => {
        (async () => {
            await axios.get(`https://backend.dslcommerce.com/api/users/${walletaddress}`)
                .then(res => {
                    // console.log(res.data.result)
                    setCustomerData(res?.data?.result)
                }
                )
        }
        )()
    }, [walletaddress])

    console.log(customerData)

    return (
        <div className='container '>
            <h3 className='text-white py-3'> Customer Details: </h3>
            <div >
                <p className='text-white'>Email: {customerData?.email} </p>
                <p className='text-white'> Wallet Address: {customerData?.walletAddress}</p>
                <p className='text-white'>Customer Role : {customerData?.role}</p>
                <p className='text-white'>Referrel: {customerData?.myReferralCode}</p>
                <p className='text-white'>Account Created : {customerData?.createdAt} </p>
            </div>
        </div>

    );
};

export default CustomerDetails;