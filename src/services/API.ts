export enum STATUS {
  OK = 200,
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

export const baseUrl = 'https://react-learnwords-example.herokuapp.com';

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

export const getDifficultWords = (userId: string, token: string) => {
  return {
    url: `${baseUrl}${path.users}${userId}${path.words}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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

  const content = rawResponse?.ok ? await rawResponse.json() : null;
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
      if (status == STATUS.OK) {
        return content;
      } else {
        throw new Error('Возникла ошибка при обращении к серверу.');
      }
    }
    case 'getDifficultWords': {
      //TODO: need to add authorization ability if toke is expired
      if (status == STATUS.OK) {
        return content;
      } else {
        throw new Error('Возникла ошибка при обращении к серверу.');
      }
    }
  }
};
