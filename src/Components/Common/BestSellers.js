import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { WishlistContext } from "../../contexts/wishlist-context";

function BestSellers({
  paddingClass = null,
  products,
  showQuickView,
  addToCart,
}) {
  const [getCategory, setGetCategory] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { addProductToWishlist } = useContext(WishlistContext);
  // console.log(filterBy)
  const [catId, setCatId] = useState(null)

  const filterBestSellers = (cat) => {
    // console.log(cat);
    setCatId(cat?._id)
    setFilterBy(cat?.name);
  };

  useEffect(() => {
    fetch("https://backend.dslcommerce.com/api/category/")
      .then((res) => res.json())
      .then((data) => {
        setGetCategory(data)
        setFilterBy(data[0]?.name)
        filterBestSellers(data[0])
      });

  }, []);

  // console.log(getCategory)
  // console.log(products)
  // console.log(catId);



  return (
    <section className={"bestsellers-area " + paddingClass}>
      <div className="container">
        <div className="section-title pt-3 pt-lg-0">
          <h2>Bestsellers</h2>
        </div>

        <div className="tab bestsellers-list-tab">
          <ul className="tabs">
            {getCategory.map((category, index) => (
              <li
                key={index}
                onClick={() => filterBestSellers(category)}
                className={`tab-item${filterBy === `${category?.name}` ? " tab-active" : ""
                  }`}
              >
                <span>{category?.name}</span>
              </li>
            ))}

          </ul>
          <div className="tab_content">
            <div className="tabs_item">
              <div className="row">
                {products.length > 0 &&
                  products.filter((product) => product.category === catId)
                    .length > 0 && (
                    <div className="col-lg-3 col-sm-6 text-center">
                      <div className="single-bestsellers-products at-time">
                        <div className="bestsellers-products-image  d-flex flex-column align-items-center">
                          <Link
                            to={`/shop/products-details/${products.filter(
                              (product) => product.category === catId
                            )[0]?._id
                              }`}
                            onClick={() => {
                              window.scrollTo(0, 0);
                            }}
                          >
                            <img
                              src={
                                products.filter(
                                  (product) => product.category === catId
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
                                        (product) => product.category === catId
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
                                        (product) => product.category === catId
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
                                      (product) => product.category === catId
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
                                (product) => product.category === catId
                              )[0]._id
                                }`}
                              onClick={() => {
                                window.scrollTo(0, 0);
                              }}
                            >
                              {
                                products.filter(
                                  (product) => product.category === catId
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
                                (product) => product.category === catId
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
          to={`/shop/cat/${products.filter((product) => product.category === catId)[0]?.category
            }/page/1`}
          className="default-btn"
        >
          See ALL Products
          <span></span>
        </Link>
      </div>
    </section>
  );
}

export default BestSellers;
