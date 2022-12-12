import React, { useEffect, useState } from "react";
import { Button, Typography, Modal, Box } from "@mui/material";
import Table from "react-bootstrap/Table";
import Search from "../../../Components/Widgets/Search";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../../Components/Pagination/Pagination";
import { AllCustomers } from "./customerData";

const FilterableTable = require("react-filterable-table");

const Customers = () => {
  const [allCustomers, setAllCustomers] = useState(AllCustomers);

  const navigate = useNavigate();

  const search = (e, searchText) => {
    e.preventDefault();
    const newary = [...allCustomers];
    console.log(searchText);
    console.log("search");
    setAllCustomers(
      newary.filter(
        (item) =>
          item.EMAIL.includes(searchText) ||
          item.PHONE.includes(searchText) ||
          item.USER_ID.includes(searchText) ||
          item.WALLET_ADDRESS.includes(searchText)
      )
    );
  };

  //****************************** Pagination Start ******************************/
  const { customerPerPage } = useParams();
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(5);
  const [lastPage, setLastPage] = useState(0);
  const [sliceOrders, setSliceOrders] = useState([]);
  // console.log(sliceProducts)

  useEffect(() => {
    const lastPage = Math.ceil(allCustomers?.length / show);
    setLastPage(lastPage);
  }, [allCustomers, show]);

  useEffect(() => {
    if (customerPerPage) {
      const page = parseInt(customerPerPage);
      const getSlicingCategory = allCustomers.slice(
        (page - 1) * show,
        page * show
      );
      console.log("getSlicingCategory");
      console.log(getSlicingCategory);
      setSliceOrders([...getSlicingCategory]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = allCustomers.slice(0, show);
      setSliceOrders([...getSlicingProduct]);
    }
  }, [allCustomers, show, customerPerPage]);

  const pageHandle = (jump) => {
    navigate(`/admin/customers/${jump}`);
    setPage(parseInt(jump));
  };
  //****************************** Pagination End ******************************/

  return (
    <>
      <h5 className="text-white text-start text-uppercase pb-1">CUSTOMERS</h5>

      <Search submit={search} />

      <div className="productCard py-2">
        <div className="tableNormal ">
          <Table responsive="sm" className="text-white productDataTable ">
            <thead>
              <tr>
                {/* <th className="text-left d-md-block d-none">USER ID</th> */}
                <th className="text-left productHidden">USER ID</th>
                <th className="text-left productHidden">WALLET ADDRESS</th>
                <th className="text-left ">EMAIL</th>
                <th className="text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {/* {sliceOrders?.map((sliceOrder) => (
                <tr className="tableRow" key={sliceOrder?.USER_ID}>
                  <td className="text-left text-capitalize productHidden">
                    {sliceOrder.USER_ID}
                  </td>
                  <td className="text-left productHidden">
                    {sliceOrder.WALLET_ADDRESS}
                  </td>
                  <td className="text-left text-capitalize productHidden">
                    {sliceOrder.PHONE}
                  </td>
                  <td className="text-left text-capitalize ">
                    {sliceOrder.EMAIL}
                  </td>
                  <td className="action col-sm-12 d-flex">
                    <div className="actionDiv text-left">
                      <button
                        className="viewBtn"
                        onClick={() => navigate("/admin/customers-update")}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="deleteBtn">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))} */}
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

      {/* <div className="row">
        <div className="col-lg-6 col-md-6">
          <p>Showing 4 of 4</p>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="pagination-area float-end">
            <a href="#" className="prev page-numbers">
              <i className="flaticon-left-arrow"></i>
            </a>
            <a href="#" className="page-numbers current">
              1
            </a>
            <a href="#" className="next page-numbers">
              <i className="flaticon-right-arrow"></i>
            </a>
          </div>
        </div>
      </div> */}

      {/* <div className="pagination-area">
        <Link to={`/page/${page - 1}`} className="prev page-numbers">
          <i className="flaticon-left-arrow"></i>
        </Link>

        {[...Array(pages).keys()].map((x) => (
          <div key={x + 1}>
            <Link
              to={
                keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
              }
            >
              <span
                className={
                  x + 1 === page ? "current page-numbers" : "page-numbers"
                }
              >
                {x + 1}
              </span>
            </Link>
          </div>
        ))}

        <Link to={`/page/${page + 1}`} className="next page-numbers">
          <i className="flaticon-right-arrow"></i>
        </Link>
      </div> */}
    </>
  );
};

export default Customers;
