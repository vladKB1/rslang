export type RequestFunction = (user: User) => Promise<Response>;

export type User = {
  email: string;
  password: string;
};

export type Query = {
  key: string;
  value: string;
};

export type RequestData = User;

const baseUrl = 'https://react-learnwords-example.herokuapp.com';

const path = {
  users: '/users',
  signin: '/signin',
  words: '/words',
};

const generateQueryString = (queryParams: Query[]) => {
  if (!queryParams.length) return '';
  return `?${queryParams.map((x) => `${x.key}=${x.value}`).join('&')}`;
};

export const createUser = async (user: User) => {
  return fetch(`${baseUrl}${path.users}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const signIn = async (user: User) => {
  return fetch(`${baseUrl}${path.signin}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const getWordsForLevel = async (queryParams: Query[]) => {
  return fetch(`${baseUrl}${path.words}${generateQueryString(queryParams)}`, {});
};

export const makeRequest = async (action: RequestFunction, data: RequestData) => {
  const rawResponse = await action(data);
  const content = rawResponse.ok ? await rawResponse.json() : null;
  const status = rawResponse.status;

  switch (action.name) {
    case 'createUser': {
      switch (status) {
        case 200:
          return content;
        case 417:
          throw new Error('Пользователь уже существует.');
        case 422:
          throw new Error('Некорректная почта или пароль.');
        default:
          throw new Error('Произошла непредвиденная ошибка!');
      }
    }
    case 'signIn': {
      if (status === 200) {
        return content;
      } else {
        throw new Error('Неверная почта или пароль.');
      }
    }
  }
};
