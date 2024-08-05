import React from "react";
import logo from "../assets/images/logoF1.png";
import Proptypes from "prop-types";
import { selectTotalQuantity } from "../redux/CartSlice";
import { useSelector } from "react-redux";
// import PropTypes from "prop-types";

const NavbarCompo = (props) => {
  const {
    showLogin = false,
    handleFurniturePage = () => {},
    handleLogout = () => {},
    handleCart = () => {},
  } = props;
  const totalQuantity = useSelector(selectTotalQuantity);
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
              <button className="nav-btn active" onClick={handleFurniturePage}>
                Furniture
              </button>
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
            <li>
              <i
                className="fa-solid fa-cart-shopping"
                style={{
                  color: "#ffffff",
                  cursor: "pointer",
                  margin: " 0 20px",
                }}
                onClick={handleCart}
              ></i>
              <i>{totalQuantity} </i>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};
const Navbar = React.memo(NavbarCompo);
export default Navbar;

NavbarCompo.propTypes = {
  showLogin: Proptypes.bool,
  handleLogout: Proptypes.func,
  handleFurniturePage: Proptypes.func,
  handleCart: Proptypes.func,
};
