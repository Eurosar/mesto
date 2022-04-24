import { popupForm } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm, checkInputsValue, resetInputError }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._checkInputsValue = checkInputsValue;
    this._resetInputError = resetInputError;
  }

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

  open() {
    super.open();
    this._checkInputsValue();
    this._resetInputError();
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popupSelector.querySelector(popupForm);
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }
}