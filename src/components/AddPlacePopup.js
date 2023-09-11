import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setText("");
    setLink("");
  }, [isOpen]);

  function handleChangeText(e) {
    setText(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: text,
      link,
    });
  }

  return (
    <PopupWithForm
      name='create'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Создать'
    >
      <input
        className='popup-form__input'
        type='text'
        id='title-card'
        name='name'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        required
        onChange={handleChangeText}
        value={text}
      />
      <span className='popup-form__error title-card-error'></span>
      <input
        className='popup-form__input'
        type='url'
        id='link-card'
        name='link'
        placeholder='Ссылка на картинку'
        required
        onChange={handleChangeLink}
        value={link}
      />
      <span className='popup-form__error link-card-error'></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
