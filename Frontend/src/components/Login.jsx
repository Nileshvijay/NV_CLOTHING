import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myntra from "../assets/myntra-coupons.jpg";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8080/api/user/login', { email, password })
            .then((response) => {
                const { token } = response.data;
                localStorage.setItem("token", token);
                const decodedToken = jwtDecode(token);

                if (decodedToken.role === "admin") {
                    navigate("/admin-dashboard");
                } else if (decodedToken.role === "user") {
                    navigate("/banner");
                } else {
                    console.error("Invalid role received from server");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    // Show error toast for invalid credentials
                    toast.error("Invalid email or password");
                } else {
                    console.error("Error during login:", error.message);
                }
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the state to show/hide password
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
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control pinkish-focus"
                                    id="exampleInputPassword1"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    style={{ zIndex: "2" }}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between px-4 py-2">
                            <button type="submit" className="btn btn-outline-success">Login</button>
                            <NavLink  to = '/forgot' className="small mt-3 text-decoration-none ">Forgot password?</NavLink>
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
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Login;
