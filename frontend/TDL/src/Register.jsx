import axios    from 'axios';
import { useState } from "react";
import './Register.css'
import PropTypes from "prop-types";
import eyeOpen from './assets/eyeopen.svg';
import eyeClosed from './assets/eyeclosed.svg';

// Changed to functional component
function Register(props) {
    // State declarations using hooks
    const [postFormData, setPostFormData] = useState({});
    const [postResponse, setPostResponse] = useState(null);
    const [showPassword, setShowPassword] = useState(false);


    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/register/", postFormData)
            .then(res => {
                console.log(res.data);
                setPostResponse(res.data);
                setPostFormData({});
                props.setPage('Landing');
                props.changeVisibility(true)

            })
            .catch(err => console.error("Error", err));
    };

    // Update form data
    const updateData = (newData) => {
        setPostFormData(prevData => ({
            ...prevData,
            ...newData
        }));
    };

    return (
        <>

            {postResponse && (
                <p>POST Response: {JSON.stringify(postResponse)}</p>
            )}
            <h2>Sign Up</h2>

            <form onSubmit={handleFormSubmit} className="registration-form">
                <div id="username-div">
                    <label className="label-username">Email</label>
                    <input
                        className = "register-username"
                        type="text"
                        placeholder="Enter your username..."
                        value={postFormData.username || ''}
                        onChange={(e) => updateData({username: e.target.value})}
                    />

                </div>

                <div id="password-div">
                    <label className="label-password">Password</label>
                    <input
                        className = "register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password..."
                        value={postFormData.password || ''}
                        onChange={(e) => updateData({password: e.target.value})}
                    />

                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <img src={eyeOpen} alt="Todoist Icon"/> :
                                         <img src={eyeClosed} alt="Todoist Icon"/>}
                    </button>

                </div>


                <button className="register-submit"type="submit">Submit</button>
            </form>
        </>
    );
}

Register.propTypes = {
    setPage: PropTypes.func.isRequired,
    changeVisibility: PropTypes.func.isRequired
};


export default Register;
