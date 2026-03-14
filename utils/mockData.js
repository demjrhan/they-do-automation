export const VALID_EMAIL = [
  'alice.johnson@mail.org',
  'bob_smith99@company.co',
  'carol.martinez@startup.io',
];

export const INVALID_EMAIL = [
  'nopatatesign.com',
  'nodotatend',
  'double@@mail.com',
  'spaces in@email.com',
  '',
  'a',
  'justtext',
  '@nomail.com',
  'nomail@',
  'test@.',
];

export const VALID_PASSWORD = [
  'SecureP4ss!',
  'myStr0ng#pass',
  'correcthorse',
];

export const INVALID_PASSWORD = [
  '',
  '1',
  'ab',
  'a'.repeat(200),
  '        ',
  'password',
  '11111111',
];
