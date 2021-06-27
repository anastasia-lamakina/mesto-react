import React from "react";

const PopupField = ({
  placeholder,
  name,
  minLength = undefined,
  maxLength = undefined,
  type = undefined
}) => (
  <label className="popup__field">
    <input
      className="popup__input"
      placeholder={placeholder}
      name={name}
      required
      minlength={minLength}
      maxlength={maxLength}
      type={type}
    />
    <span id={`${name}-error`} className="popup__span"></span>
  </label>
);

export default PopupField;
