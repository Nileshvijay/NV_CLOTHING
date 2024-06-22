import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './Fotter.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-4">
            <h4>About NV Clothings</h4>
            <p>Welcome to NV Clothings! We offer the latest trends in fashion with a commitment to quality and style.</p>
            <p><strong>Email:</strong> <a href="mailto:nileshvijay2002@gmail.com">nileshvijay2002@gmail.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+918003398749">+91 - 8003398749</a></p>
          </div>
          <div className="col-md-3 mb-4">
            <h4>Quick Links</h4>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h4>Customer Service</h4>
            <ul className="list-unstyled">
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h4>Follow Us</h4>
            <ul className="list-inline social-icons">
              <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faFacebookF} /></a></li>
              <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
              <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6 text-left">
            <img src="/path/to/your/logo.png" alt="NV Clothings Logo" className="footer-logo" />
          </div>
          <div className="col-md-6 text-right">
            <p>&copy; 2024 NV Clothings. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
