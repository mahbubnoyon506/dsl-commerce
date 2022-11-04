import './App.css';
import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "./Components/Layout/PublicLayout";
import HomeTwo from "./pages/Home/HomeTwo";
import About from "./pages/About/About";
import Search from './pages/About/Search';
import ResetPassword from "./pages/Authentications/ResetPassword";
import OurTeam from "./pages/About/OurTeam";
import Faqs from "./pages/About/Faqs";
import HelpDesk from "./pages/About/HelpDesk";
import Error404 from "./pages/About/Error-404";
import TrackingOrder from "./pages/About/TrackingOrder";
import Cart from "./pages/Shop/Cart";
import Orders from "./pages/Shop/Orders";
import WishList from "./pages/Shop/WishList";
import ProductsDetails from "./pages/Shop/ProductsDetails";
import ProductsDetailsSidebar from "./pages/Shop/ProductsDetailsSidebar";
import Blog from "./pages/Blog/Blog";
import AddProduct from "./pages/Products/AddProduct";
import User from "./pages/User/User";
import Products from "./pages/Products/Products";
import News from "./pages/News/News";
import './App.css'
import CheckoutArea from "./Components/Shop/CheckoutArea";
import SubscriptionVerify from "./Components/Layout/Footer/SubscriptionVerify";
import Profile from "./pages/Profile/Profile";


// Login 
import Login from "./pages/Authentications/Login";
import Register from "./pages/Authentications/Register";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import Otp from "./Components/Auth/Otp";

// Dashboard 
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard/AdminDashboard";

import CreateProduct from "./pages/Dashboard/Products/CreateProduct/CreateProduct";
import Admins from "./pages/Dashboard/Admins/Admins";
import AllProduct from "./pages/Dashboard/Products/AllProduct/AllProduct";
import AllCategory from "./pages/Dashboard/Category/AllCategory/AllCategory";
import AddCategory from "./pages/Dashboard/Category/AddCategory/AddCategory";
import ContactArea from "./Components/About/ContactArea";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse";
import DataProtection from "./pages/DataProtection/DataProtection";
import { Toaster } from "react-hot-toast";
import Data from "./pages/Dashboard/Data/Data";
import FaqDashboard from "./pages/Dashboard/Data/FaqDashboard";
import HelpDeskDashborad from "./pages/Dashboard/Data/HelpDeskDashborad";
import CustomerServicesDashboard from "./pages/Dashboard/Data/CustomerServicesDashboard";
import UpdateProduct from "./pages/Dashboard/Products/UpdateProduct/UpdateProduct";
import DashboardAdminEditProfile from "./pages/Dashboard/Admins/DashboardAdminEditProfile";
import Customers from "./pages/Dashboard/Customers/Customers";
import CustomersUpdate from "./pages/Dashboard/Customers/CustomersUpdate";
import CustomerOrders from "./pages/Dashboard/CustomerOrders/CustomerOrders";
import WalletModal from "./Components/Shared/WalletModal";
import CartArea from "./Components/Shop/CartArea";
import MainShop from "./pages/Shop/PathCheck/MainShop";
import Page from "./pages/Shop/PathCheck/Page";
import CatPath from "./pages/Shop/PathCheck/CatPath";
import SearchPath from "./pages/Shop/PathCheck/SearchPath";
import SingleOrderDetail from "./pages/Dashboard/CustomerOrders/SingleOrderDetail";

export const ProductContext = createContext()
function App() {

  return (
    <>
      <WalletModal></WalletModal>
      {/* <CoinbaseModal></CoinbaseModal> */}
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomeTwo />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/search" element={<Search />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<ContactArea />} />
          <Route path="/cart" element={<CartArea />} />

          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/data-protection-notice" element={<DataProtection />} />
          <Route path="/help-desk" element={<HelpDesk />} />


          {/* <Route path="/my-account" element={<MyAccount />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/tracking-order" element={<TrackingOrder />} />


          {/* SHOP START */}

          <Route path="/shop" element={<MainShop />} />
          <Route path="/shop/page/:page" element={<Page />} />
          <Route path="/shop/cat/:keyword/page/:page" element={<CatPath />} />
          <Route path="/shop/cat/:keyword/search/:query/:page" element={<SearchPath />} />

          {/* SHOP END */}

          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/checkout/:totalPrice" element={<CheckoutArea />} />
          <Route
            path="/shop/products-details/:productId"
            element={<ProductsDetails />}
          />
          <Route
            path="/products-details-sidebar"
            element={<ProductsDetailsSidebar />}
          />
          <Route path="/blog" element={<Blog />} />
          {/* <Route path="/coming-soon" element={<ComingSoon />} /> */}
          <Route path="/verify-email/" element={<SubscriptionVerify />} />
          <Route path="/user" element={<User />} />

        </Route>

        {/* Login System  */}

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/login/forgetPassword" element={<ForgetPassword />} />
        <Route path="/admin/otp/:token" element={<Otp />} />


        {/* Dashboard  */}

        <Route path="/admin" element={
          // <AdminRoutes>
          <Dashboard />
          // </AdminRoutes>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='adminUser' element={<Admins />} />
          <Route path="/admin/adminprofile/:id" element={<DashboardAdminEditProfile />} />

          {/* Customers  */}
          <Route path='customers' element={<Customers />} />
          <Route path='customers-update' element={<CustomersUpdate />} />
          <Route path='orders' element={<CustomerOrders />} />
          <Route path='/admin/orderDetail/:id' element={<SingleOrderDetail />} />

          {/* Product  */}
          <Route path='products' element={<AllProduct />} />
          <Route path='create-product' element={<CreateProduct />} />
          <Route path='/admin/editProduct/:id' element={<UpdateProduct />} />

          {/* Category  */}
          <Route path='all-category' element={<AllCategory />} />
          <Route path='add-category' element={< AddCategory />} />

          <Route path='data' element={< Data />} />
          <Route path='faq-dashboard' element={< FaqDashboard />} />
          <Route path='help-desk-dashboard' element={< HelpDeskDashborad />} />
          <Route path='customer-services-dashboard' element={< CustomerServicesDashboard />} />

        </Route>




        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="*" element={<Error404 />} />
        {/* <AuthContext.Provider
        value={{
          token,
          userId,
          tokenExpiration,
          login,
          logout,
        }}
      > */}
        {/* <CartContext.Provider
          value={{
            cartItems,
            addItemToCart,
            removeItemFromCart,
          }}
        > */}
        {/* </CartContext.Provider> */}
        {/* </AuthContext.Provider> */}
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
