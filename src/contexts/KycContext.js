import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { DSLCommerceContext } from "./DSLCommerceContext";

export const KycContext = createContext();

export default function KycProvider({ children }) {
  const navigate = useNavigate()
  const [kycUser, setKycUser] = useState({});
  const [refetch, setRefetch] = useState(false);
  const { user } = useContext(DSLCommerceContext);

  //get current user data..........
  useEffect(() => {
    axios.get(`https://backend.dslcommerce.com/api/user-panel/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('kycUserToken')}`
      }
    })
      .then(res => {
        console.log(res.data)
        setKycUser(res.data.result)
      })
  }, [refetch, user]);


  //************************************ User Register ***********************************
  const handleRegister = async (data) => {
    await axios.post(`https://backend.dslcommerce.com/api/user-panel/signup`, data)
      .then(res => {
        if (res.status === 200) {
          setRefetch(!refetch);
          localStorage.setItem('kycUserToken', res.data.token);
          console.log(res.data.token)
          toast.success('Register Success .')
          navigate('/kyc/profile')
        }
      })
      .catch(err => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      })
  };


  //************************************ User login ************************************
  const handleUserLogin = async (data) => {
    await axios.post(`https://backend.dslcommerce.com/api/user-panel/signin`, data)
      .then(res => {
        if (res.status === 200) {
          setRefetch(!refetch);
          localStorage.setItem('kycUserToken', res.data.token);
          console.log(res.data.token)
          toast.success('Welcome to your profile .')
          navigate('/kyc/profile')
        }
      })
      .catch(err => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      })
  };


  // ************************************User Update ************************************
  const handleUpdateUser = async (data) => {
    await axios.put(`https://backend.dslcommerce.com/api/user-panel/user/update/${data?.walletAddress}`, data)
      .then(res => {
        if (res.status === 200) {
          setRefetch(!refetch);
          toast.success('Successfully updated your profile .')
        }
      })
      .catch(err => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      })
  };



  //user logout
  const logout = () => {
    setKycUser("")
    localStorage.removeItem("kycUserToken");

  }

  return (
    <KycContext.Provider
      value={{
        handleRegister,
        handleUserLogin,
        setKycUser,
        kycUser,
        handleUpdateUser,
        logout
      }}
    >
      {children}
    </KycContext.Provider>
  );
}