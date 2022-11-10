import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { DSLCommerceContext } from '../../../contexts/DSLCommerceContext';
import { ImCross } from 'react-icons/im';
import { GiCheckMark } from 'react-icons/gi';
import Select from "react-select";
import { Typography } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

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
  // const totalUsd = parseFloat(totalPrice)
  const { connectWallet,
    currentAccount,
    loginModal,
    setLoginModal,
    requestLoading,
    setRequestLoading,
    walletModal,
    user,
    setUser,
    logOut,
    loading,
    Id,
    setID,
    setUserRefetch,
    chain,
    pageLoading,
    payAmount,
    setPayAmount,
    metamaskBalance,
    coinbaseModal,
    metamaskBalanceLoading,
    getBalanceTestnet,
    closeWalletModal,
    closeCoinbaseModal,
    openWalletModal,
    openCoinbaseModal,
    openLoginModal,
    closeLoginModal,
    setMetamaskBalanceLoading,
    connectToCoinbase,
    connectToMetamask,
    mintAddressTestnet,
    DSLtokenAddressTestnet,
    USDSCtokenAddressTestnet,
    S39tokenAddressTestnet,
    QuesttokenAddressTestnet,
    payByTestnetBNB,
    payByTestnetUSDSC,
    payByTestnetDSL,
    payByTestnetS39,
    payByTestnetQuest, } = useContext(DSLCommerceContext);
  const [affiliateCode, setAffiliateCode] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [affiliateWalletAddress, setAffiliateWalletAddress] = useState("");
  const navigate = useNavigate();
  const [gotRefCode, setGotRefCode] = useState(false);
  const [token, setToken] = useState("bnb");
  const [bnbToken, setBnbToken] = useState();
  const [dslToken, setDslToken] = useState();
  const [s39Token, setS39Token] = useState();
  const [selectedOption, setSelectedOption] = useState({
    value: "bnb",
    label: "BNB",
    image: "/bnb.png",
  });

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

  // Referal Code Discount
  const discountReferal = 10 / 100 * totalPrice;
  const disRefTwoDec = discountReferal.toFixed(2);

  // Calculation
  let totalUsd;

  if (!gotRefCode) {
    totalUsd = totalPrice;
  } else {
    totalUsd = totalPrice - disRefTwoDec;
  }

  const usdPerSgd = 0.72;
  const rsPerSgd = 57.45;
  const usd = totalUsd * usdPerSgd;
  const rs = totalUsd * rsPerSgd;

  // BNB Price
  const bnb = usd / bnbToken;
  const bnbTwoDec = bnb.toFixed(4);

  // DSL Price
  const dsl = usd / dslToken;
  const dslTwoDec = dsl.toFixed(2);

  // USDSC Price
  const usdsc = usd.toFixed(2);

  // S39 Price
  const s39 = usd / s39Token;
  const s39TwoDec = s39.toFixed(2);

  // FINQUEST Price
  const finquest = usd / 0.0005;
  const finquestTwoDec = finquest.toFixed(2);

  // Discount (30%)
  const discountSgd = 30 / 100 * totalUsd;
  const disSgdTwoDec = discountSgd.toFixed(2);

  // RS Discount
  const discountRs = 30 / 100 * rs;
  const disRsTwoDec = discountRs.toFixed(2);

  // USD Discount
  const discountUsd = 30 / 100 * usd;
  const disUsdTwoDec = discountUsd.toFixed(2);


  // Calculation without discounts
  const allSgdCost = totalPrice;

  const usdPerSgd01 = 0.72;
  const usd01 = allSgdCost * usdPerSgd01;

  // BNB Price
  const bnb01 = usd01 / bnbToken;
  const bnbTwoDec01 = bnb01.toFixed(4);

  // DSL Price
  const dsl01 = usd01 / dslToken;
  const dslTwoDec01 = dsl01.toFixed(2);

  // USDSC Price
  const usdsc01 = usd01.toFixed(2);

  // S39 Price
  const s3901 = usd01 / s39Token;
  const s39TwoDec01 = s3901.toFixed(2);

  // FINQUEST Price
  const finquest01 = usd01 / 0.0005;
  const finquestTwoDec01 = finquest01.toFixed(2);


  // Saved prices calculation
  const savedBNB = bnbTwoDec01 - bnbTwoDec;
  const savedDSL = dslTwoDec01 - dslTwoDec;
  const savedUSDSC = usdsc01 - usdsc;
  const savedS39 = s39TwoDec01 - s39TwoDec;
  const savedFINQ = finquestTwoDec01 - finquestTwoDec;

  const savedBNB4Digit = savedBNB.toFixed(4);
  const savedDSL4Digit = savedDSL.toFixed(4);
  const savedUSDSC4Digit = savedUSDSC.toFixed(4);
  const savedS394Digit = savedS39.toFixed(4);
  const savedFINQ4Digit = savedFINQ.toFixed(4);

  let newDate = new Date();
  let dd = String(newDate.getDate()).padStart(2, '0');
  let mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = newDate.getFullYear();
  let hh = newDate.getHours();
  let min = newDate.getMinutes();
  let ss = newDate.getSeconds();
  newDate = dd + '/' + mm + '/' + yyyy + '  ' + hh + ':' + min + ':' + ss;
  // const nftId = random?.toString();


  const postDataAfterMint = async (e) => {
    // const perkStatus = false;

    // const data = {
    //   NFTWebsite: "https://videonft.sg",
    //   NFTType: single.type,
    //   NFTDetails: single.description,
    //   NFTPerks: single.perkNft,
    //   NFTPerksStatus: perkStatus,
    // }
    // console.log(data);


    // await axios.post('https://backend.dsl.sg/api/v1/nftdetails', data, {

    // })
    //   .then(res => {
    //     if (res.status === 200) {

    //       console.log("Successfully data passed")
    //     }
    //   }).catch(err => {

    //     swal({
    //       title: "Attention",
    //       text: err.response.data.message,
    //       icon: "warning",
    //       button: "OK!",
    //       className: "modal_class_success",
    //     });
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });

  }

  // console.log(affiliateWalletAddress);
  /// send full details to user
  const handleSubmit = async (videos, TokeNID) => {
    // console.log("token", tokenId, TokeNID);
    // const NFTID = TokeNID
    // const email = user?.email
    // const address = mintAddressTestnet
    // const hashtags = single.hashtags
    // const caption = single.caption
    // const price = single.price
    // const video = videos


    // console.log('44444')

    // await axios.post("https://backend.videonft.sg/api/v1/verifymint/send-user", {
    //   NFTID, address, hashtags, caption, price, email, video
    // }, {
    // })
    //   .then(res => {
    //     if (res.status === 200) {
    //       console.log(res.data.message)

    //     }
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   });
  }

  // console.log(single);
  //===============//// MINTED NFT FUNCTION////===================//

  const mintvideoNFT = async (priceByToken, tokenAddress, affiliateWalletAddress, id) => {
    // console.log("dukse");
    if (!user.email) {
      return swal({
        text: "Before minting please update your profile. We will send the details to you.",
        icon: "warning",
        button: true,
        dangerMode: true,
        className: "modal_class_success",
      })
        .then((willDelete) => {
          if (willDelete) {
            navigate(`/profile`)

          } else {
            console.log("ok")
          }
        });
    }
    // console.log("enter1");
    // setIsClickedMint(true)
    // setRequestLoading(true);
    // console.log(USDSCtokenAddressTestnet)


    // console.log("222222", priceByToken, tokenAddress, affiliateWalletAddress, id)
    // const video = `https://backend.videonft.sg/${single.videos}`;

    // const data = new FormData();
    // data.append('Id', single._id);
    // data.append('price', priceByToken);
    // data.append('tokenAddress', tokenAddress);
    // data.append('refAddress', affiliateWalletAddress);
    // data.append('caption', single.caption);
    // data.append('description', single.description);
    // data.append('video', video);
    // data.append('hashtags', single.hashtags);
    // console.log("enter2");

    // await axios.post('https://backend.videonft.sg/api/v1/mint/uri-json-nft', data)
    //   .then(async (res) => {
    //     let Obj = {};
    //     console.log("111111123: ", data)
    //     console.log(res.data.uri);
    //     if (res.status === 200) {
    //       const data1 = await signBuyFunction(id,
    //         ethers.utils.parseEther(priceByToken),
    //         tokenAddress,
    //         affiliateWalletAddress,
    //         res.data.uri)
    //       console.log('11111112322222222222222222222299', data1)

    //       data.append('certificate', video);

    //       if (token === "bnb") {
    //         Obj = await mintTicketNFTTestnetBNB(data1);
    //       }
    //       else if (token === "usdsc") {
    //         Obj = await mintTicketNFTTestnetUSDSC(data1);
    //       }
    //       else if (token === "dsl") {
    //         Obj = await mintTicketNFTTestnetDSL(data1);
    //       }
    //       else if (token === "s39") {
    //         Obj = await mintTitleNFTTestnetS39(data1);
    //       }
    //       else if (token === "finquest") {
    //         Obj = await mintTitleNFTTestnetQuest(data1);
    //       }

    //       const data2 = {
    //         name: single.caption,
    //         price: single.price,
    //         certificate: res.data.Img,
    //       }
    //       data.append("mint_hash", Obj.mint_hash);
    //       setTokenId(Obj.ID);
    //       console.log(data);

    //       await axios.post("https://backend.videonft.sg/api/v1/mint/save-nft", data2, {

    //       })
    //         .then(res => {
    //           if (res.status === 200) {
    //             setRequestLoading(false);
    //             const wrapper = document.createElement("div");
    //             wrapper.innerHTML = `
    //               <a href=${Obj.mint_hash} target="_any" className="link_hash">${Obj.mint_hash}</a>
    //               <br/>
    //               <p className="success">You have successfully minted.</p>
    //               <p>Use the following information to import the NFT to your wallet</p>
    //               <p className="address">Contract Address: <br/> ${mintAddressTestnet}</p>
    //               <p>Token ID: ${Obj.ID}</p>
    //                `
    //             swal({
    //               title: "Minted",
    //               content: wrapper,
    //               icon: "success",
    //               buttons: true,
    //               className: "modal_class_success",
    //             })
    //               .then((willDelete) => {
    //                 if (willDelete) {
    //                   navigate(`/mintednft/${Obj.ID}/${mintAddressTestnet}`)
    //                   swal({
    //                     title: "Success",
    //                     text: "Please Check your mail for Minted NFT details",
    //                     icon: "success",
    //                     button: "OK!",
    //                     className: "modal_class_success",
    //                   });
    //                 } else {
    //                   console.log("good job")
    //                   swal({
    //                     title: "Success",
    //                     text: "Please Check your mail for Minted NFT details",
    //                     icon: "success",
    //                     button: "OK!",
    //                     className: "modal_class_success",
    //                   });
    //                 }
    //               });
    //             postDataAfterMint();
    //             console.log("video" + video)
    //             handleSubmit(video, Obj.ID);
    //           }
    //         })
    //         .catch(err => {
    //           console.log(err);
    //           setRequestLoading(false);
    //           const wrapper = document.createElement("div");
    //           wrapper.innerHTML = `<a href=${Obj.mint_hash} target="_any" className="link_hash">${Obj.mint_hash}</a> <br/> <p className="success">You have successfully minted but error in while saving data.</p>`
    //           swal({
    //             title: "Warning",
    //             content: wrapper,
    //             icon: "warning",
    //             button: "OK",
    //             className: "modal_class_success",
    //           });
    //         })
    //       console.log(res.data.Img)

    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setRequestLoading(false);
    //     if (err.code === 4001) {
    //       return swal({
    //         title: "Failed",
    //         text: "Minting Failed!",
    //         icon: "warning",
    //         button: "OK",
    //         dangerMode: true,
    //         className: "modal_class_success",
    //       });
    //     }
    //     return swal({
    //       title: "Attention",
    //       text: "Something went wrong. Please try again later.",
    //       icon: "warning",
    //       button: "OK",
    //       dangerMode: true,
    //       className: "modal_class_success",
    //     });
    //   })
  }



  // Referal code discount
  useEffect(() => {
    if (localStorage.getItem("tokenVideonft")) {
      // https://backend.videonft.sg/api/v1/user/all
      axios.get('', {
        headers: {
          "authorization": `Bearer ${localStorage.getItem("tokenVideonft")}`
        }
      })
        .then(res => {
          setAllUsers(res.data);
        })
    }
  }, [])
  // console.log(allUsers);
  const othersRefCodes = allUsers.filter(i => i?.myReferralCode !== user?.myReferralCode);

  const handleAffiliateCode = (e) => {
    console.log(e.target.value);
    const refCode = othersRefCodes.find(i => i?.myReferralCode === e.target.value);
    setAffiliateWalletAddress(refCode?.walletAddress);
    if (refCode?.myReferralCode === e.target.value) {
      setGotRefCode(true);
    }
    else {
      setGotRefCode(false);
    }
  }

  console.log(gotRefCode);
  // Select options functionality
  const handleChoosePayment = e => {
    setSelectedOption(e);
    setToken(e.value);
  }
  // old one
  //paymnet amount by bnb,dsl,s39, usdsc,finquest
  //BNB payment
  // const bnb = totalPrice / bnbToken;
  // const bnbTwoDec = bnb.toFixed(5);

  //USDSC payment
  // const usdsc = totalPrice;

  // DSL Price
  // const dsl = totalPrice / dslToken;
  // const dslTwoDec = dsl.toFixed(4);

  // const discountDsl = dslTwoDec * 30 / 100;

  // const discountTotalDsl = dslTwoDec - discountDsl;
  // const DiscountdslTwoDec = discountTotalDsl.toFixed(4);

  // const savedAmount = dslTwoDec - DiscountdslTwoDec;
  // const savedUsdAmount = dslToken * savedAmount;

  // s39 Price
  // const s39 = totalPrice / s39Token;
  // const s39TwoDec = s39.toFixed(4);


  // finquest Price
  // const finquest = totalPrice / 0.0005;
  // const finquestTwoDec = finquest.toFixed(4);



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
        {/* {token === "dsl" && <p style={{ margin: '0' }}>You saved {savedUsdAmount} USD</p>} */}

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
        {token === "dsl" && <p style={{ margin: '0' }}>You need to pay {dslTwoDec} DSL</p>}
        {token === "s39" && <p style={{ margin: '0' }}>You need to pay {s39TwoDec} S39</p>}
        {token === "finquest" && <p style={{ margin: '0' }}>You need to pay {finquestTwoDec} FINQUEST</p>}

      </div>
      <button
        type="submit"
        className="default-btn"
        style={{ cursor: "pointer" }}
      >
        Place Order
      </button>
    </>
  );
};

export default CryptoMethod;