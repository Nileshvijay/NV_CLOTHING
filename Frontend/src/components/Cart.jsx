import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartProvider';
import { OrderContext } from './OrderProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, incrementQuantity, decrementQuantity, deleteProduct, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const [address, setAddress] = useState('');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      if (item.productId && item.productId.price) {
        return acc + item.productId.price * item.quantity;
      }
      return acc;
    }, 0);
  };

  const total = calculateTotal();
  const discount = appliedCoupon === 'MNTF25' ? total * 0.25 : 0;
  const shippingCharge = 10;
  const tax = 2.50;
  const grandTotal = total - discount + shippingCharge + tax;

  const handleIncrement = async (productId) => {
    await incrementQuantity(productId);
  };

  const handleDecrement = async (productId) => {
    await decrementQuantity(productId);
  };

  const handleRemove = async (productId) => {
    await deleteProduct(productId);
  };

  const handleApplyCoupon = () => {
    if (coupon === 'MNTF25') {
      setAppliedCoupon(coupon);
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code!');
    }
  };

  const handleBuyNow = async () => {
    if (!address.trim()) {
      toast.error('Address is required!');
      return;
    }

    const newOrder = cart.map(item => ({
      cartItemId: item._id,
      productName: item.productId.name,
      category: item.productId.categories,
      quantity: item.quantity,
      total: item.productId.price * item.quantity, // Calculate total for each item
      address,
      status: 'Pending'
    }));

    try {
      await addOrder({ orders: newOrder });
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/order');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place the order. Please try again.');
    }
  };

  return (
    <div style={{ marginTop: '60px' }}>
      <ToastContainer />
      <div className="container cart-container mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h3>Shopping Cart</h3>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length ? cart.map(item => (
                      item.productId && (
                        <tr key={item.productId._id}>
                          <td>
                            <img src={item.productId.image} alt={item.productId.name} className="img-fluid cart-img" />
                          </td>
                          <td>{item.productId.categories}</td>
                          <td>{item.productId.description}</td>
                          <td>${item.productId.price}</td>
                          <td>
                            <button onClick={() => handleDecrement(item.productId._id)} disabled={item.quantity <= 1} className="btn btn-sm btn-primary">
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            {item.quantity}
                            <button onClick={() => handleIncrement(item.productId._id)} className="btn btn-sm btn-primary">
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </td>
                          <td>${item.productId.price * item.quantity}</td>
                          <td>
                            <button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.productId._id)}>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </td>
                        </tr>
                      )
                    )) : (
                      <tr>
                        <td colSpan="7">Your cart is empty</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="form-group">
                  <label>Add a Note:</label>
                  <textarea className="form-control" placeholder="Write some note..."></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h3>Order Summary</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Shipping Address</label>
                  <textarea
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"></textarea>
                </div>
                <p>Grand Total: ${total.toFixed(2)}</p>
                <p>Discount: -${discount.toFixed(2)}</p>
                <p>Shipping Charge: ${shippingCharge.toFixed(2)}</p>
                <p>Estimated Tax: ${tax.toFixed(2)}</p>
                <h4>Total: ${grandTotal.toFixed(2)}</h4>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)} />
                  <button className="btn btn-primary mt-2" onClick={handleApplyCoupon}>Apply</button>
                </div>
                <div className="alert alert-info mt-2">
                  Use coupon code MNTF25 and get 25% discount!
                </div>
                <button className="btn btn-success btn-block mt-4" onClick={handleBuyNow}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
