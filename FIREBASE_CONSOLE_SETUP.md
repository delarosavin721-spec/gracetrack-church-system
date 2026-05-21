# Firebase Console Email Configuration Guide

Since the Firebase CLI is having installation issues on this system, you can configure SMTP credentials directly from the Firebase Console.

## Steps to Configure Email in Firebase Console

### 1. Open Firebase Console
- Go to: https://console.firebase.google.com
- Select your project: **gracetrack-8cd61**

### 2. Navigate to Cloud Functions
- In the left sidebar, click **Build** → **Functions**
- You should see a list of deployed functions

### 3. Configure Environment Variables

You have two options:

#### Option A: Via Firebase Console Web UI (Easiest)
1. In the Functions list, click on **sendPostOfferingEmail**
2. Click the **Runtime Settings** tab
3. Scroll down to **Environment variables**
4. Add two variables:

| Name | Value |
|------|-------|
| `SMTP_USER` | `your-email@gmail.com` |
| `SMTP_PASS` | `gkmv wped wguc xcrf` |

5. Click **Save** at the bottom
6. Firebase will automatically redeploy the function

#### Option B: Via Firebase CLI (If you install it later)
```bash
# After installing firebase-tools globally:
firebase functions:config:set smtp.user="your-email@gmail.com" smtp.pass="gkmv wped wguc xcrf"
firebase deploy --only functions
```

### 4. Verify Configuration
After setting the environment variables, test the email system:

1. Go to your app at: https://gracetrack-church-system.vercel.app (or your deployed URL)
2. Log in as the admin
3. Add a test member with a valid email address
4. Record a tithe/offering transaction
5. Wait 5-10 seconds
6. Check the email inbox for a receipt

### 5. Troubleshooting

If emails don't arrive:
1. Check **Cloud Functions Logs** in Firebase Console (Functions → Logs)
2. Look for any error messages in the `sendPostOfferingEmail` function
3. Common issues:
   - Email address not set (check environment variables exist)
   - App password is incorrect
   - Gmail requires "Less secure app access" (if not using app password)

### Important Notes

- **SMTP_USER** should be a Gmail email address (if using Gmail)
- **SMTP_PASS** should be a 16-character app password from Gmail, not your regular password
- After setting config, allow 1-2 minutes for Firebase to redeploy the functions
- The email sending is automatic when:
  1. A transaction is recorded
  2. Member has an email address in their profile
  3. Member has `emailOptIn: true` (default is true)
  4. Email is enabled globally in church settings (check Admin → Settings)

### Environment Variables Currently Expected

The Cloud Function reads these environment variables:
```javascript
const user = functions.config().smtp.user;
const pass = functions.config().smtp.pass;
```

If config is not set, the function logs an error but doesn't crash.
