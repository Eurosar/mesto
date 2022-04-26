// Импорт картинок, включенных в html webpack


// Импорт файлов webpack
import '../pages/index.css';
import {
  popupProfileEditorSelector,
  popupAddPlacesSelector,
  profileEditButton,
  profileAddButton,
  popupPlaceImageSelector,
  placesListSelector,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile,
  namePlaceInput,
  imageLinkInput,
  initialCards,
  settingObject
} from '../utils/constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

// Создаем карточку места
const outputPlaceCard = item => {
  const card = new Card({
      name: item.name,
      link: item.link,
      handleCardClick: () => {
        popupImagePlaces.open(item.name, item.link);
      }
    },
    '.place-template');
  const cardElement = card.generateCard();
  return cardElement;
};

// Создаем секцию карточек мест
const defaultPlacesList = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultPlacesList.addItem(outputPlaceCard(item));
  }
}, placesListSelector);

defaultPlacesList.renderItems();

// Создаем модальное окно для картинок
const popupImagePlaces = new PopupWithImage(popupPlaceImageSelector);

// Создаем модальное окно данных user
const popupProfile = new PopupWithForm({
  popupSelector: popupProfileEditorSelector,
  handleSubmitForm: (formData) => {
    userInfo.setUserInfo(formData);
  },
  checkInputsValue: () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    formValidatorProfile.toggleButtonState();
    formValidatorProfile.resetError();
  }
});

//Создаем модальное окно добавления новых карточек
const popupPlace = new PopupWithForm({
  popupSelector: popupAddPlacesSelector,
  handleSubmitForm: ({name, link}) => {
    name = namePlaceInput.value;
    link = imageLinkInput.value;
    defaultPlacesList.addItem(outputPlaceCard({name, link}));
  },
  checkInputsValue: () => {
    formValidatorAddPlace.toggleButtonState();
    formValidatorAddPlace.resetError();
  }
});

// Вешаем слушатели модальных окон
popupImagePlaces.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();

// Вешаем слушатели на кнопки открытия модальных окон
profileEditButton.addEventListener('click', () => {
  popupProfile.open();
});
profileAddButton.addEventListener('click', () => {
  popupPlace.open();
});

// Создаем экземпляр класса, отвечающий за отображение информации о User
const userInfo = new UserInfo({
  nameSelector: nameProfile,
  jobSelector: jobProfile
});

// Выведем валидность модального окна редактирования профиля
const formValidatorProfile = new FormValidator(settingObject, '.form-profile-editor');
formValidatorProfile.enableValidation();

// Выведем валидность модального окна добавления мест
const formValidatorAddPlace = new FormValidator(settingObject, '.form-add-places');
formValidatorAddPlace.enableValidation();