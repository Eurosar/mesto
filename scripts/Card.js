import {openPopup} from './index.js';

//Создаем класс карточки
export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
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
    this._element.querySelector('.place__favorite').classList.toggle('place__favorite_active');
  }

  // Удаляем карточки Place со страницы по нажатию на корзину
  _handleRemovePlace() {
    this._element.remove();
  }

  // Открываем картинку в модальном окне
  _handleClickImageOpen() {
    popupContainerImage.src = this._image;
    popupContainerImage.alt = this._title;
    popupContainerTitle.textContent = this._title;
    openPopup(popupPlaceImage);
  }

  // Создадим функцию, которая объединит все слушатели карточки
  _setEventListeners() {
    this._element.querySelector('.place__favorite').addEventListener('click', () => {
      this._handleLikePlace();
    });
    this._element.querySelector('.place__cart').addEventListener('click', () => {
      this._handleRemovePlace();
    });
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this._handleClickImageOpen();
    });
  }

  // Создадим функцию готовой карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.place__title').textContent = this._title;
    this._element.querySelector('.place__image').src = this._image;
    this._element.querySelector('.place__image').alt = this._title;

    return this._element;
  }
}
