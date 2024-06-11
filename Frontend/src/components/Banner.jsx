import React from 'react';
import banner1 from '../assets/banner1.webp';
import banner2 from '../assets/banner2.webp';
import banner3 from '../assets/banner3.webp';
import banner4 from '../assets/banner4.webp';
import banner5 from '../assets/banner5.webp';
import banner6 from '../assets/banner6.webp';
import banner7 from '../assets/banner7.webp';
import pic1 from '../assets/line1/pic1.webp';
import pic2 from '../assets/line1/pic2.webp';
import pic3 from '../assets/line1/pic3.webp';
import pic4 from '../assets/line1/pic4.webp';
import pic5 from '../assets/line1/pic5.webp';
import pic6 from '../assets/line1/pic6.webp';
import { NavLink } from 'react-router-dom';

function Banner() {
    return (
        <div className="container-fluid d-flex flex-column" style={{ marginTop: '100px' }}>
            <img
                src={banner1}
                alt="Banner 1"
                className="img-fluid"
            />
            <div className="d-flex justify-content-between">
                <div className="w-50 pr-1">
                    <img
                        src={banner2}
                        alt="Banner 2"
                        className="img-fluid"
                    />
                </div>
                <div className="w-50 pl-1">
                    <img
                        src={banner3}
                        alt="Banner 3"
                        className="img-fluid"
                    />
                </div>
            </div>
            <div className="w-100 ">
                <img
                    src={banner4}
                    alt="Banner 4"
                    className="img-fluid"
                />
            </div>
            <div className="col-12 d-flex justify-content-center  mw-100 overflow-hidden">
                <img src={banner5} alt="Banner 5" className="img-fluid" />
                <img src={banner6} alt="Banner 6" className="img-fluid" />
            </div>
            <div className="col-12  mw-100 overflow-hidden">
                <img src={banner7} alt="Banner 7" className="img-fluid" />
            </div>
            <div className="d-flex justify-content-between flex-wrap img-container mt-3">
            <NavLink to="/card" className="flex-item">
                <img src={pic1} alt="Pic 1" className="img-fluid" />
            </NavLink>
            <NavLink to="/card" className="flex-item">
                <img src={pic2} alt="Pic 2" className="img-fluid" />
            </NavLink>
            <NavLink to="/card" className="flex-item">
                <img src={pic3} alt="Pic 3" className="img-fluid" />
            </NavLink>
            <NavLink to="/card" className="flex-item">
                <img src={pic4} alt="Pic 4" className="img-fluid" />
            </NavLink>
            <NavLink to="/card" className="flex-item">
                <img src={pic5} alt="Pic 5" className="img-fluid" />
            </NavLink>
            <NavLink to="/card" className="flex-item">
                <img src={pic6} alt="Pic 6" className="img-fluid" />
            </NavLink>
        </div>
        </div>
    );
}

export default Banner;
