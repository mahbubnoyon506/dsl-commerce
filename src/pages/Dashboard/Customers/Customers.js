import React, { useState } from "react";
import { Button, Typography, Modal, Box } from "@mui/material";
import Table from "react-bootstrap/Table";
import Search from "../../../Components/Widgets/Search";
import { Link, useNavigate } from "react-router-dom";
// import { Link, useNavigate, useParams } from 'react-router-dom';

const FilterableTable = require("react-filterable-table");

const Customers = ({ page, pages, keyword }) => {
  const [tableary, setTableary] = useState([
    {
      USER_ID: "7C96",
      WALLET_ADDRESS: "34jdhajhWIIWEFI86klj",
      EMAIL: "abc@gmail.com",
      PHONE: "01555543333",
    },
    {
      USER_ID: "7c56",
      WALLET_ADDRESS: "H1EIAN@di343kniKHUIlai947",
      EMAIL: "abc.xyz@gmail.com",
      PHONE: "01235545423",
    },
    {
      USER_ID: "FCCB",
      WALLET_ADDRESS: "45YTEklhaUYEmoni097kumar",
      EMAIL: "abc@gmail.com",
      PHONE: "01555543333",
    },
    {
      USER_ID: "7C96",
      WALLET_ADDRESS: "34jdhajhWIIWEFI86klj",
      EMAIL: "abc@gmail.com",
      PHONE: "01555543333",
    },
  ]);
  const navigate = useNavigate();

  const search = (e, searchText) => {
    e.preventDefault();
    const newary = [...tableary];
    console.log(searchText);
    console.log("search");
    setTableary(
      newary.filter(
        (item) =>
          item.EMAIL.includes(searchText) ||
          item.PHONE.includes(searchText) ||
          item.USER_ID.includes(searchText) ||
          item.WALLET_ADDRESS.includes(searchText)
      )
    );
  };

  return (
    <>
      {/* <div className="d-flex justify-content-center align-items-center">
        <h2 className="text-white">Customers </h2>
      </div> */}
      <h5 className="text-white text-start text-uppercase pb-1">CUSTOMERS</h5>

      <Search submit={search} />

      <div className="productCard py-2">
        <div className="tableNormal ">
          <Table className="text-white productDataTable ">
            <thead>
              <tr>
                <th className="text-left d-md-block d-none">USER ID</th>
                <th className="text-left productHidden">WALLET ADDRESS</th>
                <th className="text-left ">EMAIL</th>
                <th className="text-left productHidden">PHONE</th>
                <th className="text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {tableary?.map((tabledata) => (
                <tr className="tableRow" key={tabledata?.USER_ID}>
                  <td className="text-left text-capitalize">
                    {tabledata.USER_ID}
                  </td>
                  <td className="text-left productHidden">
                    {tabledata.WALLET_ADDRESS}
                  </td>
                  <td className="text-left text-capitalize ">
                    {tabledata.EMAIL}
                  </td>
                  <td className="text-left text-capitalize productHidden">
                    {tabledata.PHONE}
                  </td>
                  <td className="action">
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
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="row">
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
            {/* <span className="page-numbers">
              <a href="#" className="page-numbers">
                2
              </a>
            </span>
            <a href="#" className="page-numbers">
              3
            </a>
            <a href="#" className="page-numbers">
              4
            </a> */}
            <a href="#" className="next page-numbers">
              <i className="flaticon-right-arrow"></i>
            </a>
          </div>
        </div>
      </div>

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
