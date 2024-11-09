import React, { useState } from "react";
import axios from 'axios';
import './Register.css';
import PropTypes from "prop-types";
import eyeOpen from './assets/eyeopen.svg';
import eyeClosed from './assets/eyeclosed.svg';
import Header from './Header';

function Register(props) {
    // State declarations
    const [postFormData, setPostFormData] = useState({
        username: '',
        password: ''
    });
    const [postResponse, setPostResponse] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false); // New state for tracking form submission

    // Function to validate username and password
    const validateInput = (field, value) => {
        if (!value || value.trim() === '') {
            return "This field is required";
        }

        switch(field) {
            case 'username':
                if (/^[a-zA-Z0-9]+$/.test(value)) {
                    return null;
                }
                return "Username can only contain letters and numbers";
            case 'password':
                if (value.length >= 6 && /^[a-zA-Z0-9]+$/.test(value)) {
                    return null;
                }
                return "Password must be at least 6 characters and contain only letters and numbers";
            default:
                return null;
        }
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setPostFormData(prevData => ({
            ...prevData,
            [field]: value
        }));

        // Only validate if the form has been submitted
        if (isSubmitted) {
            const error = validateInput(field, value);
            setErrors(prevErrors => ({
                ...prevErrors,
                [field]: error
            }));
        }
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true); // Mark form as submitted

        // Validate all fields
        const newErrors = {};
        Object.entries(postFormData).forEach(([field, value]) => {
            newErrors[field] = validateInput(field, value);
        });

        setErrors(newErrors);

        // Check if there are any errors
        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        // Submit form if no errors
        axios.post("http://localhost:8000/register/", postFormData)
            .then(res => {
                setPostResponse(res.data);
                setPostFormData({ username: '', password: '' });
                setIsSubmitted(false); // Reset submission state
                props.setPage('Landing');
                props.changeVisibility(true);
            })
            .catch(err => {
                console.error("Error:", err.message);
            });
    };

    return (
        <div className='register-container'>
            {postResponse && (
                <p>POST Response: {JSON.stringify(postResponse)}</p>
            )}

            <Header/>
            <div className='form-div'>
                <form onSubmit={handleFormSubmit} className="registration-form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="register-username"
                            name="username"
                            type="text"
                            placeholder="Enter your username..."
                            value={postFormData.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            className={isSubmitted && errors.username ? 'error-input' : ''}
                        />
                        {isSubmitted && errors.username &&
                            <span className="error">{errors.username}</span>
                        }
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input
                                id="register-password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password..."
                                value={postFormData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                className={isSubmitted && errors.password ? 'error-input' : ''}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <img
                                    src={showPassword ? eyeOpen : eyeClosed}
                                    alt={showPassword ? "Hide password" : "Show password"}
                                />
                            </button>
                        </div>
                        {isSubmitted && errors.password &&
                            <span className="error">{errors.password}</span>
                        }
                    </div>

                    <button className="register-submit" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

Register.propTypes = {
    setPage: PropTypes.func.isRequired,
    changeVisibility: PropTypes.func.isRequired
};

export default Register;
