import React from "react";
import Proptypes from "prop-types";
const ButtonCompo = (props) => {
  const {
    onClick = () => {},
    children = null,
    onChange = () => {},
    ...rest
  } = props;
  return (
    <button onClick={onClick} onChange={onChange} {...rest}>
      {children}
    </button>
  );
};
const Button = React.memo(ButtonCompo);
export default Button;

ButtonCompo.propTypes = {
  onClick: Proptypes.func,
  onChange: Proptypes.func,
  children: Proptypes.node,
};
