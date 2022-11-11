import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { DSLCommerceContext } from "./DSLCommerceContext";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([])
  const [wishlistRefetch, setWishlistRefetch] = useState(false);
  const { user } = useContext(DSLCommerceContext);
  // console.log(wishlist?.data?.products.length);


  const addProductToWishlist = async (product) => {
    // console.log("wishlist", product);

    await axios
      .post(`https://backend.dslcommerce.com/api/wishlist/create`, {
        walletAddress: user.walletAddress,
        productId: product._id,
      })
      .then((res) => {
        if (res.status === 200) {
          swal({
            title: "Success",
            text: "Successfully added to wishlist",
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          setWishlistRefetch(true);
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


  // Get All Wishlist Product 

  useEffect(() => {
    if (wishlist) {
      fetch(`https://backend.dslcommerce.com/api/product/`)
        .then((res) => res.json())
        .then((result) => {
          setWishlistProducts(
            result.filter((e) => wishlist?.data?.products.includes(e._id))
          );
        });
    }
  }, [wishlist]);

  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://backend.dslcommerce.com/api/wishlist/${user?.walletAddress}`)
      .then((res) => {
        setWishlist(res.data);
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
      setWishlistRefetch(false);
  }, [user?.walletAddress]);

  // console.log(wishlistProducts);




  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        wishlist,
        setWishlist,
        wishlistProducts,
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

