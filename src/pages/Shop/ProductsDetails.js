import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NewArrivals from "../../components/Common/NewArrivals";
import PageTitle from "../../components/Common/PageTitle";
import Support from "../../components/Common/Support";
import QuickView from "../../components/Products/QuickView";
import ProductsDetailsArea from "../../components/Shop/ProductsDetailsArea";
import { CartContext } from "../../contexts/cart-context";

function ProductsDetails() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // const [isLoading, setisLoading] = useState(true);
  const context = useContext(CartContext);

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
    console.log("details");

    let currentItem = {
      _id: product._id,
      name: product.productName,
      price: product.price,
      type: product.type,
      total_in_stock: product.total_in_stock,
      image_public_id: product.image_public_id,
      quantity,
    };
    context.addItemToCart(currentItem);
  };

  return (
    <>
      <div className="products-details-wrapper">
        <PageTitle title="Products Details" />
        <ProductsDetailsArea />
        <NewArrivals
          paddingclassName=" pt-50 pb-20"
          title="Related Products"
          addToCart={addToCart}
          showQuickView={showQuickView}
          products={products}
        />
        <Support />
        <QuickView isOpen={isOpen} closeModal={closeModal} product={product} />
      </div>
    </>
  );
}

export default ProductsDetails;
