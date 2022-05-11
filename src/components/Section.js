export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderer(item) {
    this.addItem(item);
  }

  renderItems() {
    // api.getInitialCards()
    //   .then((data) => {
    //     data.forEach(item => {
    //       this._renderer(item);
    //     });
    //   })
    //   .catch((err) => console.log(err));
  }
}