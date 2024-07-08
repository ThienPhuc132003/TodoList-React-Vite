import React from "react";
import Proptypes from "prop-types";
const handleButton=(props)=> {
  const { onClick = () => {}, children = null, ...rest } = props;
  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
const Button= React.memo(handleButton);
export default Button

handleButton.propTypes = {
  onClick: Proptypes.func,
  children: Proptypes.node,
};
