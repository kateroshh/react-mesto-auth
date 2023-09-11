import SuccessIcon from "../images/success_icon.svg";
import FailIcon from "../images/fail_icon.svg";

function InfoTooltip({ name, title, isSuccess, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className='popup__container popup-infotooltip'>
        <img className='popup-infotooltip__img' src={SuccessIcon} alt='Успех' />
        <h3 className='popup-infotooltip__text'>{title}</h3>
        <button
          className={`popup__close`}
          aria-label='Закрыть'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
export default InfoTooltip;
