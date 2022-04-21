const popupProfileEditor = '.popup-profile-editor';
const profileEditButton = document.querySelector('.profile__edit-button');
const popupAddPlaces = '.popup-add-places';
const profileAddButton = document.querySelector('.profile__add-button');
const popupPlaceImage = '.popup-place-image';
const popupClosePlaceImage = document.querySelector('.close-place-image');
const formProfileEditElement = document.querySelector('.form-profile-editor');
const formProfileAddElement = document.querySelector('.form-add-places');
const placesList = '.places__list';
const popupForm = '.popup__form';
const popupContainerImage = document.querySelector('.container-image__image');
const popupContainerTitle = document.querySelector('.container-image__image-title');

//Обработчик данных input в popup edit
const nameInput = formProfileEditElement.querySelector('.popup__input_text_name');
const jobInput = formProfileEditElement.querySelector('.popup__input_text_job');
const nameProfile = '.profile__name';
const jobProfile = '.profile__job';

//Обработчик данных input в popup add place
const namePlaceInput = formProfileAddElement.querySelector('.popup__input_text_name-place');
const imageLinkInput = formProfileAddElement.querySelector('.popup__input_text_image-link');

// находим все popups и создаем из них массив
const popupList = Array.from(document.querySelectorAll('.popup'));

//Массив карточек мест из коробки
const initialCards = [
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


const settingObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};