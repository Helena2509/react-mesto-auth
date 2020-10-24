export default class Api {
  constructor(options) {
    this._baseURL = options.baseUrl;
  }

  getInitialCards(token) {
    return fetch(this._baseURL + '/cards', {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        } else {
          return res.json();
        }
      });
  }

  addCard(name, link, token) {
    return fetch(this._baseURL + '/cards', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data})
  };
  

  getUserInfo(token) {
    return fetch(this._baseURL + '/users/me', {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      if (res.status === 400) {
        return Promise.reject(`Токен не передан или передан не в том формате`);
      } if (res.status === 401) {
        return Promise.reject(`Переданный токен некорректен `);
      } if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data})
  }

  editUserInfo(name, desc, token) {
    return fetch(this._baseURL + '/users/me', {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: desc,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data})
  };

  editAvatarInfo(avalink, token) {
    return fetch(this._baseURL + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avalink,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        return res.json();
      }
    })    
    .then((data) => {
      return data})
  };

  setLike(id, token) {
    return fetch(this._baseURL + '/cards/likes/' + id, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        return res.json();
      }
    });
  }

  deleteLike(id, token) {
    return fetch(this._baseURL + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        return res.json();
      }
    });
  }

  deleteCard(id, token) {
    return fetch(this._baseURL + '/cards/' + id, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        return res.json();
      }
    });
  }
}
