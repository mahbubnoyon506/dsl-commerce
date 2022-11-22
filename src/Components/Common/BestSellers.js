import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { WishlistContext } from "../../contexts/wishlist-context";

function BestSellers({
  paddingClass = null,
  products,
  showQuickView,
  addToCart,
}) {
  const [filterBy, setFilterBy] = useState("computers");
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { addProductToWishlist } = useContext(WishlistContext);

  const filterBestSellers = (filterBy) => {
    setFilterBy(filterBy);
  };
  

  return (
    <section className={"bestsellers-area " + paddingClass}>
      <div className="container">
        <div className="section-title pt-3 pt-lg-0">
          <h2>Bestsellers</h2>
        </div>

        <div className="tab bestsellers-list-tab">
          <ul className="tabs">
            <li
              onClick={() => filterBestSellers("computers")}
              className={`tab-item${filterBy === "computers" ? " tab-active" : ""
                }`}
            >
              <span>Computers</span>
            </li>
            <li
              onClick={() => filterBestSellers("cameras")}
              className={`tab-item${filterBy === "cameras" ? " tab-active" : ""
                }`}
            >
              <span>Cameras</span>
            </li>
            <li
              onClick={() => filterBestSellers("electronics")}
              className={`tab-item${filterBy === "electronics" ? " tab-active" : ""
                }`}
            >
              <span>Electronics</span>
            </li>
            {/* <li
              onClick={() => filterBestSellers("audio")}
              className={`tab-item${filterBy === "audio" ? " tab-active" : ""}`}
            >
              <span>Audio</span>
            </li>
            <li
              onClick={() => filterBestSellers("accessories")}
              className={`tab-item${filterBy === "accessories" ? " tab-active" : ""
                }`}
            >
              <span>Accessories</span>
            </li>
            <li
              onClick={() => filterBestSellers("laptop")}
              className={`tab-item${filterBy === "laptop" ? " tab-active" : ""
                }`}
            >
              <span>Laptop</span>
            </li>
            <li
              onClick={() => filterBestSellers("watches")}
              className={`tab-item${filterBy === "watches" ? " tab-active" : ""
                }`}
            >
              <span>Watches</span>
            </li>
            <li
              onClick={() => filterBestSellers("mobile")}
              className={`tab-item${filterBy === "mobile" ? " tab-active" : ""
                }`}
            >
              <span>Mobile</span>
            </li>
            <li
              onClick={() => filterBestSellers("headphone")}
              className={`tab-item${filterBy === "headphone" ? " tab-active" : ""
                }`}
            >
              <span>Headphone</span>
            </li> */}
          </ul>
          <div className="tab_content">
            <div className="tabs_item">
              <div className="row">
                {/* {products.length>0 &&
                  products.slice(1).map((product, index) => { */}
                {products.length > 0 &&
                  products.filter((product) => product.type === filterBy)
                    .length > 0 && (
                    <div className="col-lg-3 col-sm-6 text-center">
                      <div className="single-bestsellers-products at-time">
                        <div className="bestsellers-products-image  d-flex flex-column align-items-center">
                          <Link
                            to={`/shop/products-details/${products.filter(
                              (product) => product.type === filterBy
                            )[0]?._id
                              }`}
                            onClick={() => {
                              window.scrollTo(0, 0);
                            }}
                          >
                            {/* <Image
                            key={product._id}
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            publicId={product.image_public_id}
                            width="300"
                            crop="scale"
                          /> */}
                            <img
                              src={
                                products.filter(
                                  (product) => product.type === filterBy
                                )[0]?.product_images
                              }
                              style={{ width: "300px", height: "250px" }}
                              alt=""
                            />
                          </Link>
                          <div className="tag">New</div>
                          <ul className="bestsellers-action">

                            {/*********************** Add To Cart *************************** */}
                            <li>
                              {user?.walletAddress ? (
                                <span
                                  className="addtocart-icon-wrap"
                                  // onClick={() => addToCart()}
                                  onClick={() =>
                                    addToCart(
                                      products.filter(
                                        (product) => product.type === filterBy
                                      )[0]
                                    )
                                  }
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
                                  onClick={() =>
                                    addProductToWishlist(
                                      products.filter(
                                        (product) => product.type === filterBy
                                      )[0]
                                    )
                                  }
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
                                onClick={() =>
                                  showQuickView(
                                    products.filter(
                                      (product) => product.type === filterBy
                                    )[0]
                                  )
                                }
                              >
                                <i className="flaticon-view quick-icon"></i>
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="bestsellers-products-content">
                          <h3>
                            <Link
                              to={`/shop/products-details/${products.filter(
                                (product) => product.type === filterBy
                              )[0]._id
                                }`}
                              onClick={() => {
                                window.scrollTo(0, 0);
                              }}
                            >
                              {
                                products.filter(
                                  (product) => product.type === filterBy
                                )[0].productName
                              }
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
                          <span>
                            $
                            {
                              products.filter(
                                (product) => product.type === filterBy
                              )[0].price
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="collection-btn text-center mb-5">
        <Link
          to={`/shop/cat/${products.filter((product) => product.type === filterBy)[0]?.category
            }/page/1`}
          className="default-btn"
        >
          {/* <i className="flaticon-shopping-cart"></i> */}
          See ALL Products
          <span></span>
        </Link>
      </div>
    </section>
  );
}

export default BestSellers;
