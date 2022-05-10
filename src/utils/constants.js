// Находим попапы и их селекторы
export const popupProfileEditorSelector = '.popup-profile-editor';
export const popupAddPlacesSelector = '.popup-add-places';
export const popupConfirmationSelector = '.popup-confirmation';
export const popupPlaceImageSelector = '.popup-place-image';
export const popupUpdateAvatar = '.popup-update-avatar';

// Находим формы и их элементы
export const popupFormSelector = '.popup__form';
export const formProfileEditElement = document.querySelector('.form-profile-editor');
export const formProfileAddElement = document.querySelector('.form-add-places');
export const formProfileUpdateElement = document.querySelector('.form-update-avatar');

//Находим кнопки
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileEditAvatar = document.querySelector('.profile__avatar');

//Селектор списка карточек
export const placesListSelector = '.places__list';


//Обработчик данных input в popup edit
export const nameInput = formProfileEditElement.querySelector('.popup__input_text_name');
export const jobInput = formProfileEditElement.querySelector('.popup__input_text_job');
export const nameProfileSelector = '.profile__name';
export const jobProfileSelector = '.profile__job';
export const avatarProfileSelector = '.profile__image';

//Обработчик данных input в popup add place
export const namePlaceInput = formProfileAddElement.querySelector('.popup__input_text_name-place');
export const imageLinkInput = formProfileAddElement.querySelector('.popup__input_text_image-link');

//Обработчик данных input в popup avatar update
export const avatarLink = formProfileUpdateElement.querySelector('.popup__input_text_avatar-link');

//Массив карточек мест из коробки
// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];


export const settingObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};