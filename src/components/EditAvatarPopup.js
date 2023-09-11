import { useEffect, useContext, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateUser }) {
  //Подписываемся на глобальный контекст
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef(null);

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    avatarRef.current.value = currentUser.avatar;
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
    >
      <input
        className='popup-form__input'
        type='url'
        id='avatar'
        name='avatar'
        placeholder='Укажите ссылку на новый аватар пользователя'
        minLength='2'
        maxLength='500'
        required
        ref={avatarRef}
      />
      <span className='popup-form__error avatar-error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
