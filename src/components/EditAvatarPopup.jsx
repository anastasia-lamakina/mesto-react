import React, { useContext, useEffect, useState } from "react";
import ModalContext from "../contexts/ModalContext";
import PopupField from "./PopupField";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ onSubmit, onClose }) => {
  const [avatar, setAvatar] = useState("");
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    if (modalContext.avatarModal) {
      setAvatar("");
    }
  }, [modalContext]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="profile-avatar-form"
      closeButtonText="Сохранить"
      validate
      isOpen={Boolean(modalContext.avatarModal)}
      isLoading={modalContext.avatarModal?.isLoading}
      onSubmit={onSubmit}
      onClose={onClose}
    >
      <PopupField
        name="profile-avatar"
        placeholder="Ссылка"
        type="url"
        minLength="2"
        value={avatar}
        onChange={setAvatar}
      />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
