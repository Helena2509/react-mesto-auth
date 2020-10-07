import React from 'react';

function PopupWithForm(props) {
  React.useEffect(() => {
  props.closeEscOverlay()
  }, [props.isOpen]);

  return (
<>
    <div
    className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}
  >
    <div className="popup__container">
      <h2 className={`popup__heading popup__heading_type_${props.name}`}>
        {props.title}
      </h2>
    <form className={`form form_type_${props.name}`} onSubmit={props.handleSubmit} noValidate>
        {props.children}
      </form>
      <button
        type="button"
        className={`popup__close-button popup__close-button_type_${props.name}`}
        onClick={props.onClose}
      ></button>
    </div>
    <div className={`popup__overlay-black popup__overlay-black_type_${props.name}`}></div>
  </div>
  </>
  );
}

export default PopupWithForm;
