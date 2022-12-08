import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";
// import Swal from "sweetalert2";

export const KycContext = createContext();

export default function KycProvider({ children }) {
  const [email1, setEmail1] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://backendtestnetcert.blockchaincert.sg/api/user/currentuser`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenBlockchian")}`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
        console.log("CallingInFetch", res.data.email);
      });
    console.log("callingTime?", data);
  }, [refetch]);

  const handleRegister = (data) => {
    axios
      .post(
        "https://backendtestnetcert.blockchaincert.sg/api/user/register",
        data,
        {}
      )
      .then((res) => {
        if (res.status === 200) {
          setRefetch(!refetch);
          localStorage.setItem("tokenBlockchian", res.data.token);
          console.log(res.data.token);

          swal({
            title: "Success",
            text: `${res.data.message}`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });

          const wrapper = document.createElement("div");
          wrapper.innerHTML = `<p class='text-break text-white fs-5'>${res.data.message}</p>`;

          //   Swal.fire({
          //     html: wrapper,
          //     icon: "success",
          //     customClass: "modal_class_success",
          //   });

          // navigate(`/my-account/${email}`);
        }
      })
      .catch((error) => {
        swal({
          title: "Attention",
          text: `${error.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });

        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<p class='text-break text-white fs-5'>${error.response.data.message}</p>`;

        // Swal.fire({
        //   html: wrapper,
        //   icon: "warning",
        //   customClass: "modal_class_success",
        // });
      });
  };

  const handleUserLogin = (data) => {
    axios
      .post("https://backendtestnetcert.blockchaincert.sg/api/user", data, {})
      .then((res) => {
        if (res.status === 200) {
          setRefetch(!refetch);
          localStorage.setItem("tokenBlockchian", res.data.token);
          console.log(res.data.token);
          swal({
            title: "Success",
            text: `${res.data.message}`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });

          const wrapper = document.createElement("div");
          wrapper.innerHTML = `<p class='text-break text-white fs-5'>${res.data.message}</p>`;

          //   Swal.fire({
          //     html: wrapper,
          //     icon: "success",
          //     customClass: "modal_class_success",
          //   });
        } else if (res.status === 400) {
          swal({
            title: "Attention",
            text: `${res.data.message}`,
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
          });

          const wrapper = document.createElement("div");
          wrapper.innerHTML = `<p class='text-break text-white fs-5'>${res.data.message}</p>`;

          //   Swal.fire({
          //     html: wrapper,
          //     icon: "warning",
          //     customClass: "modal_class_success",
          //   });
        }
      })
      .catch((error) => {
        swal({
          title: "Attention",
          text: `${error.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });

        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<p class='text-break text-white fs-5'>${error.response.data.message}</p>`;

        // Swal.fire({
        //   html: wrapper,
        //   icon: "warning",
        //   customClass: "modal_class_success",
        // });
      });
  };

  const sendResetLink = (email) => {
    axios
      .post(
        "https://backendtestnetcert.blockchaincert.sg/api/user/forgotpass",
        { email }
      )
      .then((res) => {
        if (res.status === 200) {
          swal({
            title: "Success",
            text: `${res.data.message}`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });

          const wrapper = document.createElement("div");
          wrapper.innerHTML = `<p class='text-break text-white fs-5'>${res.data.message}</p>`;

          //   Swal.fire({
          //     html: wrapper,
          //     icon: "success",
          //     customClass: "modal_class_success",
          //   });
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });

        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<p class='text-break text-white fs-5'>${err.response.data.message}</p>`;

        // Swal.fire({
        //   html: wrapper,
        //   icon: "warning",
        //   customClass: "modal_class_success",
        // });
      });
  };

  const logout = () => {
    setData("");
    localStorage.removeItem("tokenBlockchian");
  };

  return (
    <KycContext.Provider
      value={{
        setEmail1,
        setData,
        data,
        handleRegister,
        handleUserLogin,
        logout,
        sendResetLink,
      }}
    >
      {children}
    </KycContext.Provider>
  );
}
