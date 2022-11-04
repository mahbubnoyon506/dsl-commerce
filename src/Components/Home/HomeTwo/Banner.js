import React from "react";
// import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from 'react-router-dom';
import ReactOwlCarousel from "react-owl-carousel";

function Banner() {
  const currentYear = new Date().getFullYear();
  // console.log(currentYear);
  return (
    <ReactOwlCarousel className="home-slides-two owl-theme" items={1} loop autoplay={true}>
      <div className="main-slider-item-box">
        <div className="main-slider-content">
          <b>Big Sale Offer</b>
          <h1>Get the Best Deals on Headphone</h1>
          <p>
            Will be updated soon!
          </p>

          <div className="slider-btn">
            <Link to="/shop" className="default-btn">
              <i className="flaticon-shopping-cart"></i>
              Shop Now
              <span></span>
            </Link>
          </div>
        </div>
      </div>

      <div className="main-slider-item-box item-two">
        <div className="main-slider-content">
          <b>Popular in {currentYear}</b>
          <h1>New Arrivals CCTV Camera</h1>
          <p>
            Will be updated soon!
          </p>

          <div className="slider-btn">
            <Link to="/shop" className="default-btn">
              <i className="flaticon-shopping-cart"></i>
              Shop Now
              <span></span>
            </Link>
          </div>
        </div>
      </div>

      <div className="main-slider-item-box item-three">
        <div className="main-slider-content">
          <b>Big Sale Offer</b>
          <h1>High-Quality Product Camera</h1>
          <p>
            Will be updated soon!
          </p>

          <div className="slider-btn">
            <Link to="/shop" className="default-btn">
              <i className="flaticon-shopping-cart"></i>
              Shop Now
              <span></span>
            </Link>
          </div>
        </div>
      </div>
    </ReactOwlCarousel>
  );
}

export default Banner;
