# MyNotes - Cross-Platform Note-Taking App

## Overview
MyNotes is a cross-platform mobile application designed for efficient note-taking and management. The app is built using React Native for the frontend and uses a PHP-based web application as its backend, with MySQL as the database management system. MyNotes allows users to register, create, view, and manage their notes seamlessly.

## Features

### User Registration
- Capture the following user details during registration:
  - **Mobile Number:** Validation supports only Sri Lankan mobile numbers.
  - **First Name & Last Name:** Personal details of the user.
  - **User Type:** Options include "Employee" or "Student".
  - **Password:** Securely stored for authentication.

### User Sign-In
- Allow users to sign in using their registered mobile number and password.
- A single sign-in is sufficient; the app does not require re-authentication on subsequent uses unless the user signs out manually.

### Notes Management
- **Create Notes:**
  - Users can create a new note by providing the following details:
    - **Title:** Brief summary of the note.
    - **Description:** Detailed content of the note.
    - **Category:** Choose from predefined categories such as "Study", "Work", "Travel".

- **View Notes:**
  - Display all saved notes in a list format with the following information:
    - Title
    - Description
    - Date and Time of Creation
    - An icon representing the category type
  - Example UI for a list item:
    - **Work Icon** | "Finish project report" | "Complete by tomorrow evening." | "12 Dec 2024, 3:45 PM"

## Backend
- **Server:** PHP web application for handling user registration, authentication, and note operations.
- **Database:** MySQL is used for storing user details and notes.

## Frontend
- **Framework:** React Native ensures cross-platform compatibility for iOS and Android devices.

## Installation and Setup
1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mynotes.git
   cd mynotes

2. Install dependencies:

   ```bash
   npm install
   
3. Set up the backend:

  - Configure the PHP backend and connect it to a MySQL database.
  - Update the app's API endpoint URLs in the React Native project.

   
4. Run the application:

   ```bash
   npm start


