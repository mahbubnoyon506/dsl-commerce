import React, { useState, useEffect } from "react";
import Preloader from "../Common/Preloader";

function Search({ handleSearch }) {
  const [searchText, setSearchText] = useState();
  // const [isLoading, setisLoading] = useState(true);

  console.log(handleSearch)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setisLoading(false);
  //   }, 1000);
  // }, []);

  return (
    <>

      <div className="d-flex flex-column align-items-center">
        <div
          className="search-form w-100"

        >


          {/****************************  Emtiaz Code  ******************/}
          <div class="input-group mb-3">
            <input
              type="search"
              class="form-control"
              placeholder="Search..."
              // value={searchText}
              onChange={(e) => handleSearch(e)}
              aria-label="Search..."
              aria-describedby="basic-addon2"
            />
            <button type="submit" class="input-group-text" id="basic-addon2">Search</button>
          </div>
          {/****************************  Emtiaz Code  ******************/}
        </div>
      </div>
    </>
  );
}

export default Search;
