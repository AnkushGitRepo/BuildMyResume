# BuildMyResume (BMR2) Project Overview

This document provides a comprehensive overview of the BuildMyResume (BMR2) project, detailing its purpose, architecture, folder structure, and technical requirements.

## 1. Project Description

BuildMyResume (BMR2) is a full-stack web application designed to help users create, manage, and update their professional resumes. It features a user-friendly interface for inputting personal, educational, work experience, skills, projects, certifications, and language information. The application offers multiple resume templates for users to choose from and allows for dynamic updates and rendering of resumes. It includes user authentication (login/signup) and image upload functionalities for profile photos.

The project is structured into two main parts: a Node.js backend API and a React.js frontend application.

## 2. Folder Structure

The project is organized into `backend` and `frontend` directories, each containing its specific components and configurations.

```
/BMR2/
├───.gitignore
├───README.md
├───.git/
├───.idea/
│   ├───.gitignore
│   ├───BuildMyResume.iml
│   ├───vcs.xml
│   └───workspace.xml
├───backend/
│   ├───.DS_Store
│   ├───package-lock.json
│   ├───package.json
│   ├───server.js
│   ├───config/
│   │   └───db.js
│   ├───controllers/
│   │   ├───authController.js
│   │   ├───resumeController.js
│   │   └───uploadImages.js
│   ├───middlewares/
│   │   ├───authMiddleware.js
│   │   └───uploadMiddleware.js
│   ├───models/
│   │   ├───Resume.js
│   │   └───User.js
│   ├───node_modules/
│   ├───routes/
│   │   ├───authRoutes.js
│   │   └───resumeRoutes.js
│   └───uploads/
│       └───.DS_Store
└───frontend/
    ├───.DS_Store
    ├───package-lock.json
    └───buildmyresume/
        ├───.gitignore
        ├───eslint.config.js
        ├───index.html
        ├───package-lock.json
        ├───package.json
        ├───README.md
        ├───vite.config.js
        ├───node_modules/
        ├───public/
        │   └───vite.svg
        └───src/
            ├───App.jsx
            ├───index.css
            ├───main.jsx
            ├───assets/
            │   ├───hero-img.png
            │   ├───react.svg
            │   ├───template-one.png
            │   ├───template-three.png
            │   └───template-two.png
            ├───components/
            │   ├───Modal.jsx
            │   ├───Progress.jsx
            │   ├───StepProgress.jsx
            │   ├───Tabs.jsx
            │   ├───Cards/
            │   │   ├───ProfileInfoCard.jsx
            │   │   ├───ResumeSummaryCard.jsx
            │   │   └───TemplateCard.jsx
            │   ├───Inputs/
            │   │   ├───Input.jsx
            │   │   ├───ProfilePhotoSelector.jsx
            │   │   └───TitleInput.jsx
            │   ├───layouts/
            │   │   ├───DashboardLayout.jsx
            │   │   └───Navbar.jsx
            │   ├───ResumeSections/
            │   │   ├───ActionLink.jsx
            │   │   ├───CertificationInfo.jsx
            │   │   ├───ContactInfo.jsx
            │   │   ├───EducationInfo.jsx
            │   │   ├───LanguageSection.jsx
            │   │   ├───ProjectInfo.jsx
            │   │   ├───RatingInput.jsx
            │   │   ├───SkillSection.jsx
            │   │   └───WorkExperience.jsx
            │   └───ResumeTemplates/
            │       ├───RenderResume.jsx
            │       ├───TemplateOne.jsx
            │       ├───TemplateThree.jsx
            │       └───TemplateTwo.jsx
            ├───context/
            │   └───userContext.jsx
            ├───pages/
            │   ├───LandingPage.jsx
            │   ├───Auth/
            │   │   ├───Login.jsx
            │   │   └───SignUp.jsx
            │   ├───Home/
            │   │   ├───CreateResumeForm.jsx
            │   │   └───Dashboard.jsx
            │   └───ResumeUpdate/
            │       ├───EditResume.jsx
            │       ├───ThemeSelector.jsx
            │       └───Forms/
            │           ├───AdditionalInfoFrom.jsx
            │           ├───CertificationInfoFrom.jsx
            │           ├───ContactInfoForm.jsx
            │           ├───EducationDetailsForm.jsx
            │           ├───ProfileInfoForm.jsx
            │           ├───ProjectsDetailFrom.jsx
            │           ├───SkillsInfoForm.jsx
            │           └───WorkExperienceForm.jsx
            └───utils/
                ├───apiPaths.js
                ├───axiosInstance.js
                ├───data.js
                ├───helper.js
                └───uploadImage.js
```

### 2.1. `backend/`

This directory contains the Node.js Express.js server that handles API requests, database interactions, and business logic.

-   `server.js`: The main entry point for the backend application. It sets up the Express server, connects to the database, and defines routes.
-   `package.json`: Defines project metadata, scripts, and dependencies for the backend.
-   `package-lock.json`: Records the exact dependency tree.
-   `config/`:
    -   `db.js`: Contains the database connection logic (e.g., MongoDB connection using Mongoose).
-   `controllers/`: Contains the logic for handling incoming requests and sending responses.
    -   `authController.js`: Handles user authentication (signup, login).
    -   `resumeController.js`: Manages resume-related operations (create, read, update, delete resumes).
    -   `uploadImages.js`: Handles image upload logic.
-   `middlewares/`: Contains middleware functions for request processing.
    -   `authMiddleware.js`: Middleware for authenticating user requests (e.g., JWT verification).
-   `uploadMiddleware.js`: Middleware for handling file uploads (e.g., Multer configuration).
-   `models/`: Defines the Mongoose schemas and models for the database.
    -   `Resume.js`: Mongoose model for resume data.
    -   `User.js`: Mongoose model for user data.
-   `routes/`: Defines the API endpoints and links them to their respective controller functions.
    -   `authRoutes.js`: Routes for authentication.
    -   `resumeRoutes.js`: Routes for resume management.
-   `uploads/`: Directory where uploaded files (e.g., profile images) are stored.
-   `node_modules/`: Contains all installed Node.js packages.

### 2.2. `frontend/buildmyresume/`

This directory contains the React.js application built with Vite.

-   `index.html`: The main HTML file that serves as the entry point for the React application.
-   `main.jsx`: The main JavaScript file that renders the React application into the DOM.
-   `App.jsx`: The root component of the React application, typically containing routing and global layout.
-   `package.json`: Defines project metadata, scripts, and dependencies for the frontend.
-   `package-lock.json`: Records the exact dependency tree.
-   `vite.config.js`: Vite configuration file.
-   `eslint.config.js`: ESLint configuration for code linting.
-   `index.css`: Global CSS styles for the application.
-   `public/`: Contains static assets that are served directly (e.g., `vite.svg`).
-   `src/`: Contains the main source code for the React application.
    -   `assets/`: Stores static assets like images used in the UI (e.g., `hero-img.png`, `template-one.png`).
    -   `components/`: Reusable UI components.
        -   `Modal.jsx`, `Progress.jsx`, `StepProgress.jsx`, `Tabs.jsx`: Generic UI components.
        -   `Cards/`: Components for displaying information in card format.
            -   `ProfileInfoCard.jsx`, `ResumeSummaryCard.jsx`, `TemplateCard.jsx`.
        -   `Inputs/`: Reusable input components.
            -   `Input.jsx`, `ProfilePhotoSelector.jsx`, `TitleInput.jsx`.
        -   `layouts/`: Components defining the overall page structure.
            -   `DashboardLayout.jsx`, `Navbar.jsx`.
        -   `ResumeSections/`: Components for individual sections within a resume form or display.
            -   `ActionLink.jsx`, `CertificationInfo.jsx`, `ContactInfo.jsx`, `EducationInfo.jsx`, `LanguageSection.jsx`, `ProjectInfo.jsx`, `RatingInput.jsx`, `SkillSection.jsx`, `WorkExperience.jsx`.
        -   `ResumeTemplates/`: Components responsible for rendering different resume templates.
            -   `RenderResume.jsx`: Likely a component that dynamically renders the selected template.
            -   `TemplateOne.jsx`, `TemplateThree.jsx`, `TemplateTwo.jsx`: Specific resume template components.
    -   `context/`: React Context API for global state management.
        -   `userContext.jsx`: Context for managing user-related state (e.g., authentication status, user data).
-   `pages/`: Top-level components representing different pages of the application.
        -   `LandingPage.jsx`: The initial landing page.
        -   `Auth/`: Authentication-related pages.
            -   `Login.jsx`, `SignUp.jsx`.
        -   `Home/`: Pages related to the user's dashboard and resume creation.
            -   `CreateResumeForm.jsx`, `Dashboard.jsx`.
        -   `ResumeUpdate/`: Pages for editing and updating existing resumes.
            -   `EditResume.jsx`, `ThemeSelector.jsx`.
            -   `Forms/`: Specific form components for different resume sections.
                -   `AdditionalInfoFrom.jsx`, `CertificationInfoFrom.jsx`, `ContactInfoForm.jsx`, `EducationDetailsForm.jsx`, `ProfileInfoForm.jsx`, `ProjectsDetailFrom.jsx`, `SkillsInfoForm.jsx`, `WorkExperienceForm.jsx`.
    -   `utils/`: Utility functions and configurations.
        -   `apiPaths.js`: Defines API endpoints.
        -   `axiosInstance.js`: Configures Axios for making HTTP requests to the backend.
-   `data.js`: Might contain static data or mock data.
        -   `helper.js`: General utility functions.
        -   `uploadImage.js`: Utility for handling image uploads from the frontend.
-   `node_modules/`: Contains all installed Node.js packages for the frontend.

## 3. Requirements

To run this project, you will need the following:

### 3.1. General
-   **Node.js**: Version 14 or higher (LTS recommended).
-   **npm** (Node Package Manager) or **Yarn**: For managing project dependencies.

### 3.2. Backend
-   **MongoDB**: A NoSQL database instance (local or cloud-hosted like MongoDB Atlas) for storing user and resume data.
-   Environment variables for database connection string, JWT secret, etc. (e.g., in a `.env` file).

### 3.3. Frontend
-   A modern web browser.

## 4. Recent Gemini Memory Session

This section will store a summary of recent interactions or key facts remembered by Gemini.

-   **Current Working Directory**: `/Users/ankush/Desktop/BMR2`
-   **Operating System**: `darwin` (macOS)
-   **Project Type**: Full-stack web application (Node.js/Express.js backend, React.js/Vite frontend).
-   **Database**: MongoDB.
-   **Session Summary (July 27, 2025):**
    -   Updated Navbar title from 'Resume Builder' to 'BuildMyResume'.
    -   Refactored footer on LandingPage:
        -   Changed to a professional-looking fixed footer.
        -   Moved title to left, social media links (with icons) to right.
-   Reverted social media links to original user-provided URLs.
        -   Removed "Made with ❤️... Happy Coding" text.
    -   Removed "Features That Make You Shine" section from LandingPage.
    -   Modified gradient color for "Resume Effortlessly" text on LandingPage to a professional blue.
    -   Made the hero image on LandingPage non-draggable.
    -   Resolved page loading issue by adding missing `react-icons` imports.
-   **Session Summary (July 31, 2025):**
    -   **Cloudinary Integration:** Implemented Cloudinary for image uploads, replacing local storage. This involved installing `cloudinary` and `multer-storage-cloudinary`, updating `uploadMiddleware.js` and `uploadImages.js` to use Cloudinary, and removing the local `uploads` directory.
    -   **Middleware Conflict Resolution:** Diagnosed and fixed a "Request timeout" error caused by `express.json()` middleware interfering with `multipart/form-data` requests. The global `express.json()` was removed from `server.js` and applied specifically to routes requiring JSON parsing in `authRoutes.js` and `resumeRoutes.js`.
    -   **Profile Image Persistence:** Ensured the user's profile image persists on the settings page after refresh by correctly initializing `profileImagePreview` from `user.profileImageUrl` in `Settings.jsx` and updating `ProfilePhotoSelector.jsx` to correctly display the `preview` prop.
    -   **Security Enhancement:** Implemented a `ProtectedRoute` component to restrict access to the `/settings` page to authenticated users only, redirecting unauthenticated users to the homepage.