const popup = document.querySelector('.popup');
const popupOpen = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');

//Обработчик данных input в popup
let nameInput = formElement.querySelector('.popup__input_text_name');
let jobInput = formElement.querySelector('.popup__input_text_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

//Присвоение класса popup для открытия
function addPopupOpened() {
    popup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

//Удаление класса popup для закрытия
function removePopupOpened() {
    popup.classList.remove('popup_opened');
}

// сохраняем данные на странице
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    removePopupOpened();
}

//Открытие popup
popupClose.addEventListener('click', removePopupOpened);

//Закрытие popup
popupOpen.addEventListener('click', addPopupOpened);

// жмем кнопку сохранить данные в попапе
formElement.addEventListener('submit', formSubmitHandler);

