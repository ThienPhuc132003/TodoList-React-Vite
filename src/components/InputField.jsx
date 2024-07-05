import React from "react";
import Proptypes from "prop-types";
function InputField({ value, className, ...rest }) {
  return <input value={value} className={className} {...rest} />;
}

export default React.memo(InputField);
InputField.propTypes = {
  value: Proptypes.string,
  className: Proptypes.string,
};
