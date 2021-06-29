import React, { useEffect, useState } from "react";

import { api } from "../utils/api";
import Card from "./Card";

import UserAvatar from "./UserAvatar";

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onPlaceDelete,
  onPlacePicture,
}) => {
  const [userProfile, setUserProfile] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { name, about, avatar, _id } = await api.getUserProfile();
        setUserProfile({
          name,
          about,
          avatar,
          _id,
        });

        const data = await api.getInitialCards();
        setCards(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
            <div
              className="profile__picture-container"
              onClick={() => onEditAvatar({ setUserProfile })}
            >
              <UserAvatar avatar={userProfile.avatar} />
            </div>
            <div className="profile__text-container">
              <div className="profile__name-container">
                <h1 className="profile__name">
                  {userProfile.name || "Жак-Ив Кусто"}
                </h1>
                <button
                  className="profile__edit-button"
                  type="button"
                  onClick={() => onEditProfile({ setUserProfile })}
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
            onClick={() => onAddPlace({ cards, setCards })}
          />
        </section>
        <section className="destinations">
          <ul className="destinations__list">
            {cards.map((card) => (
              <Card
                {...card}
                key={card._id}
                isOwner={card.owner._id === userProfile._id}
                isLikedByCurrentUser={Boolean(
                  card.likes.find((like) => like._id === userProfile._id)
                )}
                onLikeClick={handleLikeClick}
                onPictureClick={onPlacePicture}
                onDeleteClick={(data) =>
                  onPlaceDelete({ ...data, cards, setCards })
                }
                likes={card.likes.length}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;
