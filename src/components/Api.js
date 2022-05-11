export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Проверяем отправку запроса на ошибки
  _errorHandler(res) {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем Promise
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  /**
   * // Получаем данные карточек с сервера
   * @returns {Promise<Response>}
   */
  getInitialCards() {
    return fetch(this._baseUrl + 'cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._errorHandler);
  }

  /**
   * // Получаем данные пользователя с сервера
   * @returns {Promise<Response>}
   */
  getProfileInfo() {
    return fetch(this._baseUrl + 'users/me', {
      headers: this._headers
    })
      .then(this._errorHandler);
  }

  /**
   * // Меняем данные пользователя на сервере
   * @param data - массив из полей модального окна
   * @returns {Promise<Response>}
   */
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

  /**
   * // Отправляем новую карточку на сервер
   * @param data - массив из полей модального окна
   * @returns {Promise<Response>}
   */
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

  /**
   * // Удаляем карточку с сервера
   * @param cardId - id карточки
   * @returns {Promise<Response>}
   */
  deleteCard(cardId) {
    return fetch(this._baseUrl + 'cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._errorHandler);
  }

  /**
   * // Удаляем или ставим лайк на карточку
   * @param method {string} - DELETE or PUT
   * @param cardId - id карточки
   * @returns {Promise<Response>}
   */
  likeCard(method, cardId) {
    return fetch(this._baseUrl + 'cards/' + cardId + '/likes', {
      method: method,
      headers: this._headers,
    })
      .then(this._errorHandler);
  }

  /**
   * // Обновляем картинку аватара на сервере
   * @param data - массив из полей модального окна
   * @returns {Promise<Response>}
   */
  updateAvatar(data) {
    return fetch(this._baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._errorHandler);
  }
}

