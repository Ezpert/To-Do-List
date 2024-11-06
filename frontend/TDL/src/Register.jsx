import axios from 'axios';
import { useState } from "react";
import './Register.css'
import PropTypes from "prop-types";

// Changed to functional component
function Register(props) {
    // State declarations using hooks
    const [postFormData, setPostFormData] = useState({});
    const [postResponse, setPostResponse] = useState(null);


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
        <div>
            {postResponse && (
                <p>POST Response: {JSON.stringify(postResponse)}</p>
            )}
            <p>Sign Up</p>

            <form onSubmit={handleFormSubmit}>
                <input
                    className = "Username"
                    type="text"
                    placeholder="Username"
                    value={postFormData.username || ''}
                    onChange={(e) => updateData({username: e.target.value})}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={postFormData.password || ''}
                    onChange={(e) => updateData({password: e.target.value})}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

Register.propTypes = {
    setPage: PropTypes.func.isRequired,
    changeVisibility: PropTypes.func.isRequired
};


export default Register;
