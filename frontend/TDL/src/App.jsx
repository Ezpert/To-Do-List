import React, { useState } from "react";
import Register from "./Register.jsx";
import "./App.css";

function App() {
  // Initialize state using useState hook
  const [currentPage, setCurrentPage] = useState('Landing');
  const [isRegisterButtonVisible, setIsRegisterButtonVisible] = useState(true);

  // New states variables for login
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  // Function to handle Register button click
  const handleRegisterClick = (page) => {
   setCurrentPage(page);
   //hide register button when not on landing page
    setIsRegisterButtonVisible(page === 'Landing')
  };

  //function to handle login submission
  const handleLogin = (e) => {
    e.preventDefault();
    //later we implement the logic
    console.log('Login attempted with:', username, password);
  };

  return (
    <div className={"mainDiv"}>
    {/* Only show back button when not on main page  */}
      {currentPage !== 'Landing' && (
          <button onClick={() => handleRegisterClick('Landing')}>
            Back to Main Page
          </button>
      )}

      {/* Landing on page with the log in logic */}
      {currentPage === 'Landing' && (
          <div className ="loginContainer">
            <h2>Login</h2>
            <form onSubmit{handleLogin}>
              <div className="inputGroup">

              </div>
            </form>
      )}

      {/* Logic of register button */}
      {isRegisterButtonVisible && (
          <button onClick={()=> handleRegisterClick('Register')}>
            Register
          </button>
      )}

    {/* Transition to register page */}
      {currentPage === 'Register' && <Register />}
    </div>
  );
}

export default App;