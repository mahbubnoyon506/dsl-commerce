import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Button from "react-bootstrap/Button";
import Typography from "@mui/material/Typography";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import logo from "./logo1.png";
import { Divider, makeStyles } from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import { AdminContext } from "../../contexts/AdminContext";
import { FaUsers, FaProductHunt, FaDatabase } from "react-icons/fa";
import { MdDashboard, MdCategory, MdOutlineUnsubscribe } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import { BsMinecartLoaded } from "react-icons/bs";
import { useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';




const menuLinkStyles = ({ isActive }) => {
  return {
    backgroundColor: isActive ? "#1A1C33" : "",
  };
};
const drawerWidth = 280;

function Dashboard(props) {
  const { admin, logout } = React.useContext(AdminContext);
  const navigate = useNavigate();
  const [kycMenu, setKycMenu] = useState('');

  useEffect(() => {
    if (admin?.role !== "admin") {
      navigate("/");
    }
  }, [admin, navigate])



  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClose = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };




  const handleChange = (event) => {
    setKycMenu(event.target.value);
  };


  const drawer = (
    <div className="sideBar">
      <Toolbar />
      <img className="dashLogo mx-auto" src={logo} alt="" />
      <Divider />
      <div className="menuDiv text-uppercase">
        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="dashboard"
        >
          <span className="navIconAdmin">
            <MdDashboard style={{ fontSize: "20px" }} />
          </span>
          DASHBOARD
        </NavLink>
        <br />

        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="adminUser"
        >
          {" "}
          <span className="navIconAdmin">
            <RiAdminFill style={{ fontSize: "20px" }} />
          </span>
          ADMINS
        </NavLink>
        <br />

        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="customers"
        >
          {" "}
          <span className="navIconAdmin">
            <FaUsers style={{ fontSize: "20px" }} />
          </span>
          Customers
        </NavLink>
        <br />

        <NavLink
          className="dashboardMenu"
          // style={menuLinkStyles}
          onClick={handleClose}
          to=""
        >
          <span className="navIconAdmin">
            <MdOutlineUnsubscribe style={{ fontSize: "20px" }} />
          </span>
          <FormControl style={{ marginTop: kycMenu === '' ? "-12px" : "" }} variant="standard" sx={{
            minWidth: 160 ,color: '#BABBC0', 
          }}>
            <InputLabel style={{color:'#BABBC0'}} sx={{ color: '#BABBC0' }} id="demo-simple-select-standard-label">KYC </InputLabel>
            <Select disableUnderline sx={{ color: '#BABBC0', maxHeight: kycMenu === '' ? "" : "20px", borderColor: 'white', }}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={kycMenu}
              onChange={handleChange}
              label="KYC "
            >
              <Link to='verified'><MenuItem sx={{ color: 'black' }} value={10}>Verified </MenuItem></Link>
              <Link to='non-verified'><MenuItem sx={{ color: 'black' }} value={20}>Non Verified</MenuItem></Link>
              <Link to='pending'><MenuItem sx={{ color: 'black' }} value={30}>Pending</MenuItem></Link>
              <Link to='added-products'><MenuItem sx={{ color: 'black' }} value={40}>Added products</MenuItem></Link>

            </Select>
          </FormControl>
        </NavLink>
        <br />
        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="orders"
        >
          {" "}
          <span className="navIconAdmin">
            <GiShoppingBag style={{ fontSize: "20px" }} />
          </span>
          User Orders
        </NavLink>
        <br />

        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="administer-orders"
        >
          {" "}
          <span className="navIconAdmin">
            <BsMinecartLoaded style={{ fontSize: "20px" }} />
          </span>
          Administer Orders
        </NavLink>
        <br />

        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="products"
        >
          <span className="navIconAdmin">
            <FaProductHunt style={{ fontSize: "20px" }} />
          </span>
          Products
        </NavLink>
        <br />

        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="all-category"
        >
          <span className="navIconAdmin">
            <MdCategory style={{ fontSize: "20px" }} />
          </span>
          CATEGORIES
        </NavLink>
        <br />
        <NavLink
          className="dashboardMenu"
          style={menuLinkStyles}
          onClick={handleClose}
          to="all-subscribers"
        >
          <span className="navIconAdmin">
            <MdOutlineUnsubscribe style={{ fontSize: "20px" }} />
          </span>
          ALL SUBSCRIBERS
        </NavLink>
        <br />



        <Button
          variant="danger"
          onClick={() => handleLogout()}
          className="mt-3 text-uppercase ms-3"
          size="sm"
        >
          Log Out
        </Button>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const menuToggle = () => {
    const toggleMenu = document.querySelector(".adminProfile");
    toggleMenu.classList.toggle("active");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="dashboardNav">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <FormatAlignLeftIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="dashboardTopBar"
          >
            <h4 className="dashboardTitlehidden">Dashboard</h4>
            {/* <div className="profile">
              <div className="imgDashDiv" onClick={menuToggle}>
                <img src={currentAdmin.avatar} alt="" />
              </div>
            </div> */}
          </Typography>
        </Toolbar>

      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className=" dashboardDiv"
      >
        <Toolbar />
        <div className="contentAllDiv">
          <Outlet />
          <div className="copyrightAdmin mt-4 ">
            <p className="my-2">Copyright © 2022 - DS Legends Pte. Ltd.</p>
          </div>
        </div>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
