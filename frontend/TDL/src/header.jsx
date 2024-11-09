import "./header.css";
import googleicon from "./assets/googleicon.svg"
import facebook from "./assets/facebook.svg"
import apple from "./assets/apple.svg"
import './header.css';
// import header.css when created
// and then import to app

const Header = () => {
    return (
    <>
        <div className="flex-column" >{/* in this div you have buttons with the logos to each web you will login into but the svg file had to be changed from svg to jsx
        the reason for that is because svg is a combination of html and svg and therefore it is better to use and translate it to jsx */}
            <button className="p-2">
                <img className="faang-svg" src={googleicon} alt="Google Icon" />
                Continue with Google
            </button>
            <button className="p-2">{/* in this div you have buttons with the logos to each web you will login into but the svg file had to be changed from svg to jsx
        the reason for that is because svg is a combination of html and svg and therefore it is better to use and translate it to jsx */}
                <img className="faang-svg" src={facebook} alt="facebook" />
                Continue with Facebook
            </button>
            <button className="p-2">
                <img className="faang-svg" src={apple} alt="apple"/>
                Continue with Apple
            </button>
        </div>
        
    </>
    )
}

export default Header;
