import React from 'react';

function PopupWithImage(props) {

  React.useEffect(() => {
    props.closeEscOverlay()
  }, [props.isOpen]);

  return (
    <>
      <div
        className={`popup popup_type_image ${
          props.isOpen ? 'popup_opened' : ''
        }`}
      >
        <div className="popup__case">
          <img
            className="popup__image"
            src={props.card ? props.card.link : ''}
          />
          <p className="popup__description">{props.card ? props.card.name : ''}</p>
          <button
            type="button"
            className="popup__close-button popup__close-button_type_image"
            onClick={props.onClose}
          ></button>
        </div>
        <div className="popup__overlay-black popup__overlay-black_type_image"></div>
      </div>
    </>
  );
}

export default PopupWithImage;
