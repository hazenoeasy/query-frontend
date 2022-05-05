export function getToken() {
  return localStorage.token;
}

export function setToken(token: string) {
  return (localStorage.token = token);
}

export function removeToken() {
  return localStorage.removeItem('token');
}
