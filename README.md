# GraceTrack - Church Management System

Build: v0.0.1 (Fixed)

GraceTrack is a modern, responsive Progressive Web App (PWA) built specifically for churches to streamline their operations, primarily focusing on tithes, offerings, member management, and attendance.

## Features

- **Mobile-First PWA:** Installable on iOS and Android devices, optimized for both mobile and desktop.
- **Two User Portals:**
  - **Admin Dashboard:** Full access to metrics, member databases, financial logs, reports, and global settings.
  - **Usher/Scanner Dashboard:** A streamlined interface for scanning envelopes and quickly recording amounts during services.
- **Envelope Generation:** Generate PDF envelopes with custom tithe/offering QR codes linked to the member's profile and the specific week.
- **Automated Emails:** Cloud functions to automatically send post-offering thank you emails and daily devotionals based on member preferences.
- **Real-Time Data:** Powered by Firebase Firestore for real-time updates across all dashboards.

## Technology Stack

- **Frontend:** React (Vite), Tailwind CSS (v4), Framer Motion (Animations), Recharts (Charts)
- **Backend:** Firebase (Auth, Firestore, Cloud Functions)
- **Scanning:** `html5-qrcode`
- **PDF Generation:** `jspdf` & `jspdf-autotable`

## Setup & Development

### Prerequisites

1. Node.js (v18+)
2. A Firebase project

### 1. Firebase Configuration

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password).
3. Enable **Firestore Database**.
4. Set up the following environment variables in a `.env.local` file at the root of the project:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. Firestore Security Rules

Set the following rules in your Firestore console to ensure data security:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function getUserRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }
    
    function isAdmin() {
      return isAuthenticated() && getUserRole() == 'admin';
    }
    
    function isUsher() {
      return isAuthenticated() && getUserRole() == 'usher';
    }

    // Users
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin() || request.auth.uid == userId;
    }

    // Members, Church Settings, Email Logs
    match /members/{memberId} { allow read, write: if isAdmin(); }
    match /churchSettings/{document=**} { allow read: if isAuthenticated(); allow write: if isAdmin(); }
    match /emailLogs/{logId} { allow read: if isAdmin(); }
    match /dailyVerses/{dateKey} { allow read, write: if isAdmin(); }

    // Transactions
    match /transactions/{transactionId} {
      // Admins can do anything. Ushers can read and create, but not edit/delete.
      allow read: if isAdmin() || isUsher();
      allow create: if isAdmin() || isUsher();
      allow update, delete: if isAdmin();
    }

    // Attendance
    match /attendance/{attendanceId} {
      allow read, write: if isAdmin();
    }
  }
}
```

### 3. Run Locally

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

### 4. Deploy Cloud Functions

Make sure you have the Firebase CLI installed (`npm install -g firebase-tools`).

```bash
# Login to Firebase
firebase login

# Init functions (if not already done)
# firebase init functions

# Deploy functions
cd functions
npm install
firebase deploy --only functions
```

### 5. Deploy Frontend to Firebase Hosting

```bash
# Build the project
npm run build

# Deploy to hosting
firebase deploy --only hosting
```

## Production Readiness Checklist

- [ ] Update Firebase config in `.env.local`
- [ ] Configure Firestore Security Rules
- [ ] Set up SMTP credentials in Cloud Functions environment (`firebase functions:config:set smtp.user="your@email.com" smtp.pass="your_password"`)
- [ ] Ensure PWA manifest (`vite.config.js`) has your final icons and naming.
