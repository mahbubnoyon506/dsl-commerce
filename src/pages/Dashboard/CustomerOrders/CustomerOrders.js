import { Card, Col, Row, Table } from "react-bootstrap";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./CustomerOrders.css";
import { GrView } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { allOrders } from "./orderData";
import { useEffect, useState } from "react";
import Pagination from "../../../Components/Pagination/Pagination";

const CustomerOrders = () => {
  const [allOrder, setAllOrder] = useState(allOrders);
  // const [orderStatus, setOrderStatus] = useState(allOrders.status);
  const [orderStatus, setOrderStatus] = useState("");

  //****************************** Pagination Start ******************************/
  const { orderPerPage } = useParams();
  const navigate = useNavigate();
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceOrders, setSliceOrders] = useState([]);
  const [sliceOrderss] = useState([]);
  // console.log(sliceProducts)

  useEffect(() => {
    const lastPage = Math.ceil(allOrder?.length / show);
    setLastPage(lastPage);
  }, [allOrder, show]);

  useEffect(() => {
    if (orderPerPage) {
      const page = parseInt(orderPerPage);
      const getSlicingCategory = allOrder.slice((page - 1) * show, page * show);
      setSliceOrders([...getSlicingCategory]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = allOrder.slice(0, show);
      setSliceOrders([...getSlicingProduct]);
    }
  }, [allOrder, show, orderPerPage]);

  const pageHandle = (jump) => {
    navigate(`/admin/orders/${jump}`);
    setPage(parseInt(jump));
  };
  //****************************** Pagination End ******************************/

  const handleOrderDelete = (id) => {
    console.log("Delete Order", id);
  };
  useEffect(() => {
    console.log("allOrders");
    console.log(allOrders);
  }, []);
  return (
    <div className="productBody">
      <h5 className="text-white-50 text-start pb-2 text-uppercase">ORDERS</h5>
      <Row className="g-5">
        <Col className="py-2">
          <Card className="customerCard">
            <Card.Body>
              <Card.Text className="dashboardTxt">
                <div className="d-flex flex-column flex-lg-row justify-content-evenly gap-3">
                  <input
                    type="number"
                    placeholder="Search By Name"
                    className="py-2 pl-2 w-100 w-lg-25 border border-white rounded "
                  />
                  <select
                    className="py-2 pl-2 border border-white rounded w-100 w-lg-25"
                    style={{ cursor: "pointer", borderRadius: "5px" }}
                  >
                    <option>Status</option>
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="processing">Processing</option>
                  </select>
                  <select
                    className="py-2 pl-2 border border-white rounded w-100 w-lg-25"
                    style={{ cursor: "pointer", borderRadius: "5px" }}
                  >
                    <option>Orders Limits</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                  </select>
                  <button className="w-100 w-lg-25 rounded btn btn-success fs-5">
                    Download All Orders{" "}
                    <AiOutlineCloudDownload className="fs-3" />
                  </button>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="productCard py-2">
        <div className="tableNormal ">
          <Table className="text-white-50 productDataTable ">
            <thead>
              <tr>
                <th className="text-center">Order Time</th>
                {/* <th className="text-center">Product Name</th> */}
                <th className="text-center">Phone</th>
                <th className="text-center ">Method</th>
                <th className="text-center ">Amount</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
                <th className="text-center">View / Del</th>
              </tr>
            </thead>
            <tbody>
              {sliceOrderss?.map((order, index) => (
                <tr className="tableRow" key={order?._id}>
                  <td className="text-center text-transparent">
                    {order.orderTime}
                  </td>
                  {/* <td className="text-center text-capitalize">
                    {order.productName}
                  </td> */}
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
                      {/* Pending */}
                      {/* {orderStatus} */}
                      {order?.status}
                    </button>
                  </td>
                  <td className="text-center">
                    <select
                      className="bg-white-50"
                      style={{ cursor: "pointer", borderRadius: "5px" }}
                      onChange={(e) => {
                        const temp = [...allOrder];
                        temp[index].status = e.target.value;
                        setAllOrder(temp);
                        // setOrderStatus(e.target.value)
                      }}
                    >
                      <option
                        value="pending"
                        selected={order?.status === "pending"}
                      >
                        Pending
                      </option>
                      <option
                        value="delivered"
                        selected={order?.status === "delivered"}
                      >
                        Delivered
                      </option>
                      <option
                        value="processing"
                        selected={order?.status === "processing"}
                      >
                        Processing
                      </option>
                    </select>
                  </td>
                  <td className="action d-flex justify-content-center">
                    <div className="actionDiv text-center">
                      <Link to={`/admin/orderDetail/${order?._id}`}>
                        <button className="editBtn">
                          <GrView />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleOrderDelete(order?._id)}
                        className="deleteBtn text-white "
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/*********************************** Pagination  Start***********************************/}
      <div className="">
        {sliceOrders?.length ? (
          <Pagination
            lastPage={lastPage}
            page={getPage}
            pageHandle={pageHandle}
          />
        ) : (
          <></>
        )}
      </div>

      {/*********************************** Pagination  End *************************************/}
    </div>
  );
};

export default CustomerOrders;
