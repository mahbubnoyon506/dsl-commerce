import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { CartContext } from "../../contexts/cart-context";

import "./MiddleHeader.css";

function MiddleHeader() {
  const [getCategory, setGetCategory] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(DSLCommerceContext);
  const walletAddress = user.walletAddress;
  const [wishlistLength, setwishlistLength] = useState([]);

  const { carts } = useContext(CartContext);
  const getWishList = () => {
    console.log("walletAddress");
    console.log(walletAddress);

    fetch(`https://backend.dslcommerce.com/api/wishlist/${walletAddress}`)
      // fetch(
      //   `https://backend.dslcommerce.com/api/wishlist/0x265aadc097a9b2956a24baeb0da3e464872931ca`)
      .then((res) => res.json())
      .then((data) => {
        setwishlistLength(data?.data?.products.length);
        console.log("data in");
        console.log(data?.data?.products.length);
      });
    console.log("wishlistLength");
    console.log(wishlistLength);
  };
  useEffect(() => {
    fetch("https://backend.dslcommerce.com/api/category/")
      .then((res) => res.json())
      .then((data) => setGetCategory(data));

    getWishList();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const cat = e.target.category.value;
    const q = e.target.q.value;
    navigate(`/shop/cat/${cat ? cat : "all"}/search/${q}/1`);
  };

  return (
    <div className="middle-header-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <div className="middle-header-logo">
              <Link to="/">
                <h2 className="text-white text-uppercase">dslcommerce</h2>
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="middle-header-search">
              <form onSubmit={submitHandler}>
                <div className="row align-items-center">
                  <div className="col-4 select-column">
                    <div className="form-group ">
                      <select
                        className="px-4 text-white"
                        style={{ cursor: "pointer", background: "#15407F" }}
                        name="category"
                      >
                        <option value="">All Category</option>
                        {getCategory.map((category, index) => (
                          <option
                            key={index}
                            style={{ padding: "5px" }}
                            value={category?._id}
                          >
                            {category?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-8">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search product..."
                        name="q"
                      />
                      <button type="submit" className="">
                        <i className="bx bx-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-3">
            <ul className="middle-header-optional">
              <li className="">
                <Link to="/wishlist">
                  <i className="flaticon-heart"></i>
                  {wishlistLength >= 1 && (
                    <span className="cart_counter">{wishlistLength}</span>
                  )}
                </Link>
              </li>
              <li className="">
                <Link to="/cart">
                  <i className="flaticon-shopping-cart"></i>
                  {carts?.length >= 1 && (
                    <span className="cart_counter">{carts?.length}</span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleHeader;
