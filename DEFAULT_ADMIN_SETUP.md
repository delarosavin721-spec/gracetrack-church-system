# Default Admin Account Setup

## Overview
This project automatically creates a default System Admin account on first application load. This admin account has pre-approved access and can approve other admin and usher accounts for each church.

## Default Credentials

**Email:** `admin@churchsystem.com`
**Password:** `Admin@123Church`

> ⚠️ **IMPORTANT:** Change this password immediately after first login!

## How It Works

### 1. Automatic Initialization
When the application loads for the first time:
- The `initializeDefaultAdminOnce()` function in `src/firebase/defaultAdminSetup.js` is called
- It checks if a default admin account already exists in Firestore
- If not, it creates a Firebase Authentication account and Firestore user record
- The initialization only runs once per browser (tracked via localStorage)

### 2. Default Admin Features
The System Admin account has the following properties:
- **Role:** `admin`
- **Status:** Pre-approved (`active: true`)
- **Special Field:** `isDefaultAdmin: true` (marks it as the system default)
- **Can Approve:** Other admin and usher account registrations
- **Access Level:** Full access to all admin features

### 3. Account Approval System
- All new admin/usher registrations start with `active: false`
- The default system admin can approve pending users via the **User Management** page
- Once approved, users can log in and access their respective dashboards

## Setup Notice

When the default admin account is created for the first time, a notice will appear in the top-right corner of the admin dashboard displaying:
- The default email address
- The temporary password
- A warning to change the password
- A "Copy Credentials" button for convenience

## File Structure

### Created/Modified Files:

1. **`src/firebase/auth.js`**
   - Added `createDefaultAdmin()` function to create the default admin in Firebase Auth and Firestore

2. **`src/firebase/firestore.js`**
   - Added `createDefaultAdminRecord()` to create the Firestore user document
   - Added `getDefaultAdminStatus()` to check if default admin exists

3. **`src/firebase/defaultAdminSetup.js`** (NEW)
   - Core initialization logic
   - `initializeDefaultAdminOnce()` - Main initialization function
   - `getDefaultAdminCredentials()` - Retrieve credentials from session
   - `clearDefaultAdminCredentials()` - Clear credentials after display
   - `resetDefaultAdminFlag()` - Development utility to reset initialization

4. **`src/components/admin/DefaultAdminSetupNotice.jsx`** (NEW)
   - UI component that displays the credentials to the user
   - Shows only when default admin is first created
   - Provides copy and dismiss functionality

5. **`src/App.jsx`**
   - Added initialization call in useEffect hook
   - Runs once on app startup

6. **`src/pages/AdminHome.jsx`**
   - Integrated the DefaultAdminSetupNotice component

## Development & Testing

### To Reset the Default Admin (Development Only)
If you need to reinitialize the default admin account during development:

```javascript
import { resetDefaultAdminFlag } from './firebase/defaultAdminSetup'

// This only works in development mode
resetDefaultAdminFlag()
// Then reload the page
```

### To Create Multiple Churches
After initial setup:
1. Log in with the default admin account
2. Go to **User Management**
3. Approve new admin accounts for different churches
4. Each church can then have its own admin to manage members, transactions, and attendance

## Security Notes

- ✅ Default admin is pre-approved and immediately active
- ✅ Credentials are stored securely in Firebase Auth
- ✅ No password is stored in the codebase (only the default credentials)
- ⚠️ **MUST** change the default password after first login
- ✅ All subsequent accounts require admin approval before access

## Troubleshooting

### Default Admin Not Created
- Check browser console (F12) for error messages
- Clear localStorage and refresh if initialization was interrupted
- Verify Firebase project is properly configured

### Credentials Not Displaying
- Check if you're already logged in (credentials only show on dashboard)
- Clear sessionStorage if notice was closed
- Check browser console for any errors

### Account Not Working
- Verify the email is correct: `admin@churchsystem.com`
- Ensure `active: true` in Firestore users collection
- Check Firebase Authentication console for the account
