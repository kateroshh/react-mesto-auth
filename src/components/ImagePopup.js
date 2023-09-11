function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup-photo ${isOpen ? "popup_opened" : ""}`}>
      <div className='popup__container popup__container_photo'>
        <img className='popup__img' src={card.src} alt={card.text} />
        <p className='popup__description'>{card.text}</p>
        <button
          className='popup__close popup__close_photo'
          aria-label='Закрыть'
          onClick={onClose}
          type='button'
        ></button>
      </div>
    </div>
  );
}
export default ImagePopup;
