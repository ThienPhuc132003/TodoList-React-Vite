import React from "react";
import Navbar from "../Navbar";
import PropTypes from "prop-types";

const handleBaseLayout = (props) => {
  const { showLogin = false, handleLogout = () => {}, children = null } = props;
  return (
    <>
      <Navbar showLogin={showLogin} handleLogout={handleLogout} />
      {children}
    </>
  );
};
const BaseLayout = React.memo(handleBaseLayout);
export default BaseLayout;
handleBaseLayout.propTypes = {
  showLogin: PropTypes.bool,
  handleLogout: PropTypes.func,
  children: PropTypes.node,
};
