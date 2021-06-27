import React from "react";
import Popup from "./Popup";

const PopupWithForm = ({
  children,
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  closeButtonText,
}) => (
  <Popup isOpen={isOpen} onClose={onClose}>
    <form
      className="popup__container"
      name={name}
      noValidate
      onSubmit={onSubmit}
    >
      <button className="popup__close" type="button" />
      <h2 className="popup__title">{title}</h2>
      <fieldset className="popup__fieldset">
        {children}
        <input
          className="popup__button"
          type="submit"
          value={closeButtonText}
        />
      </fieldset>
    </form>
  </Popup>
);

export default PopupWithForm;
