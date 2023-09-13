import logo from "../images/header__logo.svg";
import menu from "../images/menu.svg";
import closeIcon from "../images/close_mobile.svg";
import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import * as token from "../utils/token";

function Header({ userData, onExit }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleClickMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleRemoveToken() {
    token.removeToken();
    onExit();
  }

  return (
    <header className='header'>
      <Routes>
        <Route
          path='signup'
          element={
            <Link to='/signin' className='header__link'>
              Войти
            </Link>
          }
        />
        <Route
          path='signin'
          element={
            <Link to='/signup' className='header__link'>
              Регистрация
            </Link>
          }
        />
        <Route
          path='/'
          element={
            <>
              <p
                className={`header__text ${
                  isMenuOpen ? "header__menu_active" : ""
                }`}
              >
                {userData?.email || ""}
                <Link
                  to='/signin'
                  className='header__exit'
                  onClick={handleRemoveToken}
                >
                  Выйти
                </Link>
              </p>
            </>
          }
        />
      </Routes>

      <div className='header__main'>
        <img className='header__logo' src={logo} alt='Логотип' />

        <img
          className='header__menu'
          src={isMenuOpen ? closeIcon : menu}
          alt='Меню'
          onClick={handleClickMenu}
        />
      </div>
    </header>
  );
}

export default Header;
