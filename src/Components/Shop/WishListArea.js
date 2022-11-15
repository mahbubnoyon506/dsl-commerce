import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { WishlistContext } from "../../contexts/wishlist-context";
import axios from "axios";
import { CartContext } from "../../contexts/cart-context";

function WishListArea() {
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { addItemToCart } = useContext(CartContext);
  const { wishlistProducts, setWishlistProducts, setWishlistRefetch } = useContext(WishlistContext);


  //********************** Delete wishlist **************************************
  const handleDelete = async (id) => {
    // console.log("handleDelete", id);

    const body = { "productId": id }

    await axios
      .put(`https://backend.dslcommerce.com/api/wishlist/delete/${user?.walletAddress}`, body)
      .then((res) => {
        if (res.status === 200) {
          setWishlistProducts(wishlistProducts.filter((product) => product._id !== id));
        }
        setWishlistRefetch(true)
      })
      .catch((error) => {
        // console.log('error', error)
      });

  };

  //************************************** Add To Cart From Wishlist *******************
  const addToCart = (product) => {
    let currentItem = {
      walletAddress: user?.walletAddress,
      productId: product?._id,
      price: product?.price,
      product_images: product?.product_images,
      productName: product?.productName,
      count: 1,
    };
    // console.log(currentItem);

    addItemToCart(currentItem);
  };

  return (
    <section className="wishlist-area ptb-50">
      <div className="container">
        <div className="wishlist-table table-responsive">
          <div className="wishlist-title">
            <h2>My Wishlist</h2>
          </div>

          <table className="table table-bordered">

            <tbody>
              {wishlistProducts &&
                wishlistProducts.map((wishlist) => (
                  <tr>
                    <td className="product-remove">
                      <span
                        className="remove"
                        role={"button"}
                        onClick={() => {
                          handleDelete(wishlist?._id);
                        }}
                      >
                        <i className="bx bx-x "></i>
                      </span>
                    </td>

                    <td className="product-thumbnail">
                      <Link to={`/shop/products-details/${wishlist?._id}`}>
                        <img src={wishlist?.product_images} alt="item" />
                      </Link>
                    </td>

                    <td className="product-name">
                      <Link to={`/shop/products-details/${wishlist?._id}`}>
                        <span>{wishlist?.productName.slice(0, 20)}</span>
                      </Link>
                    </td>

                    <td className="product-price">
                      <span>$ {wishlist?.price}</span>
                    </td>

                    <td className="product-btn">
                      {user?.walletAddress ? (
                        <button
                          className="default-btn"
                          onClick={() => addToCart(wishlist)}
                        >
                          <i className="flaticon-shopping-cart"></i>
                          Add to Cart
                        </button>
                      ) : (
                        <button
                          className="default-btn"
                          onClick={() => openWalletModal()}
                        >
                          <i className="flaticon-shopping-cart"></i>
                          Add to Cart
                        </button>
                      )}

                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default WishListArea;
