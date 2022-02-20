import { User, signIn, makeRequest, createUser } from '../services/API';

export class BaseModel {
  user!: object;

  isAuthorized = false;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('userData') as string) || {};
    this.isAuthorized = Boolean(Object.keys(this.user).length);
  }

  onAuthorizationErrorTextChanged!: (newErrorText: string) => void;

  #commit(dataName: string, data: object) {
    localStorage.setItem(dataName, JSON.stringify(data));
  }

  async signInUser(user: User) {
    try {
      const content = await makeRequest(signIn, user);
      this.onAuthorizationErrorTextChanged('');

      this.#commit('userData', content);
      this.user = content;
      this.isAuthorized = Boolean(content.token.length);
    } catch (error) {
      const errorMessage = (error as Error).message;
      this.onAuthorizationErrorTextChanged(errorMessage);
      throw error;
    }
  }

  async signUpUser(user: User) {
    try {
      await makeRequest(createUser, user);
      this.onAuthorizationErrorTextChanged('');
    } catch (error) {
      const errorMessage = (error as Error).message;
      this.onAuthorizationErrorTextChanged(errorMessage);
      throw error;
    }
  }

  bindAuthorizationErrorTextChanged(callback: (newErrorText: string) => void) {
    this.onAuthorizationErrorTextChanged = callback;
  }
}
