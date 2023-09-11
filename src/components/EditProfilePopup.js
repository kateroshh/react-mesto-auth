import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  //Подписываемся на глобальный контекст
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
    >
      <input
        className='popup-form__input'
        type='text'
        id='name'
        name='name'
        placeholder='Ваше имя'
        minLength='2'
        maxLength='40'
        required
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className='popup-form__error name-error'></span>
      <input
        className='popup-form__input'
        type='text'
        id='description'
        name='link'
        placeholder='Ваша профессия'
        minLength='2'
        maxLength='200'
        required
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span className='popup-form__error description-error'></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
