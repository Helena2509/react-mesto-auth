export default class Api {
  constructor(options) {
    this._baseURL = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(this._baseURL + '/cards', {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCard(name, link) {
    return fetch(this._baseURL + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
    }).catch((err) => {
      console.log(err);
    });
  }

  getUserInfo() {
    return fetch(this._baseURL + '/users/me', {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editUserInfo(name, desc) {
    return fetch(this._baseURL + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: desc,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
    }).catch((err) => {
      console.log(err);
    });
  }

  editAvatarInfo(avalink) {
    return fetch(this._baseURL + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avalink,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  setLike(id) {
    return fetch(this._baseURL + '/cards/likes/' + id, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLike(id) {
    return fetch(this._baseURL + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(id) {
    return fetch(this._baseURL + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


