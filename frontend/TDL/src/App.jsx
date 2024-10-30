import axios from 'axios'
import React from "react";
import Register from "./Register.jsx";


class App extends React.Component{

    constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      currentPage: 'Register'
    };
  }

  // Method to update the current page
  gotoPage = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    return (
      <div>
        <nav>
          <button onClick={() => this.gotoPage('Register')}>Home</button>
          <button onClick={() => this.gotoPage('Login')}>About</button>
        </nav>

        {this.state.currentPage === 'home' && <Register />}
        {this.state.currentPage === 'about' && <Login />}
      </div>
    );
  }






}


export default App;
