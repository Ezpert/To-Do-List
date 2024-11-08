import React from "react";
import "./header.css";
import googleicon from "./assets/googleicon.svg"
import facebook from "./assets/facebook.svg"
import './header.css';
// import header.css when created
// and then import to app

const Header = () => {
    return (
    <>
        <div class="flex-column" >{/* in this div you have buttons with the logos to each web you will login into but the svg file had to be changed from svg to jsx
        the reason for that is because svg is a combination of html and svg and therefore it is better to use and translate it to jsx */}
            <button class="p-2">
                <img src={googleicon} alt="Google Icon" />
                Continue with Google
            </button>
            <button class="p-2">{/* in this div you have buttons with the logos to each web you will login into but the svg file had to be changed from svg to jsx
        the reason for that is because svg is a combination of html and svg and therefore it is better to use and translate it to jsx */}
                <img src={facebook} alt="facebook" />
                Continue with Facebook
            </button>
            <button class="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid" viewBox="0 0 256 315" class="u2emSEy" aria-hidden="true"><path fill="currentColor" d="M214 167c0 48 42 63 42 64s-7 22-22 44c-13 20-26 39-48 39-21 0-28-12-52-12s-31 12-51 12c-21 1-37-20-50-39-27-39-48-111-20-159 14-24 39-39 65-39 21-1 40 13 52 13s36-16 60-14c11 0 39 4 58 31-2 1-35 20-34 60M174 50c11-13 19-32 17-50-16 1-35 11-47 24a66 66 0 0 0-16 48c17 2 35-9 46-22"></path></svg>
                Continue with Apple
            </button>
        </div>
        
    </>
    )
}

export default Header;
