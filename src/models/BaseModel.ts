import { User, signIn, makeRequest, createUser, getUserWords } from '../services/API';

export type UserData = {
  message?: string;
  refreshToken?: string;
  token?: string;
  userId?: string;
};

export type UserWordData = {
  id: string;
  difficulty: string;
  wordId: string;
  optional: {
    counter: number;
    progressCounter: number;
    statisticsCounter: number;
  };
};

export class BaseModel {
  user!: UserData;

  userWords!: UserWordData[];

  statePage = window.location.hash.slice(1);

  isAuthorized = false;

  onAuthorizationErrorTextChanged!: (newErrorText: string) => void;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('userData')?.toString() || '{}');
    this.userWords = JSON.parse(localStorage.getItem('userWords')?.toString() || '[]');
    this.isAuthorized = Boolean(Object.keys(this.user).length);

    const hash = window.location.hash.slice(1);

    if (hash !== 'authorization-popup' && hash !== 'logout') {
      this.statePage = hash ? hash : 'mainPage';
    }
  }

  #commit(dataName: string, data: object) {
    localStorage.setItem(dataName, JSON.stringify(data));
  }

  async signInUser(user: User) {
    try {
      const content = await makeRequest(signIn(user), 'signIn');
      this.onAuthorizationErrorTextChanged('');

      this.#commit('userData', content);
      this.user = content;
      this.isAuthorized = true;
    } catch (error) {
      const errorMessage = (error as Error).message;
      this.onAuthorizationErrorTextChanged(errorMessage);
      throw error;
    }
  }

  async reSignIn() {
    this.logOutUser();
    window.location.hash = 'authorization-popup';
  }

  async signUpUser(user: User) {
    try {
      await makeRequest(createUser(user), 'createUser');
      this.onAuthorizationErrorTextChanged('');
    } catch (error) {
      const errorMessage = (error as Error).message;
      this.onAuthorizationErrorTextChanged(errorMessage);
      throw error;
    }
  }

  logOutUser() {
    localStorage.removeItem('userData');
    localStorage.removeItem('userWords');
    this.user = {};
    this.userWords = [];
    this.isAuthorized = false;
  }

  async getUserWords() {
    try {
      if (!this.user?.userId || !this.user?.token) return;

      const userWords = await makeRequest(getUserWords(this.user.userId, this.user.token), 'getUserWords');
      this.#commit('userWords', userWords);
      this.userWords = userWords;
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.log('getUserWords ERROR: ', errorMessage);
    }
  }

  bindAuthorizationErrorTextChanged(callback: (newErrorText: string) => void) {
    this.onAuthorizationErrorTextChanged = callback;
  }
}
