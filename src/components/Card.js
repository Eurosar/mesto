import {api} from './index.js';
import PopupWithForm from "./PopupWithForm";
import {popupConfirmationSelector} from "../utils/constants";

//Создаем класс карточки
export default class Card {
  constructor({name, link, likes, _id, owner, userInfo, handleCardClick}, cardSelector) {
    this._title = name;
    this._image = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;

    this._userInfo = userInfo;
  }

  // Получаем клон шаблона карточки
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('.place')
      .cloneNode(true);
  }

  // Like фотографии
  // Like фотографии, устанавливаем или снимаем
  _handleLikePlace() {

    // если лайк уже стоит, то удаляем и наоборот
    api.likeCard(this._setLike ? 'DELETE' : 'PUT', this._id).then(res => {
      console.log('res:', res);

      // получив новые данные, запомним их
      this._likes = res.likes;

      // поставим новое кол-во лайков
      this._likeCounter.textContent = res.likes.length;

      // а так же сменим статус текущего лайка на противоположный
      this._setLike = !this._setLike;

      // и удалим или оставим класс на лайке
      if (this._setLike) {
        this._likeButton.classList.add('place__favorite_active');
      } else {
        this._likeButton.classList.remove('place__favorite_active');
      }
    });
  }

  // удаляем
  openPopupTrash() {

    // готовим модальное окно
    const popup = new PopupWithForm({
      popupSelector: popupConfirmationSelector,
      handleSubmitForm: () => {
        api.deleteCard(this._id)
          .then(() => {

            this.handleRemovePlace();
          })
          // Выводим ошибку, если что-то пошло не так
          .catch((err) => console.log(err));

      },
    });

    // открываем
    popup.open();

    // слушаем
    popup.setEventListeners();
  }

  // Показываем корзину, если картинка своя
  _checkOwnerId() {

    const userData = this._userInfo.getUserInfo()

    // проверяем, совпадает ли наш айди юзера с айди автора
    if (userData._id === this._owner._id) {
      this._element.querySelector('.place__cart').classList.add('place__cart-active');
    }
  }

  _checkUsersLike() {

    // получим данные юзера
    const userData = this._userInfo.getUserInfo()

    // идем по всем лайкам, чтобы узнать
    for (let k in this._likes) {
      // если айди текущего юзера и лайка совпадают
      if (this._likes[k]._id === userData._id) {

        // поставим лайк и пометим, что он стоит
        this._likeButton.classList.add('place__favorite_active');
        this._setLike = true;

        console.warn('лукас стоит на фото:', this._title);

        // досрочно завершаем цикл
        break;
      }
    }
  }


  // Удаляем карточки Place со страницы по нажатию на корзину
  handleRemovePlace() {
    this._element.remove();
    this._element = null;
  }

  // Создадим функцию, которая объединит все слушатели карточки
  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikePlace(evt);
    });
    this._element.querySelector('.place__cart').addEventListener('click', () => {
      this.openPopupTrash();
    });
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  // Создадим функцию готовой карточки
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.place__favorite');
    this._likeCounter = this._element.querySelector('.place__like-counter');
    this._imageData = this._element.querySelector('.place__image');
    this._setEventListeners();
    this._element.querySelector('.place__title').textContent = this._title;
    this._imageData.src = this._image;
    this._imageData.alt = this._title;
    this._likeCounter.textContent = this._likes.length;
    // проверим авторство данной картинки
    this._checkOwnerId();

    // проверим установку лайка текущим юзером
    this._checkUsersLike();
    return this._element;
  }
}