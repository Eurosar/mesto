export const popupProfileEditor = '.popup-profile-editor';
export const popupAddPlaces = '.popup-add-places';
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const popupPlaceImage = '.popup-place-image';
export const formProfileEditElement = document.querySelector('.form-profile-editor');
export const formProfileAddElement = document.querySelector('.form-add-places');
export const placesList = '.places__list';
export const popupForm = '.popup__form';

//Обработчик данных input в popup edit
export const nameInput = formProfileEditElement.querySelector('.popup__input_text_name');
export const jobInput = formProfileEditElement.querySelector('.popup__input_text_job');
export const nameProfile = '.profile__name';
export const jobProfile = '.profile__job';

//Обработчик данных input в popup add place
export const namePlaceInput = formProfileAddElement.querySelector('.popup__input_text_name-place');
export const imageLinkInput = formProfileAddElement.querySelector('.popup__input_text_image-link');


//Массив карточек мест из коробки
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


export const settingObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};