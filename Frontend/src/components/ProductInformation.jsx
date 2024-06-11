import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from './ProductProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';


const ProductInformation = () => {
  const { id } = useParams();
  const { selectedProduct, fetchProductById } = useContext(ProductContext);

  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  if (!selectedProduct) {
    return <div>Loading...</div>;
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />);
      } else if (i - rating === 0.5) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-warning" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={farStar} className="text-warning" />);
      }
    }
    return stars;
  };

  return (
    <div className="container mt-5 product-info-container">
      <div className="row">
        <div className="col-md-6">
          <img src={selectedProduct.image} className="img-fluid product-info-image" alt={selectedProduct.name} />
        </div>
        <div className="col-md-6">
          <h1 className="product-info-title">{selectedProduct.name}</h1>
          <div className="d-flex align-items-center product-info-rating">
            <div className="me-2">
              {renderStars(selectedProduct.rating)}
            </div>
            <span>({selectedProduct.rating} out of 5)</span>
          </div>
          <h3 className="product-info-price">${selectedProduct.price}</h3>
          <p className="product-info-description">{selectedProduct.description}</p>
          <div className="mt-4">
            <h4>Product Details</h4>
            <ul className="product-info-details">
              <li>Category: {selectedProduct.categories}</li>
              {/* Add more product details as needed */}
            </ul>
          </div>
          <button className="btn product-info-add-to-cart-btn mt-4">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
