import React, { useContext } from "react";
import { ShopContext } from "../Components/ShopContext";
import { Link, useLocation } from "react-router-dom";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";

import '../CSS/Header.css'

import logo from '../assets/logoo.png'

const Header = () => {
  const { cart, wishlist } = useContext(ShopContext);
  const location = useLocation();

  return (
    <header>
      <div className="bg-dark text-white text-center py-2 small ">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! 
        <span className="ms-3 text-warning" style={{cursor:"pointer"}}>
          ShopNow
        </span>
      </div>

      <nav className="navbar navbar-expand-lg bg-white py-1 shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/"><img src={logo} alt="logo" /></Link>

          <button 
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav mx-auto gap-4">
              <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/About">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
            </ul>

            <div className="d-flex align-items-center gap-4 position-relative">

              {/* Wishlist Icon */}
              <div className="position-relative" >
                <FaRegHeart size={20} />
                {wishlist.length > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                    {wishlist.length}
                  </span>
                )}
              </div>

              {/* Cart Icon */}
              <div className="position-relative">
                <IoCartOutline size={25} />
                {cart.length > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                    {cart.length}
                  </span>
                )}
              </div>

              <FaRegCircleUser size={20} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
