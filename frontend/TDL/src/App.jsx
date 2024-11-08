import { useState } from "react";
import Register from "./Register.jsx";
import Header from "./header.jsx";
import TaskPage from "./pageTask.jsx";
import "./App.css";
import todoIcon from './assets/todoist.svg'


function App() {
  // State variables
  const [currentPage, setCurrentPage] = useState('Landing');
  const [isRegisterButtonVisible, setIsRegisterButtonVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // New state for error messages

  //Function to validate the login from the login form inputs
  const validateForm = () => {
    let tempErrors = {}; //Temporary object to store error messages
    let isValid = true; // Flag to indicate if the form is valid

    //validate the username
    if (!username.trim()) { //checks if username is empty or only whitespace
      tempErrors.username = "Username is required"; //sets error message if username is invalid
      isValid = false;
    }

    //Now validate the password
    if (!password.trim()) { //checks if password is empty or only white space
      tempErrors.password = "Password is required"; //sets error message if password is invalid
      isValid = false;
    } else if (password.length < 6) { //if password is less than 6 not accept
      tempErrors.password = "Password must be at least 6 characters"; //set error message if password is too short
      isValid = false;
    }

    setErrors(tempErrors); //updates the errors state with ant validation errors
    return isValid; //returns whether the form is valid (password)
  };

  //Function to handle register button click
  const handleRegisterClick = (page) => {
    setCurrentPage(page);
    //hide register button when not on landing page
    setIsRegisterButtonVisible(page === 'Landing')
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault(); //prevents default form submission behavior

    if (validateForm()) { //Proceed if the login is valid which means user entered something
      try {
        // Here you would typically make an API call to your backend
        // For now, we'll just simulate a successful login
        setCurrentPage('Tasks');
      } catch (error) { //catches and handles any errors might occur in login
        setErrors({ submit: "Login failed. Please try again." }); //sets a submission error message
      }
    }
  };

  return (
    <div className={"mainDiv"}>
      {/* Display "Back to Main Page" button when not on the Landing page */}
      {currentPage !== 'Landing' && (
          <button className="landingButton"onClick={() => handleRegisterClick('Landing')}>
              <img src={ todoIcon }  alt="Todoist Icon"/>
          </button>
      )}
      {/* Display login form if current page is 'Landing' */}
      {currentPage === 'Landing' && (
        <div className="loginContainer">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            {/* Username input field with validation */}
            <div className="inputGroup">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} //updates the username state on change
                className={errors.username ? "error" : ""} //Applies error styling if username validation fails
              />
              {errors.username && ( //displays an error message if username has an error
                <span className="errorMessage">{errors.username}</span>
              )}
            </div>
            {/* Password input field with validation */}
            <div className="inputGroup">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} //updates password state on change
                className={errors.password ? "error" : ""} // applies error styling if password validation fails
              />
              {errors.password && ( //displays error message if password has an error
                <span className="errorMessage">{errors.password}</span>
              )}
            </div>
            {/* Submission error message */}
            {errors.submit && (
              <span className="errorMessage">{errors.submit}</span>
            )}
            <button type="submit">Login</button> {/* Login submission button */}
          </form>
          {/* Register button, visible only on the Landing page */}
          {isRegisterButtonVisible && (
            <button onClick={() => handleRegisterClick('Register')}>
              Register
            </button>
          )}
        </div>
      )}
      {/* Render Register component when current page is 'Register' */}
      {currentPage === 'Register' && <Register />}
      {/* Render TaskPage component when current page is 'Tasks' */}
      {currentPage === 'Tasks' && <TaskPage username={username} />}
    </div>
  );
}

export default App;