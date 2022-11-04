import React, { useEffect, useState, useContext } from "react";
import { Image } from "cloudinary-react";
import { Link, useNavigate } from "react-router-dom";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import axios from "axios";
import swal from "sweetalert";

function NewArrivals({
  paddingClass = "",
  title = "New Arrivals",
  products,
  showQuickView,
  addToCart,
}) {
  const navigate = useNavigate();
  const { user, openWalletModal } = useContext(DSLCommerceContext);

  const createWishlist = async (product) => {
    console.log("create wishlist NA");
    let currentItem = {
      walletAddress: user.walletAddress,
      productId: product._id,
    };
    console.log(currentItem);

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
        // openWalletModal()
        swal({
          title: "Attention",
          text: `${err.response.data.message}`,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };

  return (
    <section className={"arrivals-products-area " + paddingClass}>
      <div className="container">
        <div className="section-title pt-3 pt-lg-5">
          <h2>{title}</h2>
        </div>

        <div className="row justify-content-center">
          {products &&
            products.slice(0, 4).map((product) => {
              return (
                <div className="col-lg-3 col-sm-6" key={product?._id}>
                  <div className="single-arrivals-products ">
                    <div className="arrivals-products-image d-flex flex-column align-items-center">
                      <Link
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                        to={`/shop/products-details/${product?._id}`}
                      >
                        <img
                          src={product?.product_images}
                          style={{ width: "300px", height: "250px" }}
                          alt="new product"
                        />
                      </Link>
                      <div className="tag">New</div>
                      <ul className="arrivals-action">
                        <li>
                          {user?.walletAddress ? (
                            <span
                              onClick={() => addToCart(product)}
                              className="addtocart-icon-wrap"
                            >
                              <i className="flaticon-shopping-cart"></i>
                            </span>
                          ) : (
                            <span
                              onClick={() => openWalletModal()}
                              className="addtocart-icon-wrap"
                            >
                              <i className="flaticon-shopping-cart"></i>
                            </span>
                          )}
                        </li>
                        <li>
                          <span
                            className="addtocart-icon-wrap"
                            onClick={() => createWishlist(product)}
                          >
                            <i className="flaticon-heart"></i>
                          </span>
                        </li>
                        <li>
                          <span
                            className="quickview-icon-wrap"
                            onClick={() => showQuickView(product)}
                          >
                            <i className="flaticon-view quick-icon"></i>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="arrivals-products-content">
                      <h3>
                        <Link
                          to={`/shop/products-details/${product?._id}`}
                          onClick={() => {
                            window.scrollTo(0, 0);
                          }}
                        >
                          {product?.productName}
                        </Link>
                      </h3>
                      <ul className="rating">
                        <li>
                          <i className="bx bxs-star"></i>
                        </li>
                        <li>
                          <i className="bx bxs-star"></i>
                        </li>
                        <li>
                          <i className="bx bxs-star"></i>
                        </li>
                        <li>
                          <i className="bx bxs-star"></i>
                        </li>
                        <li>
                          <i className="bx bxs-star"></i>
                        </li>
                      </ul>
                      <span>${product?.price}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
