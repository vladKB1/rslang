//export type RequestFunction = ((user: User) => Promise<Response>) | ((queryParams: Query[]) => Promise<Response>);

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
  headers: HeadersInit;
  body: string;
};

export type User = {
  email: string;
  password: string;
};

export type Query = {
  key: string;
  value: string;
};

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

export const makeRequest = async (requestObject: RequestObject, requestName: string) => {
  try {
    const rawResponse = await fetch(requestObject.url, {
      method: requestObject.method,
      headers: requestObject.headers,
      body: requestObject.body,
    });

    const content = rawResponse.ok ? await rawResponse.json() : null;
    const status = rawResponse.status;

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
    }
  } catch (error) {
    console.log('Возникла проблема с fetch запросом: ', (error as Error).message);
  }
};
