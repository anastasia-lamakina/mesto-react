import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

import api from "../utils/api";
import Card from "./Card";

import UserAvatar from "./UserAvatar";

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onPlaceDelete,
  onPlacePicture,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (currentUser._id) {
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

  const handleLikeClick = async (cardId, isLikedByCurrentUser) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <div className="profile__picture-container" onClick={onEditAvatar}>
              <UserAvatar avatar={currentUser.avatar} />
            </div>
            <div className="profile__text-container">
              <div className="profile__name-container">
                <h1 className="profile__name">
                  {currentUser.name || "Жак-Ив Кусто"}
                </h1>
                <button
                  className="profile__edit-button"
                  type="button"
                  onClick={onEditProfile}
                />
              </div>
              <p className="profile__subtitle">
                {currentUser.about || "Исследователь океана"}
              </p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={() => onAddPlace({ cards, setCards })}
          />
        </section>
        <section className="destinations">
          <ul className="destinations__list">
            {cards.map((card) => (
              <Card
                {...card}
                key={card._id}
                onLikeClick={handleLikeClick}
                onPictureClick={onPlacePicture}
                onDeleteClick={(data) =>
                  onPlaceDelete({ ...data, cards, setCards })
                }
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;
