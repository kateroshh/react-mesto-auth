import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onPhotoClick, onCardLike, onCardDelete }) {
  //Количество лайков. Пишем проверку иначе выводит ошибку если кол-во лайков пусто
  const likesCount = card.likes.length ? card.likes.length : 0;

  const handleCardClick = () => {
    onCardClick({
      src: card.link,
      text: card.name,
    });
    onPhotoClick();
  };

  const handleCardLike = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card._id);
  };

  //Подписываемся на глобальный контекст
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `gallery-item__btnlike ${
    isLiked ? "gallery-item__btnlike_active" : ""
  }`;

  return (
    <div className='gallery-item-template'>
      <div className='gallery-item'>
        <img
          className='gallery-item__img'
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
        <div className='gallery-item__info'>
          <h2 className='gallery-item__text'>{card.name}</h2>
          <div className='gallery-item__like'>
            <button
              className={cardLikeButtonClassName}
              aria-label='Нравится'
              type='button'
              onClick={handleCardLike}
            ></button>
            <p className='gallery-item__textlikes'>{likesCount}</p>
          </div>
        </div>
        {isOwn && (
          <button
            className='gallery-item__delete'
            aria-label='Удалить'
            type='button'
            onClick={handleDeleteClick}
          ></button>
        )}
      </div>
    </div>
  );
}
export default Card;
