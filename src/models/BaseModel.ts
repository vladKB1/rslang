import { User, signIn, makeRequest, createUser } from '../services/API';

export class BaseModel {
  user!: object;

  statePage = window.location.hash.slice(1);

  isAuthorized = false;

  onAuthorizationErrorTextChanged!: (newErrorText: string) => void;

  onReRenderPage!: (isAuthorized: boolean) => void;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('userData')?.toString() || '{}');
    this.isAuthorized = Boolean(Object.keys(this.user).length);
    const hash = window.location.hash.slice(1);

    if (hash !== 'authorization-popup' && hash !== 'logout') {
      this.statePage = hash ? hash : 'mainPage';
      window.location.hash = this.statePage;
    }
  }

  #commit(dataName: string, data: object) {
    localStorage.setItem(dataName, JSON.stringify(data));
  }

  async signInUser(user: User) {
    try {
      const content = await makeRequest(signIn(user), signIn.name);
      this.onAuthorizationErrorTextChanged('');

      this.#commit('userData', content);
      this.user = content;
      this.isAuthorized = Boolean(content.token.length);

      this.onReRenderPage(this.isAuthorized);
    } catch (error) {
      const errorMessage = (error as Error).message;
      this.onAuthorizationErrorTextChanged(errorMessage);
      throw error;
    }
  }

  async signUpUser(user: User) {
    try {
      await makeRequest(createUser(user), createUser.name);
      this.onAuthorizationErrorTextChanged('');
    } catch (error) {
      const errorMessage = (error as Error).message;
      this.onAuthorizationErrorTextChanged(errorMessage);
      throw error;
    }
  }

  logOutUser() {
    localStorage.removeItem('userData');
    this.user = {};
    this.isAuthorized = false;

    this.onReRenderPage(this.isAuthorized);
  }

  bindAuthorizationErrorTextChanged(callback: (newErrorText: string) => void) {
    this.onAuthorizationErrorTextChanged = callback;
  }

  bindReRenderPage(callback: (isAuthorized: boolean) => void) {
    this.onReRenderPage = callback;
  }
}
