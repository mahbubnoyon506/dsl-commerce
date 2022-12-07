import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Banner() {

  return (
    <OwlCarousel className="home-slides-two owl-theme" items={1} loop autoplay={true}>
      <div className="main-slider-item-box"></div>

      <div className="main-slider-item-box item-two"></div>

      <div className="main-slider-item-box item-three"></div>
    </OwlCarousel>
  );
}

export default Banner;
