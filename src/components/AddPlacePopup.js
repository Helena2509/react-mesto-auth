import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.isOpen]);

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(title, link);
  }
  return (
    <>
      <PopupWithForm
        name="place"
        title="Новое место"
        isOpen={props.isOpen}
        onClose={props.onClose}
        handleSubmit={handleSubmit}
        closeEscOverlay={props.closeEscOverlay}
      >
        <fieldset className="form__set">
          <label className="form__field">
            <input
              type="text"
              className="form__input form__input_title"
              id="title-input"
              placeholder="Название"
              required
              minLength="1"
              maxLength="30"
              value={title}
              onChange={handleChangeTitle}
            />
            <span className="form__input-error" id="title-input-error"></span>
          </label>
          <label className="form__field">
            <input
              type="url"
              className="form__input form__input_link"
              id="link-input"
              placeholder="Ссылка на картинку"
              required
              value={link}
              onChange={handleChangeLink}
            />
            <span className="form__input-error" id="link-input-error"></span>
          </label>
          <button className="form__submit-button form__submit-button_type_place">
            Создать
          </button>
        </fieldset>
      </PopupWithForm>
    </>
  );
}

export default AddPlacePopup;
