import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { DSLCommerceContext } from '../../../contexts/DSLCommerceContext';
import { ImCross } from 'react-icons/im';
import { GiCheckMark } from 'react-icons/gi';
import Select from "react-select";
import { Typography } from '@mui/material';

const selectOptions = [
  {
    value: "bnb",
    label: "BNB",
    image: "/bnb.png",
  },
  {
    value: "usdsc",
    label: "USDSC",
    image: "https://i.ibb.co/p1Vfjp0/usdsc.png",

  },
  {
    value: "dsl",
    label: "DSL",
    image: "/dsl.jpg",
  },
  {
    value: "s39",
    label: "S39",
    image: "/s39.jpeg",
  },
  {
    value: "finquest",
    label: "FINQUEST",
    image: "/FINQUEST.jpeg",
  },

];

const CryptoMethod = ({ totalPrice }) => {
  // console.log(parseFloat(totalPrice))
  const totalUsd = parseFloat(totalPrice)
  const { user } = useContext(DSLCommerceContext);
  const [affiliateCode, setAffiliateCode] = useState("");
  const [token, setToken] = useState("bnb");
  const [selectedOption, setSelectedOption] = useState({
    value: "bnb",
    label: "BNB",
    image: "/bnb.png",
  });


  // Select options functionality
  const handleChoosePayment = e => {
    setSelectedOption(e);
    setToken(e.value);
  }

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      color: "#000",
      backgroundColor: "#fff",
    }),

    singleValue: (provided, state) => {

      return { ...provided, };
    },
  };


  return (
    <>
      <div className='mt-3 border p-2'>
        <span className=" pt-1 text-primary mb-2 fontArial fontExtand">Choose how you want to pay:</span>

        <div className="widthDetailsInput mt-1">
          <Select
            value={selectedOption}
            onChange={handleChoosePayment}
            options={selectOptions}
            styles={customStyles}
            formatOptionLabel={(option) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <img
                  src={option.image}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "100px",
                  }}
                  alt=""
                />
                <span>{option.label}</span>
              </div>
            )}
          />
        </div>

        <Typography className="pt-2 pb-3" variant="subtitle2" gutterBottom component="div">
          ( <span className="spanDiscount ">30% discount if paid with DSL tokens</span>)
        </Typography>
        <Typography className="pt-1 pb-1  text-gradient" variant="subtitle2" gutterBottom component="div">
          <span className="spanDiscount ">Enjoy 10% if you have affiliate code.</span>
        </Typography>

        <div>
          <p>Affiliate Code : </p>
          <div className="d-flex" style={{ width: '100%' }}>
            <input
              type="text"
              onChange={(e) => {
                setAffiliateCode(e.target.value);
              }}
              value={user?.affiliateCode ? user?.affiliateCode : affiliateCode}
              disabled={user.affiliateCode ? true : false}
              required
              className="form-control "
            />
            {affiliateCode.length === 0 ? (
              <>
                <button disabled className='bg-danger text-white border-0'><ImCross /></button>
              </>
            ) : (
              <>
                <button disabled className='bg-success text-white border-0'><GiCheckMark /></button>
              </>
            )}
          </div>
        </div>



      </div>
      {/* Need To Pay  */}
      <div style={{ color: '#ffffff', marginTop: '2rem', textAlign: 'start' }}>
        {token === "bnb" && <p style={{ margin: '0' }}>You need to pay {totalUsd} BNB</p>}
      </div>
    </>
  );
};

export default CryptoMethod;