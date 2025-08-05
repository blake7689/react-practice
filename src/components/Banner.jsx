import logo from "../assets/GloboLogo.png"
import {logo as logoClass} from "./Banner.module.css"
import { useNavigate } from "react-router";

// Banner component to display the logo and subtitle
// It uses the useNavigate hook to navigate to the home page when the logo is clicked.
const subtitleStyle = {
  fontStyle: "italic",
  fontSize: "x-large",
  color: "coral",
};

// The Banner component renders the logo and a subtitle
// It uses the useNavigate hook to allow navigation back to the home page when the logo is
// clicked. The children prop allows for additional content to be passed in, such as a subtitle.
// The logo is styled using a CSS module class.
const Banner = ({ children }) => {
  const navigate = useNavigate();
  return (
    <header className="row mb-4">
      <div className="col-5">
        <img src={logo} className={logoClass} alt="logo"
          onClick={() => navigate("/")}/>
      </div>
      <div className="col-7 mt-5" style={subtitleStyle}>
        {children}
      </div>
    </header>
  );
}

export default Banner;