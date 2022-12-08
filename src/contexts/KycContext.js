import axios from "axios";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const KycContext = createContext();

export default function KycProvider({ children }) {
  const navigate = useNavigate()

  const handleRegister = async (data) => {
    await axios.post(`https://backend.dslcommerce.com/api/user-panel/signup`, data)
      .then(res => {
        toast.success('Register Success .')
        navigate('/kyc/login')
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

  const handleUserLogin = async (data) => {
    await axios.post(`https://backend.dslcommerce.com/api/user-panel/signin`, data)
      .then(res => {
        toast.success('Welcome to your profile .')
        navigate('/kyc/profile')
        // setUserRefetch(true);
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

  

  return (
    <KycContext.Provider
      value={{
        handleRegister,
        handleUserLogin,
      }}
    >
      {children}
    </KycContext.Provider>
  );
}
