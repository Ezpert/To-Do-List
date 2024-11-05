import React, { useState } from "react";
import Register from "./Register.jsx";
import "./App.css";

function App() {
  // Initialize state using useState hook
  const [currentPage, setCurrentPage] = useState('Login');
  const [isRegisterButtonVisible, setIsRegisterButtonVisible] = useState(true);

  // Function to update the current page
  const gotoPage = (page) => {
    setCurrentPage(page);
  };

  // Function to handle Register button click
  const handleRegisterClick = () => {
    gotoPage('Register');
    setIsRegisterButtonVisible(false);
  };

  return (
    <>
      <div className="mainDiv">
        <button onClick={() => gotoPage('Landing')}>Back</button>
      </div>
      {isRegisterButtonVisible && (
        <button onClick={handleRegisterClick}>Register</button>
      )}
      {currentPage === 'Register' && <Register />}
    </>
  );
}

export default App;