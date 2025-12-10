# ✨ MCU Chronos: The Super Chronological Multiverse Timeline

## 🚀 Project Overview
**MCU Chronos** is a single-page interactive web application that transforms the traditional movie list into a dynamic, scroll-controlled timeline. Built with **Vue.js** and **GSAP ScrollTrigger**, this project provides the definitive, chronological viewing order of the Marvel Cinematic Universe, meticulously weaving in the full list of canonical series (The Defenders Saga, Agents of S.H.I.E.L.D., etc.) and non-MCU films (X-Men, Blade, Sonyverse) to create the complete **Multiverse Order**.

The website utilizes a unique Scrollytelling UX: users scroll vertically to navigate the timeline horizontally.

### Key Features
* **Dimensional Hub Navigation:** Start at a central hub menu to filter the timeline by **Infinity Saga**, **Multiverse Saga**, or the **Super Chronological** master list.
* **Scrollytelling Timeline:** Converts vertical mouse scroll into smooth horizontal traversal across the timeline, highlighting one movie at a time.
* **Dynamic Data Fetching:** Movie posters and metadata are sourced securely and dynamically from **The Movie Database (TMDB) API**, ensuring up-to-date visual content.
* **Responsive UX:** Features a large, horizontal scroll mechanism for desktop, switching to an optimized vertical timeline for mobile devices.
* **Reactive UI:** Displays the currently active title and its in-universe date in large, focused text.

---

## 🛠️ Tech Stack & Architecture

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Vue 3** (Composition API) | Reactive front-end development and component management. |
| **Build Tool** | **Vite** | Lightning-fast development server and optimized production builds. |
| **Animation** | **GSAP (GreenSock)** | High-performance, professional-grade animation library for the core scroll-hijacking effect. |
| **Styling** | **Tailwind CSS** | Utility-first framework for rapid, responsive UI development. |
| **Data Fetching** | **Axios** | Promise-based HTTP client for securely fetching TMDB data. |
| **Routing** | **Vue Router** | Handles smooth transitions between the Hub Menu (`/`) and the specific timelines (`/timeline/:filter`). |

---

## 🚀 Getting Started

To run this project locally for development, follow these simple steps.

### Prerequisites

You must have [Node.js](https://nodejs.org/en/) (v16+) and npm installed.

### 1. Clone the Repository

```bash
git clone [https://github.com/YOUR_USERNAME/marvel-timeline.git](https://github.com/YOUR_USERNAME/marvel-timeline.git)
cd marvel-timeline