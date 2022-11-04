import React, { useState, useEffect } from "react";
import Preloader from "../Common/Preloader";

function Search(props) {
  const [searchText, setSearchText] = useState();
  // const [isLoading, setisLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setisLoading(false);
  //   }, 1000);
  // }, []);

  return (
    <>
      {/* <div className="row text-center text-light pt-4" alignSelf="stretch">
        <div className="col-md-12">
          <form
            className="search-form"
            onSubmit={(e) => props.submit(e, searchText)}
          >
            <label>
              <input
                type="search"
                className="search-field p-2"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </label>
            <button type="submit" className="p-2">
              <i className="bx bx-search-alt"></i>
            </button>
          </form>
        </div>
      </div> */}
      <div className="d-flex flex-column align-items-center">
        <form
          className="search-form w-100"
          onSubmit={(e) => props.submit(e, searchText)}
        >
          <div className="input-group mb-3 ">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {/* <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Button
          </button> */}
            <button type="submit" className="p-2">
              <i className="bx bx-search-alt "></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Search;
