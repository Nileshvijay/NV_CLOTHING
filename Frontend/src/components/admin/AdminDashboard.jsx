import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Overview from './Overview';
import ManageProducts from './ManageProducts';
import Orders from './Orders';
import Settings from './Settings';
import Vistitors from './Vistitors';
import CarousalBanner from './CarousalBanner';



const AdminDashboard = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="overview">Overview</NavLink>
            </li>
            <li>
              <NavLink to="manageproducts">Products</NavLink>
            </li>
            <li>
              <NavLink to="orders">Orders</NavLink>
            </li>
            <li>
              <NavLink to="settings">Settings</NavLink>
            </li>
            <li>
              <NavLink to = "CarousalBanner">CarousalBanner</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
          <Route path = "visitors" element = {<Vistitors/>}/>
          <Route path = "manageproducts" element = {<ManageProducts/>}></Route>
          <Route path = "CarousalBanner" element = {<CarousalBanner/>}></Route>
         </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;

