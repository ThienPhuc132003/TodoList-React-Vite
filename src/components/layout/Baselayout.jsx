import React from "react";
import Navbar from "../Navbar";
import PropTypes from "prop-types";

const BaseLayoutCompo = (props) => {
  const {
    showLogin = false,
    handleLogout = () => {},
    handleFurniturePage = () => {},
    children = null,
    handleCart = () => {},
  } = props;
  return (
    <>
      <Navbar
        showLogin={showLogin}
        handleLogout={handleLogout}
        handleFurniturePage={handleFurniturePage}
        handleCart={handleCart}
      />
      {children}
    </>
  );
};
const BaseLayout = React.memo(BaseLayoutCompo);
export default BaseLayout;
BaseLayoutCompo.propTypes = {
  showLogin: PropTypes.bool,
  handleLogout: PropTypes.func,
  handleFurniturePage: PropTypes.func,
  children: PropTypes.node,
  handleCart: PropTypes.func,
};
