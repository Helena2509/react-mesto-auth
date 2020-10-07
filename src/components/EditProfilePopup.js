import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (currentUser !== null) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, description);
  }

  return (
    <>
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={props.isOpen}
        onClose={props.onClose}
        handleSubmit={handleSubmit}
        closeEscOverlay={props.closeEscOverlay}
      >
        <fieldset className="form__set">
          <label className="form__field">
            <input
              type="text"
              className="form__input form__input_name"
              id="name-input"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"
              value={name}
              onChange={handleChangeName}
            />
            <span className="form__input-error" id="name-input-error"></span>
          </label>
          <label className="form__field">
            <input
              type="text"
              className="form__input form__input_description form__input_type_bottom"
              id="description-input"
              placeholder="Занятие"
              required
              minLength="2"
              maxLength="200"
              value={description}
              onChange={handleChangeDescription}
            />
            <span
              className="form__input-error"
              id="description-input-error"
            ></span>
          </label>
          <button
            className={`form__submit-button form__submit-button_type_profile`}
          >
            Сохранить
          </button>
        </fieldset>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
