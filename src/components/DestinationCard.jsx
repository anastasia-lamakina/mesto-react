import React from "react";

const LikeButton = ({ isLiked, onClick }) => (
  <button
    className={`destination-card__like-button ${
      isLiked && "destination-card__like-button_active"
    }`}
    type="button"
    onClick={onClick}
  />
);

const DestinationCard = ({
  name,
  link,
  likes,
  isOwner,
  isLikedByCurrentUser,
  _id: cardId,
  onLikeClick,
  onPictureClick,
  onDeleteClick,
}) => (
  <li className="destination-card">
    {isOwner && (
      <button
        className="destination-card__delete-button"
        type="button"
        onClick={() => onDeleteClick({ cardId })}
      />
    )}
    <img
      className="destination-card__picture"
      src={link}
      alt={name}
      onClick={() => onPictureClick({ link, name })}
    />
    <div className="destination-card__text-zone">
      <h2 className="destination-card__text">{name}</h2>
      <div className="destination-card__like-wrapper">
        <LikeButton
          isLiked={isLikedByCurrentUser}
          onClick={() => onLikeClick(cardId, isLikedByCurrentUser)}
        />
        <div className="destination-card__like-count">{likes}</div>
      </div>
    </div>
  </li>
);

export default DestinationCard;
