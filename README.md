# TheyDo UI Automation

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![npm](https://img.shields.io/badge/npm-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

> Page Object Model UI automation for [TheyDo](https://app.theydo.com) with Playwright.  

---

## Highlights

- Page Object Model with a shared `BasePage` for common actions
- Locators and flows grouped by feature pages (`HomePage`, `JourneysPage`, etc.)
- Environment-based credentials via `.env` (see `.env.example`)
- Chromium desktop project configured in `playwright.config.js`

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Node.js** | Runtime |
| **JavaScript (ES modules)** | Test & page code |
| **Playwright** | Browser automation & assertions |
| **dotenv** | Load `LOGIN`, `PASSWORD`, `ORGANIZATION` from `.env` |
| **npm** | Scripts & dependencies |

---

## Project Structure

```
they-do-automation/
├── pages/
│   ├── BasePage.js
│   ├── HomePage.js
│   ├── JourneysPage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   └── SettingsPage.js
├── tests/
│   ├── home.spec.js
│   ├── journey.spec.js
│   ├── login.spec.js
│   └── register.spec.js
├── utils/
│   ├── helpers.js
│   └── mockData.js
├── playwright.config.js
├── package.json
├── .env.example
└── README.md
```

---

## Configuration

1. Copy `.env.example` to `.env` in the project root.
2. Set:

| Variable | Description |
|----------|-------------|
| `LOGIN` | Account email |
| `PASSWORD` | Account password |
| `ORGANIZATION` | Organization slug |

---

## How to Run

**Prereqs:** Node.js (LTS recommended), npm, Google Chrome

**Install dependencies (first time):**

```bash
npm install
npx playwright install
```

**All tests:**

```bash
npm test
```

**Single file:**

```bash
npx playwright test tests/home.spec.js
npx playwright test tests/journey.spec.js
```

**Debug:**

```bash
npx playwright test --debug
```

---

## Notes

- `baseURL` is set to `https://app.theydo.com` in `playwright.config.js`.
