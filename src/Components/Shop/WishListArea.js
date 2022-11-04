import cart1 from "../../assets/img/collection/collection-1.png";
import cart2 from "../../assets/img/collection/collection-1.png";
import cart3 from "../../assets/img/collection/collection-2.png";
import cart4 from "../../assets/img/collection/collection-1.png";
import cart5 from "../../assets/img/collection/collection-2.png";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import swal from "sweetalert";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
//action
// import { listProducts } from "../../redux/Product/ProductAction";

function WishListArea() {
  const [wishlist, setwishlist] = useState([]);
  const [wishlistList, setWishlistList] = useState([]);
  const { user } = useContext(DSLCommerceContext);
  const walletAddress = user.walletAddress;
  // const dispatch = useDispatch();
  // const { products } = useSelector((state) => state.productReducer);

  // useEffect(() => {
  //   console.log("products1");
  //   console.log(products);
  // }, []);

  useEffect(() => {
    if (wishlist) {
      fetch(`https://backend.dslcommerce.com/api/product/`)
        .then((res) => res.json())
        .then((result) => {
          // setAllProduct(result);
          console.log("result");
          console.log(result);
          console.log("wishlist");
          console.log(wishlist.data.products);

          setWishlistList(
            result.filter((e) => wishlist.data.products.includes(e._id))
          );
        });
    }
  }, [wishlist]);

  const getWishList = () => {
    console.log("walletAddress");
    console.log(walletAddress);

    fetch(`https://backend.dslcommerce.com/api/wishlist/${walletAddress}`)
      // fetch(
      //   `https://backend.dslcommerce.com/api/wishlist/0x265aadc097a9b2956a24baeb0da3e464872931ca`)
      .then((res) => res.json())
      .then((data) => {
        setwishlist(data);
        console.log("data in");
        console.log(data);
      });

    console.log(wishlist);

    // console.log(wishlist.products[0]);
  };
  useEffect(() => {
    getWishList();
    // console.log(data)
  }, []);

  const deleteWarning = (wishlist) => {
    swal({
      title: "Are you sure to delete " + "wishlist" + "?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDelete(wishlist._id);
      } else {
        swal("Your file is safe!");
      }
    });
  };

  //delete wishlist
  const handleDelete = async (id) => {
    console.log("handleDelete");
    console.log(id);
    try {
      const response = await axios.put(
        "https://backend.dslcommerce.com/api/wishlist/delete" + walletAddress,
        { productId: id }
      );
      if (response.status === 200) {
        swal({
          title: "Deleted",
          text: response.data.message,
          icon: "success",
          button: "OK!",
          className: "modal_class_success",
        });
      }
      console.log(response);
      getWishList();
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  return (
    <section className="wishlist-area ptb-50">
      <div className="container">
        <div className="wishlist-table table-responsive">
          <div className="wishlist-title">
            <h2>My Wishlist</h2>
          </div>

          <table className="table table-bordered">
            {/* <thead>
              <tr className="border-0">
                <th className="product-remove"></th>
                <th className="product-thumbnail">PRODUCT IMAGE</th>
                <th className="product-name">PRODUCT NAME</th>
                <th className="product-price">PRODUCT PRICE</th>
                <th className="product-btn">ACTIONS</th>
              </tr>
            </thead> */}
            <tbody>
              {wishlistList &&
                wishlistList.map((wishlist) => (
                  <tr>
                    <td className="product-remove">
                      <span
                        className="remove"
                        role={"button"}
                        onClick={() => {
                          deleteWarning(wishlist);
                        }}
                      >
                        <i className="bx bx-x "></i>
                      </span>
                    </td>

                    <td className="product-thumbnail">
                      <a href="#">
                        <img src={wishlist.product_images} alt="item" />
                      </a>
                    </td>

                    <td className="product-name">
                      <span>{wishlist.productName}</span>
                    </td>

                    <td className="product-price">
                      <span>{wishlist.price}</span>
                    </td>

                    <td className="product-btn">
                      <a href="#" className="default-btn">
                        <i className="flaticon-shopping-cart"></i>
                        Add to Cart
                        <span></span>
                      </a>
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
