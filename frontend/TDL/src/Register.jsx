import axios    from 'axios';
import { useState } from "react";
import './Register.css'
import PropTypes from "prop-types";
import eyeOpen from './assets/eyeopen.svg';
import eyeClosed from './assets/eyeclosed.svg';
import Header from './Header';
import videoFile from './assets/sign-in-video.mp4'

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
        <div className="register-page-main-container">
            <div className='register-container '>

                {postResponse && (
                    <p>POST Response: {JSON.stringify(postResponse)}</p>
                )}
                <h1 className="sign-up-text">Sign Up</h1>
                <Header/>
                <hr className="divider"></hr>
                <div className='form-div'>
                    <form onSubmit={handleFormSubmit} className="registration-form">
                        <div id="username-div">
                            <label className="label-username">Username</label>
                            <input
                                className="register-username"
                                type="text"
                                placeholder="Enter your username..."
                                value={postFormData.username || ''}
                                onChange={(e) => updateData({username: e.target.value})}
                            />

                        </div>

                        <div id="password-div">
                            <label className="label-password">Password</label>
                            <input
                                className="register-password"
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
                        <button className="register-submit" type="submit">Sign up with Username</button>
                    </form>
                    <div className="text-login-redirect-div">
                        Already signed up? <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();  // Prevents default link behavior
                            props.setPage('Landing');
                            props.changeVisibility(true);
                        }}
                        className="anchor-text-login"
                    >
                        Go to Login
                    </a>
                    </div>
                </div>
            </div>
            <div className="video-example-container">
                <video
                    src={videoFile}
                    width="750"
                    height="500"
                    autoPlay
                    muted
                    playsInline
                    poster="./assets/todoist.svg" // shows this image before video plays
                />
                <div className="sticky-note-div">
                    <p className="confession-para">Before Patolist, my to-do lists were scattered all around! Now,
                        everything is in order and in one place.</p>
                    <p className="confession-user-para">- Armando G.</p>
                </div>

            </div>
        </div>
    );
}

Register.propTypes = {
    setPage: PropTypes.func.isRequired,
    changeVisibility: PropTypes.func.isRequired
};


export default Register;
