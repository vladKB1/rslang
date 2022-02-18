const baseUrl = 'https://react-learnwords-example.herokuapp.com';

const path = {
  users: '/users',
  signin: '/signin',
};

export type User = {
  email: string;
  password: string;
};

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

//export const makeRequest = async (func: requestFunction) => {};
