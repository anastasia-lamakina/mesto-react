import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupField from "./PopupField";
import PopupWithForm from "./PopupWithForm";

const App = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);

  return (
    <>
      <Header />
      <Main
        onEditProfile={() => {
          setIsEditProfileOpen(true);
        }}
        onAddPlace={() => {
          setIsAddPlaceOpen(true);
        }}
        onEditAvatar={() => {
          setIsEditAvatarOpen(true);
        }}
      />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="profile-form"
        closeButtonText="Сохранить"
        isOpen={isEditProfileOpen}
        onClose={() => {
          setIsEditProfileOpen(false);
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
        isOpen={isEditAvatarOpen}
        onClose={() => {
          setIsEditAvatarOpen(false);
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
        isOpen={isAddPlaceOpen}
        onClose={() => {
          setIsAddPlaceOpen(false);
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
      <div className="popup popup_picture">
        <div className="popup__picture-container">
          <button className="popup__close" type="button"></button>
          <img className="popup__image" src="#" alt="#" />
          <p className="popup__subtitle"></p>
        </div>
      </div>
      <div className="popup popup_confirm">
        <form className="popup__container">
          <button className="popup__close" type="button"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <input className="popup__button" type="submit" value="Да" />
        </form>
      </div>
      <template id="destination-card__template">
        <li className="destination-card">
          <button
            className="destination-card__delete-button"
            type="button"
          ></button>
          <img className="destination-card__picture" src="#" alt="#" />
          <div className="destination-card__text-zone">
            <h2 className="destination-card__text"></h2>
            <div className="destination-card__like-wrapper">
              <button
                className="destination-card__like-button"
                type="button"
              ></button>
              <div className="destination-card__like-count">0</div>
            </div>
          </div>
        </li>
      </template>
    </>
  );
};

export default App;
