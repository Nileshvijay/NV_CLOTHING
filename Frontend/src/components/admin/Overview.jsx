import React, { useState } from 'react';
import { FaDollarSign, FaSmile, FaChartLine, FaUsers, FaShoppingCart, FaBoxOpen, FaChartBar, FaTags } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';


const Overview = () => {
    return (
        <div className="container-fluid p-3" style={{ marginTop: '60px', backgroundColor: '#f8f9fa' }}>
            <div className="overview-section mt-5">
                <div className="row row-cols-1 row-cols-md-3 mb-5">
                    <InfoBox icon={FaDollarSign} color="text-success" label="Revenue" />
                    <InfoBox icon={FaSmile} color="text-primary" label="Happy Customers" />
                    <InfoBox icon={FaChartLine} color="text-danger" label="Expenses" />
                </div>
                <TimePeriodSelector />
                <div className="row row-cols-1 row-cols-md-4 mt-5">
                    <InfoBox icon={FaUsers} color="text-info" label="Customer Orders" />
                    <InfoBox icon={FaChartBar} color="text-warning" label="Average Sale" />
                    <InfoBox icon={FaShoppingCart} color="text-success" label="Average Item Sale" />
                    <InfoBox icon={FaDollarSign} color="text-primary" label="Total Sales" />
                    <NavLink to="/visitors" className="col">
                        <InfoBox icon={FaUsers} color="text-secondary" label="Visitors" />
                    </NavLink>
                    <InfoBox icon={FaBoxOpen} color="text-danger" label="Total Products" />
                    <InfoBox icon={FaTags} color="text-success" label="Top Selling Item" />
                    <InfoBox icon={FaChartBar} color="text-warning" label="Dealerships" />
                </div>
            </div>
        </div>
    );
};

const InfoBox = ({ icon: Icon, color, label }) => (
    <div className="col mb-4">
        <div className={`info-box bg-light p-3 rounded text-center ${color}`}>
            <Icon size={50} />
            <h5 className="mt-2">{label}</h5>
        </div>
    </div>
);

const TimePeriodSelector = () => {
    const [activePeriod, setActivePeriod] = useState('Today');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const periods = ['Today', 'Week', 'Month', 'Year'];

    return (
        <div className="time-period-selector mt-5 d-flex justify-content-between align-items-center">
            <div className="periods d-flex">
                {periods.map(period => (
                    <div
                        key={period}
                        className={`period ${activePeriod === period ? 'active' : ''}`}
                        onClick={() => setActivePeriod(period)}
                    >
                        {period}
                    </div>
                ))}
            </div>
            <div className="date-search d-flex align-items-center">
                <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <button className="btn btn-primary ml-2">Search</button>
            </div>
        </div>
    );
};

export default Overview;
