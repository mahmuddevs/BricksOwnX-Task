Project Link: https://bricksownxtask-mahmud.netlify.app

---

## Setup Instructions

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)
- A Firebase project (for Firebase configuration)

---

## Environment Variables

To run this project, you need to set up the following environment variables in a `.env` file.

1. Go to the root of the project and create a `.env` file.
2. Add the following Firebase configuration credentials:

```plaintext
# .env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## How To Run

1. Open CMD in Root Directory
2. Run npm i or npm install
3. Run npm run dev
