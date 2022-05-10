export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _errorHandler(res) {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + 'cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._errorHandler);
  }

  getProfileInfo() {
    return fetch(this._baseUrl + 'users/me', {
      headers: this._headers
    })
      .then(this._errorHandler);
  }

  changeUserInfo(data) {
    return fetch(this._baseUrl + 'users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      })
    })
      .then(this._errorHandler);
  }
  postNewCard(data) {
    return fetch(this._baseUrl + 'cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(this._errorHandler);
  }

  deleteCard(id) {
    return fetch(this._baseUrl + 'cards/' + id, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._errorHandler);
  }

  likeCard(method, cardId) {
    return fetch(this._baseUrl + 'cards/' + cardId + '/likes', {
      method: method,
      headers: this._headers,
    })
      .then(this._errorHandler);
  }

  updateAvatar(data) {
    return fetch(this._baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(this._errorHandler);
  }
}

