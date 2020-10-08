import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from './auth.js';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  function logIn() {
    auth
    .authorize(password, email)
    .then((data) => {
      if (data) {
        props.tokenCheck();
        history.push('/');
        props.handleInfoTooltip();
        props.handleInfoTooltipFail(false);
      }
    })
    .catch((err) => console.log(err))
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth.register(password, email)
    .then((res) => {
      if (res.error) {
        props.handleInfoTooltip();
        props.handleInfoTooltipFail(true);
      } else {
        setTimeout(logIn, 600);
      }
    })
    .then(() => resetForm())
    .catch((err) => {
      props.handleInfoTooltip();
      props.handleInfoTooltipFail(true);
      console.log(err)});
};


  return (
      <section className="login">
        <h2 className="login__header">Регистрация</h2>

        <form className="login__form" onSubmit={handleSubmit} >
          <label className="form__login_field">
            <input
              type="email"
              className="form__login_input"
              placeholder="Email"
              required
              minLength="5"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </label>
          <label className="form__login_field">
            <input
              type="password"
              className="form__login_input"
              placeholder="Пароль"
              required
              minLength="5"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </label>
          <button className="form__login_submit-button">
            Зарегестрироваться
          </button>
        </form>
        <p className="login__sub">
          Уже зарегестрированны? <Link to="/signin" className="login__sub_link">
            Войти
          </Link>
        </p>
      </section>
  );
  }

export default Register;
