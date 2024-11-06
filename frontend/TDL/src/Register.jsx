import axios from 'axios';
import React from "react";
import { useEffect, useState } from "react";
import './Register.css'

// Changed to functional component
function Register() {
    // State declarations using hooks
    const [details, setDetails] = useState([]);
    const [postFormData, setPostFormData] = useState({});
    const [postResponse, setPostResponse] = useState(null);

    // useEffect replaces componentDidMount
    useEffect(() => {
        axios.get("http://localhost:8000/register/")
            .then(res => {
                setDetails(res.data);
            })
            .catch(err => console.log("Error:", err));
    }, []); // Empty dependency array means this runs once on mount

    // Function to navigate to sign in page
    const goToMain = () => {
        axios.get("http://localhost:8000/signin/")
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/register/", postFormData)
            .then(res => {
                console.log(res.data);
                setPostResponse(res.data);
                setPostFormData({});
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
            <p className="title">Sign Up</p>

            <form onSubmit={handleFormSubmit}>
                <input

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

export default Register;
