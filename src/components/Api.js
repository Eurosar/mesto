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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
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
}

