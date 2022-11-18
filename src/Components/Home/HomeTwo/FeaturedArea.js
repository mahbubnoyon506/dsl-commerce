import { Link } from "react-router-dom";
// import featured1 from "../../../assets/img/featured/featured-1.jpg";
// import featured2 from "../../../assets/img/featured/featured-2.jpg";
// import featured3 from "../../../assets/img/featured/featured-3.jpg";
import featured1 from "../../../assets/img/featured/1.jpeg";
import featured2 from "../../../assets/img/featured/2.jpeg";
import featured3 from "../../../assets/img/featured/3.jpeg";
import { Carousel } from "react-responsive-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function FeaturedArea() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // nextArrow: {color:"#000"}
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 777,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="featured-area">
      <div className="container">
        <div className="section-title pt-3 pt-lg-0">
          <h2>Featured Products</h2>
        </div>
        <div className="row">
          <Slider className="overflow-hidden" {...settings}>
            <div className="p-3">
              <div className="single-featured">
                <img src={featured1} alt="featured_img" />

                {/* <div className="featured-content">
                  <span>Featured</span>
                  <h3>Best Deal on the Camera Collection</h3>
                  <div className="tag">30% Off</div>

                  <div className="mb-2 mb-sm-0">
                    <div className="featured-btn ">
                      <Link
                        to="/shop"
                        className="featured-btn-one"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        View product
                      </Link>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="p-3">
              <div className="single-featured">
                <img src={featured2} alt="featured_img" />

                {/* <div className="featured-content">
                  <span>Featured</span>
                  <h3>Best Deal on the Camera Collection</h3>
                  <div className="tag">30% Off</div>

                  <div className="featured-btn">
                    <Link
                      to="/shop"
                      className="featured-btn-one"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      View product
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="p-3">
              <div className="single-featured">
                <img src={featured3} alt="featured_img" />

                {/* <div className="featured-content">
                  <span>Featured</span>
                  <h3>Best Deal on the Camera Collection</h3>
                  <div className="tag">30% Off</div>

                  <div className="featured-btn">
                    <Link
                      to="/shop"
                      className="featured-btn-one"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      View product
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="p-3">
              <div className="single-featured">
                <img src={featured1} alt="featured_img" />

                {/* <div className="featured-content">
                  <span>Featured</span>
                  <h3>Best Deal on the Camera Collection</h3>
                  <div className="tag">30% Off</div>

                  <div className="featured-btn">
                    <Link
                      to="/shop"
                      className="featured-btn-one"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      View product
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="p-3">
              <div className="single-featured">
                <img src={featured2} alt="featured_img" />

                {/* <div className="featured-content">
                  <span>Featured</span>
                  <h3>Best Deal on the Camera Collection</h3>
                  <div className="tag">30% Off</div>

                  <div className="featured-btn">
                    <Link to="/shop" className="featured-btn-one">
                      View product
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </Slider>
        </div>
        <div className="collection-btn text-center mt-5">
          <Link to="/shop" className="default-btn">
            {/* <i className="flaticon-shopping-cart"></i> */}
            See ALL Products
            <span></span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedArea;
