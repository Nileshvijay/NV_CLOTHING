import axios from 'axios';
import React, { useContext, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductContext } from '../ProductProvider';

function ManageProducts() {
  const { products } = useContext(ProductContext);
  const [newProduct, setNewProduct] = useState({
    name: '',
    rating: '',
    description: '',
    quantity: '',
    price: '',
    categories: '',
    image: null,
  });

  const modalRef = useRef(null);

  const handleInputChange = (e) => {
    const updatedProduct = { ...newProduct };
    const name = e.target.name;
    const value = name === 'image' ? e.target.files[0] : e.target.value;
    updatedProduct[name] = value;
    setNewProduct(updatedProduct);
  };

  const notifySuccess = () => toast("Product created successfully!");
  const notifyError = (message) => toast.error(message);

  const handleCreateProduct = (e) => {
    e.preventDefault();

    const validCategories = ['men', 'women', 'kids'];
    if (!validCategories.includes(newProduct.categories.toLowerCase())) {
      notifyError('Invalid category. Please choose from men, women, or kids.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('rating', newProduct.rating);
    formData.append('description', newProduct.description);
    formData.append('quantity', newProduct.quantity);
    formData.append('price', newProduct.price);
    formData.append('categories', newProduct.categories);
    formData.append('image', newProduct.image);

    axios.post('http://localhost:8080/api/product/addproduct', formData)
      .then(response => {
        console.log(response.data);
        setNewProduct({
          name: '',
          rating: '',
          description: '',
          quantity: '',
          price: '',
          categories: '',
          image: null,
        });
        notifySuccess();
        modalRef.current.click();
      })
      .catch(error => {
        console.error('There was an error creating the product!', error);
        notifyError('There was an error creating the product!');
      });
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:8080/api/product/deleteproduct/${productId}`)
      .then(response => {
        console.log(response.data);
        alert('Product deleted successfully');
        fetchProducts();
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
      });
  };

  return (
    <div>
      <h2 className="mb-4" style={{ marginTop: "100px" }}>Manage Products</h2>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addProductModal"
      >
        Add New Product
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Product Image</th>
            <th scope="col">Name</th>
            <th scope="col">Rating</th>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Categories</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td><img src={product.image} alt="" height={50} width={50} /></td>
              <td>{product.name}</td>
              <td>{product.rating}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.categories}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding new product */}
      <div className="modal fade" id="addProductModal" tabIndex="-1" role="dialog" aria-labelledby="addProductModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProductModalLabel">Add New Product</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateProduct}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rating">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    id="rating"
                    name="rating"
                    className="form-control"
                    value={newProduct.rating}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="form-control"
                    value={newProduct.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="categories">Categories</label>
                  <input
                    type="text"
                    id="categories"
                    name="categories"
                    className="form-control"
                    value={newProduct.categories}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Create Product</button>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;
