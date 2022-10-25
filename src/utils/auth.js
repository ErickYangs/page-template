const LoginKey = "token";

const storage =
import.meta.env.VITE_APP_ONTOLOGY_NETWORK !== "main" ? sessionStorage : sessionStorage;

export function getToken() {
  return storage.getItem(LoginKey);
}

export function setToken(token) {
  return storage.setItem(LoginKey, token);
}

export function setNews(name, data) {
  return storage.setItem(name, data);
}
export function getNews(name) {
  return storage.getItem(name);
}
export function removeNews(name) {
  return storage.removeItem(name);
}
export function clear() {
  return storage.clear();
}
export function removeToken() {
  return storage.removeItem(LoginKey);
}
