import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { Button } from "@mui/material";
import PageTitle from "../../Components/Common/PageTitle";
import Preloader from "../../Components/Common/Preloader";

function News() {
  const [data, setData] = useState([]);
  const [isShowMore, setisShowMore] = useState(false);
  // const [isLoading, setisLoading] = useState(true);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setisLoading(false);
  //   }, 1000);
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    // get data from api
    const getData = async () => {
      await axios
        .get(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@dslsingapore"
        )
        .then((res) => {
          // console.log(res.data)
          setData(res.data.items);
        });
    };
    window.scrollTo(0, 0);
    getData();
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="news-wrapper">
      <PageTitle title="News" />
      {/* {isLoading === true ? (
        <Preloader />
      ) : ( */}
      <div className="container">
        <div className="row ">
          <div className="col-md-8">
            {data.length > 0 && (
              <div>
                {parse(data[0].description)}
                {!isShowMore && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      console.log("click");
                      setisShowMore(true);
                    }}
                  >
                    Show more
                  </Button>
                )}
              </div>
            )}

            {isShowMore &&
              data.length > 0 &&
              data.slice(1).map((item, index) => {
                return (
                  <div className="mt-5" key={index}>
                    {parse(item.description)}
                  </div>
                );
              })}
            <div>
              {isShowMore && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    console.log("click");
                    setisShowMore(false);
                  }}
                >
                  Show less
                </Button>
              )}
            </div>
          </div>

          <div className="col-md-4 mt-5">
            <h4>RECENT NEWS</h4>
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div className="mt-5" key={index}>
                    <div className="row">
                      {/* <div className="col-md-3">
                        <img src={item.thumbnail} style={{ width: 80 }} />
                      </div> */}
                      <div className="col-md-12">
                        <p className="mb-2" style={{ fontSize: 14 }}>
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default News;
