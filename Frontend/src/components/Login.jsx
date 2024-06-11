import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import myntra from "../assets/myntra-coupons.jpg";

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8080/api/user/login',{ email, password })
            .then((response) => {
                const { token } = response.data;
                localStorage.setItem("token", token);
        
                const decodedToken = jwtDecode(token);

                if (decodedToken.role === "admin") {
                    navigate("/*");
                } else if (decodedToken.role === "user") {
                    navigate("/banner");
                } else {
                    console.error("Invalid role received from server");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.error("Invalid credentials");
                  
                } else {
                    console.error("Error during login:", error.message);
                }   
            });
    };

    const showPassword = () => {
        let password = document.getElementById("customerPassword");
        let checkbox = document.getElementById("checkPassword");
        if (checkbox.checked === true) {
            password.type = "text";
        } else {
            password.type = "password";
        }
    };

    return (
        <div className="container-fluid p-3" style={{ backgroundColor: '#FFD1DC' }}>
            <div className="row justify-content-center align-items-center vh-100 mt-4">
                <div className="col-lg-4 col-md-6 col-sm-8">
                    <form onSubmit={handleSubmit} className="border w-100 bg-light rounded mt-5">
                        <img src={myntra} alt="Your Image" className="w-100" />
                        <div className="py-2 px-4 w-100">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control pinkish-focus"
                                id="exampleInputEmail1"
                                name="email"
                                aria-describedby="emailHelp"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="py-2 px-4 w-100">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control pinkish-focus"
                                id="exampleInputPassword1"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-between px-4 py-2">
                            <button type="submit" className="btn btn-outline-success">Login</button>
                            <h1 className="small mt-3">Forgot password?</h1>
                        </div>
                        <div style={{ paddingTop: '10px' }}>
                            <div className="d-flex align-items-center">
                                <hr className="flex-grow-1 mx-2" />
                                <h1 className="small mb-0">Don't have an account</h1>
                                <hr className="bg-primary flex-grow-1 mx-2" />
                            </div>
                            <div className="text-center py-3">
                                <NavLink to="/register" className="btn btn-outline-danger">Sign Up</NavLink>
                            </div>
                        </div>
                    </form>
                  
                </div>
            </div>
        </div>
    );
    
}
export default Login;

