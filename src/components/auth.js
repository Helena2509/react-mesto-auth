export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => {
    if (res.status === 400) {
      return Promise.reject(`Hекорректно заполнено одно из полей`);
    } if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  })
  .then((res) => {
    return res;
  })
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => {
    if (res.status === 400) {
      return Promise.reject(`Hе передано одно из полей`);
    } if (res.status === 401) {
      return Promise.reject(`Пользователь с email не найден`);
    } if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  })
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      return data;
    })
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
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
  .then(data => data)
}