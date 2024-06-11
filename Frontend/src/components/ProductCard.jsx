import React from 'react'; // React library ko import kar rahe hain
import { useNavigate } from 'react-router-dom'; // useNavigate hook ko import kar rahe hain, jo hume navigation mein madad karta hai
import axios from 'axios'; // axios library ko import kar rahe hain jo hume HTTP requests bhejne mein help karta hai

const ProductCard = ({ product, updateCart }) => { // ProductCard naam ka functional component banaya, jo product aur updateCart props leta hai
  const navigate = useNavigate(); // useNavigate hook ka use kar rahe hain, taaki hum pages ke beech navigate kar sakein

  const handleCardClick = () => { // handleCardClick function banaya
    navigate(`/product/${product._id}`); // jab function call hoga, to user ko product ke detail page pe le jayega
  };

  const handleAddToCart = async () => { // handleAddToCart naam ka async function banaya
    try {
      const token = localStorage.getItem('token'); // local storage se token nikal rahe hain
      if (!token) { // agar token nahi mila
        throw new Error('User not authenticated'); // error throw karenge ki user authenticated nahi hai
      }

      const response = await axios.post( // agar token mil gaya to axios.post request bhejenge
        'http://localhost:8080/api/cart/addToCart', // API endpoint jahan request bhejni hai
        { productId: product._id, quantity: 1 }, // request body mein product ka ID aur quantity bhej rahe hain
        {
          headers: {
            Authorization: `Bearer ${token}`, // headers mein authorization token bhej rahe hain
          },
        }
      );

      updateCart(response.data.cart.items); // successful request ke baad updateCart function ko call kar rahe hain, jo cart ko update karega
    } catch (error) { // agar koi error aati hai
      console.error('Error adding to cart:', error); // error ko console mein log karenge
    }
  };

  return ( // component ka JSX return kar rahe hain
    <div className="card mb-4 shadow-sm product-card" style={{ cursor: 'pointer' }}> {/* card div jo product details show karega */}
      <img src={product.image} className="card-img-top product-image" alt={product.name} onClick={handleCardClick} /> {/* product image jo card click pe navigate karega */}
      <div className="card-body"> {/* card body start */}
        <h5 className="card-title product-title" onClick={handleCardClick}>{product.name}</h5> {/* product name jo card click pe navigate karega */}
        <p className="card-text product-description">{product.description}</p> {/* product description */}
        <div className="d-flex justify-content-between align-items-center"> {/* flex div jo rating aur price ke beech space create karega */}
          <div>
            <p className="card-text mb-0"><strong>Rating:</strong> {product.rating}</p> {/* product rating */}
            <p className="card-text"><strong>Price:</strong> ${product.price}</p> {/* product price */}
          </div>
          <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button> {/* Add to Cart button jo click pe handleAddToCart function call karega */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; // component ko export kar rahe hain taaki doosri files mein use ho sake

