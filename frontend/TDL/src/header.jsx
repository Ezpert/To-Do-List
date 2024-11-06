import React from "react";
import "./header.css";

// import header.css when created
// and then import to app

const Header = () => {
    return (
    <>
        <div class="head">
            <h1>Login</h1>
        </div>
    
        <div class="flex-column" >
            <button class="p-2">Continue with Google</button>
            <button class="p-2">Continue with Facebook</button>
            <button class="p-2">Continue with Apple</button>
        </div>
        
    </>
    )
}

export default Header;

