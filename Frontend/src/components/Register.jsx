import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!validateMobile(mobile)) {
            setMobileError('Mobile number must be exactly 10 digits.');
            valid = false;
        } else {
            setMobileError('');
        }

        if (!valid) return;

        const formData = { name, age, email, mobile, password };
        axios.post("http://localhost:8080/api/user/register", formData)
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="container-fluid p-3" style={{ backgroundColor: '#FFD1DC' }}>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <form onSubmit={handleSubmit} className="border mt-5 p-3 rounded bg-light">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        {emailError && <div className="text-danger">{emailError}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputName1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputMobile1" className="form-label">Mobile number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputMobile1"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        {mobileError && <div className="text-danger">{mobileError}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAge1" className="form-label">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            id="exampleInputAge1"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
