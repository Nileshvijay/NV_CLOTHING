import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CBContext = createContext();

const CBProvider = ({ children }) => {
    const [CB, setCB] = useState([]);

    const fetchCB = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/banner/allBanner'); // Assuming 'allBanner' is the correct endpoint
            setCB(response.data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    useEffect(() => {
        fetchCB();
    }, []);

    return (
        <CBContext.Provider value={{ CB, fetchCB }}>
            {children}
        </CBContext.Provider>
    );
};

export default CBProvider;

