import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';

function Header(props) {
  let { email } = props.userData;
  const history = useHistory();

  const location = useLocation();

  function signOut(){
    localStorage.removeItem('jwt');
    props.setLoggedIn(false);
    history.push('/signin');
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__auth">
        {props.loggedIn ? 
        <>
        <p>{email}</p>
        <button onClick={signOut} className="header__button">Выйти</button> 
        </>
        : (location.pathname === ('/signin') ?
        <Link to="/signup" className="login__sub_link">Зарегестрироваться</Link> : 
        <Link to="/signin" className="login__sub_link">Войти</Link>)
        }
      </div>
    </header>
  );
}

export default Header;
