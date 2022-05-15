import {settingObject} from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm, checkInputsValue, noLoading }) {
    super(popupSelector);
    this.handleSubmitForm = handleSubmitForm;
    this._checkInputsValue = checkInputsValue;
    this._form = this._popup.querySelector(settingObject.formSelector);
    this._inputList = this._popup.querySelectorAll(settingObject.inputSelector);
    this._popupButton = this._form.querySelector(settingObject.submitButtonSelector);
    this._noLoading = noLoading;
  }

  //Получаем объект из inputs формы
  _getInputValues() {

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
        this._popupButton.textContent = 'Сохранить...';
      }
      else {
        this._popupButton.textContent = 'Сохранить';
      }
  }

  // Объединяем слушателей
  setEventListeners() {
    // Наследуем метод из родителя(Popup)
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      if (!this._noLoading) {
        this.renderLoading(true);
      }
      event.preventDefault();
      this.handleSubmitForm(this._getInputValues());
    });
  }
}