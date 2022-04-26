export default class UserInfo {
  constructor({ nameSelector, jobSelector}) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo() {
    const objectUserInfo = {
      name: document.querySelector(this._nameSelector).textContent,
      job: document.querySelector(this._jobSelector).textContent
    };
    return objectUserInfo;
  }

  setUserInfo({ name, job}) {
    document.querySelector(this._nameSelector).textContent = name;
    document.querySelector(this._jobSelector).textContent = job;

  }
}