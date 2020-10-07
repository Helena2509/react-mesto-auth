
import Api from './Api.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '02a3d997-e4eb-47bc-b832-a3089c38bc48',
    'Content-Type': 'application/json',
  },
});

export default api;