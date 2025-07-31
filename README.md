# BuildMyResume

BuildMyResume is a web-based application that allows users to create, customize, and download professional resumes. The application features a user-friendly interface with multiple templates and real-time preview.

## Tech Stack

**Frontend:**

*   React.js
*   Vite
*   Tailwind CSS
*   React Router
*   Axios

**Backend:**

*   Node.js
*   Express.js
*   MongoDB
*   Mongoose
*   JWT for authentication
*   Multer for file uploads
*   Cloudinary for image storage

## Folder Structure

```
BuildMyResume/
├── backend/
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Express middlewares
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── .env                # Environment variables
│   ├── package.json
│   └── server.js           # Express server entry point
└── frontend/
    └── resume-builder/
        ├── public/
        ├── src/
        │   ├── assets/
        │   ├── components/     # Reusable React components
        │   ├── context/        # React context for state management
        │   ├── pages/          # Application pages
        │   └── utils/          # Utility functions
        ├── .gitignore
        ├── index.html
        ├── package.json
        └── vite.config.js
```

## Prerequisites

*   Node.js (v14 or later)
*   npm
*   MongoDB (local or Atlas)
*   Cloudinary account (for image storage)

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/AnkushGitRepo/BuildMyResume.git
    cd BuildMyResume
    ```

2.  **Backend Setup:**

    *   Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `backend` directory and add the following variables:
        ```
        MONGO_URI=<your_mongodb_connection_string>
        PORT=5000
        CLIENT_URL=http://localhost:5173
        CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
        CLOUDINARY_API_KEY=<your_cloudinary_api_key>
        CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
        ```
    *   Start the backend server:
        ```bash
        npm run dev
        ```

3.  **Frontend Setup:**

    *   Navigate to the `frontend/resume-builder` directory:
        ```bash
        cd ../frontend/resume-builder
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Start the frontend development server:
        ```bash
        npm run dev
        ```

The application should now be running at `http://localhost:5173`.

## Author

*   **Ankush**
    *   GitHub: [@Ankush](https://github.com/AnkushGitRepo)
    *   LinkedIn: [Ankush](https://www.linkedin.com/in/ankushgupta18/)
