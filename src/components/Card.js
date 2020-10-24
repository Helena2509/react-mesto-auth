import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const isOwn = props.card.owner === currentUser._id;
 
  const isLiked = props.card.likes ? props.card.likes.some((i) => i === currentUser._id) : false;

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? '' : 'element__delete-button_hidden'
  }`;

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? 'element__like-button_active' : ''
  }`;

  return (
    <div className="element" key={props.card._id}>
      <img
        className="element__image"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={handleClick}
      />
      <div className="element__description">
        <p className="element__heading">{props.card.name}</p>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-number">{props.card.likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </div>
  );
}

export default Card;
