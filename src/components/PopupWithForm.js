function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  children,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className='popup__container'>
        <h3 className='popup__text'>{title}</h3>
        <p className='popup__error'>Заполните обязательные поля</p>
        <form
          className='popup__form popup-form'
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button className='popup-form__send' type='submit'>
            {buttonText || "Сохранить"}
          </button>
        </form>
        <button
          className={`popup__close popup__close_${name}`}
          aria-label='Закрыть'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
export default PopupWithForm;
