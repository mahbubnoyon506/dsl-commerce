import { useState,  useContext } from "react";
import {  useSelector } from "react-redux";
import PageTitle from "../../Components/Common/PageTitle";
import Partner from "../../Components/Common/Partner";
import ShopArea from "../../Components/Shop/ShopArea";
import QuickView from "../../Components/Products/QuickView";
import { CartContext } from "../../contexts/cart-context";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";

function Shop({ page = 1, query = undefined, keyword = undefined }) {
  const [product, setProduct] = useState({});

  const { products } = useSelector((state) => state.productReducer);
  const [isOpen, setIsOpen] = useState(false);
  const { addItemToCart } = useContext(CartContext);
  const { user } = useContext(DSLCommerceContext);

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
      {/* <Partner paddingclassName="ptb-50" /> */}
      <QuickView isOpen={isOpen} closeModal={closeModal} product={product} />
    </div>
  );
}

export default Shop;
