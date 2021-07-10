import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardContext from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

const App = () => {
  const [editProfileModalData, setEditProfileModalData] = useState(null);
  const [editAvatarModalData, setEditAvatarModalData] = useState(null);
  const [addPlaceModalData, setAddPlaceModalData] = useState(null);
  const [pictureModalData, setPictureModalData] = useState(null);
  const [confirmModalData, setConfirmModalData] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    _id: null,
    name: null,
    about: null,
    avatar: null,
  });

  const [cards, setCards] = useState([]);

  const handleCloseModal = () => {
    setEditProfileModalData(null);
    setEditAvatarModalData(null);
    setAddPlaceModalData(null);
    setPictureModalData(null);
    setConfirmModalData(null);
  };

  useEffect(() => {
    api
      .getUserProfile()
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({
          name,
          about,
          avatar,
          _id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const handleProfileSubmit = (data) => {
    setEditProfileModalData({
      ...editProfileModalData,
      isLoading: true,
    });

    api
      .patchUserInformation({
        name: data["profile-name"],
        about: data["profile-about"],
      })
      .then((data) => {
        setCurrentUser(data);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
        handleCloseModal();
      });
  };

  const handleProfileAvatarSubmit = (data) => {
    setEditAvatarModalData({
      ...editAvatarModalData,
      isLoading: true,
    });

    api
      .patchUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
        handleCloseModal();
      });
  };

  const handleAddPictureSubmit = (data) => {
    setAddPlaceModalData({
      ...addPlaceModalData,
      isLoading: true,
    });

    api
      .postNewCard({
        name: data["picture-name"],
        link: data["picture-url"],
      })
      .then((data) => {
        setCards([data, ...cards]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
        handleCloseModal();
      });
  };

  const handleConfirmModalSubmit = () => {
    setConfirmModalData({ ...confirmModalData, isLoading: true });
    api
      .deleteCard(confirmModalData.cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== confirmModalData.cardId));
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
        handleCloseModal();
      });
  };

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
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <Header />
        <Main
          onEditAvatar={setEditAvatarModalData}
          onEditProfile={setEditProfileModalData}
          onAddPlace={setAddPlaceModalData}
          onPlaceDelete={setConfirmModalData}
          onPlacePicture={setPictureModalData}
          onLikeClick={handleLikeClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={Boolean(editProfileModalData)}
          isLoading={editProfileModalData?.isLoading}
          onSubmit={handleProfileSubmit}
          onClose={handleCloseModal}
        />
        <EditAvatarPopup
          isOpen={Boolean(editAvatarModalData)}
          isLoading={editAvatarModalData?.isLoading}
          onSubmit={handleProfileAvatarSubmit}
          onClose={handleCloseModal}
        />
        <AddPlacePopup
          isOpen={Boolean(addPlaceModalData)}
          isLoading={addPlaceModalData?.isLoading}
          onSubmit={handleAddPictureSubmit}
          onClose={handleCloseModal}
        />
        <ConfirmPopup
          isOpen={Boolean(confirmModalData)}
          isLoading={confirmModalData?.isLoading}
          onSubmit={handleConfirmModalSubmit}
          onClose={handleCloseModal}
        />
        <ImagePopup
          isOpen={Boolean(pictureModalData)}
          onClose={handleCloseModal}
          name={pictureModalData?.name}
          link={pictureModalData?.link}
        />
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
