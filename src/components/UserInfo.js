export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._avatarSelector = avatarSelector;
    this._name = document.querySelector(this._nameSelector);
    this._job = document.querySelector(this._jobSelector);
    this._avatar = document.querySelector(this._avatarSelector);
  }

  getUserId(data) {
   const id = data._id;
   console.log(`My id: ${id}`);
   return id
  }

  getUserInfo() {
    const objectUserInfo = {
      name: this._name.textContent,
      job: this._job.textContent
    };
    return objectUserInfo;
  }

  setUserInfo({ name, about, avatar}) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;

  }
}