const popupProfileEditor = document.querySelector('.popup-profile-editor');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupAddPlaces = document.querySelector('.popup-add-places');
const profileAddButton = document.querySelector('.profile__add-button');
const popupPlaceImage = document.querySelector('.popup-place-image');
const popupCloseProfileEditor = document.querySelector('.close-profile-editor');
const popupCloseAddPlaces = document.querySelector('.close-add-places');
const popupClosePlaceImage = document.querySelector('.close-place-image');
const formProfileEditElement = document.querySelector('.form-profile-editor');
const formProfileAddElement = document.querySelector('.form-add-places');
const placesList = document.querySelector('.places__list');
const templatePlace = document.querySelector('.place-template');
const popupContainerImage = document.querySelector('.container-image__image');
const popupContainerTitle = document.querySelector('.container-image__image-title');

//Обработчик данных input в popup edit
const nameInput = formProfileEditElement.querySelector('.popup__input_text_name');
const jobInput = formProfileEditElement.querySelector('.popup__input_text_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

//Обработчик данных input в popup add place
const namePlaceInput = formProfileAddElement.querySelector('.popup__input_text_name-place');
const imageLinkInput = formProfileAddElement.querySelector('.popup__input_text_image-link');

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

function createPlaceElement(item) {
    // Клонируем шаблон
    const placeElement = templatePlace.content.cloneNode(true);
    const placeImage = placeElement.querySelector('.place__image');

    placeElement.querySelector('.place__title').textContent = item.name;
    placeImage.src = item.link;
    placeImage.alt = item.name;
    placeElement.querySelector('.place__favorite').addEventListener('click', handlerLikePlace);
    placeElement.querySelector('.place__cart').addEventListener('click', handlerRemovePlace);
    placeImage.addEventListener('click', () => {
        handlerClickImageOpen(item.link, item.name)
    });

    return placeElement;

}

//--Открытие Image
function handlerClickImageOpen (src, alt) {
    popupContainerImage.src = src;
    popupContainerImage.alt = alt;
    popupContainerTitle.textContent = alt;
    openPopup(popupPlaceImage);

}

// Лайкаем фотографии
function handlerLikePlace(event) {
    const placeElement = event.target.closest('.place__favorite');
    placeElement.classList.toggle('place__favorite_active');
}

// Удаляем карточки Place со страницы по нажатию на корзину
function handlerRemovePlace(event) {
    const placeElement = event.target.closest('.place');
    placeElement.remove();
}

// Перебираем массив карточек и выводим их на странице
function outputAnArrayOfCards() {
    initialCards.forEach((item) => {
        const arrayPlaceElement = createPlaceElement(item);
        placesList.append(arrayPlaceElement);
    });

}
outputAnArrayOfCards();

// Присваиваем textContent и src из input в блок Place
function assignContentPlaceInputs() {
    const item = {
        name: namePlaceInput.value,
        link: imageLinkInput.value
    };
    const placeCard = createPlaceElement(item);
    placesList.prepend(placeCard);

}

// Выводим новую карточку в блоке Places
function handlerSubmitFormAddPlaces(e) {
    e.preventDefault();
    assignContentPlaceInputs();
    closePopup(popupAddPlaces);
}

// сохраняем данные Profile  на странице
function handlerSubmitFormProfileEdit(evt) {
    evt.preventDefault();
    assignTextContentFromInputs();
    closePopup(popupProfileEditor);
}

//Присвоение класса для открытия popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//Удаление класса для закрытия popup
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//Закрытие popups

//--Закрытие Profile
popupCloseProfileEditor.addEventListener('click', () => {
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
    openPopup(popupProfileEditor);
});

//--Открытие Place
profileAddButton.addEventListener('click', () => {
    formProfileAddElement.reset(); // Очищаем inputs в handlerSubmitFormAddPlaces
    openPopup(popupAddPlaces);
});

// жмем кнопку сохранить данные в попапах
formProfileEditElement.addEventListener('submit', handlerSubmitFormProfileEdit);
formProfileAddElement.addEventListener('submit', handlerSubmitFormAddPlaces);

