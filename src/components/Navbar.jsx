import React from "react";
import logo from "../assets/images/logoF1.png";
import Proptypes from "prop-types";
// import PropTypes from "prop-types";

const handleNavbar=(props) =>{
  const { showLogin = false, handleLogout = () => {} } = props;
  return (
    <>
      <div className="nav-box" />
      <div className="navigation">
        <ul className="btn-box">
          <div className="brand">
            <img src={logo} alt="logo" className="logo" />
            <p className="label">
              Phuc <br />
              Furniture
            </p>
          </div>
          {showLogin && (
            <li>
              <button className="nav-btn active">To-do list</button>
            </li>
          )}
        </ul>
        {showLogin && (
          <ul className="btn-box">
            <li id="logout-btn">
              <button className="nav-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
const Navbar=React.memo(handleNavbar);
export default Navbar

handleNavbar.propTypes = {
  showLogin: Proptypes.bool,
  handleLogout: Proptypes.func,
};
