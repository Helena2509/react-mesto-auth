import React from 'react';
import successfull from '../images/successfully.png';
import fail from '../images/fail.png'


function InfoTooltip(props) {

  return (
    <>
    <div className={`popup__login ${props.infoTooltipIsOpen ? "popup_opened" : ""}`}>
    <div className="popup__login_container">
      <img className="popup__login_img" src={props.infoTooltipFail ? fail : successfull} alt="Изображение результата"></img>
      <h2 className="popup__login_heading">
        {props.infoTooltipFail ? 'Что-то пошло не так! Попробуйте еще раз.' : 'Вы успешно зарегестрировались!'}
      </h2>
      <button
        type="button"
        className="popup__close-button" onClick={props.closeInfoTooltipIsOpen} ></button>
    </div>
    <div className="popup__overlay-black"></div>
  </div>
  </>
  );
}

export default InfoTooltip;
