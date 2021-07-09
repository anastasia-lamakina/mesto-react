import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupField from "./PopupField";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ModalContext from "../contexts/ModalContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

const App = () => {
  const [pictureModalData, setPictureModalData] = useState(null);
  const [confirmModalData, setConfirmModalData] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    _id: null,
    name: null,
    about: null,
    avatar: null,
  });

  const [modalState, setModalState] = useState({});

  const handleOpenModal = (modalName, data = {}) => {
    setModalState({
      [modalName]: data,
    });
  };

  const handleCloseModal = (modalName) => {
    setModalState({ [modalName]: undefined });
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

  const handleProfileSubmit = (data) => {
    setModalState({
      ...modalState,
      ["profileModal"]: {
        isLoading: true,
      },
    });

    api
      .patchUserInformation({
        name: data["profile-name"],
        about: data["profile-about"],
      })
      .then((data) => {
        setCurrentUser(data);
        handleCloseModal("profileModal");
      })
      .catch((error) => console.log(error));
  };

  const handleProfileAvatarSubmit = (data) => {
    setModalState({
      ...modalState,
      ["avatarModal"]: {
        isLoading: true,
      },
    });

    api
      .patchUserAvatar(data["profile-avatar"])
      .then((data) => {
        setCurrentUser(data);
        handleCloseModal("avatarModal");
      })
      .catch((error) => console.log(error));
  };

  const handleAddPictureSubmit = (data) => {
    setModalState({
      ...modalState,
      ["placeModal"]: {
        ...modalState.placeModal,
        isLoading: true,
      },
    });
    const { cards, setCards } = modalState["placeModal"];
    api
      .postNewCard({
        name: data["picture-name"],
        link: data["picture-url"],
      })
      .then((data) => {
        setCards([data, ...cards]);
        handleCloseModal("placeModal");
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
    <CurrentUserContext.Provider value={currentUser}>
      <ModalContext.Provider value={modalState}>
        <Header />
        <Main
          onEditAvatar={() => handleOpenModal("avatarModal")}
          onEditProfile={() => handleOpenModal("profileModal")}
          onAddPlace={(data) => handleOpenModal("placeModal", data)}
          onPlaceDelete={setConfirmModalData}
          onPlacePicture={setPictureModalData}
        />
        <Footer />
        <EditProfilePopup
          onSubmit={handleProfileSubmit}
          onClose={() => handleCloseModal("profileModal")}
        />
        <EditAvatarPopup
          onSubmit={handleProfileAvatarSubmit}
          onClose={() => handleCloseModal("avatarModal")}
        />
        <AddPlacePopup
          onSubmit={handleAddPictureSubmit}
          onClose={() => handleCloseModal("placeModal")}
        />
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
      </ModalContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
