import { useState } from "react";
import Register from "./Register.jsx";
import Header from "./header.jsx";
import "./App.css";
import todoIcon from './assets/todoist.svg'


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
      {/* Back button */}
      {currentPage !== 'Landing' && (
          <button className="landingButton"onClick={() => handleRegisterClick('Landing')}>
              <img src={ todoIcon }  alt="Todoist Icon"/>
          </button>
      )}


      {/* Landing page with login form */}
      {currentPage === 'Landing' && (
          <div className="loginContainer">

            <h2>Login</h2>


            <form className="login-form" onSubmit={(e) => handleLogin(e)}>  {/* Corrected syntax here */}
              <div className="inputGroup">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="inputGroup">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Login</button>
            </form>

            {/* Register button */}
            {isRegisterButtonVisible && (
                <button onClick={() => handleRegisterClick('Register')}>
                  Register
                </button>
            )}
          </div>
      )}

      {/* Register component */}
      {currentPage === 'Register' && <Register setPage={setCurrentPage} changeVisibility={setIsRegisterButtonVisible}/>}
    </div>
  );
}

export default App;