import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from './auth.js';


const Login = (props) => {

  React.useEffect(() => {
    resetForm();
  }, [props.loggedIn]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.message) {
          props.handleInfoTooltip();
          props.handleInfoTooltipFail(true);
        } else {
          console.log(data);
          props.tokenCheck();
          history.push('/');
          resetForm();
        }
      })
      .catch((err) => {
        props.handleInfoTooltip();
        props.handleInfoTooltipFail(true);
        console.log(err)});
  };

  return (
    <section className="login">
      <h2 className="login__header">Вход</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <label className="form__login_field">
          <input
            type="email"
            className="form__login_input"
            placeholder="Email"
            required
            minLength="5"
            id="email"
            name="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </label>
        <label className="form__reg_field">
          <input
            type="password"
            className="form__login_input"
            placeholder="Пароль"
            id="password"
            name="password"
            minLength="5"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            required
          />
        </label>
        <button className="form__login_submit-button">Войти</button>
      </form>
      <p className="login__sub">
        Ещё не зарегестрированны?{' '}
        <Link to="/signup" className="login__sub_link">
          Регестрация
        </Link>
      </p>
    </section>
  );
};

export default Login;
