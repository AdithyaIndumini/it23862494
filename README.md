
## ✅ README.md (Playwright Assignment with npm instructions)

```md
# Playwright Automation Assignment

This repository contains a test automation assignment implemented using **Playwright** with **TypeScript**.  
The project demonstrates basic end-to-end testing, configuration, and CI integration.

---

## 📌 Project Details
- **Tool:** Playwright
- **Language:** TypeScript
- **Test Framework:** Playwright Test
- **Browser Support:** Chromium, Firefox, WebKit
- **CI:** GitHub Actions

---

## 📂 Project Structure
```

.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── tests/
│   └── example.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

````

> Note: `node_modules/` is **not included** in this repository. All dependencies can be installed using `npm install`.

---

## ⚙️ Prerequisites
Make sure you have the following installed:
- **Node.js** (v18 or later)
- **npm** (comes with Node.js)

---

## 🚀 Installation
After cloning the repository, install dependencies:

```bash
git clone https://github.com/AdithyaIndumini/it23862494.git
cd it23862494
npm install
````

> This will create the `node_modules/` folder with all required packages.

---

## ▶️ Running Tests

Run all Playwright tests:

```bash
npx playwright test
```

Run tests in UI mode:

```bash
npx playwright test --ui
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

---

## 📊 View Test Report

After running tests, open the HTML report:

```bash
npx playwright show-report
```

---

## 🔄 Continuous Integration

This project uses **GitHub Actions** to automatically run Playwright tests on every push and pull request using the workflow defined in:

```
.github/workflows/playwright.yml
```

---

## 🧪 Sample Test

The sample test verifies the content of `example.com`:

* Checks page URL
* Verifies page heading text

---

## 👩‍💻 Author

**Name:** Adithya Indumini
**Index No:** IT23862494

---



