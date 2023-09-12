import { useState } from "react";
import "../pages/sign-up.css";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
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
    onRegister({ email, password });
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
        <Link to='/signin' className='registration__link'>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;
