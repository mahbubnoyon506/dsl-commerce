import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/Common/PageTitle";
import Partner from "../../components/Common/Partner";
import ShopArea from "../../components/Shop/ShopArea";
import QuickView from "../../components/Products/QuickView";
import { CartContext } from "../../contexts/cart-context";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";

function Shop({ page = 1, query = undefined, keyword = undefined }) {
  const [product, setProduct] = useState({});

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const [isOpen, setIsOpen] = useState(false);
  const { addItemToCart } = useContext(CartContext);
  const { user } = useContext(DSLCommerceContext);
  const navigate = useNavigate();

  const showQuickView = (product) => {
    setIsOpen(true);
    setProduct(product);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProduct({});
  };

  const addToCart = (product) => {
    // console.log("shop" , product);
    let currentItem = {
      walletAddress: user?.walletAddress,
      productId: product?._id,
      price: product?.price,
      product_images: product?.product_images,
      productName: product?.productName,
      count: 1,
    };
    // console.log(currentItem);

    addItemToCart(currentItem);
    // navigate("/cart");
  };

  return (
    <div className="shop-wrapper">
      <PageTitle title="Shop" />
      <ShopArea
        products={products}
        addToCart={addToCart}
        keyword={keyword ? keyword : ""}
        showQuickView={showQuickView}
        page={page}
        query={query}
      />
      <Partner paddingclassName="ptb-50" />
      <QuickView isOpen={isOpen} closeModal={closeModal} product={product} />
    </div>
  );
}

export default Shop;
