const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupClose = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');

//Обработчик данных input в popup
const nameInput = formElement.querySelector('.popup__input_text_name');
const jobInput = formElement.querySelector('.popup__input_text_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

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
//Присвоение класса popup для открытия
function addPopupOpened() {
    popup.classList.add('popup_opened');
}

//Удаление класса popup для закрытия
function removePopupOpened() {
    popup.classList.remove('popup_opened');
}

// сохраняем данные на странице
function formProfileEditSubmitHandler(evt) {
    evt.preventDefault();
    assignTextContentFromInputs();
    removePopupOpened();
}

//Закрытие popup
popupClose.addEventListener('click', removePopupOpened);

//Открытие popup edit
profileEditButton.addEventListener('click', () => {
    addPopupOpened();
    assignInputsValue();
});

// жмем кнопку сохранить данные в попапе
formElement.addEventListener('submit', formProfileEditSubmitHandler);

