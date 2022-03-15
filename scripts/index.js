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
  placeElement.querySelector('.place__favorite').addEventListener('click', handleLikePlace);
  placeElement.querySelector('.place__cart').addEventListener('click', handleRemovePlace);
  placeImage.addEventListener('click', () => {
    handleClickImageOpen(item.link, item.name);
  });

  return placeElement;

}

//--Открытие Image
function handleClickImageOpen(src, alt) {
  popupContainerImage.src = src;
  popupContainerImage.alt = alt;
  popupContainerTitle.textContent = alt;
  openPopup(popupPlaceImage);

}

// Like фотографии
function handleLikePlace(event) {
  const placeElement = event.target.closest('.place__favorite');
  placeElement.classList.toggle('place__favorite_active');
}

// Удаляем карточки Place со страницы по нажатию на корзину
function handleRemovePlace(event) {
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
function handleSubmitFormAddPlaces(e) {
  e.preventDefault();
  assignContentPlaceInputs();
  closePopup(popupAddPlaces);
  blockButtonStateByOpenPopup(settingObject);
}

// сохраняем данные Profile на странице
function handleSubmitFormProfileEdit(evt) {
  evt.preventDefault();
  assignTextContentFromInputs();
  closePopup(popupProfileEditor);
  blockButtonStateByOpenPopup(settingObject);
}

// блокируем кнопку отправки при открытии модального окна
const blockButtonStateByOpenPopup = (object) => {
  const buttonList = document.querySelectorAll(object.submitButtonSelector);
  buttonList.forEach((buttonElement) => {
  buttonElement.classList.add(object.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'true');

  });
};

// разблокируем кнопку отправки при открытии модального окна
const unlockButtonStateByOpenPopup = (object) => {
  const buttonList = document.querySelectorAll(object.submitButtonSelector);
  buttonList.forEach((buttonElement) => {
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');

  });
};

// Закрываем модальное окно по нажатию на Esc, и блокируем кнопку сохранения
const handleCloseEscPopup = (event) => {
  const key = event.key;
    if (key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
      blockButtonStateByOpenPopup(settingObject);

    }
}

//Присвоение класса для открытия popup
function openPopup(popup) {
  document.addEventListener('keydown', handleCloseEscPopup);
  popup.classList.add('popup_opened');
  

}

//Удаление класса для закрытия popup
function closePopup(popup) {
  document.removeEventListener('keydown', handleCloseEscPopup);
  popup.classList.remove('popup_opened');
  
}

//Закрытие popups

//--Закрытие Profile
popupCloseProfileEditor.addEventListener('click', () => {
  blockButtonStateByOpenPopup(settingObject);
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
  unlockButtonStateByOpenPopup(settingObject);
  openPopup(popupProfileEditor);
});

//--Открытие Place
profileAddButton.addEventListener('click', () => {
  formProfileAddElement.reset(); // Очищаем inputs в handleSubmitFormAddPlaces
  openPopup(popupAddPlaces);
});

// жмем кнопку сохранить данные в popups
formProfileEditElement.addEventListener('submit', handleSubmitFormProfileEdit);
formProfileAddElement.addEventListener('submit', handleSubmitFormAddPlaces);


// функция закрытия popup по клику на оверлей
const setEventListenersPopups = () => {

  const popupListIterator = (popupElement) => {

    const handleCloseOverlayPopup = (event) => {
      // если нажимаем на подложку, то popup закроется
      if (event.target.classList.contains('popup__overlay')) {
        closePopup(popupElement);
      }
    };

    // вешаем слушателя на каждый popup
    popupElement.addEventListener('click', handleCloseOverlayPopup);
  };
  // перебираем массив popups
  popupList.forEach(popupListIterator);
};

// вызываем функцию закрытия popup
setEventListenersPopups();