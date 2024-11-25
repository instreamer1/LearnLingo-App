# React + Vite

A web application for a company offering online language tutoring services. The platform includes features for browsing and managing a list of language teachers, filtering based on preferences, adding favorites, and booking trial lessons.

## Features

### Pages
1. **Home**:
   - Overview of the company’s benefits.
   - A call-to-action link redirecting users to the “Teachers” page.

2. **Teachers**:
   - Displays a list of teachers.
   - Includes filters for teaching language, student knowledge level, and price per hour.
   - Supports lazy loading of teacher cards (4 per page, with a “Load More” button).

3. **Favorites**:
   - Private page displaying the user’s favorite teachers.
   - Accessible only to authorized users.

### Technical Requirements
1. **Authentication**:
   - User registration, login, logout, and session management using Firebase Authentication.
   - Forms implemented with `react-hook-form` and validated with `yup`.
   - All fields are required.

2. **Database**:
   - Teachers’ data stored in Firebase Realtime Database with the following fields:
     - `name`, `surname`, `languages`, `levels`, `rating`, `reviews`, `price_per_hour`, `lessons_done`, `avatar_url`, `lesson_info`, `conditions`, `experience`.
   - Collection populated using `teachers.json`.

3. **Teacher Cards**:
   - Each card shows teacher details like name, languages, price, and lessons done.
   - Clicking "Read More" expands the card to show detailed information and reviews.
   - Clicking "Book Trial Lesson" opens a modal with a booking form.

4. **Favorites Management**:
   - For unauthorized users:
     - Clicking the "heart" button triggers a modal or toast message, prompting login.
   - For authorized users:
     - Clicking the "heart" button adds/removes the teacher to/from the favorites list.
     - Favorites are persisted in Firebase Firestore or `localStorage`.
     - Page refresh retains the state.
   - Heart icon color updates based on favorite status.