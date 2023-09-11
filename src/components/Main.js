import { useContext } from "react";
import avatar from "../images/avatar.png";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onPhotoClick,
  cards,
}) {
  //Подписываемся на глобальный контекст
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile-info'>
          <img
            className='profile-info__avatar'
            src={currentUser.avatar ? currentUser.avatar : avatar}
            alt='Фото профиля'
            onClick={onEditAvatar}
          />
          <div className='profile-info__avatar-hover'></div>
          <div className='profile-info__text'>
            <div className='profile-info__name'>
              <h1 className='profile-info__nametext'>{currentUser.name}</h1>
              <button
                className='profile-info__edit'
                aria-label='Редактировать'
                type='button'
                onClick={onEditProfile}
              ></button>
            </div>
            <p className='profile-info__description'>{currentUser.about}</p>
          </div>
        </div>
        <button
          className='profile__add'
          aria-label='Добавить'
          type='button'
          onClick={onAddPlace}
        ></button>
      </section>

      <section className='gallery'>
        <ul className='gallery-items'>
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onPhotoClick={onPhotoClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
