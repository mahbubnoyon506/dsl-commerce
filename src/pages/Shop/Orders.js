import PageTitle from "../../Components/Common/PageTitle";
import OrderArea from "../../Components/Shop/OrderArea";
import cart1 from "../../assets/img/collection/collection-1.png";
import cart2 from "../../assets/img/collection/collection-1.png";
import cart3 from "../../assets/img/collection/collection-2.png";
import cart4 from "../../assets/img/collection/collection-1.png";
import cart5 from "../../assets/img/collection/collection-2.png";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";

const Orders = () => {

  const [myOrders , setMyOrders] = useState([])
  const {user} = useContext(DSLCommerceContext)
  // console.log(user?.walletAddress);
  const [allProduct , setAllProduct] = useState([])

  useEffect(() => {
    fetch(`https://backend.dslcommerce.com/api/order/data/${user?.walletAddress}`)
    .then(res => res.json())
    .then(data => setMyOrders( data))
  },[user?.walletAddress])


  // console.log(myOrders)
  useEffect(() => {
    fetch(`https://backend.dslcommerce.com/api/product/`)
      .then((res) => res.json())
      .then((result) => {
        setAllProduct(result);
      });
  }, []);

  console.log(allProduct);
  console.log(myOrders);

  return (
    <div>
      <PageTitle title="My Orders" />
      {/* <OrderArea /> */}

      <div className="container">
        <div className="wishlist-table table-responsive">

        {myOrders?.orderitems?.map((item) => console.log(item))}
          <table className="table table-bordered">
            
            <tbody>
              <tr>
                <td className="product-remove">
                  <a href="#" className="remove">
                    <i className="bx bx-x"></i>
                  </a>
                </td>

                <td className="product-thumbnail">
                  {/* <a href="#">
                    <img src={cart1} alt="item" />
                  </a> */}
                  {/* {
                    allProduct.find((p) => p._id === item?._id)
                  } */}

                </td>

                <td className="product-name">
                  <Link to="/products-details/60447200e3108c0a9086757c">Bluetooth Headphone</Link>
                </td>

                <td className="product-price">
                  <span className="unit-amount">$1.00</span>
                </td>

                {/* <td className="product-stock">
                  <span className="stock">In Stock</span>
                </td> */}

                <td className="product-btn">
                  <a href="#" className="default-btn">
                    <TbListDetails className="me-2" />
                    Details
                  </a>
                </td>
              </tr>

              
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Orders;
