import React from "react";

const DestinationCard = ({name, link, likes}) => {
  return (
    <li class="destination-card">
      <button class="destination-card__delete-button" type="button"></button>
      <img class="destination-card__picture" src={link} alt={name} />
      <div class="destination-card__text-zone">
        <h2 class="destination-card__text">{name}</h2>
        <div class="destination-card__like-wrapper">
          <button class="destination-card__like-button" type="button"></button>
          <div class="destination-card__like-count">{likes.length}</div>
        </div>
      </div>
    </li>
  );
};

export default DestinationCard;
