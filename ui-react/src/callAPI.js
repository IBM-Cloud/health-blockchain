const loginOrSignup = (action, email, password) =>
  fetch(`/api/users/${action}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      email, password
    })
  }).then(response => response.json());

const getRequest = url =>
  fetch(url, {
    credentials: 'include'
  }).then(response => response.ok ? response.json() : null);

const postRequest = (url, body = '{}') =>
  fetch(url, {
    method: 'POST',
    credentials: 'include',
    body
  });

export const API = {
  loginOrSignup,
  postRequest,
  getRequest
};

export default API;
