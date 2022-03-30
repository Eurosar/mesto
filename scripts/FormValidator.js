export class FormValidator {
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
  _hideInputError(inputElement) {
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
      this._hideInputError(inputElement);
    }
  }

  // Переберем inputs и вернем невалидный
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

// Функция блокировки кнопки
  _blockButtonState(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

// Функция разблокировки кнопки
  _unlockButtonState(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

// Объявим функцию переключения состояния кнопки формы
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._blockButtonState(buttonElement);
    } else {
      this._unlockButtonState(buttonElement);
    }
  };

// Проверяем валидность поля и меняем состояние кнопки
  _handleInput(inputList, inputElement, buttonElement) {
    this._checkValidity(inputElement);
    this._toggleButtonState(inputList, buttonElement);
  }

// Функция слушателя inputs
  _setEventListeners() {
    this._element = this._getFormElement();
    const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
    const buttonElement = this._element.querySelector(this._submitButtonSelector);
    const inputListIterator = inputElement => {

      // Навесим слушателя на inputs
      inputElement.addEventListener('input', () => {
        this._handleInput(inputList, inputElement, buttonElement);
      });
    };

    this._toggleButtonState(inputList, buttonElement);

    // Переберем полученный массив
    inputList.forEach(inputListIterator);

  }

  enableValidation() {
    this._setEventListeners();
  }
}