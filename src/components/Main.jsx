import React, { useEffect, useState } from "react";
import ProfileEditIcon from "../images/profile-edit-icon.svg";
import ProfilePicture from "../images/profile-picture.jpg";
import { api } from "../utils/api";
import DestinationCard from "./DestinationCard";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar }) => {
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

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__picture-container" onClick={onEditAvatar}>
            <img
              className="profile__picture-edit-icon"
              src={ProfileEditIcon}
              alt="Редактировать профиль"
            />
            <img
              className="profile__picture"
              src={userProfile.avatar || ProfilePicture}
              alt="Фотография профиля"
            />
          </div>
          <div className="profile__text-container">
            <div className="profile__name-container">
              <h1 className="profile__name">
                {userProfile.name || "Жак-Ив Кусто"}
              </h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
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
          onClick={onAddPlace}
        />
      </section>
      <section className="destinations">
        <ul className="destinations__list">
          {cards.map((card) => (
            <DestinationCard {...card} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
