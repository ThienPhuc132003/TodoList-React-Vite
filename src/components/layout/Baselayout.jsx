import React from "react";
import Navbar from "../Navbar";
import PropTypes from "prop-types";

const BaseLayout = (props) => {
  const { showLogin = false, handleLogout = () => {}, children = null } = props;
  return (
    <>
      <Navbar showLogin={showLogin} handleLogout={handleLogout} />
      {children}
    </>
  );
};

export default React.memo(BaseLayout);
BaseLayout.propTypes = {
  showLogin: PropTypes.bool,
  handleLogout: PropTypes.func,
  children: PropTypes.node,
};