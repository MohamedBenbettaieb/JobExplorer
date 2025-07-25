# JobExplorer 🧭

**JobExplorer** is a full-stack application that allows users to search for jobs using a mobile app built with **React Native**, powered by a **.NET 6 Web API** backend. The system also includes **end-to-end (E2E)** tests using **Playwright** to ensure the full user journey works as expected.

---

## ✨ Features

- 🔍 Search for jobs by keyword and location  
- 📱 Cross-platform mobile UI (built with React Native and Expo)  
- ⚙️ Backend API with filtering and CORS enabled  
- ✅ Playwright tests to validate user interactions end-to-end

---

## 🗂 Project Structure

```
JobExplorer/
├── backend/                   # .NET 6 Web API
│   └── Controllers/
├── mobile/                    # React Native (Expo)
│   └── HomeScreen.tsx
├── tests/JobExplorer.PlaywrightTests/ # Playwright E2E tests
│   └── e2e/job-search.spec.ts
└── README.md
```

---

## 🛠 Prerequisites

- Node.js >= 18  
- .NET 6 SDK  
- Playwright (`npx playwright install`)  
- Expo CLI (`npm install -g expo-cli`)  
- Android/iOS emulator or Expo Go app on your device

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/JobExplorer.git
cd JobExplorer
```

---

### 2. Run the Backend (.NET API)

```bash
cd backend
dotnet restore
dotnet run
```

The API will run on `https://localhost:44316`.

> 🔒 Make sure CORS is configured to allow requests from Expo (e.g., `http://localhost:19006`).

---

### 3. Run the Mobile App (React Native)

```bash
cd mobile
npm install
npx expo start
```

- Run on Android/iOS device using Expo Go  
- Connect your physical device or emulator  
- The app will send API requests to `https://localhost:44316`

> 💡 If testing on a real device, replace `localhost` in the mobile app with your PC's local IP (e.g., `192.168.1.5`).

---

## 🧪 End-to-End Testing (Playwright)

### Folder

Tests are located in:  
```
tests/JobExplorer.PlaywrightTests/
```

### Run E2E Test

```bash
cd tests/JobExplorer.PlaywrightTests
npm install
npx playwright install
npx playwright test
```

> ⏳ Slowness is intentional in E2E to simulate real user behavior (`slowMo` mode enabled).

### Test Summary

**Test: `can search for jobs and see results`**
- Navigates to the Expo web preview
- Fills in `Keyword` and `Location`
- Clicks `Search`
- Waits for at least one job card to appear

```ts
test('can search for jobs and see results', async ({ page }) => {
  await page.goto('http://localhost:19006');
  await page.getByPlaceholder('Keyword').fill('react');
  await page.getByPlaceholder('Location').fill('remote');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForSelector('text=/.* - .*/');
});
```

> 💡 You can view full test output in `playwright-report/` after each run using:
> 
> ```bash
> npx playwright show-report
> ```

---

## 📚 Developer Notes

- Make sure HTTPS certificates are trusted locally for the .NET backend.  
- For smoother mobile-backend connection on real devices, expose your local server using `ngrok` or similar if needed.  
- Playwright tests run best when both mobile (web preview) and backend are running locally.

---

## 🧩 Tech Stack

| Layer        | Tech                         |
|--------------|------------------------------|
| Backend      | .NET 6 Web API               |
| Mobile App   | React Native (Expo)          |
| Testing      | Playwright                   |
| Styling      | React Native StyleSheet      |

---
