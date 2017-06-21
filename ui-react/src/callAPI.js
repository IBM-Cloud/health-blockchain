let user = null; // cache

const getRequest = url =>
  fetch(url, {
    credentials: 'include'
  }).then(response => response.ok ? response.json() : null);

const postRequest = (url, data = {}) =>
  fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data)
  });

const login = (email, password) => postRequest('/api/users/login', {
  email, password
})
  .then(response => response.json())
  .then((responseJSON) => {
    user = responseJSON; return responseJSON;
  });

const signup = (email, password, organization) =>
  postRequest('/api/users/signup', {
    email, password, organization
  }).then(response => response.json().then(responseJSON => responseJSON));

const loginOrSignup = (action, email, password, organization) => {
  if (action === 'signup') {
    return signup(email, password, organization);
  }
  return login(email, password);
};

const logout = () => {
  user = null;
  fetch('/api/users/logout', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include'
  }).then(response => response.json());
};

const loggedInUser = () => {
  if (user) {
    return new Promise(resolve => resolve(user));
  }
  return getRequest('/api/users/isLoggedIn').then((json) => {
    user = json;
    return json;
  });
};

export const API = {
  login,
  signup,
  loginOrSignup,
  logout,
  postRequest,
  getRequest,
  loggedInUser
};

export default API;
