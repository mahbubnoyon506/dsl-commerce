import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Preloader from "../Common/Preloader";
import Pagination from "../Pagination/Pagination";
import { DSLCommerceContext } from "../../contexts/DSLCommerceContext";
import axios from "axios";
import swal from "sweetalert";
import { WishlistContext } from "../../contexts/wishlist-context";

function ShopArea({
  addToCart,
  showQuickView,
  page = 1,
  query = undefined,
  keyword = undefined,
}) {
  const [categoryWiseProduct, setCategoryWiseProduct] = useState([]);
  const navigate = useNavigate();
  const [allProduct, setAllProduct] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  //SLICE PRODUCT AND SHOW PER PAGE ONLY
  const [sliceProducts, setSliceProducts] = useState([]);
  const [sortP, setSortP] = useState('default')
  const [defaultProduct, setDefaultProduct] = useState([])

  const [isLoading, setisLoading] = useState(true);

  const { user, openWalletModal } = useContext(DSLCommerceContext);
  const { addProductToWishlist } = useContext(WishlistContext);


  // const createWishlist = async (product) => {
  //   console.log("create wishlist shop");
  //   let currentItem = {
  //     walletAddress: user.walletAddress,
  //     productId: product._id,
  //   };
  //   console.log(currentItem);

  //   await axios
  //     .post(`https://backend.dslcommerce.com/api/wishlist/create`, {
  //       walletAddress: user.walletAddress,
  //       productId: product._id,
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         swal({
  //           title: "Success",
  //           // text: `${res.data.message}`,
  //           text: "Successfully added to wishlist",
  //           icon: "success",
  //           button: "OK!",
  //           className: "modal_class_success",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       // openWalletModal()
  //       swal({
  //         title: "Attention",
  //         text: `${err.response.data.message}`,
  //         icon: "warning",
  //         button: "OK!",
  //         className: "modal_class_success",
  //       });
  //     });
  // };

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
    window.scrollTo(0, 0);
  }, []);

  //FILTERING PRODUCT
  useEffect(() => {
    if (keyword && !query) {
      if (keyword === "all") {
        setCategoryWiseProduct(allProduct);
      } else {
        const filterByCategory = allProduct.filter(
          (product) => keyword == product.category
        );
        setCategoryWiseProduct(filterByCategory);
      }
    } else if (query) {
      const filterByCategory = allProduct.filter((product) => {
        const catKey = keyword == "all" ? true : product.category == keyword;

        const search = product.productName
          .toLowerCase()
          ?.includes(query.toLowerCase());

        return catKey && search;
      });
      setSearchProducts(filterByCategory);
      setCategoryWiseProduct(filterByCategory);
    } else {
      setCategoryWiseProduct(allProduct);
    }
  }, [keyword, allProduct, query]);

  useEffect(() => {
    fetch(`https://backend.dslcommerce.com/api/product/`)
      .then((res) => res.json())
      .then((result) => {
        setAllProduct(result);
      });
  }, []);




  const sortHandle = (e) => {
    const method = e?.target?.value || e;
    setSortP(method)
    console.log(method);

    // if (method == 'low') {
    //   axios.get(`https://backend.dslcommerce.com/api/product/filter1/`)
    //     .then(res => setCategoryWiseProduct(res.data))
    //   console.log('first')
    //   return;
    // }
    // else if (method == 'high') {
    //   axios.get(`https://backend.dslcommerce.com/api/product/filter/`)
    //     .then(res => {
    //       const arraySort = query ? searchProducts : res.data;
    //       const filterH = arraySort.sort((a, b) => {
    //         return Number(b.price) - Number(a.price);
    //       });
    //       setCategoryWiseProduct([...filterH])
    //     })
    //   return;
    // }
    // else {
    //   axios.get(`https://backend.dslcommerce.com/api/product/`)
    //     .then(res => setCategoryWiseProduct(res.data))
    //   return;
    // }
    // const arraySort = query ? searchProducts : allProduct; 
    const arraySort = (!query && keyword) ? categoryWiseProduct : (query ? searchProducts : allProduct)
    switch (method) {
      case "default":
        // console.log(defaultProduct);
        fetch(`https://backend.dslcommerce.com/api/product/`)
          .then((res) => res.json())
          .then((result) => {
            if (keyword && !query) {
              if (keyword === "all") {
                setCategoryWiseProduct(result);
                setDefaultProduct(result);
              } else {
                const filterByCategory = result.filter(
                  (product) => keyword == product.category
                );
                setCategoryWiseProduct(filterByCategory);
                setDefaultProduct(result);
              }
            } else if (query) {
              const filterByCategory = result.filter((product) => {
                const catKey = keyword == "all" ? true : product.category == keyword;

                const search = product.productName
                  .toLowerCase()
                  ?.includes(query.toLowerCase());

                return catKey && search;
              });
              setSearchProducts(filterByCategory);
              setCategoryWiseProduct(filterByCategory);
              setDefaultProduct(result);
            } else {
              setCategoryWiseProduct(result);
              setDefaultProduct(result);
            }
          });
        // console.log(allProduct)
        break;
      case "low":
        const filter = arraySort.sort((a, b) => {
          return Number(a.price) - Number(b.price);
        });
        setCategoryWiseProduct([...filter]);
        break;
      case "high":
        const filterH = arraySort.sort((a, b) => {
          return Number(b.price) - Number(a.price);
        });
        setCategoryWiseProduct([...filterH]);
        break;
      default:
        break;
    }
  };

  // Pagination
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(20);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    if (page) {
      setPage(Number(page));
    } else {
      setPage(1);
    }
  }, [page]);

  useEffect(() => {
    const lastPage = Math.ceil(categoryWiseProduct?.length / show);
    setLastPage(lastPage);
  }, [categoryWiseProduct, show]);

  const [locationState, setLocation] = useState("");
  const locationGet = window.location.pathname.split("/");

  let key = locationGet.length;
  useEffect(() => {
    if (key == 8) {
      const getWithoutPageCat = locationGet.slice(0, -2).join("/");
      setLocation(getWithoutPageCat + "/");
    }
    if (key == 7) {
      const getWithoutPageCat = locationGet.slice(0, -1).join("/");
      setLocation(getWithoutPageCat + "/");
    }
    if (key == 7) {
      const getWithoutPageCat = locationGet.slice(0, -1).join("/");
      setLocation(getWithoutPageCat + "/");
    } else if (key == 6) {
      setLocation(locationGet.slice(0, -2).join("/") + "/");
    } else if (key == 5) {
      setLocation(locationGet.slice(0, -1).join("/") + "/");
    } else if (key == 4) {
      setLocation(locationGet.slice(0, -1).join("/") + "/");
    } else if (key == 3) {
      setLocation(locationGet.join("/") + "page/");
    } else if ((key = 2)) {
      setLocation(locationGet.join("/") + "/page/");
    }
  }, [locationGet]);

  useEffect(() => {
    const getSlicingProduct = categoryWiseProduct.slice(
      (page - 1) * show,
      page * show
    );
    setSliceProducts([...getSlicingProduct]);
  }, [categoryWiseProduct, page, show]);

  const pageHandle = (jump) => {
    if (!query && key === 6) {
      navigate(`${locationState}page/${jump}`);
    } else {
      navigate(`${locationState}${jump}`);
    }
    sortHandle(sortP)
    setPage(parseInt(jump));
  };

  return (
    <section className="shop-area bg-ffffff pt-50 pb-50">
      <div className="container">
        <div className="products-filter-options">
          <div className="row align-items-center">
            <div className="col-lg-9 col-md-9">
              <p>Total Product {sliceProducts?.length}</p>
            </div>

            <div className="col-lg-3 col-md-3">
              <div className="products-ordering-list py-1">
                <select className="form-control" onChange={sortHandle}>
                  <option value="default" className="py-3">
                    Default sorting
                  </option>
                  <option value="low">Sort by price: low to high</option>
                  <option value="high">Sort by price: high to low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {isLoading === true ? (
            <Preloader />
          ) : (
            <>
              {sliceProducts?.length ?
                <>
                  {sliceProducts.map((product) => (
                    <div className="col-lg-3 col-sm-6" key={product?._id}>
                      <div className="single-shop-products">
                        <div className="shop-products-image">
                          <Link
                            to={`/shop/products-details/${product?._id}`}
                            onClick={() => {
                              window.scrollTo(0, 0);
                            }}
                          >
                            <img
                              src={product?.product_images}
                              style={{ width: "300px", height: "270px" }}
                              alt=""
                            />
                          </Link>
                          <div className="tag">New</div>
                          <ul className="shop-action">
                            <li>
                              {user?.walletAddress ? (
                                <span
                                  onClick={() => addToCart(product)}
                                  className="addtocart-icon-wrap"
                                >
                                  <i className="flaticon-shopping-cart"></i>
                                </span>
                              ) : (
                                <span
                                  onClick={() => openWalletModal()}
                                  className="addtocart-icon-wrap"
                                >
                                  <i className="flaticon-shopping-cart"></i>
                                </span>
                              )}
                            </li>
                            <li>
                              {user?.walletAddress ? (
                                <span
                                  className="addtocart-icon-wrap"
                                  onClick={() => addProductToWishlist(product)}
                                >
                                  <i className="flaticon-heart"></i>
                                </span>
                              ) : (
                                <span
                                  onClick={() => openWalletModal()}
                                  className="addtocart-icon-wrap"
                                >
                                  <i className="flaticon-heart"></i>
                                </span>
                              )}
                            </li>
                            <li>
                              <span
                                data-toggle="modal"
                                data-target="#productsQuickView"
                                className="quick-icon"
                                onClick={() => showQuickView(product)}
                              >
                                <i className="flaticon-view"></i>
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="shop-products-content">
                          <h3>
                            <Link
                              to={`/products-details/${product?._id}`}
                              onClick={() => {
                                window.scrollTo(0, 0);
                              }}
                            >
                              {product.productName}
                            </Link>
                          </h3>
                          <ul className="rating">
                            <li>
                              <i className="bx bxs-star"></i>
                            </li>
                            <li>
                              <i className="bx bxs-star"></i>
                            </li>
                            <li>
                              <i className="bx bxs-star"></i>
                            </li>
                            <li>
                              <i className="bx bxs-star"></i>
                            </li>
                            <li>
                              <i className="bx bxs-star"></i>
                            </li>
                          </ul>
                          <span>${product.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
                :
                <div>
                  <h2 className="text-center py-5">No Product Found</h2>
                </div>
              }
            </>
          )}

          <div className="col-lg-12 col-md-12">
            {sliceProducts?.length ?
              <>
                <Pagination
                  lastPage={lastPage}
                  page={getPage}
                  pageHandle={pageHandle}
                />
              </>
              :
              <div>

              </div>
            }

          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopArea;
