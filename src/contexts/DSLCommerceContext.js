import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';
import { ethers, Contract, BigNumber } from "ethers";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";
import {
  DSLtokenABITestnet,
  DSLtokenAddressTestnet,
  mintABITestnet,
  mintAddressTestnet,
  USDSCtokenABITestnet,
  USDSCtokenAddressTestnet,
  S39tokenAddressTestnet,
  S39tokenABITestnet,
  QuesttokenAddressTestnet,
  QuesttokenABITestnet,
  RPC,
  chainId
} from "../utils/constant";

export const DSLCommerceContext = createContext();

const { ethereum } = window;

const getMintContractTestnet = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const MintNFTContract = new ethers.Contract(
    mintAddressTestnet,
    mintABITestnet,
    signer
  );

  return MintNFTContract;
};

const getUSDSCtokenContractTestnet = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(
    USDSCtokenAddressTestnet,
    USDSCtokenABITestnet,
    signer
  );

  return tokenContract;
};

const getDSLtokenContractTestnet = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(
    DSLtokenAddressTestnet,
    DSLtokenABITestnet,
    signer
  );

  return tokenContract;
};

const getS39tokenContractTestnet = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(
    S39tokenAddressTestnet,
    S39tokenABITestnet,
    signer
  );

  return tokenContract;
};
const getQuesttokenContractTestnet = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(
    QuesttokenAddressTestnet,
    QuesttokenABITestnet,
    signer
  );
  return tokenContract;
};

// const getAllItemBlockchain = async () => {
//   const provider = new ethers.providers.JsonRpcProvider(RPC);
//   return {
//     provider,
//     deployer: new ethers.Wallet(private_key, provider),
//     NFTContract: new Contract(mintAddressTestnet, abi, provider)
//   };
// };

export default function DslProvider({ children }) {
  const [loginModal, setLoginModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [Id, setId] = useState();
  const [chain, setChain] = useState('');
  const [payAmount, setPayAmount] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [metamaskBalance, setMetamaskBalance] = useState({});
  const [metamaskBalanceLoading, setMetamaskBalanceLoading] = useState(false);
  const [coinbaseModal, setCoinbaseModal] = useState(false);
  const [userRefetch, setUserRefetch] = useState(false);

  window.addEventListener('load', () => {
    setPageLoading(false);
  });

  const openWalletModal = () => {
    (!user?.walletAddress || user?.walletAddress === "walletAddress undefined") &&
      setWalletModal(true);
  };
  const closeWalletModal = () => setWalletModal(false);

  const openCoinbaseModal = () => {
    // (!user?.walletAddress || user?.walletAddress === "undefined") &&
    setCoinbaseModal(true);
  };
  const closeCoinbaseModal = () => setCoinbaseModal(false);

  const openLoginModal = () => setLoginModal(true);
  const closeLoginModal = () => setLoginModal(false);

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  const getBalanceTestnet = async () => {
    const USDSCtokenContract = getUSDSCtokenContractTestnet();
    const DSLtokenContract = getDSLtokenContractTestnet();
    const S39tokenContract = getS39tokenContractTestnet();
    const QuestTokenContract = getQuesttokenContractTestnet();
    const USDSCbalance = await USDSCtokenContract.balanceOf(currentAccount);
    const USDSCamount = ethers.utils.formatEther(USDSCbalance);
    const DSLbalance = await DSLtokenContract.balanceOf(currentAccount);
    const DSLamount = ethers.utils.formatEther(DSLbalance);
    const S39balance = await S39tokenContract.balanceOf(currentAccount);
    const S39amount = ethers.utils.formatEther(S39balance);
    const Questbalance = await QuestTokenContract.balanceOf(currentAccount);
    const Questamount = ethers.utils.formatEther(Questbalance);
    const provider = new ethers.providers.Web3Provider(ethereum);
    const balance1 = await provider.getBalance(currentAccount);
    console.log("usdsc: " + USDSCamount);
    console.log("dsl: " + DSLamount);
    console.log("s39: " + S39amount);
    console.log("Quest: " + Questamount);
    console.log("BNB Testnet: " + ethers.utils.formatEther(balance1));
    const wallet = {
      usdsc: USDSCamount,
      bnb: ethers.utils.formatEther(balance1),
      dsl: DSLamount,
      s39: S39amount,
      Quest: Questamount,
    };
    return setMetamaskBalance(wallet);
  };

  window.addEventListener("load", function () {
    if (window.ethereum) {
      // detect Metamask account change
      window.ethereum.on('accountsChanged', function (accounts) {
        console.log('account is Changed', accounts);
        // logOut();
        // return swal({
        //   title: "Attention",
        //   text: "You are being logged out since you changed account. Please login again with the account you need.",
        //   icon: "warning",
        //   button: "OK",
        //   dangerMode: true,
        //   className: "modal_class",
        // });
      });

      // detect Network account change
      window.ethereum.on('networkChanged', function (networkId) {
        console.log('network is changed: ', networkId);
        // logOut();
        // return swal({
        //   title: "Attention",
        //   text: "You are being logged out since you Changed network. Please login after changing to Binance Chain.",
        //   icon: "warning",
        //   button: "OK",
        //   dangerMode: true,
        //   className: "modal_class",

        // });
      });
    } else {
      throw new Error("No ethereum object");
    }

  });

  const logOut = async () => {
    setCurrentAccount(null);
    setUser({});
    localStorage.removeItem("token");
  };

  const payByTestnetBNB = async (data) => {
    try {
      if (ethereum) {
        const chainid = await window.ethereum.request({
          method: "eth_chainId",
        });
        console.log("This is Chain ID: ", chainid);
        if (chainid === "0x38" || chainid === "0x61") {
          const MintNFTContract = getMintContractTestnet();
          console.log(MintNFTContract);
          const provider = new ethers.providers.Web3Provider(ethereum);

          
          // const parsedAmount = ethers.utils.parseEther(mintPrice);
          const admin = "0x626D20125da6a371aA48023bF9dad94BD66588F7";
          const object = {
            id: data.id,
            price: data.price,
            tokenAddress: data.tokenAddress,
            refAddress: data.refAddress,
            nonce: data.nonce,
            uri: data.uri,
            signature: data.signature
          }
          console.log("valueeee",object)

          const Val = await MintNFTContract.buyNFT(object,{ value: BigNumber.from(object.price)})
          await Val.wait()
          let txn_test = await provider.getTransaction(Val.hash);
          while (txn_test.blockNumber === null) {
            console.log("Minting...");
            txn_test = await provider.getTransaction(Val.hash);
          }
          console.log("txn_test.blockNumber: " + txn_test.blockNumber);
          let mint_hash = "https://testnet.bscscan.com/tx/" + Val.hash;
          console.log("Mint link: " + mint_hash);
          const ID = await MintNFTContract.totalSupply();
          console.log("Token ID: ", ID.toString());
          console.log("this is Token ID: 10000" + ID.toString());
          console.log("this is Contract Address: : " + mintAddressTestnet);

          let details = { mint: mint_hash, Id: ID };
          console.log(details);

          return {
            mint_hash: mint_hash,
            ID: "10000" + ID.toString(),
            mintPrice: data.price,
            address: "0x0000000000000000000000000000000000000000",
          };

        } else {
          console.log("No ethereum object");
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const payByTestnetUSDSC = async (data) => {
    try {
      if (ethereum) {
        const MintNFTContract = getMintContractTestnet();
        const USDSCTokenContract = getUSDSCtokenContractTestnet();
        console.log(USDSCTokenContract);
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log("USDC",MintNFTContract.address,
        BigNumber.from(ethers.constants.MaxUint256))
        const payment = await USDSCTokenContract.approve(
          MintNFTContract.address,
          BigNumber.from(ethers.constants.MaxUint256)
        );
        let payment_test = await provider.getTransaction(payment.hash);
        while (payment_test.blockNumber === null) {
          console.log("Approve In Progress...");
          payment_test = await provider.getTransaction(payment.hash);
        }
        console.log(payment_test.blockNumber);
        let payment_hash = "https://testnet.bscscan.com/tx/" + payment.hash;
        console.log("Payment link: " + payment_hash);
        const object = {
          id: data.id,
          price: data.price,
          tokenAddress: data.tokenAddress,
          refAddress: data.refAddress,
          nonce: data.nonce,
          uri: data.uri,
          signature: data.signature
        }
        console.log("valueeee",object)

        const Val = await MintNFTContract.buyNFT(object)
        await Val.wait()
        let txn_test = await provider.getTransaction(Val.hash);
        if (txn_test) {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = `<p></p><div class="loaders"></div> <p class="wait"><b>Transaction Pending...<b></p> `;
          swal({
            content: wrapper,
            button: false,
            className: "modal_class_success",
          });
          while (txn_test.blockNumber === null) {
            console.log("Minting...");
            txn_test = await provider.getTransaction(Val.hash);
          }
          console.log("txn_test.blockNumber: " + txn_test.blockNumber);
        }
        const ID = await MintNFTContract.totalSupply();
        console.log(ID.toString());
        let mint_hash = "https://testnet.bscscan.com/tx/" + Val.hash;
        console.log("Mint link: " + mint_hash);

        return {
          mint_hash: mint_hash,
          ID: "10000" + ID.toString(),
          mintPrice: data.price,
          address: USDSCtokenAddressTestnet,
        };

      }
    } catch (error) {
      console.log(error);
      console.log("No ethereum object");
      //setRequestLoading(false);
      if (error.code === -32603) {
        swal({
          title: "Attention",
          text: "Insufficient funds for minting!",
          icon: "warning",
          button: "OK",
          // dangerMode: true,
          className: "modal_class_success",
        });
      } else {
        swal({
          title: "Attention",
          text: "Minting Failed",
          icon: "warning",
          button: "OK",
          // dangerMode: true,
          className: "modal_class_success",
        });
      }
      throw new Error("No ethereum object");
    }
  };

  const payByTestnetDSL = async (data) => {
    try {
      if (ethereum) {
        const chainid = await window.ethereum.request({
          method: "eth_chainId",
        });
        console.log("This is Chain ID: ", chainid);
        if (chainid === "0x38" || chainid === "0x61") {
        const MintNFTContract = getMintContractTestnet();
        console.log(MintNFTContract);
        const DSLTokenContract = getDSLtokenContractTestnet();
        console.log(DSLTokenContract);
        const provider = new ethers.providers.Web3Provider(ethereum);

        console.log("USDC",MintNFTContract.address,
        BigNumber.from(ethers.constants.MaxUint256))
        const payment = await DSLTokenContract.approve(
          MintNFTContract.address,
          BigNumber.from(ethers.constants.MaxUint256)
        );
        let payment_test = await provider.getTransaction(payment.hash);
        while (payment_test.blockNumber === null) {
          console.log("Approve In Progress...");
          payment_test = await provider.getTransaction(payment.hash);
        }
        console.log(payment_test.blockNumber);
        let payment_hash = "https://testnet.bscscan.com/tx/" + payment.hash;
        console.log("Payment link: " + payment_hash);
        const object = {
          id: data.id,
          price: data.price,
          tokenAddress: data.tokenAddress,
          refAddress: data.refAddress,
          nonce: data.nonce,
          uri: data.uri,
          signature: data.signature
        }
        console.log("valueeee",object)

        const Val = await MintNFTContract.buyNFT(object)
        await Val.wait()
        let txn_test = await provider.getTransaction(Val.hash);
          while (txn_test.blockNumber === null) {
            console.log("Minting...");
            txn_test = await provider.getTransaction(Val.hash);
          }
          console.log("txn_test.blockNumber: " + txn_test.blockNumber);
        const ID = await MintNFTContract.totalSupply();
        console.log(ID.toString());
        let mint_hash = "https://testnet.bscscan.com/tx/" + Val.hash;
        console.log("Mint link: " + mint_hash);
        console.log("this is Token ID: 10000" + ID.toString());
          console.log("this is Contract Address: : " + mintAddressTestnet);
        
          return {
          mint_hash: mint_hash,
          ID: "10000" + ID.toString(),
          mintPrice: data.price,
          address: DSLtokenAddressTestnet,
        };
      } else {
        console.log("No ethereum object");
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("No ethereum object");
  }
};

  const payByTestnetS39 = async (data) => {
    try {
      if (ethereum) {
        const chainid = await window.ethereum.request({
          method: "eth_chainId",
        });
        console.log("This is Chain ID: ", chainid);
        if (chainid === "0x38" || chainid === "0x61") {
          const MintNFTContract = getMintContractTestnet();
          console.log(MintNFTContract);
          const S39TokenContract = getS39tokenContractTestnet();
          console.log(S39TokenContract);
          const provider = new ethers.providers.Web3Provider(ethereum);

          console.log("USDC",MintNFTContract.address,
          BigNumber.from(ethers.constants.MaxUint256))
          const payment = await S39TokenContract.approve(
            MintNFTContract.address,
            BigNumber.from(ethers.constants.MaxUint256)
          );
          let payment_test = await provider.getTransaction(payment.hash);
          while (payment_test.blockNumber === null) {
            console.log("Approve In Progress...");
            payment_test = await provider.getTransaction(payment.hash);
          }
          console.log(payment_test.blockNumber);
          let payment_hash = "https://testnet.bscscan.com/tx/" + payment.hash;
          console.log("Payment link: " + payment_hash);
  
          const object = {
            id: data.id,
            price: data.price,
            tokenAddress: data.tokenAddress,
            refAddress: data.refAddress,
            nonce: data.nonce,
            uri: data.uri,
            signature: data.signature
          }
          console.log("valueeee",object)
  
          const Val = await MintNFTContract.buyNFT(object)
          await Val.wait()
            let txn_test = await provider.getTransaction(Val.hash);
          while (txn_test.blockNumber === null) {
            console.log("Minting...");
            txn_test = await provider.getTransaction(Val.hash);
          }
          console.log("txn_test.blockNumber: " + txn_test.blockNumber);
          const ID = await MintNFTContract.totalSupply();
          console.log("Token ID: ", ID.toString());
          let mint_hash = "https://testnet.bscscan.com/tx/" + Val.hash;
          console.log("Mint link: " + mint_hash);
          console.log("this is Token ID: 10000" + ID.toString());
          console.log("this is Contract Address: : " + mintAddressTestnet);

          return {
            mint_hash: mint_hash,
            ID: "10000" + ID.toString(),
            mintPrice: data.price,
            address: S39tokenAddressTestnet,
          };
        } else {
          console.log("No ethereum object");
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const payByTestnetQuest = async (data) => {
    try {
      if (ethereum) {
        const MintNFTContract = getMintContractTestnet();
        const USDSCTokenContract = getQuesttokenContractTestnet();
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log("USDC",MintNFTContract.address,
        BigNumber.from(ethers.constants.MaxUint256))
        const payment = await USDSCTokenContract.approve(
          MintNFTContract.address,
          BigNumber.from(ethers.constants.MaxUint256)
        );
        let payment_test = await provider.getTransaction(payment.hash);
        while (payment_test.blockNumber === null) {
          console.log("Approve In Progress...");
          payment_test = await provider.getTransaction(payment.hash);
        }
        console.log(payment_test.blockNumber);
        let payment_hash = "https://testnet.bscscan.com/tx/" + payment.hash;
        console.log("Payment link: " + payment_hash);
        const object = {
          id: data.id,
          price: data.price,
          tokenAddress: data.tokenAddress,
          refAddress: data.refAddress,
          nonce: data.nonce,
          uri: data.uri,
          signature: data.signature
        }
        console.log("valueeee",object)

        const Val = await MintNFTContract.buyNFT(object)
        await Val.wait();
        let txn_test = await provider.getTransaction(Val.hash);
        if (txn_test) {
          while (txn_test.blockNumber === null) {
            console.log("Minting...");
            txn_test = await provider.getTransaction(Val.hash);
          }
          console.log("txn_test.blockNumber: " + txn_test.blockNumber);
        }
        const ID = await MintNFTContract.totalSupply();
        console.log(ID.toString());
        let mint_hash = "https://testnet.bscscan.com/tx/" + Val.hash;
        console.log("Mint link: " + mint_hash);
        return {
          mint_hash: mint_hash,
          ID: "10000" + ID.toString(),
          mintPrice: data.price,
          address: QuesttokenAddressTestnet,
        };
      }
    } catch (error) {
      console.log(error);
      console.log("No ethereum object");
      //setRequestLoading(false);
      if (error.code === -32603) {
        swal({
          title: "Attention",
          text: "Insufficient funds for minting!",
          icon: "warning",
          button: "OK",
          // dangerMode: true,
          className: "modal_class_success",
        });
      } else {
        swal({
          title: "Attention",
          text: "Minting Failed",
          icon: "warning",
          button: "OK",
          // dangerMode: true,
          className: "modal_class_success",
        });
      }
      throw new Error("No ethereum object");
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) {
        return console.log("please use metamask");
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        const chainid = await window.ethereum.request({
          method: "eth_chainId",
        });
        setChain(chainid);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (user.walletAddress) {
  //     getBalance();
  //   }
  // }, [user])

  const connectWallet = async (wallet) => {
    try {
      console.log("connect");
      if (window.innerWidth < 576 && !ethereum) {
        return swal({
          title: "Attention",
          text: "Please use Metamask browser!",
          icon: "warning",
          button: "OK",
          dangerMode: true,
          className: "modal_class",
        });
      }
      if (!ethereum) {
        return console.log("please use metamask");
      }
      if (wallet === "Metamask") {
        setLoading(true);

        const chainid = await window.ethereum.request({
          method: "eth_chainId",
        });
        console.log("This is Chain ID: ", chainid);
        setChain(chainid);
        if (chainid === "0x38" || chainid === "0x61") {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          setCurrentAccount(accounts[0]);

          await axios
            .post(`https://backend.dslcommerce.com/api/users/`, {
              walletAddress: accounts[0],
            })
            .then((res) => {
              if (res.data.user) {
                getBalanceTestnet();
                setUser(res.data.user);
                setLoading(false);
                closeWalletModal();
                localStorage.setItem("tokendslcommerce", res.data.token);
                const wrapper = document.createElement("div");
                wrapper.innerHTML = `<p class='text-break text-white fs-6'>You have succesfully logged in with <br/>Binance Chain.</p>`;
                return swal({
                  title: "Success",
                  // text: "You have succesfully logged in with Binance Chain.",
                  content: wrapper,
                  icon: "success",
                  button: "OK",
                  // dangerMode: true,
                  className: "modal_class_success",
                });
              }
            });
        } else {
          swal({
            title: "Attention",
            text: "Please change to Binance Chain before connecting.",
            icon: "warning",
            button: "OK",
            dangerMode: true,
            className: "modal_class",
          });
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };


  const connectToCoinbase = async () => {
    getBalanceTestnet();

    if (typeof window.ethereum === "undefined") {
      // ask the user to install the extension
      return swal({
        title: "Attention",
        text: "Please open this website with wallet browsers",
        icon: "warning",
        button: "OK",
        dangerMode: true,
        className: "modal_class",
      });
    }
    let provider = window.ethereum;
    // edge case if MM and CBW are both installed
    if (window.ethereum.providers?.length) {
      window.ethereum.providers.forEach(async (p) => {
        if (p.isCoinbaseWallet) provider = p;
      });
    }
    const chainid = await provider.request({
      method: "eth_chainId",
    });
    console.log("This is Chain ID: ", chainid);
    setChain(chainid);
    if (chainid === "0x61") {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setCurrentAccount(accounts[0]);

      await axios
        .post(`https://backend.dslcommerce.com/api/users/`, {
          walletAddress: accounts[0],
        })
        .then((res) => {
          if (res.data.user) {
            getBalanceTestnet();
            setUser(res.data.user);
            setLoading(false);
            closeCoinbaseModal();
            localStorage.setItem("tokendslcommerce", res.data.token);
            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-6'>You have succesfully logged in with <br/>Coin Base.</p>`;
            return swal({
              title: "Success",
              // text: "You have succesfully logged in with Binance Chain.",
              content: wrapper,
              icon: "success",
              button: "OK",
              // dangerMode: true,
              className: "modal_class_success",
            });
          }
        });
    } else {
      console.log("Please Switch to Binance Chain");
      swal({
        title: "Attention",
        text: "Please change to Binance Chain (Testnet) before connecting.",
        icon: "warning",
        button: "OK",
        dangerMode: true,
        className: "modal_class",
      });
    }
  };

  const connectToMetamask = async () => {

    getBalanceTestnet();
    if (typeof window.ethereum === "undefined") {
      // ask the user to install the extension
      return swal({
        title: "Attention",
        text: "Please open this website with wallet browsers",
        icon: "warning",
        button: "OK",
        dangerMode: true,
        className: "modal_class",
      });
    }
    let provider = null;
    if (typeof window.ethereum !== "undefined") {
      let provider = window.ethereum;
      // edge case if MM and CBW are both installed
      if (window.ethereum.providers?.length) {
        window.ethereum.providers.forEach(async (p) => {
          if (p.isMetaMask) provider = p;
        });
      }
      try {
        const chainid = await provider.request({
          method: "eth_chainId",
        });
        console.log("This is Chain ID: ", chainid);
        setChain(chainid);
        if (chainid === "0x61") {
          const accounts = await provider.request({
            method: "eth_requestAccounts",
          });
          console.log(accounts[0]);
          setCurrentAccount(accounts[0]);

          await axios
            .post(`https://backend.dslcommerce.com/api/users/`, {
              walletAddress: accounts[0],
            })
            .then((res) => {
              if (res.data.user) {
                setUser(res.data.user);
                // getBalanceMainnet();
                getBalanceTestnet();

                setLoading(false);
                closeWalletModal();
                localStorage.setItem("tokendslcommerce", res.data.token);
                const wrapper = document.createElement("div");
                wrapper.innerHTML = `<p class='text-break text-white fs-6'>You have succesfully logged in with <br/>Binance Chain.</p>`;
                return swal({
                  title: "Success",
                  // text: "You have succesfully logged in with Binance Chain.",
                  content: wrapper,
                  icon: "success",
                  button: "OK",
                  // dangerMode: true,
                  className: "modal_class_success",
                });
              }
            });
        } else {
          console.log("Please Switch to Binance Chain");
          swal({
            title: "Attention",
            text: "Please change to Binance Chain (Testnet) before connecting.",
            icon: "warning",
            button: "OK",
            dangerMode: true,
            className: "modal_class",
          });
        }
      } catch (error) {
        throw new Error("User Rejected");
      }
    } else {
      throw new Error("No MetaMask Wallet found");
    }
    console.log("MetaMask provider", provider);
    return provider;
  };



  const setID = async () => {
    try {
      if (ethereum) {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, [])


  useEffect(() => {
    if (currentAccount && localStorage.getItem("tokendslcommerce")) {
      setLoading(true);
      axios.get(`https://backend.dslcommerce.com/api/users/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("tokendslcommerce")}`,
        },
      })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
      setUserRefetch(false);
    }
  }, [currentAccount, userRefetch]);

  useEffect(() => {
    if (requestLoading) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = `<p></p><div className="loader"></div> <p className="success"><b>Please wait...<b></p> `;
      swal({
        content: wrapper,
        button: false,
        className: "modal_class_success",
      });
    }
  }, [requestLoading]);

  return (
    <DSLCommerceContext.Provider value={{
      connectWallet,
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
      getBalanceTestnet,
      payByTestnetBNB,
      payByTestnetUSDSC,
      payByTestnetDSL,
      payByTestnetS39,
      payByTestnetQuest,
    }}>
      {children}
    </DSLCommerceContext.Provider>
  )
}