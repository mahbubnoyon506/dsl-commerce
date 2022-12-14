import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { WishlistContext } from "../../contexts/wishlist-context";

function NewArrivals({
  paddingClass = "",
  title = "New Arrivals",
  products,
  showQuickView,
  addToCart,
}) {
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { addProductToWishlist } = useContext(WishlistContext);

  return (
    <section className={"arrivals-products-area " + paddingClass}>
      <div className="container">
        <div className="section-title pt-3 pt-lg-5">
          <h2>{title}</h2>
        </div>

        <div className="row justify-content-center">
          {products &&
            products.slice(0, 4).reverse().map((product) => {
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
                          src={product?.images[0]}
                          style={{ width: "300px", height: "250px" }}
                          alt="new product"
                        />
                      </Link>
                      <div className="tag">New</div>
                      <ul className="arrivals-action">

                        {/*********************** Add To Cart *************************** */}
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

                        {/***********************WishList *************************** */}
                        <li>
                          {user?.walletAddress ? (
                            <span
                              className="addtocart-icon-wrap"
                              onClick={() => addProductToWishlist(product)}
                            >
                              <i className="flaticon-heart"></i>
                            </span>
                          ) : (
                            <span
                              onClick={() => openWalletModal()}
                              className="addtocart-icon-wrap"
                            >
                              <i className="flaticon-heart"></i>
                            </span>
                          )}
                        </li>

                        {/*********************** Quick View *************************** */}
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
