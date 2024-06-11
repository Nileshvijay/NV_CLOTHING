import axios from 'axios';
import React, { useContext, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CBContext } from '../CarousalBannerProvider';

function CarousalBanner() {
  const { CB, fetchCB } = useContext(CBContext);

  const [newCB, setNewCB] = useState({
    categories: '',
    image: null,
  });

  const modalRef = useRef(null);

  const handleInputChange = (e) => {
    const updatedCB = { ...newCB };
    const name = e.target.name;
    const value = name === 'image' ? e.target.files[0] : e.target.value;
    updatedCB[name] = value;
    setNewCB(updatedCB);
  };

  const notifySuccess = () => toast("Banner created successfully!");
  const notifyError = (message) => toast.error(message);

  const handleCreateCB = async (e) => {
    e.preventDefault();

    const validCategories = ['men', 'women', 'kids'];
    if (!validCategories.includes(newCB.categories.toLowerCase())) {
      notifyError('Invalid category. Please choose from men, women, or kids.');
      return;
    }

    const formData = new FormData();
    formData.append('categories', newCB.categories);
    formData.append('image', newCB.image);

    try {
      await axios.post('http://localhost:8080/api/banner/addBanner', formData);
      setNewCB({
        categories: '',
        image: null,
      });
      notifySuccess();
      modalRef.current.click();
      fetchCB(); // Update the banners after creating a new one
    } catch (error) {
      console.error('There was an error creating the banner!', error);
      notifyError('There was an error creating the banner!');
    }
  };

  const handleDeleteCB = async (bannerId) => {
    try {
      await axios.delete(`http://localhost:8080/api/banner/deleteBanner/${bannerId}`);
      alert('Banner deleted successfully');
      fetchCB(); // Update the banners after deleting one
    } catch (error) {
      console.error('There was an error deleting the banner!', error);
    }
  };
   return (
    <div>
      <h2 className='mb-4' style={{ marginTop: "100px" }}>Manage Carousel Banners</h2>
      <button
        className='btn btn-success mb-3'
        data-bs-toggle="modal"
        data-bs-target="#addCBModal"
      >
        Add New Carousel Banner
      </button>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope="col">Carousel Banner ID</th>
            <th scope="col">Categories</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {CB.map(banner => (
            <tr key={banner._id}>
              <td>{banner._id}</td>
              <td>{banner.categories}</td>
              <td><img src={banner.image} alt="" height={50} width={50} /></td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCB(banner._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding new carousel banner */}
      <div className="modal fade" id="addCBModal" tabIndex="-1" role="dialog" aria-labelledby="addCBModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCBModalLabel">Add New Carousel Banner</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateCB}>
                <div className="form-group">
                  <label htmlFor="categories">Categories</label>
                  <input
                    type="text"
                    id="categories"
                    name="categories"
                    className="form-control"
                    value={newCB.categories}
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
                <button type="submit" className="btn btn-primary">Create Banner</button>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarousalBanner;
