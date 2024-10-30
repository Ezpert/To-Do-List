import React from "react";
import Register from "./Register.jsx";
import "./App.css"


class App extends React.Component{

    constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      currentPage: 'Login'
    };
  }

  // Method to update the current page
  gotoPage = (page) => {

    this.setState({ currentPage: page });
  };

  render() {
    return (
      <>

         <div className="mainDiv">

          <button onClick={() => this.gotoPage('Landing')}>Landing</button>
         </div>
          <button onClick={() => this.gotoPage('Register')}>Register</button>


        {this.state.currentPage === 'Register' && <Register />}


      </>
    );
  }






}


export default App;
