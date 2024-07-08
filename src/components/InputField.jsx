import React from "react";
import Proptypes from "prop-types";
const handleInputField=({ value, className, ...rest })=> {
  return <input value={value} className={className} {...rest} />;
}
const InputField =React.memo(handleInputField);
export default InputField

handleInputField.propTypes = {
  value: Proptypes.string,
  className: Proptypes.string,
};
