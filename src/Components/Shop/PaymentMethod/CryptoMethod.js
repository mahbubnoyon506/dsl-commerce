import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { DSLCommerceContext } from '../../../contexts/DSLCommerceContext';
import { ImCross } from 'react-icons/im';
import { GiCheckMark } from 'react-icons/gi';
import Select from "react-select";
import { Typography } from '@mui/material';
import axios from 'axios';

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
  const [bnbToken, setBnbToken] = useState();
  const [dslToken, setDslToken] = useState();
  const [s39Token, setS39Token] = useState();
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



  useEffect(() => {
    axios.get('https://dslegends.org/api/get-asset-price.php?asset=BNB', {
      headers: {
        Tokenkey: `f02063004b60270f693bfefcbd8a37e91273a4290fdcc9e4ea7b0f531a9d9e64`
      }
    })
      .then(res => {
        setBnbToken(res.data.message);
        // setBnbToken(282.130);
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  useEffect(() => {
    axios.get('https://dslegends.org/api/get-asset-price.php?asset=DSL', {
      headers: {
        Tokenkey: `f02063004b60270f693bfefcbd8a37e91273a4290fdcc9e4ea7b0f531a9d9e64`
      }
    })
      .then(res => {
        setDslToken(res.data.message);
        // setDslToken(0.0103);
        // console.log(res.data.message)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  useEffect(() => {
    axios.get('https://dslegends.org/api/get-asset-price.php?asset=S39', {
      headers: {
        Tokenkey: `f02063004b60270f693bfefcbd8a37e91273a4290fdcc9e4ea7b0f531a9d9e64`
      }
    })
      .then(res => {
        setS39Token(res.data.message);
        // setS39Token(0.3843);
        // console.log(res.data.message)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);


  //paymnet amount by bnb,dsl,s39, usdsc,finquest


   //BNB payment
   const bnb = totalPrice / bnbToken;
   const bnbTwoDec = bnb.toFixed(5);

   //USDSC payment
   const usdsc = totalPrice;

   // DSL Price
   const dsl = totalPrice / dslToken;
   const dslTwoDec = dsl.toFixed(4);

   const discountDsl = dslTwoDec * 30 / 100;

   const discountTotalDsl = dslTwoDec - discountDsl ;
   const DiscountdslTwoDec = discountTotalDsl.toFixed(4);

   const savedAmount = dslTwoDec - DiscountdslTwoDec ;
   const savedUsdAmount = dslToken * savedAmount;

   // s39 Price
   const s39 = totalPrice / s39Token;
   const s39TwoDec = s39.toFixed(4);


   // finquest Price
   const finquest = totalPrice / 0.0005 ;
   const finquestTwoDec = finquest.toFixed(4);



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
        {token === "dsl" && <p style={{ margin: '0' }}>You saved {savedUsdAmount} USD</p>}
    
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
        {token === "bnb" && <p style={{ margin: '0' }}>You need to pay {bnbTwoDec} BNB</p>}
        {token === "usdsc" && <p style={{ margin: '0' }}>You need to pay {usdsc} USDSC</p>}
        {token === "dsl" && <p style={{ margin: '0' }}>You need to pay {DiscountdslTwoDec} DSL</p>}
        {token === "s39" && <p style={{ margin: '0' }}>You need to pay {s39TwoDec} S39</p>}
        {token === "finquest" && <p style={{ margin: '0' }}>You need to pay {finquestTwoDec} FINQUEST</p>}
      
      </div>
    </>
  );
};

export default CryptoMethod;