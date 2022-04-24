export default class FormValidator {
  constructor(object, formElement) {
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._formElement = formElement;
  }

  // Получим форму
  _getFormElement() {
    const formElement = document.querySelector(`.${this._formElement}`);
    return formElement;
  }

  // Получим поле с ошибкой в DOM
  _getErrorElement(inputElement) {

    const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
    return errorElement;

  }

  // Покажем предупреждение
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Скроем предупреждение об ошибке
  hideInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Функция проверки валидности поля
  _checkValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  // Переберем inputs и вернем невалидный
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

// Функция блокировки кнопки
  _blockButtonState() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

// Функция разблокировки кнопки
  _unlockButtonState() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

// Объявим функцию переключения состояния кнопки формы
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._blockButtonState();
    } else {
      this._unlockButtonState();
    }
  };

// Проверяем валидность поля и меняем состояние кнопки
  _handleInput(inputElement) {
    this._checkValidity(inputElement);
    this.toggleButtonState();
  }

// Функция слушателя inputs
  _setEventListeners() {
    const inputListIterator = inputElement => {
      // Навесим слушателя на inputs
      inputElement.addEventListener('input', () => {
        this._handleInput(inputElement);
      });
    };
    this.toggleButtonState();

    // Переберем полученный массив
    this._inputList.forEach(inputListIterator);

  }

  enableValidation() {
    this._element = this._getFormElement();
    this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
    this._buttonElement = this._element.querySelector(this._submitButtonSelector);
    this._setEventListeners();
  }
}