const baseUrl = 'https://react-learnwords-example.herokuapp.com';

const path = {
  users: '/users',
  signin: '/signin',
};

export type User = {
  email: string;
  password: string;
};

export type RequestFunction = (user: User) => Promise<Response>;

export type RequestData = User;

export const createUser = async (user: User) => {
  const rawResponse = await fetch(`${baseUrl}${path.users}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  return rawResponse;
};

export const signIn = async (user: User) => {
  const rawResponse = await fetch(`${baseUrl}${path.signin}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  return rawResponse;
};

export const makeRequest = async (action: RequestFunction, data: RequestData) => {
  const rawResponse = await action(data);
  const content = await rawResponse.json();
  return content;
};
