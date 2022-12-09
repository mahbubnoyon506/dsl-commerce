import axios from "axios";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const KycContext = createContext();

export default function KycProvider({ children }) {
  const navigate = useNavigate()
  const [data, setData] = useState({});
  const [refetch, setRefetch] = useState(false);
      
     //get current user data..........
      useEffect(() => {
        axios.get(`https://backend.dslcommerce.com/api/user-panel/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokendslcommerce')}`
            }
        })
            .then(res => {
                setData(res.data)
            })
      }, [refetch]);


      //user register.........
        const handleRegister = async (data) => {
          await axios.post(`https://backend.dslcommerce.com/api/user-panel/signup`, data)
            .then(res => {
              if (res.status === 200) {
                setRefetch(!refetch);
                localStorage.setItem('tokendslcommerce', res.data.token);
                console.log(res.data.token)
                toast.success('Register Success .')
                navigate('/kyc/login')
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


         /// user login...........
          const handleUserLogin = async (data) => {
            await axios.post(`https://backend.dslcommerce.com/api/user-panel/signin`, data)
              .then(res => {
                if (res.status === 200) {
                  setRefetch(!refetch);
                  localStorage.setItem('tokendslcommerce', res.data.token);
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


         /// user update...........
          const handleUpdateUser = async (data) => {
            await axios.put(`https://backend.dslcommerce.com/api/user-panel/user/update/${data.walletAddress}`, data)
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
        setData("")
        localStorage.removeItem("tokendslcommerce");

    }

  return (
    <KycContext.Provider
      value={{
        handleRegister,
        handleUserLogin,
        setData,
        data,
        handleUpdateUser,
        logout
      }}
    >
      {children}
    </KycContext.Provider>
  );
}
