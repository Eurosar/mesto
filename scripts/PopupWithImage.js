import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ name, link}, popupSelector) {
    super(popupSelector);
    this._image = link;
    this._title = name;
  }

  open() {
    popupContainerImage.src = this._image;
    popupContainerImage.alt = this._title;
    popupContainerTitle.textContent = this._title;
    super.open();
  }
}