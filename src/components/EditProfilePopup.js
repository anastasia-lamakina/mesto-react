import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ModalContext from "../contexts/ModalContext";
import PopupField from "./PopupField";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const modalContext = useContext(ModalContext);
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    if (modalContext.profileModal) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [modalContext]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-form"
      closeButtonText="Сохранить"
      isOpen={Boolean(modalContext.profileModal)}
      isLoading={modalContext.profileModal?.isLoading}
      onSubmit={onSubmit}
      validate
      onClose={onClose}
    >
      <PopupField
        name="profile-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={setName}
      />
      <PopupField
        name="profile-about"
        placeholder="Вид деятельности"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={setDescription}
      />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
