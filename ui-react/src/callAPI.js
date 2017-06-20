const loginOrSignup = (action, email, password, organization) =>
  fetch(`/api/users/${action}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      email, password, organization
    })
  }).then(response => response.json());


const logout = () =>
  fetch('/api/users/logout', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include'
  }).then(response => response.json());

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

export const API = {
  loginOrSignup,
  logout,
  postRequest,
  getRequest
};

export default API;
