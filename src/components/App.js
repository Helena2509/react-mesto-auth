import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import Login from './Login.js';
import Footer from './Footer.js';
import PopupWithImage from './PopupWithImage.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import api from '../utils/utils.js';
import * as auth from './auth.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userData, setUserData] = useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  const history = useHistory();

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          Promise.all([api.getUserInfo(jwt), api.getInitialCards(jwt)]).then(
            ([user, cards]) => {
              setCurrentUser(user.data);
              setCards(cards);
            }
          )
          .catch((err) => {return console.log(err)});
          setLoggedIn(true);
          setUserData({
            email: res.data.email,
          });
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
    }
  };

  const handleLogin = (res) => {
    setLoggedIn(true);
    setUserData({
      email: res.email,
    });
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const jwt = localStorage.getItem('jwt');
    if (!isLiked) {
      api.setLike(card._id, jwt)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard.data : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
    } else {
      api.deleteLike(card._id, jwt).
      then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard.data : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    const jwt = localStorage.getItem('jwt');
    api.deleteCard(card._id, jwt)
    .then((newCard) => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    .catch((err) => console.log(err));
  }
  
  function handleInfoTooltip() {
    setInfoTooltipIsOpen(!infoTooltipIsOpen);
  };

  function handleInfoTooltipFail (res) {
    setInfoTooltipFail(res);
  }

  function closeInfoTooltipIsOpen() { 
    setInfoTooltipIsOpen(false);
  };

  const [infoTooltipIsOpen, setInfoTooltipIsOpen] = useState(false);

  const [infoTooltipFail, setInfoTooltipFail] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [isDeletePopupOpen, setIisDeletePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState();

  function handleUpdateUser(name, desc) {
    const jwt = localStorage.getItem('jwt');
    api.editUserInfo(name, desc, jwt)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(title, link) {
    const jwt = localStorage.getItem('jwt');
    api.addCard(title, link, jwt)
    .then((newCard) => {
      setCards([newCard.data, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    const jwt = localStorage.getItem('jwt');
    api.editAvatarInfo(avatar, jwt)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleDeleteClick() {
    setIisDeletePopupOpen(!isDeletePopupOpen);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function closeAllPopupsEscOverlay() {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    function closeByClick(evt) {
      if (evt.target.classList.contains('popup__overlay-black')) {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', closeByClick);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeByClick);
    };
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userData={userData} loggedIn={loggedIn} setLoggedIn={setLoggedIn}  />
        <Switch>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            handleDelete={handleDeleteClick}
            onCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            component={Main}
          /> </Switch>
          <Route path="/signup">
            <Register handleInfoTooltipFail={handleInfoTooltipFail} handleInfoTooltip={handleInfoTooltip} loggedIn={loggedIn} tokenCheck={tokenCheck} />
          </Route>
          <Route path="/signin">
            <Login handleInfoTooltipFail={handleInfoTooltipFail} handleInfoTooltip={handleInfoTooltip} handleLogin={handleLogin} setLoggedIn={setLoggedIn} loggedIn={loggedIn} tokenCheck={tokenCheck} />
          </Route>
         
        <Footer />

        <InfoTooltip infoTooltipFail={infoTooltipFail} handleInfoTooltip={handleInfoTooltip} infoTooltipIsOpen={infoTooltipIsOpen} closeInfoTooltipIsOpen={closeInfoTooltipIsOpen} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          closeEscOverlay={closeAllPopupsEscOverlay}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          closeEscOverlay={closeAllPopupsEscOverlay}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          closeEscOverlay={closeAllPopupsEscOverlay}
        />

        <PopupWithImage
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          closeEscOverlay={closeAllPopupsEscOverlay}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
