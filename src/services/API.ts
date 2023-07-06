export enum STATUS {
  OK = 200,
  OK_NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  EXPECTATION_FAILED = 417,
  UNPROCESSABLE_ENTITY = 422,
}

export type RequestObject = {
  url: string;
  method: string;
  headers?: HeadersInit;
  body?: string;
};

export type User = {
  email: string;
  password: string;
};

export type UserWord = {
  difficulty: string;
  optional: {
    counter: number;
    progressCounter: number;
    statisticsCounter: number;
  };
};

export type Query = {
  key: string;
  value: string;
};

export interface Word {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  wordTranslateOnCard?: string;
}

export type RequestData = User | Query[];

export const baseUrl = 'https://rs-lang-vladkb1-db74e8c9fd98.herokuapp.com';

const path = {
  users: '/users',
  signin: '/signin',
  words: '/words',
};

const generateQueryString = (queryParams: Query[]) => {
  if (!queryParams.length) return '';
  return `?${queryParams.map((x) => `${x.key}=${x.value}`).join('&')}`;
};

export const createUser = (user: User) => {
  return {
    url: `${baseUrl}${path.users}`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  } as RequestObject;
};

export const signIn = (user: User) => {
  return {
    url: `${baseUrl}${path.signin}`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  } as RequestObject;
};

export const getWords = (queryParams: Query[]) => {
  return { url: `${baseUrl}${path.words}${generateQueryString(queryParams)}`, method: 'GET' } as RequestObject;
};

export const getWord = (wordId: string) => {
  return { url: `${baseUrl}${path.words}/${wordId}`, method: 'GET' } as RequestObject;
};

export const getUserWords = (userId: string, token: string) => {
  return {
    url: `${baseUrl}${path.users}/${userId}${path.words}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  } as RequestObject;
};

export const getUserWord = (userId: string, token: string, wordId: string) => {
  return {
    url: `${baseUrl}${path.users}/${userId}${path.words}/${wordId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  } as RequestObject;
};

export const deleteUserWord = (userId: string, token: string, wordId: string) => {
  return {
    url: `${baseUrl}${path.users}/${userId}${path.words}/${wordId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  } as RequestObject;
};

export const createUserWord = (userId: string, token: string, wordId: string, userWord: UserWord) => {
  return {
    url: `${baseUrl}${path.users}/${userId}${path.words}/${wordId}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userWord),
  } as RequestObject;
};

export const updateUserWord = (userId: string, token: string, wordId: string, userWord: UserWord) => {
  return {
    url: `${baseUrl}${path.users}/${userId}${path.words}/${wordId}`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userWord),
  } as RequestObject;
};

export const makeRequest = async (requestObject: RequestObject, requestName: string) => {
  let rawResponse = null;
  try {
    rawResponse = await fetch(requestObject.url, {
      method: requestObject?.method,
      headers: requestObject?.headers,
      body: requestObject?.body,
    });
  } catch (error) {
    console.log('Возникла проблема с fetch запросом: ', (error as Error).message);
  }

  const content = rawResponse?.statusText !== 'No Content' ? (rawResponse?.ok ? await rawResponse.json() : null) : null;
  const status = rawResponse?.status;

  switch (requestName) {
    case 'createUser': {
      switch (status) {
        case STATUS.OK:
          return content;
        case STATUS.EXPECTATION_FAILED:
          throw new Error('Пользователь уже существует.');
        case STATUS.UNPROCESSABLE_ENTITY:
          throw new Error('Некорректная почта или пароль.');
        default:
          throw new Error('Произошла непредвиденная ошибка!');
      }
    }
    case 'signIn': {
      if (status === STATUS.OK) {
        return content;
      } else {
        throw new Error('Неверная почта или пароль.');
      }
    }
    case 'getWords': {
      if (status === STATUS.OK) {
        return content;
      } else {
        throw new Error('Возникла ошибка при обращении к серверу.');
      }
    }
    case 'getWord': {
      if (status === STATUS.OK) {
        return content;
      } else {
        throw new Error('Возникла ошибка при обращении к серверу.');
      }
    }
    case 'getUserWords': {
      switch (status) {
        case STATUS.OK:
          return content;
        case STATUS.UNAUTHORIZED:
          throw new Error('UNAUTHORIZED: Access token is missing or invalid');
        default:
          throw new Error('Возникла ошибка при обращении к серверу.');
      }
    }
    case 'getUserWord': {
      switch (status) {
        case STATUS.OK:
          return content;
        case STATUS.UNAUTHORIZED:
          throw new Error('UNAUTHORIZED: Access token is missing or invalid');
        case STATUS.NOT_FOUND:
          return undefined;
        default:
          throw new Error('Возникла ошибка при обращении к серверу.');
      }
    }
    case 'deleteUserWord': {
      switch (status) {
        case STATUS.OK_NO_CONTENT:
          return content;
        case STATUS.UNAUTHORIZED:
          throw new Error('UNAUTHORIZED: Access token is missing or invalid');
        default:
          throw new Error('Возникла ошибка при обращении к серверу.');
      }
    }
    case 'createUserWord': {
      switch (status) {
        case STATUS.OK:
          return content;
        case STATUS.UNAUTHORIZED:
          throw new Error('UNAUTHORIZED: Access token is missing or invalid');
        default:
          throw new Error('Возникла ошибка при обращении к серверу.');
      }
    }
    case 'updateUserWord': {
      switch (status) {
        case STATUS.OK:
          return content;
        case STATUS.UNAUTHORIZED:
          throw new Error('UNAUTHORIZED: Access token is missing or invalid');
        default:
          throw new Error('Возникла ошибка при обращении к серверу.');
      }
    }
  }
};
