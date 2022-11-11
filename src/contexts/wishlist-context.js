import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { DSLCommerceContext } from "./DSLCommerceContext";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [wishlists, setWishlists] = useState([]);
  const [wishlistRefetch, setWishlistRefetch] = useState(false);
  const { user } = useContext(DSLCommerceContext);


  const addProductToWishlist = async (product) => {
    console.log("wishlist", product);
    let currentItem = {
      walletAddress: user?.walletAddress,
      productId: product._id,
    };
    // console.log(currentItem);

    await axios
      .post(`https://backend.dslcommerce.com/api/wishlist/create`, {
        walletAddress: user.walletAddress,
        productId: product._id,
      })
      .then((res) => {
        if (res.status === 200) {
          swal({
            title: "Success",
            // text: `${res.data.message}`,
            text: "Successfully added to wishlist",
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
        }
      })
      .catch((err) => {
        swal({
          title: "Attention",
          // text: `${err.response.data.message}`,
          text: `Product already added to wishlist`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });

  };




  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        wishlists,
        setWishlists,
        wishlistRefetch,
        setWishlistRefetch,
        loading,
        setLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

