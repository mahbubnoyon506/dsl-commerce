import PageTitle from "../../Components/Common/PageTitle";
import OrderArea from "../../Components/Shop/OrderArea";
import cart1 from "../../assets/img/collection/collection-1.png";
import cart2 from "../../assets/img/collection/collection-1.png";
import cart3 from "../../assets/img/collection/collection-2.png";
import cart4 from "../../assets/img/collection/collection-1.png";
import cart5 from "../../assets/img/collection/collection-2.png";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";

const Orders = () => {
  return (
    <div>
      <PageTitle title="My Orders" />
      {/* <OrderArea /> */}

      <div className="container">
        <div className="wishlist-table table-responsive">


          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="product-remove">
                  <a href="#" className="remove">
                    <i className="bx bx-x"></i>
                  </a>
                </td>

                <td className="product-thumbnail">
                  <a href="#">
                    <img src={cart1} alt="item" />
                  </a>
                </td>

                <td className="product-name">
                  <Link to="/products-details/60447200e3108c0a9086757c">Bluetooth Headphone</Link>
                </td>

                <td className="product-price">
                  <span className="unit-amount">$75.00</span>
                </td>

                <td className="product-stock">
                  <span className="stock">In Stock</span>
                </td>

                <td className="product-btn">
                  <a href="#" className="default-btn">
                    <TbListDetails className="me-2" />
                    Details
                  </a>
                </td>
              </tr>

              <tr>
                <td className="product-remove">
                  <a href="#" className="remove">
                    <i className="bx bx-x"></i>
                  </a>
                </td>

                <td className="product-thumbnail">
                  <a href="#">
                    <img src={cart2} alt="item" />
                  </a>
                </td>

                <td className="product-name">
                  <Link to="/products-details/60447200e3108c0a9086757c">Protable Speakers</Link>
                </td>

                <td className="product-price">
                  <span className="unit-amount">$175.00</span>
                </td>

                <td className="product-stock">
                  <span className="stock">In Stock</span>
                </td>

                <td className="product-btn">
                  <a href="#" className="default-btn">
                    <TbListDetails className="me-2" />
                    Details
                  </a>
                </td>
              </tr>

              <tr>
                <td className="product-remove">
                  <a href="#" className="remove">
                    <i className="bx bx-x"></i>
                  </a>
                </td>

                <td className="product-thumbnail">
                  <a href="#">
                    <img src={cart3} alt="item" />
                  </a>
                </td>

                <td className="product-name">
                  <Link to="/products-details/60447200e3108c0a9086757c">Digital Camera</Link>
                </td>

                <td className="product-price">
                  <span className="unit-amount">$175.00</span>
                </td>

                <td className="product-stock">
                  <span className="stock">In Stock</span>
                </td>

                <td className="product-btn">
                  <a href="#" className="default-btn">
                    <TbListDetails className="me-2" />
                    Details
                  </a>
                </td>
              </tr>

              <tr>
                <td className="product-remove">
                  <a href="#" className="remove">
                    <i className="bx bx-x"></i>
                  </a>
                </td>

                <td className="product-thumbnail">
                  <a href="#">
                    <img src={cart4} alt="item" />
                  </a>
                </td>

                <td className="product-name">
                  <Link to="/products-details/60447200e3108c0a9086757c">Smart Watch</Link>
                </td>

                <td className="product-price">
                  <span className="unit-amount">$175.00</span>
                </td>

                <td className="product-stock">
                  <span className="stock">In Stock</span>
                </td>

                <td className="product-btn">
                  <a href="#" className="default-btn">
                    <TbListDetails className="me-2" />
                    Details
                  </a>
                </td>
              </tr>

              <tr className="bottom-className">
                <td className="product-remove">
                  <a href="#" className="remove">
                    <i className="bx bx-x"></i>
                  </a>
                </td>

                <td className="product-thumbnail">
                  <a href="#">
                    <img src={cart5} alt="item" />
                  </a>
                </td>

                <td className="product-name">
                  <a href="#">New Smart Phone</a>
                </td>

                <td className="product-price">
                  <span className="unit-amount">$175.00</span>
                </td>

                <td className="product-stock">
                  <span className="stock">In Stock</span>
                </td>

                <td className="product-btn">
                  <a href="#" className="default-btn">
                    <TbListDetails className="me-2" />
                    Details
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Orders;
