export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.forEach((item) => {
      this.addItem(item);
      console.log('item:', item);
      });

    // api.getInitialCards()
    //   .then((data) => {
    //     data.forEach(item => {
    //       this._renderer(item);
    //     });
    //   })
    //   .catch((err) => console.log(err));
  }
}