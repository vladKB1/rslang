export class BaseModel {
  user = JSON.parse(localStorage.getItem('userData') as string) || {};

  isAuthorized = Boolean(Object.keys(this.user).length);
}
