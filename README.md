# Frontend Developer Technical Task - Product Catalog App

A production-ready React application showcasing responsive design, secure JWT authentication workflows, state parameters caching, searching criteria, dynamic routing configurations via view steps, and pagination.

**Live Demo:** [https://products-app-bay.vercel.app/](https://products-app-bay.vercel.app/)

## Tech Stack Used
* **Framework:** React (Vite environment configuration)
* **Styling Engine:** Tailwind CSS (Fully responsive layout models)
* **Data Layer State:** React Query (@tanstack/react-query)
* **Global States Provider:** React Context API (Auth token verification models)
* **Icons Pack:** Lucide React

## Key Project Structural Features Implemented
1. **User Authentication & Simulated Registration Management:**
   * **Registration Flow:** Intercepts registrations locally via custom state mapping. Since public APIs do not permanently store new user writes, registering a new account successfully serializes the data safely inside the browser's storage layer for subsequent validations.
   * **Authentication Guard:** Intercepts route viewing permissions globally until user login metrics resolve successfully using token states.
   * **Fallbacks:** Automatically retains compatibility with default public credentials (`username: emilys`, `password: emilyspass`).
2. **Server States Caching Architecture:**
   * Utilizes React Query workflows to store category tables and product models automatically.
   * Implements a strict `staleTime` and caching invalidation routine to drastically reduce repetitive network hits and optimize local state metrics.
   * **Authentication State Caching:** Preserves authorization sessions across hard page refreshes by implementing synchronous lazy initializers directly tied to the client storage layers.
3. **Product Catalog Page & Dynamic Layout Grid:**
   * Fetches remote product arrays and structural metadata efficiently.
   * Renders item properties within highly fluid responsive card structures featuring strict multi-device layout scaling.
4. **Advanced Filtering Matrix & Context Retention:**
   * Complete real-time filtering via the integrated title-matching text field inputs and the targeted drop-down category selectors.
   * **State Retention Workflows:** Implements high-level state lifting patterns. Query parameter variations, searching keywords, active selections, and current pagination page records are securely hoisted to prevent unexpected status resets when navigating deep into details interfaces and returning back.
5. **Product Detail View Configuration:**
   * Seamlessly displays detailed single product entries specifying extended descriptions, direct categorical badges, dynamic image arrays, warranty terms, and return guidelines.
6. **UX States Coverage:**
   * Fluid loading skeleton matrices for layout placeholders while query resolutions remain pending.
   * Targeted fallback layouts matching unexpected network errors or dynamic token state validation drops.
   * Lazy loading optimization image attributes to minimize structural paint delays.

## Installation & Setup Steps
Follow these steps to run the application locally:

1. Clone this repository to your system:
   ```bash
   git clone <your-repository-url>
   cd <project-folder-name>

2. Install the necessary project dependencies:
   ```bash
   npm install

3. Start the local development server:
   ```bash
   npm run dev

4. Open your browser and navigate to the local server URL (usually http://localhost:5173)
   