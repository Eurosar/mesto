export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(event) {
    const key = event.key;
    if (key === 'Escape') {
      this.close();
    }
  }

  open() {
    document.addEventListener('keydown', this.handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup__overlay') || event.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}