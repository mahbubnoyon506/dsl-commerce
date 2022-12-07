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

  const [myOrders, setMyOrders] = useState([])
  const { user } = useContext(DSLCommerceContext)
  // console.log(user?.walletAddress);

  useEffect(() => {
    fetch(`https://backend.dslcommerce.com/api/order/data/${user?.walletAddress}`)
      .then(res => res.json())
      .then(data => setMyOrders(data.result))
  }, [user?.walletAddress])

  console.log(myOrders);

  return (
    <div>
      <PageTitle title="My Orders" />
      {/* <OrderArea /> */}

      <div className="container">
        <div className="wishlist-table table-responsive">

          {myOrders.length ? (
            <>
              {myOrders?.map((order, index) => (
                <table className="table table-bordered" key={index}>

                  <tbody>
                    <tr>
                      <td className="">Date</td>
                      <td className="">Order Id</td>
                      <td className="">Amount</td>
                      <td className="">Payment Method</td>
                      <td className="">Status</td>
                      <td className="product-btn">
                        <span className="default-btn">
                          <TbListDetails className="me-2" />
                          Details
                        </span>
                      </td>
                    </tr>

                  </tbody>

                  <tbody>
                    <tr>
                      <td className="">{order?.date.slice(0, 10)}</td>
                      <td className="">{order?.orderId}</td>
                      <td className="">{order?.amount}</td>
                      <td className="">{order?.paymentMethod}</td>
                      {order?.pendingStatus == false ? (
                        <td className="">Pending</td>
                      ) : (
                        <td className="">Delivered</td>
                      )}
                      <td className="product-btn">
                        <span className="default-btn">
                          <TbListDetails className="me-2" />
                          Details
                        </span>
                      </td>
                    </tr>

                  </tbody>
                </table>
              ))}
            </>
          ) : (
            <div>
              <h2 className="text-center py-5 font-bold"> No Order Found</h2>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default Orders;
