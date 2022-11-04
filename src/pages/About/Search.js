import React, { useState, useEffect } from "react";
import Preloader from "../../components/Common/Preloader";
import SearchArea from "../../components/About/SearchArea";
import PageTitle from "../../components/Common/PageTitle";
import Partner from "../../components/Common/Partner";

function Search() {
  // const [isLoading, setisLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setisLoading(false);
  //   }, 1000);
  // }, []);
  return (
    <>
      {/* {isLoading === true ? (
        <Preloader />
      ) : ( */}
      <div className="search-wrapper">
        <PageTitle title="Search" />
        <SearchArea />
        <Partner paddingclassName=" ptb-50" />
      </div>
    </>
  );
}

export default Search;
