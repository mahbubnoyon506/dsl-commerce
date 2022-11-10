import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { allOrders } from "../CustomerOrders/orderData";

const RecentOrders = () => {
  // const [allOrder, setAllOrder] = useState([]);
  const [allOrder, setAllOrder] = useState(allOrders);
  const [recentNum, setRecentNum] = useState(10);

  // const allOrder = [
  //   {_id:1 , orderTime: '3-10-2022', productName:'Hp Core' , phone : '1233333' , paymentMethod  : 'paypal' , orderAmount : 333},
  //   {_id:2 , orderTime: '6-10-2022', productName:'Camera' , phone : '43443' , paymentMethod  : 'stripe' , orderAmount : 3211},
  //   {_id:3 , orderTime: '22-9-2022', productName:'Monitor' , phone : '123242' , paymentMethod  : 'card' , orderAmount : 3211},
  //   {_id:4 , orderTime: '13-7-2022', productName:'Camera' , phone : '49695' , paymentMethod  : 'stripe' , orderAmount : 3211},
  //   {_id:5 , orderTime: '7-1-2022', productName:'Monitor' , phone : '8978' , paymentMethod  : 'paypal' , orderAmount : 3211},
  //   {_id:6 , orderTime: '7-1-2022', productName:'Monitor' , phone : '8978' , paymentMethod  : 'paypal' , orderAmount : 3211},
  //   {_id:7 , orderTime: '7-1-2022', productName:'Monitor' , phone : '8978' , paymentMethod  : 'paypal' , orderAmount : 3211},
  //   {_id:8 , orderTime: '7-1-2022', productName:'Monitor' , phone : '8978' , paymentMethod  : 'paypal' , orderAmount : 3211}
  // ]

  return (
    <div className="productBody">
      <h5 className="text-white-50 text-start pt-5 pb-3">Recent Orders</h5>
      <div className="productCard py-2">
        <div className="tableNormal ">
          <Table className="text-white-50 productDataTable ">
            <thead>
              <tr>
                <th className="text-center">Order Time</th>
                <th className="text-center">Product Name</th>
                <th className="text-center">Phone</th>
                <th className="text-center ">Payment Method</th>
                <th className="text-center ">Order Amount</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrder?.slice(0, recentNum).map((order) => (
                <tr className="tableRow" key={order?._id}>
                  <td className="text-center text-transparent">
                    {order.orderTime}
                  </td>
                  <td className="text-center text-capitalize">
                    {order.productName}
                  </td>
                  <td className="text-center ">{order?.phone}</td>
                  <td className="text-center text-capitalize ">
                    {order?.paymentMethod}
                  </td>
                  <td className="text-center text-capitalize ">
                    ${order?.orderAmount}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm bg-danger text-white"
                      style={{ borderRadius: "20px" }}
                    >
                      {order?.status}
                      {/* pending */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
