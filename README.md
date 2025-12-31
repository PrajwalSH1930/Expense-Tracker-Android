# SmartBudget - Android Expense Tracker & Analytics

SmartBudget is a real-time expense tracking and visual analytics application. Originally developed as a web-based tool using **Tailwind CSS** and **Chart.js**, this project has been successfully ported to a **native Android application** using **Java** and **Android WebView**.

---

## 🚀 Features

### 🔹 Real-time Tracking

* Instantly add income and expenses
* Clean, intuitive, and responsive UI

### 📊 Visual Analytics

* Dynamic spending breakdown using a **Doughnut Chart**
* Powered by **Chart.js** for smooth and interactive visuals

### 💰 Budget Management

* Set budget limits for categories such as:

  * Housing
  * Food
  * Transportation
  * Entertainment
* Monitor spending with animated **progress bars**

### 🕒 History & Filtering

* View complete transaction history
* Filter transactions by category for better insights

### 🔐 Local Persistence

* Uses **DOM Storage (LocalStorage)**
* All data is stored locally on the device
* Ensures privacy and persistence across app launches

### 📤 Export Support

* Export all transaction data as a **CSV file**
* Download directly to your mobile device

---

## 🛠️ Technical Stack

| Layer            | Technology                           |
| ---------------- | ------------------------------------ |
| Mobile Framework | Android (Java)                       |
| View Layer       | Android WebView                      |
| UI/UX            | HTML5, Tailwind CSS, FontAwesome 6.0 |
| Charts           | Chart.js                             |
| Build System     | Gradle (Kotlin DSL)                  |

---

## 📱 Architecture

SmartBudget follows a **hybrid architecture**:

* The complete UI and business logic are placed inside the **assets/** folder
* Content is rendered using a **highly optimized WebView** in `MainActivity`

### 🔧 Android (Java)

* Handles Android-specific configurations
* Enables LocalStorage and database access
* Manages hardware back-button navigation

### 🌐 WebView Configuration

```java
webSettings.setJavaScriptEnabled(true);
webSettings.setDomStorageEnabled(true);
webSettings.setDatabaseEnabled(true);
```

* **JavaScriptEnabled** → Enables dynamic UI and logic
* **DomStorageEnabled** → Enables LocalStorage (local database)
* **DatabaseEnabled** → Supports persistent web storage

---



## 📂 Project Structure

```plaintext
app/
├── src/
│   ├── main/
│   │   ├── assets/             # Web code (HTML, CSS, JS)
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── styles.css
│   │   ├── java/com/.../
│   │   │   └── MainActivity.java   # Android–Web bridge
│   │   └── res/layout/
│   │       └── activity_main.xml   # WebView container
└── build.gradle.kts                # Build configuration
```

---

## ⚙️ Requirements

* **Android Studio**: Jellyfish or higher
* **Gradle**: 8.11.1
* **Minimum SDK**: API 24 (Android 7.0)
* **Compile SDK**: API 34

---

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/PrajwalSH1930/Expense-Tracker-Android.git
```

2. Open the project in **Android Studio**
3. Allow **Gradle sync** to complete
4. Connect a physical Android device or start an emulator
5. Click **Run ▶️** to launch the app

---

## 🤝 Contribution

Contributions, issues, and feature requests are welcome!

* Fork the repository
* Create a new branch for your feature or fix
* Submit a pull request

Check the **Issues** page to see open tasks or suggest improvements.

---

## 📌 Summary

SmartBudget delivers a seamless **web-to-mobile experience**, combining the flexibility of modern web technologies with the performance and native capabilities of Android. It is lightweight, privacy-focused, and ideal for personal expense tracking with powerful visual insights.

---

⭐ If you like this project, feel free to star it and contribute!
