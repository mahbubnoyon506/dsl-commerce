import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./QuickView.css";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import { CartContext } from "../../contexts/cart-context";


function QuickView({ isOpen, closeModal, product }) {
  const [quantity, setQuantity] = useState(1);
  const [available, setAvailable] = useState('')
  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { addItemToCart } = useContext(CartContext);
  const navigate = useNavigate();
  // console.log('object' , product);

  useEffect(() => {
    setAvailable(product?.availableProduct)
  }, [product?.availableProduct])
  // console.log(available)


  const addToCart = (product) => {
    let currentItem = {
      walletAddress: user?.walletAddress,
      productId: product?._id,
      price: product?.price,
      product_images: product?.product_images,
      productName: product?.productName,
      count: quantity
    };
    // console.log(currentItem)
    addItemToCart(currentItem);
    navigate('/cart')
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Modal dialogClassName="product_modal" show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="align-items-center">
              <Col xs={12} md={6}>

                <div className="shop-products-image text-center">
                  <Link to={`/shop/products-details/${product?._id}`}>
                    {product?.images?.slice(0, 1)?.map((img) => (
                      <img src={img} style={{ width: "300px" }} alt="" />
                    ))}
                  </Link>
                  <div className="tag">{product.productName}</div>
                </div>

              </Col>
              <Col xs={6} md={6}>
                <Modal.Title>{product.productName}</Modal.Title>
                <div className="product-review">
                  <div className="rating">
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>

                  </div>
                </div>

                <div className="price">
                  <span className="old-price">$150.00</span>
                  <span className="new-price">${product.price}</span>
                </div>


                <ul className="products-info">
                  <li>
                    <span>Availability:</span>{" "}
                    {product.availableProduct > 0
                      ? `In stock (${product.availableProduct})`
                      : "Stock finished"}
                  </li>
                </ul>

                <div className="product-quantities">
                  <span>Quantities:</span>

                  <div className="input-counter">
                    <span
                      className="minus-btn"
                      onClick={() =>
                        quantity >= 1
                          ? setQuantity(quantity - 1)
                          : setQuantity(1)
                      }
                    >
                      <i className="bx bx-minus"></i>
                    </span>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      max={product.availableProduct}
                    />
                    <span
                      className="plus-btn"
                      onClick={() =>
                        quantity >= available
                          ? setQuantity(available)
                          : setQuantity(quantity + 1)
                      }
                    >
                      <i className="bx bx-plus"></i>
                    </span>
                  </div>
                </div>

                <div className="product-add-to-cart">
                  {user?.walletAddress ? (
                    <button
                      type="submit"
                      className="default-btn"
                      onClick={() => addToCart(product)}
                    >
                      <i className="flaticon-shopping-cart"></i>
                      Add to cart
                      <span></span>
                    </button>
                  ) : (
                    <button
                      onClick={() => openWalletModal()}
                      className="default-btn"
                    >
                      <i className="flaticon-shopping-cart"></i>
                      {" "} Add to cart
                      <span></span>
                    </button>
                  )}
                </div>

              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </div>
  );
}

export default QuickView;
