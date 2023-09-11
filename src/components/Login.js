import { useState } from "react";
import "../pages/sign-in.css";

const Login = ({ onLogin }) => {
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
    onLogin({ email, password });
  }

  return (
    <div className='login'>
      <h3 className='login__title'>Вход</h3>
      <form className='login__form' name='login' onSubmit={onSubmit}>
        <input
          className='login__input'
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
          className='login__input'
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
        <button className='login__send' type='submit'>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
