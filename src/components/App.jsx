import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupField from "./PopupField";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";

const App = () => {
  const [editProfileModalData, setEditProfileModalData] = useState(null);
  const [editAvatarModalData, setEditAvatarModalData] = useState(null);
  const [addPlaceModalData, setAddPlaceModalData] = useState(null);
  const [pictureModalData, setPictureModalData] = useState(null);
  const [confirmModalData, setConfirmModalData] = useState(null);

  const handleProfileSubmit = (data) => {
    setEditProfileModalData({ ...editProfileModalData, isLoading: true });
    const { setUserProfile } = editProfileModalData;
    api
      .patchUserInformation({
        name: data["profile-name"],
        about: data["profile-about"],
      })
      .then((data) => {
        setUserProfile(data);
        setEditProfileModalData(null);
      })
      .catch((error) => console.log(error));
  };

  const handleProfileAvatarSubmit = (data) => {
    setEditAvatarModalData({ ...editAvatarModalData, isLoading: true });
    const { setUserProfile } = editAvatarModalData;

    api
      .patchUserAvatar(data["profile-avatar"])
      .then((data) => {
        setUserProfile(data);
        setEditAvatarModalData(null);
      })
      .catch((error) => console.log(error));
  };

  const handleAddPictureSubmit = (data) => {
    setAddPlaceModalData({ ...addPlaceModalData, isLoading: true });
    const { cards, setCards } = addPlaceModalData;
    api
      .postNewCard({
        name: data["picture-name"],
        link: data["picture-url"],
      })
      .then((data) => {
        setCards([data, ...cards]);
        setAddPlaceModalData(null);
      })
      .catch((error) => console.log(error));
  };

  const handleConfirmModalSubmit = () => {
    setConfirmModalData({ ...confirmModalData, isLoading: true });
    api
      .deleteCard(confirmModalData.cardId)
      .then(() => {
        const { setCards, cards } = confirmModalData;
        setCards(cards.filter((card) => card._id !== confirmModalData.cardId));
        setConfirmModalData(null);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Header />
      <Main
        onEditAvatar={setEditAvatarModalData}
        onEditProfile={setEditProfileModalData}
        onAddPlace={setAddPlaceModalData}
        onPlaceDelete={setConfirmModalData}
        onPlacePicture={setPictureModalData}
      />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="profile-form"
        closeButtonText="Сохранить"
        isOpen={Boolean(editProfileModalData)}
        isLoading={editProfileModalData?.isLoading}
        onSubmit={handleProfileSubmit}
        validate
        onClose={() => {
          setEditProfileModalData(null);
        }}
      >
        <PopupField
          name="profile-name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
        />
        <PopupField
          name="profile-about"
          placeholder="Вид деятельности"
          minLength="2"
          maxLength="200"
        />
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        name="profile-avatar-form"
        closeButtonText="Сохранить"
        validate
        isOpen={Boolean(editAvatarModalData)}
        isLoading={editAvatarModalData?.isLoading}
        onSubmit={handleProfileAvatarSubmit}
        onClose={() => {
          setEditAvatarModalData(null);
        }}
      >
        <PopupField
          name="profile-avatar"
          placeholder="Ссылка"
          type="url"
          minLength="2"
        />
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="picture-form"
        closeButtonText="Создать"
        validate
        isOpen={Boolean(addPlaceModalData)}
        isLoading={addPlaceModalData?.isLoading}
        onSubmit={handleAddPictureSubmit}
        onClose={() => {
          setAddPlaceModalData(null);
        }}
      >
        <PopupField
          name="picture-name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
        />
        <PopupField
          name="picture-url"
          placeholder="Ссылка на картинку"
          minLength="2"
          maxLength="200"
          type="url"
        />
      </PopupWithForm>
      <ImagePopup
        isOpen={Boolean(pictureModalData)}
        onClose={() => setPictureModalData(null)}
        name={pictureModalData?.name}
        link={pictureModalData?.link}
      />
      <PopupWithForm
        title="Вы уверены?"
        closeButtonText="Да"
        isOpen={Boolean(confirmModalData)}
        isLoading={confirmModalData?.isLoading}
        onSubmit={handleConfirmModalSubmit}
        onClose={() => {
          setConfirmModalData(null);
        }}
      />
    </>
  );
};

export default App;
