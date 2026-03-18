import {
  VALID_EMAIL,
  INVALID_EMAIL,
  VALID_PASSWORD,
  INVALID_PASSWORD,
  PASSWORD_CHARS,
  PASSWORD_NUMBER_CHARS,
  PASSWORD_SPECIAL_CHARS,
} from './mockData.js';

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

export function getRandomPassword(length = 5, isNumbers = false, isSpecialChars = false) {
  if (length < 5) length = 5;

  const randomChar = (str) => str[Math.floor(Math.random() * str.length)];

  let numCount = 0;
  let specialCount = 0;

  if (isNumbers && isSpecialChars) {
    numCount = Math.floor(length * 0.2);
    specialCount = Math.floor(length * 0.2);
  } else if (isNumbers) {
    numCount = Math.floor(length * 0.4);
  } else if (isSpecialChars) {
    specialCount = Math.floor(length * 0.4);
  }

  const charCount = length - numCount - specialCount;
  let password = '';

  for (let i = 0; i < charCount; i++) password += randomChar(PASSWORD_CHARS);
  for (let i = 0; i < numCount; i++) password += randomChar(PASSWORD_NUMBER_CHARS);
  for (let i = 0; i < specialCount; i++) password += randomChar(PASSWORD_SPECIAL_CHARS);

  console.log("Created password -> " + password);
  return password;
}
