// Объявим функцию поиска класса поля ошибки в DOM
const getErrorElement = (formElement, inputElement) => {
  return formElement.querySelector(`.${inputElement.id}-error`);
};

// Объявим функцию показа ошибки, если поле невалидно
const showInputError = (object, formElement, inputElement, errorMessage) => {
  const errorElement = getErrorElement(formElement, inputElement);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};

//Объявим функцию скрытия ошибки, если поле валидно
const hideInputError = (object, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};

// Объявим функцию проверки валидации формы
const checkValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    showInputError(settingObject, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(settingObject, formElement, inputElement);
  }
};

// Объявим функцию проверки
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция блокировки кнопки
const blockButtonState = (object, buttonElement) => {
  buttonElement.classList.add(object.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

// Функция разблокировки кнопки
const unlockButtonState = (object, buttonElement) => {
  buttonElement.classList.remove(object.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

// Объявим функцию переключения состояния кнопки формы
const toggleButtonState = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    blockButtonState(object, buttonElement);
  } else {
    unlockButtonState(object, buttonElement);
  }
};

// Объявим функцию, которая найдет и переберет все поля ввода в формах
const setEventListeners = (object, formElement) => {
  // Найдем все инпуты формы
  const inputlist = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  const inputListIterator = inputElement => {
    const handleInput = () => {
      checkValidity(formElement, inputElement);
      toggleButtonState(settingObject, inputlist, buttonElement);
    };
    // Навесим слушателя на инпуты  
    inputElement.addEventListener('input', handleInput);
  };
  toggleButtonState(settingObject, inputlist, buttonElement);
  // Переберем полученный массив
  inputlist.forEach(inputListIterator);
};

// Объявим функцию, которая найдет и переберет все формы
const enableValidation = object => {
  // Найдем все формы и сделаем из них массив
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  const formListIterator = formElement => {
    // Навесим слушателя на отправку формы
    setEventListeners(settingObject, formElement);
  };
  // Переберем полученный массив
  formList.forEach(formListIterator);
};

enableValidation(settingObject);

//Функция 