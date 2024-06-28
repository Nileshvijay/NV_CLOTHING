import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from "jwt-decode";
import logo from '../assets/NV.png';
import profile from '../assets/profile.ico';
import wishlist from '../assets/wishlist.ico';
import bag from '../assets/bag.ico';
import searchIcon from '../assets/search.ico';
import myntra from '../assets/myntra-coupons.jpg';

const Navbar = () => {
  const offcanvasRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate(); // React Router hook to programmatically navigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleLogout = async () => {
    // Remove token from local storage
    localStorage.removeItem('token');

    try {
      // Send a POST request to the logout API endpoint
      const response = await fetch('http://localhost:8080/api/user/logout', {
        method: 'POST', // Specifies the HTTP method
        headers: { 'Content-Type': 'application/json' }, // Specifies the format of the request body
        credentials: 'include', // Ensures cookies are sent with the request
      });

      if (response.ok) {
        navigate('/login');
        window.location.reload();
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      offcanvasRef.current.classList.remove('show');
    }
  };

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const isAuthenticated = !!localStorage.getItem('token'); // Check if token is in local storage

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <div className="navbar-brand p-3 d-none d-lg-block">
          <NavLink to="/banner" className="navbar-brand">
            <img src={logo} alt="Logo" style={{ height: '60px' }} />
          </NavLink>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          aria-controls="offcanvas"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" style={{ marginRight: '20px' }}>
              <NavLink to="/men" className="nav-link fw-bold" style={{ fontSize: '13px' }}>
                MEN
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginRight: '20px' }}>
              <NavLink to="/women" className="nav-link fw-bold" style={{ fontSize: '13px' }}>
                WOMEN
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginRight: '20px' }}>
              <NavLink to="/ordersu" className="nav-link fw-bold" style={{ fontSize: '13px' }}>
                KIDS
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginRight: '20px' }}>
              <NavLink to="/" className="nav-link fw-bold" style={{ fontSize: '13px' }}>
                HOME & LIVING
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginRight: '20px' }}>
              <NavLink to="/orderconfirm" className="nav-link fw-bold" style={{ fontSize: '13px' }}>
                BEAUTY
              </NavLink>
            </li>
            <li className="nav-item" style={{ position: 'relative', textAlign: 'right', marginRight: '20px' }}>
              <NavLink to="/" className="nav-link fw-bold" style={{ fontSize: '13px', position: 'relative', left: '0' }}>
                STUDIO
                <span style={{ position: 'absolute', top: '5px', right: '-14px', color: '#FF1493', fontSize: '9px' }}>
                  <strong>NEW</strong>
                </span>
              </NavLink>
            </li>
          </ul>

          <form className="d-none d-lg-block" style={{ width: '550px', marginRight: '30px' }}>
            <input type="text" placeholder="Search for products and brands" className="form-control" />
          </form>
          <div className="d-flex align-items-center">
            <div className="d-flex flex-column align-items-center" style={{ marginRight: '10px', position: 'relative' }}>
              <div
                className="profile-menu"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ padding: '15px', position: 'relative' }}
              >
                <div className="profile-icon" style={{ marginRight: '25px' }}>
                  <img src={profile} alt="profile" style={{ height: '30px', cursor: 'pointer' }} />
                  <span style={{ fontSize: '10px', cursor: 'pointer', display: 'block' }}>Profile</span>
                </div>
                {isMenuOpen && (
                  <>
                   
                    <ul className="menu-items" style={{ width: '250px', height: 'auto', position: 'absolute', top: '60px', left: '-100px', padding: '10px' }}>
                    
                        <NavLink to="/order" className="btn btn-outline-success" style={{ marginLeft: '10px', padding: '5px', display: 'block' }}>
                          My Orders
                        </NavLink>
                      
                      {isAuthenticated ? (
                        <button onClick={handleLogout} className="btn btn-outline-danger" style={{ marginLeft: '10px', padding: '5px' }}>LOGOUT</button>
                      ) : (
                        <>
                          <NavLink to="/login" className="btn btn-outline-danger" style={{ marginLeft: '10px', padding: '5px' }}>LOGIN</NavLink>
                          <NavLink to="/register" className="btn btn-outline-danger" style={{ marginLeft: '10px', padding: '5px' }}>SIGNUP</NavLink>
                        </>
                      )}
                      {userRole === 'admin' && (
                        <NavLink to="/admindashboard" className="btn btn-outline-primary" style={{ marginLeft: '10px', padding: '5px' }}>AdminDashboard</NavLink>
                      )}
                      <NavLink to="/cart" style={{ marginLeft: '10px', padding: '5px' }}>
                        <button className="btn product-info-add-to-cart-btn mt-4">
                          <FontAwesomeIcon icon={faCartPlus} className="cart-icon" style={{ fontSize: '30px' }} />
                        </button>
                      </NavLink>
                    </ul>
                  </>
                )}
              </div>
            </div>
            <div className="d-flex flex-column align-items-center" style={{ marginRight: '40px' }}>
              <img src={wishlist} alt="wishlist" style={{ height: '30px' }} />
              <span style={{ fontSize: '10px' }}>Wishlist</span>
            </div>
            <div className="d-flex flex-column align-items-center" style={{ marginRight: '50px' }}>
              <img src={bag} alt="Bag" style={{ height: '30px' }} />
              <span style={{ fontSize: '10px' }}>Bag</span>
            </div>
          </div>
        </div>
        <div className="d-block d-lg-none">
          <img src={searchIcon} alt="Search" style={{ height: '30px', marginRight: '20px' }} />
          <img src={wishlist} alt="wishlist" style={{ height: '30px', marginRight: '20px' }} />
          <img src={bag} alt="Bag" style={{ height: '30px', marginRight: '20px' }} />
        </div>
      </div>
      <div className="offcanvas offcanvas-start d-lg-none" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel" ref={offcanvasRef} style={{ width: '70%' }}>
        <div className="offcanvas-body" onClick={handleBackdropClick} style={{ width: '100%', maxWidth: '100vw' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={myntra} alt="Your Image" style={{ width: '100%', height: 'auto' }} />
            <NavLink to="/login" style={{ position: 'absolute', top: '92%', left: '22%', transform: 'translate(-50%, -50%)', color: '#e75480', fontSize: '12px', fontWeight: 'bold' }}>
              SIGN UP, LOGIN
            </NavLink>
          </div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 offcanvas-categories">
            <li className="nav-item">
              <NavLink to="/men" className="nav-link fw-bold" style={{ fontSize: '13px' }}>Men</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/women" className="nav-link fw-bold" style={{ fontSize: '13px' }}>Women</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/kids" className="nav-link fw-bold" style={{ fontSize: '13px' }}>Kids</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/home-living" className="nav-link fw-bold" style={{ fontSize: '13px' }}>Home & Living</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/beauty" className="nav-link fw-bold" style={{ fontSize: '13px' }}>Beauty</NavLink>
            </li>
            <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
              <NavLink to="/studio" className="nav-link fw-bold" style={{ fontSize: '13px' }}>
                Myntra Studio
              </NavLink>
              <button type="button" className="btn btn-outline-danger btn-sm" style={{ marginLeft: '10px', padding: '5px', fontSize: '12px' }}>NEW</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
