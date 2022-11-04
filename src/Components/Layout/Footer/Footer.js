import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Footer.css";

function Footer() {
  const [link, setLink] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    axios
      .post("https://backend.dslcommerce.com/api/mail/newsletter", { email })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          swal({
            title: "Good job!",
            text: res.data,
            icon: "success",
            button: "Aww yiss!",
          });
        }
      })
      .catch((err) => {
        setError(true);
        swal({
          title: "Sorry!",
          text: err.response.data,
          icon: "warning",
          button: "Aww yiss!",
        });
      });
  };

  useEffect(() => {
    fetch("https://dslegends.org/api/social-links.php")
      .then((res) => res.json())
      .then((data) => setLink(data));
  }, []);

  return (
    <>
      <section className="footer-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget">
                <h2>Get in Touch</h2>
                {/* <p><u>Contact us at +60149939183</u></p> */}

                <ul className="footer-contact-info">
                  <li>
                    <span>Address:</span>
                    <a href="#" target="_blank">
                      22 Sin Ming Lane #06-76 Midview City Singapore 573969
                    </a>
                  </li>
                  {/* //more address adding */}
                  {/* <li>
                    <p className="text-danger font-weight-bold">Our South East Asia Representative:-</p>
                    <h6 className="font-weight-bold">
                      DS Legends (Malaysia) Sdn Bhd
                    </h6>
                   <p className="address-text font-weight-normal">Co No: 202201012165 (1457862-K)</p>
                   <p className="address-text font-weight-normal">Suite 506 Level 5</p>
                   <p className="address-text font-weight-normal">Wisma Cosway</p>
                   <p className="address-text font-weight-normal">Jalan Raja Chulan</p>
                   <p className="address-text font-weight-normal">50200 Kuala Lumpur</p>
                   

                  </li> */}

                  <li>
                    <span>Email:</span>
                    <a href="mailto:hello@econix.com">
                      support@dslcommerce.com
                    </a>
                  </li>
                  <li>
                    <p className="contactUs">
                      <a href="tel:+60149939183">Contact us at: +60149939183</a>
                    </p>
                  </li>
                </ul>

                {/* <ul className="footer-social">
                  <li>
                    <a href={link.facebook} target="_any">
                      <i className="bx bxl-facebook border-round text-white bg-dark"></i>
                    </a>
                  </li>
                  <li>
                    <a href={link.instagram} target="_any">
                      <i className="bx bxl-instagram border-round text-white bg-dark"></i>
                    </a>
                  </li>
                  <li>
                    <a href={link.pinterest} target="_any">
                      <i className="bx bxl-pinterest-alt border-round text-white bg-dark"></i>
                    </a>
                  </li>
                  <li>
                    <a href={link.twitter} target="_any">
                      <i className="bx bxl-twitter border-round text-white bg-dark"></i>
                    </a>
                  </li>
                  <li className="mt-2">
                    <a href={link.linkedin} target="_any">
                      <i className="bx bxl-linkedin border-round text-white bg-dark"></i>
                    </a>
                  </li>
                  <li className="mt-2">
                    <a href={link.medium} target="_any">
                      <i className="bx bxl-medium border-round text-white bg-dark"></i>
                    </a>
                  </li>
                </ul> */}
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget">
                <h2>Policies</h2>

                <ul className="quick-links">

                  <li>
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      to="/shop"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      to="/terms-of-use"
                    >
                      Terms Of Use
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      to="/data-protection-notice"
                    >
                      Data Protection Notice
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      to="/about"
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget">
                <h2>Support</h2>

                <ul className="quick-links">
                  {/* <li>
                    <Link to="/my-account">
                      <a href="/#">My Account</a>
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      to="/tracking-order"
                    >
                      Order Tracking
                    </Link>
                  </li>
                  <li>
                    <a href="https://dsl.sg/contact" target="_blank" rel="noopener noreferrer">Contact Us</a>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      to="/news"
                    >
                      News
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget">
                <h2>Join Our Newsletter</h2>

                <div className="newsletter-item">
                  <div className="newsletter-content">
                    <p>
                      Subscribe to the newsletter for all the latest updates
                    </p>
                  </div>

                  <form
                    className="newsletter-form"
                    data-toggle="validator"
                    onSubmit={handleSignUp}
                  >
                    <input
                      type="email"
                      id="email"
                      className="input-newsletter border-dark rounded"
                      placeholder="Email address"
                      name="email"
                      required
                      autoComplete="off"
                    />

                    <button type="submit" className="text-uppercase btn-Sub">
                      Subscribe
                    </button>
                    <div
                      id="validator-newsletter"
                      className="form-result"
                    ></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <p className="text-center">
          <strong>Contact Us</strong>
        </p>
        {/* <p className="text-center">Made by by <FavoriteIcon fontSize="small .MuiIcon-root"/> DS Legends Pte Ltd.</p> */}
        <p
          className="mb-4 made-love text-center"
          style={{ fontSize: "18px", color: "#DC3545" }}
        >
          Made with ❤ by{" "}
          <a
            href="https://dsl.sg/"
            className="text-danger text-decoration-none"
            target="_any"
          >
            DS Legends Pte Ltd.
          </a>
        </p>
      </div>

      <div className="copyright-area">
        <hr />
        <div className="container">
          <div className=" row">
            <div className="col-lg-6 col-sm-12">
              <div className="text-center">
                <p>Copyright @ 2022 DSLCOMMERCE.COM </p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="bg-light text-center">
                <div className="container p-1">
                  <section>
                    <a href={link.facebook} target="_any">
                      <i className="bx bxl-facebook rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.instagram} target="_any">
                      <i className="bx bxl-instagram rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.pinterest} target="_any">
                      <i className="bx bxl-pinterest-alt rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.twitter} target="_any">
                      <i className="bx bxl-twitter rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.linkedin} target="_any">
                      <i className="bx bxl-linkedin rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.medium} target="_any">
                      <i className="bx bxl-medium rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.telegram} target="_any">
                      <i className="bx bxl-telegram rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                    <a href={link.youtube} target="_any">
                      <i className="bx bxl-youtube rounded-circle btn-social-footer mx-1 p-1"></i>
                    </a>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
