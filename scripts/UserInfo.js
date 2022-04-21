export default class UserInfo {
  constructor({ name, job}) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const objectUserInfo = {
      name: this._name,
      job: this._job
    };
    return objectUserInfo;
  }

  setUserInfo() {
    document.querySelector(nameProfile).textContent = this._name;
    document.querySelector(jobProfile).textContent = this._job;
  }
}