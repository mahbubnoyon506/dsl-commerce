import PageTitle from "../../components/Common/PageTitle";
import CartArea from "../../components/Shop/CartArea";

function Cart() {
  return (
    <div className="cart-wrapper">
      <PageTitle title="Cart" />
      <CartArea />
    </div>
  );
}

export default Cart;
