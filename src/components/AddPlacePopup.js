import React, { useEffect, useState } from "react";
import PopupField from "./PopupField";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, isLoading, onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (isOpen && !isLoading) {
      setName("");
      setUrl("");
    }
  }, [isOpen, isLoading]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="profile-avatar-form"
      closeButtonText="Сохранить"
      validate
      isOpen={isOpen}
      isLoading={isLoading}
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
