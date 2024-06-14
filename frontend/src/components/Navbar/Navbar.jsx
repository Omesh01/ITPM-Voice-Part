import React, { useState } from 'react';
import './Navbar.css';
import '../../../src/App';
import logo from '../../Assets/logo.png';
import cart_icon from '../../Assets/cart_icon.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>IWISH</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu('shop');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/">
            Shop
          </Link>
          {menu === 'shop' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('mens');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/mens">
            Electronic Accessories
          </Link>
          {menu === 'mens' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('womens');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/womens">
            Watches & Accessories
          </Link>
          {menu === 'womens' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('kids');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/kids">
            Electronic Devices
          </Link>
          {menu === 'kids' ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <button Link style={{ textDecoration: 'none' }} to="/login">
          Login
        </button>
        <img src={cart_icon} alt="Cart" />
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
