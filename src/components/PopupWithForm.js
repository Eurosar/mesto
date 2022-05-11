import {settingObject} from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm, checkInputsValue }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._checkInputsValue = checkInputsValue;
  }

  //Получаем объект из inputs формы
  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  // Открываем модальное окно
  open() {
    // Наследуем метод из родителя(Popup)
    super.open();
    // Проверяем, если эта функция не нужна, то не обращаем на нее внимания
    if (this._checkInputsValue) this._checkInputsValue();
  }

  // Закрываем модальное окно
  close() {
    // Наследуем метод из родителя(Popup)
    super.close();
    // Сбрасываем значения всех полей формы
    this._form.reset();
  }

  // Показываем пользователю, что происходит загрузка
  renderLoading(isLoading) {
    if (isLoading) {
      this._form.querySelector('.popup__btn').textContent = 'Сохранить...';
    }
    else {
      this._form.querySelector('.popup__btn').textContent = 'Сохранить';
    }
  }

  // Объединяем слушателей
  setEventListeners() {
    // Наследуем метод из родителя(Popup)
    super.setEventListeners();
    this._form = this._popupSelector.querySelector(settingObject.formSelector);
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }
}