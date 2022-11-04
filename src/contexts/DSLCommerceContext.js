import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';
import swal from 'sweetalert';
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
  // RPC,
  // chainId  
} from '../utils/constant';

export const DSLCommerceContext = createContext();

const { ethereum } = window;

// const getMintContractTestnet = () => {
//   const provider = new ethers.providers.Web3Provider(ethereum);
//   const signer = provider.getSigner();
//   const MintNFTContract = new ethers.Contract(
//     mintAddressTestnet,
//     mintABITestnet,
//     signer
//   );

//   console.log("MintNFTContract",MintNFTContract)

//   return MintNFTContract;
// };

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

  // console.log(metamaskBalance);

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
    localStorage.removeItem("tokendslcommerce");
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


  // const test = async () => {
  //   const contract = getMintContractTestnet();
  //   console.log(contract);
  // };

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
        // const MintNFTContract = getEthereumContract();
        // const ID = await MintNFTContract.totalSupply();
        // setId(ID.toString());
        // console.log("This is ID in setID: " + ID);
        // console.log("This is Id in setID: " + Id);
      } else {
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
      // contractAddress,
      Id,
      setID,
      setUserRefetch,
      chain,
      pageLoading,
      payAmount,
      setPayAmount,
      // getBalance,
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
    }}>
      {children}
    </DSLCommerceContext.Provider>
  )
}