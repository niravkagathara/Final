import React, { useState } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function AdminHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
   
    const items = useSelector((state) => state.cart);
    const auth = localStorage.getItem('user');
    const user =  JSON.parse(localStorage.getItem('author'));

    const nav = useNavigate();
    const logout = () => {
        localStorage.clear();
        nav('/signup');
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  
    };
    return (
      <div>
   <div>
    {/* Navigation */}
    <div className="top-nav">
      <div className="container d-flex">
        <p>Order Online Or Call Us: (001) 2222-55555</p>
        <ul className="d-flex">
          <li><a href="/about">About Us</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </div>
    <div className="navigation">
      <div className="nav-center container d-flex">
        <a href="/" className="logo"><h1>Dans</h1></a>
        
        {/* <ul className="nav-list d-flex "> */}
        <ul className={`nav-list d-flex ${isMenuOpen ? 'open' : ''}`}>

          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/product" className="nav-link">Product</a>
          </li>
          <li className="nav-item">
            <a href="/term" className="nav-link">Terms</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">Contact</a>
          </li>
          <div class="dropdown">
  <a class="nav-item dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
    Admin Manage
  </a>
  <ul class="dropdown-menu">
           <li className="nav-item">
            <a href="/products" className="aa">Products</a>
          </li>
          <li className="">
            <a href="/user" className="aa">Users</a>
          </li>
          <li className="">
            <a href="/order" className="aa">Order</a>
          </li>
  </ul>
</div>
        
          <li className=" d-flex">
            <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <a  className="icon">
              <i className="bx bx-user" />
            </a>
          </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 5,
              height: 5,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
        <a href="/profile" className="aa">
              <i className="bx bx-user" /> profile
            </a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        {

auth ?
    
             <a href="/signup" onClick={logout} className="aa"><i className='bx bx-log-out'/> logout</a>
         

    :
   
             <a href="/login" className="aa"><i className='bx bx-log-in'/> login</a>
          
}
        </MenuItem>
      </Menu>
            <a href="/cart" className="icon">
              <i className="bx bx-cart" />
              <span className="d-flex">{items.cartItems.length}</span>
            </a>
          </li>
        </ul>
        
        <div className="hamburger" onClick={toggleMenu}>
          <i className="bx bx-menu-alt-left" />
        </div>
      </div>
    </div>
  </div>
  
      </div>
    )
}

export default AdminHeader
