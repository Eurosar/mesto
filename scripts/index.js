const popup = document.querySelector('.popup');
const popupOpen = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');


popupClose.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
})

//Обработчик данных input в popup
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');


//Присвоение и удаление классов popup для открытия и закрытия
popupOpen.addEventListener('click', function (e) {
    e.preventDefault();
    popup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    
})

// сохраняем данные на странице
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}
// жмем кнопку сохранить данные в попапе
formElement.addEventListener('submit', formSubmitHandler);

// жмем кнопку сохранить Enter
nameInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('.popup__btn').click();
    }
});
jobInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('.popup__btn').click();
    }
});

