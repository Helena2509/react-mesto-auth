import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  const avatar = React.useRef('');

  function handleSubmit(e) {
    const ava = avatar.current.value;
    e.preventDefault();
    props.onUpdateAvatar(ava);
  }

  return (
    <>
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={props.isOpen}
        onClose={props.onClose}
        handleSubmit={handleSubmit}
        closeEscOverlay={props.closeEscOverlay}
      >
        <fieldset className="form__set">
          <label className="form__field">
            <input
              type="url"
              className="form__input form__input_avatar"
              id="avatar-input"
              placeholder="Ссылка на картинку"
              required
              ref={avatar}
            />
            <span className="form__input-error" id="avatar-input-error"></span>
          </label>
          <button className="form__submit-button form__submit-button_type_avatar">
            Сохранить
          </button>
        </fieldset>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
