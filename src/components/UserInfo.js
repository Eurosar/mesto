export default class UserInfo {
  constructor({ nameSelector, jobSelector}) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._name = document.querySelector(this._nameSelector);
    this._job = document.querySelector(this._jobSelector);
  }

  getUserInfo() {
    const objectUserInfo = {
      name: this._name.textContent,
      job: this._job.textContent
    };

    return objectUserInfo;
  }

  setUserInfo({ name, job}) {
    this._name.textContent = name;
    this._job.textContent = job;

  }
}