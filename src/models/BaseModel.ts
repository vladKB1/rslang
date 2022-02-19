import { User, signIn, makeRequest } from '../services/API';

export class BaseModel {
  user = JSON.parse(localStorage.getItem('userData') as string) || {};

  isAuthorized = Boolean(Object.keys(this.user).length);

  SignInUser(user: User) {
    const content = makeRequest(signIn, user);
    console.log(content);
  }
}
