import { VALID_EMAIL, INVALID_EMAIL, VALID_PASSWORD, INVALID_PASSWORD } from './mockData.js';

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getValidEmail() {
  return pickRandom(VALID_EMAIL);
}

export function getInvalidEmail() {
  return pickRandom(INVALID_EMAIL);
}

export function getValidPassword() {
  return pickRandom(VALID_PASSWORD);
}

export function getInvalidPassword() {
  return pickRandom(INVALID_PASSWORD);
}

export function getRandomValidCredentials() {
  return {
    email: getValidEmail(),
    password: getValidPassword(),
  };
}

export function getRandomInvalidCredentials() {
  return {
    email: getInvalidEmail(),
    password: getInvalidPassword(),
  };
}
