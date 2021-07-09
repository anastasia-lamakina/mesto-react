import React from "react";

const PopupField = ({
  placeholder,
  name,
  minLength = undefined,
  maxLength = undefined,
  type = undefined,
  value,
  onChange,
}) => (
  <label className="popup__field">
    <input
      className="popup__input"
      placeholder={placeholder}
      name={name}
      required
      minLength={minLength}
      maxLength={maxLength}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <span id={`${name}-error`} className="popup__span"></span>
  </label>
);

export default PopupField;
