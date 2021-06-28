import React, { useState } from "react";
import ProfileEditIcon from "../images/profile-edit-icon.svg";
import ProfilePicture from "../images/profile-picture.jpg";

const UserAvatar = ({ avatar }) => {
  const [isEditIconShown, setIsEditIconShown] = useState(false);

  return (
    <>
      {isEditIconShown && (
        <img
          className="profile__picture-edit-icon"
          src={ProfileEditIcon}
          alt="Редактировать профиль"
        />
      )}
      <img
        className="profile__picture"
        src={avatar || ProfilePicture}
        alt="Фотография профиля"
        onMouseEnter={() => {
          setIsEditIconShown(true);
        }}
        onMouseLeave={() => {
          setIsEditIconShown(false);
        }}
      />
    </>
  );
};

export default UserAvatar;
