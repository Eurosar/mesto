export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._avatarSelector = avatarSelector;
    this._name = document.querySelector(this._nameSelector);
    this._job = document.querySelector(this._jobSelector);
    this._avatar = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    const objectUserInfo = {
      name: this._name.textContent,
      job: this._job.textContent,

      // Отдаем полученный id пользователя в объект
      _id: this._id
    };
    return objectUserInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;

    // Запомним id пользователя
    this._id = data._id;
  }
}