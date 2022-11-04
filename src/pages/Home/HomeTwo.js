import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Support from "../../Components/Common/Support";
import BestSellers from "../../Components/Common/BestSellers";
import Collection from "../../Components/Common/Collection";
// import Footer from "../../Components/Layout/Footer/Footer";
import Partner from "../../Components/Common/Partner";
// import LatestNews from "../../Components/Common/LatestNews";
import NewArrivals from "../../Components/Common/NewArrivals";
import Category from "../../Components/Home/HomeTwo/Category";
import SpecialProducts from "../../Components/Common/SpecialProducts";
// import Testimonial from "../../Components/Common/Testimonial";
// import SpecialOffer from "../../Components/Common/SpecialOffer";
import Banner from "../../Components/Home/HomeTwo/Banner";
import FeaturedArea from "../../Components/Home/HomeTwo/FeaturedArea";
import QuickView from "../../Components/Products/QuickView";
// import Preloader from "../../Components/Common/Preloader";

// import cartContext from "../../contexts/cart-context";
import { CartContext } from "../../contexts/cart-context";
import { useNavigate } from "react-router-dom";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";

function HomeTwo() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // const [isLoading, setisLoading] = useState(true);
  // const context = useContext(CartContext);
  const { addItemToCart, carts } = useContext(CartContext);
  const { user } = useContext(DSLCommerceContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://backend.dslcommerce.com/api/product/")
      .then((res) => {
        setProducts(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(products);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setisLoading(false);
  //   }, 1000);
  // }, []);

  const showQuickView = (product) => {
    setIsOpen(true);
    setProduct(product);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProduct({});
  };

  const addToCart = (product) => {
    // console.log("home two");
    // console.log(product);
    let currentItem = {
      walletAddress: user?.walletAddress,
      productId: product?._id,
      price: product?.price,
      product_images: product?.product_images,
      productName: product?.productName,
      count: 1
    };
    addItemToCart(currentItem);
  };

  return (
    <>
      <div className="home-two-wrapper">
        <div className="main-slider-with-category">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-12">
                <Category />
              </div>
              <div className="col-lg-9 col-md-12">
                <Banner />
              </div>
            </div>
          </div>
        </div>
        <Support paddingclassName="ptb-50" />
        <FeaturedArea products={products} />
        <BestSellers
          paddingclassName="pb-20"
          products={products}
          addToCart={addToCart}
          showQuickView={showQuickView}
        />
        <Collection />

        {/* <SpecialOffer
            paddingclassName=" pt-50 pb-50"
            products={products}
            addToCart={addToCart}
            showQuickView={showQuickView}
          /> */}

        <NewArrivals
          paddingclassName="pb-20"
          products={products}
          addToCart={addToCart}
          showQuickView={showQuickView}
        />
        <SpecialProducts
          paddingclassName="pb-50"
          products={products}
          addToCart={addToCart}
          showQuickView={showQuickView}
        />
        {/* <Testimonial /> */}
        {/* <LatestNews paddingclassName="pt-50 pb-20" /> */}
        {/* <Partner paddingclassName=" ptb-50" /> */}

        <QuickView
          isOpen={isOpen}
          closeModal={closeModal}
          product={product}
        />
      </div>
    </>
  );
}

export default HomeTwo;
