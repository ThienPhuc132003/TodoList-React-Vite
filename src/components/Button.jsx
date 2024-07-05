import React from "react";
import Proptypes from "prop-types";
function Button(props) {
  const { onClick = () => {}, children = null, ...rest } = props;
  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
export default React.memo(Button);

Button.propTypes = {
  onClick: Proptypes.func,
  children: Proptypes.node,
};
