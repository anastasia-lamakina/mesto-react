import React, { useContext, useEffect, useState } from "react";
import ModalContext from "../contexts/ModalContext";
import PopupField from "./PopupField";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    if (modalContext.placeModal && !modalContext.placeModal.isLoading) {
      setName("");
      setUrl("");
    }
  }, [modalContext]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="profile-avatar-form"
      closeButtonText="Сохранить"
      validate
      isOpen={Boolean(modalContext.placeModal)}
      isLoading={modalContext.placeModal?.isLoading}
      onSubmit={onSubmit}
      onClose={onClose}
    >
      <PopupField
        name="picture-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={setName}
      />
      <PopupField
        name="picture-url"
        placeholder="Ссылка на картинку"
        minLength="2"
        maxLength="200"
        type="url"
        value={url}
        onChange={setUrl}
      />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
