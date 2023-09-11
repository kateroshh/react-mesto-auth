import logo from "../images/header__logo.svg";
import menu from "../images/menu.svg";
import closeIcon from "../images/close_mobile.svg";
import { useState } from "react";

function Header() {
  const [isMenu, setIsMenu] = useState(true);

  function handleClickMenu() {
    document
      .querySelector(".header__text")
      .classList.toggle("header__menu_active");

    setIsMenu(!isMenu);
  }

  return (
    <>
      <header className='header'>
        <p className='header__text'>
          email@mail.com
          <a className='header__exit' href='#'>
            Выйти
          </a>
        </p>
        <div className='header__main'>
          <img className='header__logo' src={logo} alt='Логотип' />

          <img
            className='header__menu'
            src={isMenu ? menu : closeIcon}
            alt='Меню'
            onClick={handleClickMenu}
          />
        </div>
      </header>
    </>
  );
}

export default Header;
