# 🏋️ FitLog — Workout Library

> **Train with intent. Log every set.**

FitLog is a modern, responsive workout library and daily workout planning application built with **Next.js**. It allows users to explore workouts, view detailed exercise information, save workouts for later, and create a personalized plan for today's training.

The project focuses on a clean dark-mode fitness experience with responsive design, smooth interactions, persistent client-side state, and API-driven workout data.

---

## ✨ Live Preview

🔗 **Live Website:** [Add your Netlify URL here]

🔗 **GitHub Repository:**
https://github.com/ShahriyerSakib/FitLog-for-Fit-People

---

## 📸 Project Overview

FitLog provides a simple workflow:

**Explore → View Details → Add to Plan → Track Progress**

Users can browse the workout library, sort and search exercises, view individual workout details, save exercises, and manage their daily workout plan.

---

## 🚀 Features

### 🏠 Workout Library

* Browse workout exercises from the FitLog API
* Responsive workout card grid
* Workout category information
* Equipment information
* Duration, calories and rating statistics
* Search workouts by name
* Sort workouts by:

  * Duration
  * Calories
  * Rating
* Loading state while fetching workout data

### 📋 Today's Plan

* Add workouts to today's plan
* Maximum of **5 workouts** per day
* Live exercise count
* Live total workout duration
* Live total calorie calculation
* Mark workouts as completed
* Remove workouts from the plan
* View workout details directly from the plan

### 🔖 Saved Workouts

* Save workouts for later
* Remove saved workouts
* Search saved workouts
* Dedicated Saved tab
* Live saved-workout counter

### 📖 Workout Details

Each workout has a dedicated dynamic page containing:

* Workout image
* Workout name
* Description
* Category tags
* Equipment
* Difficulty
* Sets and reps
* Duration
* Calories
* Rating
* Step-by-step instructions
* Add to Today's Plan action
* Save for Later action

### 🎨 User Experience

* Responsive design for mobile, tablet and desktop
* Dark fitness-focused UI
* Toast notifications
* Loading states
* Empty states
* Custom 404 page
* Smooth navigation
* Persistent workout data using `localStorage`

---

## 🛠️ Technologies Used

| Technology             | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| **Next.js**            | React framework and application architecture |
| **React**              | Building reusable UI components              |
| **TypeScript**         | Type-safe development                        |
| **Tailwind CSS**       | Responsive styling and UI design             |
| **Lucide React**       | Interface icons                              |
| **Sonner**             | Toast notifications                          |
| **Next.js App Router** | Page routing and layouts                     |
| **REST API**           | Workout data                                 |
| **localStorage**       | Persisting plan and saved workouts           |
| **Git & GitHub**       | Version control                              |

---

## 🔌 API

FitLog uses the following REST API:

### All Workouts

```text
https://api.abcz.workers.dev/api/fitlog
```

### Single Workout

```text
https://api.abcz.workers.dev/api/fitlog/:id
```

The application fetches workout data dynamically from the API and renders the information throughout the workout library and detail pages.

---

## 📁 Project Structure

```text
FitLog-for-Fit-People/
│
├── app/
│   ├── api/
│   │   └── health/
│   │       └── route.ts
│   │
│   ├── my-plan/
│   │   └── page.tsx
│   │
│   ├── workout/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── navbar.tsx
│   ├── providers.tsx
│   ├── store.tsx
│   ├── workout-card.tsx
│   └── workout-library.tsx
│
├── lib/
│   └── api.ts
│
├── public/
│   └── assets/
│       ├── banner.png
│       └── logo.png
│
├── types/
│   └── fitlog.ts
│
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── next-env.d.ts
```

---

## 🧭 Application Routes

| Route           | Description                   |
| --------------- | ----------------------------- |
| `/`             | Workout Library / Home        |
| `/workout/[id]` | Workout Details               |
| `/my-plan`      | Today's Plan & Saved Workouts |
| `/api/health`   | Application Health Check      |
| `/*`            | Custom 404 Page               |

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ShahriyerSakib/FitLog-for-Fit-People.git
```

### 2. Navigate to the project

```bash
cd FitLog-for-Fit-People
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏗️ Production Build

To create an optimized production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

---

## 📱 Responsive Design

FitLog is designed to work across:

* 📱 Mobile
* 📲 Tablet
* 💻 Laptop
* 🖥️ Desktop

The workout grid, navigation, hero section, workout cards and plan interface adapt according to screen size.

---

## 🧩 Key UI Sections

### Navigation

* FitLog branding
* Workout navigation
* My Plan navigation
* Plan counter
* Saved counter

### Hero

> **TRAIN WITH INTENT. LOG EVERY SET.**

A strong call-to-action takes users directly to the workout library.

### Library

A responsive workout grid displaying workout information and statistics.

### My Plan

A personal workout dashboard containing:

* Exercises
* Minutes
* Calories
* Today's Plan
* Saved workouts

---

## 🔔 Notifications

FitLog uses toast notifications to provide immediate feedback when users:

* Add a workout to today's plan
* Save a workout
* Remove a workout
* Mark a workout as done
* Remove a saved workout

---

## 💾 Data Persistence

Workout plan and saved workout information are stored using browser `localStorage`.

This allows the user's selected workouts to remain available after refreshing the page.

---

## 🔐 Code Quality

The project follows modern frontend development practices:

* TypeScript for type safety
* Reusable React components
* Next.js App Router
* Responsive utility-first styling
* Centralized client-side state
* API abstraction
* Meaningful Git commits
* Production build validation

---

## 📦 Deployment

The project is optimized for deployment on **Netlify** and other platforms that support Next.js.

### Recommended build command

```bash
npm run build
```

The project should be deployed directly from the GitHub repository.

> Do not commit `node_modules` or `.next` to GitHub.

---

## 🎯 Project Goals

The main goals of FitLog are:

1. Create a modern workout discovery experience.
2. Make workout planning simple and intuitive.
3. Practice Next.js App Router development.
4. Work with REST API data.
5. Build reusable and responsive components.
6. Implement client-side state management.
7. Practice production-ready Git and deployment workflows.

---

## 👨‍💻 Developer

**Shahriyer H Sakib**

Web Developer | WordPress Developer | Frontend Developer

### GitHub

https://github.com/ShahriyerSakib

---

## 📄 License

This project was created for educational and portfolio purposes.

---

<p align="center">
  Built with ❤️ using Next.js, TypeScript & Tailwind CSS
</p>
