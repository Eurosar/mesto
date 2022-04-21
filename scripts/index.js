import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

// Создаем секцию карточек мест
const defaultPlacesList = new Section({
  items: initialCards,
  renderer: ({name, link}) => {
    const card = new Card({
      name,
      link,
      handleCardClick: () => {

      }
    }, '.place-template');

    const cardElement = card.generateCard();
    defaultPlacesList.addItem(cardElement);
  }
}, placesList);

defaultPlacesList.renderItems();

// Создаем модальное окно для картинок
const popupImagePlaces = new PopupWithImage(initialCards, popupPlaceImage);
popupImagePlaces.setEventListeners();

// Создаем модальное окно данных user
const popupProfile = new PopupWithForm({
  popupSelector: popupProfileEditor,
  handleSubmitForm: (formData) => {
    const userInfo = new UserInfo(formData);
    userInfo.setUserInfo();
  }
});
popupProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  formValidatorProfile.toggleButtonState();
  popupProfile.open();
});

//Создаем модальное окно добавления новых карточек
const popupPlace = new PopupWithForm({
  popupSelector: popupAddPlaces,
  handleSubmitForm: ({ name, link }) => {
    namePlaceInput.textContent = name;
    imageLinkInput.src = link;
  }
});

popupPlace.setEventListeners();
profileAddButton.addEventListener('click', () =>{
  formValidatorAddPlace.toggleButtonState();
  popupPlace.open();
});

// Выведем валидность модального окна редактирования профиля
const formValidatorProfile = new FormValidator(settingObject, 'form-profile-editor');
formValidatorProfile.enableValidation();

// Выведем валидность модального окна добавления мест
const formValidatorAddPlace = new FormValidator(settingObject, 'form-add-places');
formValidatorAddPlace.enableValidation();



// const popupImagePlaces = new PopupWithImage(initialCards, popupPlaceImage);
//
// popupImagePlaces.open();
// // Присвоение input значений из блока profile
// function assignInputsValue() {
//   nameInput.value = nameProfile.textContent;
//   jobInput.value = jobProfile.textContent;
// }
//
// // Присвоение textContent из input в блок Profile
// function assignTextContentFromInputs() {
//   nameProfile.textContent = nameInput.value;
//   jobProfile.textContent = jobInput.value;
// }
//
// // Присваиваем textContent и src из input в блок Place
// function assignContentPlaceInputs() {
//   const item = {
//     name: namePlaceInput.value,
//     link: imageLinkInput.value
//   };
//   placesList.prepend(outputPlaceCard(item));
//
// }
//
// // Выводим новую карточку в блоке Places
// function handleSubmitFormAddPlaces(e) {
//   e.preventDefault();
//   assignContentPlaceInputs();
//   closePopup(popupAddPlaces);
// }
//
// // сохраняем данные Profile на странице
// function handleSubmitFormProfileEdit(evt) {
//   evt.preventDefault();
//   assignTextContentFromInputs();
//   closePopup(popupProfileEditor);
//   formValidatorProfile.toggleButtonState();
// }
//
// // Закрываем модальное окно по нажатию на Esc, и блокируем кнопку сохранения
// const handleCloseEscPopup = (event) => {
//   const key = event.key;
//     if (key === 'Escape') {
//       const popup = document.querySelector('.popup_opened');
//       closePopup(popup);
//
//     }
// }
//
// //Присвоение класса для открытия popup
// export function openPopup(popup) {
//   document.addEventListener('keydown', handleCloseEscPopup);
//   popup.classList.add('popup_opened');
//
//
// }
//
// //Удаление класса для закрытия popup
// function closePopup(popup) {
//   document.removeEventListener('keydown', handleCloseEscPopup);
//   popup.classList.remove('popup_opened');
//
// }
//
//
// //--Закрытие Image
// popupClosePlaceImage.addEventListener('click', () => {
//   closePopup(popupPlaceImage);
// });
//
// //Открытие popups
//
// // Функция для сброса ошибок при повторном открытии окна
// const resetInputError = (object, form, formValidator) => {
//   const inputList = Array.from(form.querySelectorAll(object.inputSelector));
//   const inputListIterator = inputElement => {
//     formValidator.hideInputError(inputElement);
//   }
//   inputList.forEach(inputListIterator);
// }
// //--Открытие Profile
// profileEditButton.addEventListener('click', () => {
//   assignInputsValue();
//   resetInputError(settingObject, formProfileEditElement, formValidatorProfile);
//   formValidatorProfile.toggleButtonState();
//   openPopup(popupProfileEditor);
// });
//
// //--Открытие Place
// profileAddButton.addEventListener('click', () => {
//
//   formProfileAddElement.reset(); // Очищаем inputs в handleSubmitFormAddPlaces
//   resetInputError(settingObject, formProfileAddElement, formValidatorAddPlace);
//   formValidatorAddPlace.toggleButtonState();
//   openPopup(popupAddPlaces);
// });
//
// // жмем кнопку сохранить данные в popups
// formProfileEditElement.addEventListener('submit', handleSubmitFormProfileEdit);
// formProfileAddElement.addEventListener('submit', handleSubmitFormAddPlaces);
//
//
// // функция закрытия popup по клику на оверлей
// const setEventListenersPopups = () => {
//
//   const popupListIterator = (popupElement) => {
//
//     const handleClosePopup = (event) => {
//       // если нажимаем на подложку, то popup закроется
//       if (event.target.classList.contains('popup__overlay') || event.target.classList.contains('popup__close')) {
//         closePopup(popupElement);
//       }
//     };
//
//     // вешаем слушателя на каждый popup
//     popupElement.addEventListener('click', handleClosePopup);
//   };
//   // перебираем массив popups
//   popupList.forEach(popupListIterator);
// };
//
// // вызываем функцию закрытия popup
// setEventListenersPopups();
