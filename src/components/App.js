import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from "../utils/auth";
import * as token from "../utils/token";
import SuccessIcon from "../images/success_icon.svg";
import FailIcon from "../images/fail_icon.svg";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPhotoPopupOpen, setPhotoPopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccessTooltipStatus, setIsSuccessTooltipStatus] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = token.getToken();

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserData({ email: res.data.email, password: res.data.password });
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
        })
        .catch((err) => {
          console.log(
            "Ошибка получения данных пользователя и первоначального списка карточек",
            err
          );
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log("Ошибка получения новых данных setCards", err);
      });
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== id));
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки deleteCard", err);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handlePhotoClick() {
    setPhotoPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleTooltipOpen(isSuccess) {
    setIsTooltipOpen(true);
    setIsSuccessTooltipStatus(isSuccess);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setPhotoPopupOpen(false);
    setIsTooltipOpen(false);
  }

  function handleUpdateUser(user) {
    api
      .saveUserInfo(user.name, user.about)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка создания новой карточки", err);
      });
  }

  function handleUpdateUserAvatar(avatar) {
    api
      .saveUserAvatar(avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка обновления аватара", err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .createNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка создания новой карточки", err);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (!res || res.statusCode === 401 || !res?.token) {
          handleTooltipOpen(false);
        } else {
          setLoggedIn(true);
          setUserData({ email, password });
          token.setToken(res.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        handleTooltipOpen(false);
      });
  }

  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400 || res?.error) {
          handleTooltipOpen(false);
        } else {
          handleTooltipOpen(true);
          navigate("/signin", { replace: true });
          return res;
        }
      })
      .catch((err) => {
        console.log(err);
        handleTooltipOpen(false);
      });
  }

  function handleExitClick() {
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route
            path='*'
            element={loggedIn ? <Navigate to='/' /> : <Navigate to='signin' />}
          />
          <Route
            path='/'
            userData={userData}
            element={<Layout userData={userData} onExit={handleExitClick} />}
          >
            <Route
              index
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Main}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onPhotoClick={handlePhotoClick}
                  cards={cards}
                />
              }
            />
            <Route
              path='signup'
              element={<Register onRegister={handleRegister} />}
            />
            <Route path='signin' element={<Login onLogin={handleLogin} />} />
          </Route>
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUserAvatar}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isPhotoPopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          title={
            isSuccessTooltipStatus
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
          }
          icon={isSuccessTooltipStatus ? SuccessIcon : FailIcon}
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
