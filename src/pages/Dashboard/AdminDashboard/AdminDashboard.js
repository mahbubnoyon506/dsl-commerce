import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { FaUsers, FaProductHunt, FaShoppingCart } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { MdCategory } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';
import { SiProcesswire } from 'react-icons/si';
import { TbTruckDelivery } from 'react-icons/tb';
import axios from 'axios';
import RecentOrders from './RecentOrders';
import MonthlySellGraph from './MonthlySellGraph';


const AdminDashboard = () => {
  const [allAdmin, setAllAdmin] = useState([])
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [orders, setOrders] = useState([])
  const [pendingOrders, setPendingOrders] = useState([])
  const [processingOrders, setProcessingOrders] = useState([])
  const [delivered, setDeliverd] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://backend.dslcommerce.com/api/admin/')
      .then(res => {
        setAllAdmin(res.data);
      })
  }, [])

  useEffect(() => {
    axios.get('https://backend.dslcommerce.com/api/product/')
      .then(res => {
        setProducts(res.data);
      })
  }, [])

  useEffect(() => {
    axios.get('https://backend.dslcommerce.com/api/category/')
      .then(res => {
        setCategories(res.data);
      })
  }, [])


  const handleClickOpenAdmin = () => {
    navigate('/admin/adminUser')
  }
  const handleClickOpenCustomers = () => {
    navigate('/admin/customers')
  }
  const handleClickOpenProducts = () => {
    navigate('/admin/products')
  }
  const handleClickOpenCategories = () => {
    navigate('/admin/all-category')
  }

  return (
    <div>
      <div className='container '>
        <h5 className='text-white text-start pb-3'>DASHBOARD</h5>
        <Row className='g-5'>

          <Col xs={12} md={6} lg={4} xl={3} onClick={handleClickOpenAdmin}>
            <Card className='cardDash ' style={{ borderRadius: '20px' }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className='dashboardTxt'>
                  <p>Admins</p>
                  <h2 className='text-start'>{allAdmin.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className='text-white coinsIcon '><RiAdminFill /></p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} onClick={handleClickOpenCustomers}>
            <Card className='cardDash ' style={{ borderRadius: '20px' }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className='dashboardTxt'>
                  <p>Customers</p>
                  <h2 className='text-start'>{customers.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className='text-white coinsIcon '><FaUsers /></p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} onClick={handleClickOpenProducts}>
            <Card className='cardDash ' style={{ borderRadius: '20px' }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className='dashboardTxt'>
                  <p>Products</p>
                  <h2 className='text-start'>{products.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className='text-white coinsIcon '><FaProductHunt /></p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} onClick={handleClickOpenCategories}>
            <Card className='cardDash ' style={{ borderRadius: '20px' }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className='dashboardTxt'>
                  <p>Categories</p>
                  <h2 className='text-start'>{categories.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className='text-white coinsIcon '><MdCategory /></p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} >
            <Card className='cardDash ' style={{ borderRadius: '20px' }}>
              <Card.Body className="d-flex gap-1 align-items-center justify-content-evenly">
                <div className="iconDas">
                  <p><FaShoppingCart className='orderIcon setBg1' /></p>
                </div>
                <Card.Text className=''>
                  <p className='text-white-50 p-0 m-0'>Total Order</p>
                  <h2 className='text-start text-white'>{orders.length}</h2>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} >
            <Card className='cardDash ' style={{ borderRadius: '20px' }}>
              <Card.Body className="d-flex gap-1 align-items-center justify-content-evenly">
                <div className="iconDas">
                  <p><SiProcesswire className='orderIcon setBg2' /></p>
                </div>
                <Card.Text className=''>
                  <p className='text-white-50 p-0 m-0'>Order Pending</p>
                  <p className='text-warning p-0 m-0'>(2000.00)</p>
                  <h2 className='text-start text-white'>{orders.length}</h2>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} >
            <Card className='cardDash ' style={{ borderRadius: '20px' }}>
              <Card.Body className="d-flex gap-2 align-items-center justify-content-evenly">
                <div className="iconDas">
                  <p><TbTruckDelivery className='orderIcon setBg3' /></p>
                </div>
                <Card.Text className=''>
                  <p className='text-white-50 p-0 m-0'>Order Processing</p>
                  <h2 className='text-start text-white'>{orders.length}</h2>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} >
            <Card className='cardDash ' style={{ borderRadius: '20px' }}>
              <Card.Body className="d-flex gap-2 align-items-center justify-content-evenly">
                <div className="iconDas">
                  <p><GiCheckMark className='orderIcon setBg4' /></p>
                </div>
                <Card.Text className=''>
                  <p className='text-white-50 p-0 m-0'>Order Delivered</p>
                  <h2 className='text-start text-white'>{orders.length}</h2>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <RecentOrders />
        <div className='mt-5'>
          <MonthlySellGraph />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;