//Создаем класс карточки
export default class Card {
  constructor({name, link, handleCardClick}, cardSelector) {
    this._title = name;
    this._image = link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  // Получаем клон шаблона карточки
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('.place')
      .cloneNode(true);
  }

  // Like фотографии
  _handleLikePlace() {
    this._likeButton.classList.toggle('place__favorite_active');
  }

  // Удаляем карточки Place со страницы по нажатию на корзину
  _handleRemovePlace() {
    this._element.remove();
  }

  // Создадим функцию, которая объединит все слушатели карточки
  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikePlace(evt);
    });
    this._element.querySelector('.place__cart').addEventListener('click', () => {
      this._handleRemovePlace();
    });
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  // Создадим функцию готовой карточки
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.place__favorite');
    this._setEventListeners();
    this._element.querySelector('.place__title').textContent = this._title;
    this._element.querySelector('.place__image').src = this._image;
    this._element.querySelector('.place__image').alt = this._title;

    return this._element;
  }
}
