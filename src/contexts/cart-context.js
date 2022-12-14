import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { DSLCommerceContext } from "./DSLCommerceContext";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState([]);
  const [cartRefetch, setCartRefetch] = useState(false);
  const { user } = useContext(DSLCommerceContext);
  const [payablePrice, setPayablePrice] = useState(null)

  const addTotalPrice = (total) => {
    // console.log(total);
    setPayablePrice(total);
  }

  //************************************** Add Item To Cart **************************************
  const addItemToCart = async (item) => {
    console.log("cartItem", item);
    await axios
      .post(`https://backend.dslcommerce.com/api/cart/`, item)
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          swal({
            text: `Successfully added to cart! `,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          setCartRefetch(true);
        }
      })
      .catch((err) => {
        console.log(err);
        swal({
          text: `Product already added to cart`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  //************************************** Get All Cart Item **************************************
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://backend.dslcommerce.com/api/cart/${user?.walletAddress}`)
      .then((res) => {
        // console.log("res.data");
        // console.log(res.data);
        setCarts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    setCartRefetch(false);
  }, [cartRefetch, user?.walletAddress]);


  // console.log(carts)


  return (
    <CartContext.Provider
      value={{
        addItemToCart,
        carts,
        setCarts,
        cartRefetch,
        setCartRefetch,
        loading,
        setLoading,
        addTotalPrice,
        payablePrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

