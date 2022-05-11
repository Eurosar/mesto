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
  settingObject,
  nameProfileSelector,
  jobProfileSelector,
  avatarProfileSelector,
  popupConfirmationSelector,
  profileEditAvatar, popupUpdateAvatar, formProfileUpdateElement
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

// Создаем экземпляр класса, который вставляет начальный массив картинок
const defaultPlacesList = new Section({
  renderer: (item) => {
    defaultPlacesList.addItem(outputPlaceCard(item));
  }
}, placesListSelector);

// Отрендерим массив картинок
defaultPlacesList.renderItems();

// Получим с сервера данные о пользователе
api.getProfileInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
  })

  // Вызовем ошибку, если что-то пойдет не так
  .catch((err) => console.log(err));


// готовим модальное окно
const popupCardRemove = new PopupWithForm({
  popupSelector: popupConfirmationSelector,

  // будет отложенный коллбэк, прямо внизу карточки
  // handleSubmitForm: () => {},
});


// Создаем карточку места
const outputPlaceCard = item => {

  const card = new Card({
    name: item.name,
    link: item.link,
    likes: item.likes,
    owner: item.owner,
    _id: item._id,
    userInfo: userInfo,
    handleCardClick: () => {
      popupImagePlaces.open(item.name, item.link);
    },

    // нажимаем на корзину
    handleTrashClick: () => {

      // открываем окно, где спрашиваем, хочет ли удалить и жмем "Да"
      popupCardRemove.open();

      // установим коллбек который сработает при нажатии на "Да",
      // то есть, мы переоформим в попапе функцию, которая назначается как this.__handleSubmitForm,
      // чтобы добавить данные карточки, но при этом создать попап заранее
      popupCardRemove._handleSubmitForm = () => {
        api.deleteCard(item._id)
          .then(()=> {

            // вызовем удаление карточки
            card.handleRemovePlace();
          })
          // Выводим ошибку, если что-то пошло не так
          .catch((err) => console.error(err));
      }
    }
  }, '.place-template');

  return card.generateCard();
};


// Создаем модальное окно для картинок
const popupImagePlaces = new PopupWithImage(popupPlaceImageSelector);

// Создаем модальное окно данных user
const popupProfile = new PopupWithForm({
  popupSelector: popupProfileEditorSelector,
  // Отправляем на сервер имя картинки и ссылку на нее
  handleSubmitForm: (formData) => {
    api.changeUserInfo(formData)
      .then((data) => {
        console.log(data);
        userInfo.setUserInfo(data);
      })
      // Выводим ошибку, если что-то пошло не так
      .catch((err) => console.log(err))
      .finally ( () => {
        popupProfile.renderLoading(false);
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

  // Отправляем на сервер имя картинки и ссылку на нее
  handleSubmitForm: () => {
    api.postNewCard({
      name: namePlaceInput.value,
      link: imageLinkInput.value
    })
      // Получаем результат с данными картинки
      .then((item) => {

        // Отправляем в рендер
        defaultPlacesList.addItem(outputPlaceCard(item));
      })

      // Выводим ошибку, если что-то пошло не так
      .catch((err) => console.log(err))
      .finally ( () => {
        popupPlace.renderLoading(false);
      });

  },
  checkInputsValue: () => {
    formValidatorAddPlace.toggleButtonState();
    formValidatorAddPlace.resetError();
  }
});

// Создаем модальное окно обновления аватара

const popupAvatar = new PopupWithForm({
  popupSelector: popupUpdateAvatar,

  handleSubmitForm: (formData) => {
    console.log('formData', formData);
    api.updateAvatar(formData)
      .then((data) => {
        console.log('data Avatar:', data);
      })
      .catch((err) => console.log(err))
      .finally ( () => {
        popupAvatar.renderLoading(false);
      });
  },
  checkInputsValue: () => {
    formValidatorAvatar.toggleButtonState();
    formValidatorAvatar.resetError();
  }
});

// Вешаем слушатели модальных окон
popupImagePlaces.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupCardRemove.setEventListeners();
popupAvatar.setEventListeners();

// Вешаем слушатели на кнопки открытия модальных окон
profileEditButton.addEventListener('click', () => {
  popupProfile.open();
});

profileAddButton.addEventListener('click', () => {
  popupPlace.open();
});

profileEditAvatar.addEventListener('click', () => {
  popupAvatar.open();
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

// Выведем валидность модального окна обновления аватара
const formValidatorAvatar = new FormValidator(settingObject, formProfileUpdateElement);
formValidatorAvatar.enableValidation();

