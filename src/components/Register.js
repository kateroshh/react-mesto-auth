import { useState } from "react";
import "../pages/sign-up.css";

const Register = ({ onInfoTooltip }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    onInfoTooltip();
    console.log("OK");
  }

  return (
    <div className='registration'>
      <h3 className='registration__title'>Регистрация</h3>
      <form
        className='registration__form'
        name='registration'
        onSubmit={onSubmit}
      >
        <input
          className='registration__input'
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          minLength='2'
          maxLength='40'
          required
          onChange={handleChangeEmail}
          value={email || ""}
        />
        <input
          className='registration__input'
          type='password'
          id='password'
          name='password'
          placeholder='Пароль'
          minLength='6'
          maxLength='150'
          required
          onChange={handleChangePassword}
          value={password || ""}
        />
        <button className='registration__send' type='submit'>
          Зарегистрироваться
        </button>
      </form>
      <p className='registration__text'>
        Уже зарегистрированы?{" "}
        <a className='registration__link' href='/sign-in'>
          Войти
        </a>
      </p>
    </div>
  );
};

export default Register;
