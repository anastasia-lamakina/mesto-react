import React, { useEffect, useState } from "react";

import { api } from "../utils/api";
import Card from "./Card";
import PopupField from "./PopupField";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import UserAvatar from "./UserAvatar";

const Main = () => {
  const [editProfileModalData, setEditProfileModalData] = useState(null);
  const [editAvatarModalData, setEditAvatarModalData] = useState(null);
  const [addPlaceModalData, setAddPlaceModalData] = useState(null);
  const [pictureModalData, setPictureModalData] = useState(null);
  const [confirmModalData, setConfirmModalData] = useState(null);

  const [userProfile, setUserProfile] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      const { name, about, avatar, _id } = await api.getUserProfile();
      setUserProfile({
        name,
        about,
        avatar,
        _id,
      });

      const data = await api.getInitialCards();
      setCards(data);
    })();
  }, []);

  const handleLikeClick = async (cardId, isLikedByCurrentUser) => {
    let data;
    if (isLikedByCurrentUser) {
      data = await api.deleteLikeClick(cardId);
    } else {
      data = await api.putLikeClick(cardId);
    }

    const indexOfCard = cards.findIndex(({ _id: id }) => id === cardId);
    const copyOfCards = [...cards];
    copyOfCards[indexOfCard] = data;
    setCards(copyOfCards);
  };

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <div
              className="profile__picture-container"
              onClick={() => setEditAvatarModalData({})}
            >
              <UserAvatar avatar={userProfile.avatar}/>
            </div>
            <div className="profile__text-container">
              <div className="profile__name-container">
                <h1 className="profile__name">
                  {userProfile.name || "Жак-Ив Кусто"}
                </h1>
                <button
                  className="profile__edit-button"
                  type="button"
                  onClick={() => setEditProfileModalData({})}
                />
              </div>
              <p className="profile__subtitle">
                {userProfile.about || "Исследователь океана"}
              </p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={() => setAddPlaceModalData({})}
          />
        </section>
        <section className="destinations">
          <ul className="destinations__list">
            {cards.map((card, index) => (
              <Card
                {...card}
                key={index}
                isOwner={card.owner._id === userProfile._id}
                isLikedByCurrentUser={Boolean(
                  card.likes.find((like) => like._id === userProfile._id)
                )}
                onLikeClick={handleLikeClick}
                onPictureClick={setPictureModalData}
                onDeleteClick={setConfirmModalData}
                likes={card.likes.length}
              />
            ))}
          </ul>
        </section>
      </main>
      <PopupWithForm
        title="Редактировать профиль"
        name="profile-form"
        closeButtonText="Сохранить"
        isOpen={Boolean(editProfileModalData)}
        isLoading={editProfileModalData?.isLoading}
        validate
        onClose={() => {
          setEditProfileModalData(null);
        }}
        onSubmit={(data) => {
          setEditProfileModalData({ ...editProfileModalData, isLoading: true });
          api
            .patchUserInformation({
              name: data["profile-name"],
              about: data["profile-about"],
            })
            .then((data) => {
              setUserProfile(data);
              setEditProfileModalData(null);
            });
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
        onClose={() => {
          setEditAvatarModalData(null);
        }}
        onSubmit={(data) => {
          setEditAvatarModalData({ ...editAvatarModalData, isLoading: true });
          api.patchUserAvatar(data["profile-avatar"]).then((data) => {
            setUserProfile(data);
            setEditAvatarModalData(null);
          });
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
        onClose={() => {
          setAddPlaceModalData(null);
        }}
        onSubmit={(data) => {
          setAddPlaceModalData({ ...addPlaceModalData, isLoading: true });
          api
            .postNewCard({
              name: data["picture-name"],
              link: data["picture-url"],
            })
            .then((data) => {
              setCards([data, ...cards]);
              setAddPlaceModalData(null);
            });
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
        onClose={() => {
          setConfirmModalData(null);
        }}
        onSubmit={() => {
          setConfirmModalData({ ...confirmModalData, isLoading: true });
          api.deleteCard(confirmModalData.cardId).then(() => {
            setConfirmModalData(null);
            setCards(
              cards.filter((card) => card._id !== confirmModalData.cardId)
            );
          });
        }}
      />
    </>
  );
};

export default Main;
