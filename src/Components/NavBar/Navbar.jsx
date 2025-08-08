import React, { useState, useContext } from 'react';
import { FaInstagram, FaFacebook, FaLinkedin, FaTiktok, FaTwitter } from 'react-icons/fa';
import { CiYoutube } from 'react-icons/ci';
import { TfiShoppingCartFull } from 'react-icons/tfi';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { UserContext } from '../Context/UserContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, setToken } = useContext(UserContext);
  const isLoggedIn = !!token;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Logo */}
        <div className="flex items-center gap-x-2">
          <TfiShoppingCartFull className="text-3xl text-green-500" />
          <h1 className="text-2xl font-bold">FreshCart</h1>
        </div>

        {/* Menu icon (for mobile) */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>

        {/* Nav links */}
        <div
          className={`w-full lg:w-auto mt-4 lg:mt-0 lg:flex items-center justify-between gap-x-4 ${
            menuOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Left nav links */}
          <ul className="flex flex-col lg:flex-row gap-y-2 lg:gap-x-4 font-semibold items-center">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/cart">Cart</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/brands">Brands</NavLink></li>
            <li><NavLink to="/Address">Address</NavLink></li>
            <li><NavLink to="/Orders">Orders</NavLink></li>

          </ul>

          {/* Right social icons and auth */}
          <div className="flex flex-col lg:flex-row gap-3 mt-4 lg:mt-0 items-center">
            <div className="flex gap-x-3 text-xl">
              <FaInstagram className="hover:text-red-600" />
              <FaFacebook className="hover:text-blue-600" />
              <FaLinkedin className="hover:text-blue-600" />
              <FaTwitter className="hover:text-blue-600" />
              <FaTiktok className="hover:text-gray-950" />
              <CiYoutube className="hover:text-red-600" />
            </div>

            {!isLoggedIn ? (
              <ul className="flex gap-x-4 items-center">
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
              </ul>
            ) : (
              <span
                onClick={logout}
                className="cursor-pointer hover:text-red-500 text-sm font-semibold"
              >
                Logout
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
