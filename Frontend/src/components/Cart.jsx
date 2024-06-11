import React, { useContext } from 'react';
import { CartContext } from './CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { cart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      if (item.productId && item.productId.price) {
        return acc + item.productId.price * item.quantity;
      }
      return acc;
    }, 0);
  };

  if (!cart.length) {
    return <p>Your cart is empty</p>;
  }

  const total = calculateTotal();
  const discount = 5;
  const shippingCharge = 10;
  const tax = 2.50;
  const grandTotal = total - discount + shippingCharge + tax;

  return (
    <div className="cart-dashboard">
      <div className="cart-items">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              item.productId && (
                <tr key={item.productId._id}>
                  <td>
                    <img src={item.productId.image} alt={item.productId.name} />
                  </td>
                  <td>{item.productId.name}<br />{item.productId.description}</td>
                  <td>${item.productId.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.productId.price * item.quantity}</td>
                  <td>
                    <button className="remove-btn" disabled>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
        <div className="add-note">
          <p>Add a Note:</p>
          <textarea placeholder="Write some note..."></textarea>
        </div>
      </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Grand Total: ${total}</p>
        <p>Discount: -${discount}</p>
        <p>Shipping Charge: ${shippingCharge}</p>
        <p>Estimated Tax: ${tax}</p>
        <h4>Total: ${grandTotal}</h4>
        <div className="coupon">
          <input type="text" placeholder="Coupon code" />
          <button>Apply</button>
        </div>
        <div className="coupon-info">
          <p>Use coupon code MNTF25 and get 25% discount!</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
