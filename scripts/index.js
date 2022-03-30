import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// Переберем массив карточек и выведем их на странице
initialCards.forEach((item) => {
  const card = new Card(item, '.place-template');
  const cardElement = card.generateCard();
  document.querySelector('.places__list').append(cardElement);
});

// Выведем валидность модального окна редактирования профиля
const formValidatorProfile = new FormValidator(settingObject, 'form-profile-editor');
formValidatorProfile.enableValidation();

// Выведем валидность модального окна добавления мест
const formValidatorAddPlace = new FormValidator(settingObject, 'form-add-places');
formValidatorAddPlace.enableValidation();


// Присвоение input значений из блока profile
function assignInputsValue() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

// Присвоение textContent из input в блок Profile
function assignTextContentFromInputs() {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}

// Присваиваем textContent и src из input в блок Place
function assignContentPlaceInputs() {
  const item = {
    name: namePlaceInput.value,
    link: imageLinkInput.value
  };
  const card = new Card(item, '.place-template');
  const cardElement = card.generateCard();
  placesList.prepend(cardElement);

}

// Выводим новую карточку в блоке Places
function handleSubmitFormAddPlaces(e) {
  e.preventDefault();
  assignContentPlaceInputs();
  closePopup(popupAddPlaces);
  blockButtonStateByOpenPopup(settingObject);
}

// сохраняем данные Profile на странице
function handleSubmitFormProfileEdit(evt) {
  evt.preventDefault();
  assignTextContentFromInputs();
  closePopup(popupProfileEditor);
  blockButtonStateByOpenPopup(settingObject);
}

// блокируем кнопку отправки при открытии модального окна
const blockButtonStateByOpenPopup = (object) => {
  const buttonList = document.querySelectorAll(object.submitButtonSelector);
  buttonList.forEach((buttonElement) => {
  buttonElement.classList.add(object.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'true');

  });
};

// разблокируем кнопку отправки при открытии модального окна
const unlockButtonStateByOpenPopup = (object) => {
  const buttonList = document.querySelectorAll(object.submitButtonSelector);
  buttonList.forEach((buttonElement) => {
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');

  });
};

// Закрываем модальное окно по нажатию на Esc, и блокируем кнопку сохранения
const handleCloseEscPopup = (event) => {
  const key = event.key;
    if (key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
      blockButtonStateByOpenPopup(settingObject);

    }
}

//Присвоение класса для открытия popup
export function openPopup(popup) {
  document.addEventListener('keydown', handleCloseEscPopup);
  popup.classList.add('popup_opened');
  

}

//Удаление класса для закрытия popup
function closePopup(popup) {
  document.removeEventListener('keydown', handleCloseEscPopup);
  popup.classList.remove('popup_opened');
  
}

//Закрытие popups

//--Закрытие Profile
popupCloseProfileEditor.addEventListener('click', () => {
  blockButtonStateByOpenPopup(settingObject);
  closePopup(popupProfileEditor);
  
});

//--Закрытие Place
popupCloseAddPlaces.addEventListener('click', () => {
  closePopup(popupAddPlaces);
});

//--Закрытие Image
popupClosePlaceImage.addEventListener('click', () => {
  closePopup(popupPlaceImage);
});

//Открытие popups
//--Открытие Profile
profileEditButton.addEventListener('click', () => {
  assignInputsValue();
  unlockButtonStateByOpenPopup(settingObject);
  openPopup(popupProfileEditor);
});

//--Открытие Place
profileAddButton.addEventListener('click', () => {
  formProfileAddElement.reset(); // Очищаем inputs в handleSubmitFormAddPlaces
  openPopup(popupAddPlaces);
});

// жмем кнопку сохранить данные в popups
formProfileEditElement.addEventListener('submit', handleSubmitFormProfileEdit);
formProfileAddElement.addEventListener('submit', handleSubmitFormAddPlaces);


// функция закрытия popup по клику на оверлей
const setEventListenersPopups = () => {

  const popupListIterator = (popupElement) => {

    const handleCloseOverlayPopup = (event) => {
      // если нажимаем на подложку, то popup закроется
      if (event.target.classList.contains('popup__overlay')) {
        closePopup(popupElement);
      }
    };

    // вешаем слушателя на каждый popup
    popupElement.addEventListener('click', handleCloseOverlayPopup);
  };
  // перебираем массив popups
  popupList.forEach(popupListIterator);
};

// вызываем функцию закрытия popup
setEventListenersPopups();
