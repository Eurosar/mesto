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
  formProfileEditElement,
  formProfileAddElement,
  nameInput,
  jobInput,
  namePlaceInput,
  imageLinkInput,
  settingObject, nameProfileSelector, jobProfileSelector, avatarProfileSelector, popupConfirmationSelector
} from '../utils/constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import Api from './Api.js';

// Создадим экземпляр класса Api
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40/',
  headers: {
    authorization: 'ee4cf8c7-0556-4739-9a99-1aba3be1b2b6',
    'Content-Type': 'application/json'
  }
});

const defaultPlacesList = new Section({
  renderer: (item) => {
    defaultPlacesList.addItem(outputPlaceCard(item));
  }
}, placesListSelector);
defaultPlacesList.renderItems();

const user = api.getProfileInfo();
user
  .then((data) => {
    userInfo.setUserInfo(data);
})
  .catch((err) => console.log(err));

// Создаем карточку места
const outputPlaceCard = item => {
  const card = new Card({
      name: item.name,
      link: item.link,
      likes: item.likes || [],
      _id: item.owner._id,
      handleCardClick: () => {
        popupImagePlaces.open(item.name, item.link);
      },
    handleCartClick: () => {
      popupConfirmation.open();
    }
    },
    '.place-template');
  const cardElement = card.generateCard();
  return cardElement;
};



// Создаем модальное окно для картинок
const popupImagePlaces = new PopupWithImage(popupPlaceImageSelector);

// Создаем модальное окно данных user
const popupProfile = new PopupWithForm({
  popupSelector: popupProfileEditorSelector,
  handleSubmitForm: (formData) => {
    api.changeUserInfo(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
      });
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
    api.postNewCard({name, link})
      .then(({name, link}) => {
        defaultPlacesList.addItem(outputPlaceCard({name, link}));
      })
      .catch((err) => console.log(err));

  },
  checkInputsValue: () => {
    formValidatorAddPlace.toggleButtonState();
    formValidatorAddPlace.resetError();
  }
});

const popupConfirmation = new PopupWithForm({
  popupSelector: popupConfirmationSelector,
  handleSubmitForm: () => {
    console.log('confirm');
    // card.handleRemovePlace();
  },
  checkInputsValue: () => {}
});

// Вешаем слушатели модальных окон
popupImagePlaces.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupConfirmation.setEventListeners();

// Вешаем слушатели на кнопки открытия модальных окон
profileEditButton.addEventListener('click', () => {
  popupProfile.open();
});
profileAddButton.addEventListener('click', () => {
  popupPlace.open();
});

// Создаем экземпляр класса, отвечающий за отображение информации о User
const userInfo = new UserInfo({
  nameSelector: nameProfileSelector,
  jobSelector: jobProfileSelector,
  avatarSelector: avatarProfileSelector
});

// Выведем валидность модального окна редактирования профиля
const formValidatorProfile = new FormValidator(settingObject, formProfileEditElement);
formValidatorProfile.enableValidation();

// Выведем валидность модального окна добавления мест
const formValidatorAddPlace = new FormValidator(settingObject, formProfileAddElement);
formValidatorAddPlace.enableValidation();
