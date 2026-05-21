# 📧 Complete Email Deployment Guide

Your church management system's email functionality is fully implemented and ready. Here's what you need to do to activate it:

## Current Status ✅

- **Code**: Cloud Function `sendPostOfferingEmail` is written and ready
- **Dependencies**: Nodemailer is installed in Cloud Functions
- **Gmail Setup**: Gmail app password provided: `gkmv wped wguc xcrf`
- **Account**: `your-email@gmail.com` (update to your actual Gmail)

## What Needs to Happen

When a member records a tithe or offering, the system will:
1. Automatically trigger a Cloud Function
2. Fetch member details (name, email)
3. Generate a beautiful HTML email with:
   - Receipt details (amount, date, type)
   - Color-coded header (green for tithe, blue for offering)
   - Random inspirational Bible verse
   - Professional design with church branding
4. Send via Gmail SMTP
5. Log the email result in Firestore

## Deployment Steps

### Step 1: Go to Firebase Console
- URL: https://console.firebase.google.com
- Project: **gracetrack-8cd61**

### Step 2: Navigate to Cloud Functions
1. In the left sidebar, click **Build** → **Functions**
2. Look for the `sendPostOfferingEmail` function (should show status "Running" in gray)

### Step 3: Deploy Functions (First Time Only)

**Option A: Deploy via Console (Recommended - No CLI needed)**
1. In the Functions list, click on **sendPostOfferingEmail**
2. Check if it's already deployed
3. If not deployed, you'll need the CLI (skip to Option B)

**Option B: Deploy via Firebase CLI**
Since firebase-tools installation is having issues on your system, here's an alternative approach:

#### For Windows Users - Using Node Directly:
```bash
# From c:\churchsystem directory:
cd c:\churchsystem

# Try installing firebase-tools globally one more time (be patient, it may take 5-10 minutes)
npm install -g firebase-tools

# If that works, then:
firebase login
firebase deploy --only functions

# If firebase-tools still won't install, download and use the standalone binary:
# https://firebase.google.com/docs/cli#setup_update_cli
```

#### Alternative: Use WSL (Windows Subsystem for Linux)
```bash
# If you have WSL installed:
wsl bash
curl -sL https://firebase.tools | bash
firebase login
firebase deploy --only functions
```

### Step 4: Set SMTP Configuration

Once functions are deployed, set the email credentials:

**Via Firebase Console:**
1. Click on `sendPostOfferingEmail` function
2. Click **Runtime Settings** (top right)
3. Scroll to **Runtime Environment Variables**
4. Click **Add Variable**
5. Add these two variables:

| Variable | Value |
|----------|-------|
| `SMTP_USER` | `your-email@gmail.com` |
| `SMTP_PASS` | `gkmv wped wguc xcrf` |

6. Click **Save** - Function will redeploy automatically

**Via Firebase CLI:**
```bash
firebase functions:config:set smtp.user="your-email@gmail.com" smtp.pass="gkmv wped wguc xcrf"
firebase deploy --only functions
```

### Step 5: Enable Email Globally (Admin Dashboard)

1. Go to your app: https://gracetrack-church-system.vercel.app
2. Log in as admin
3. Go to **Settings**
4. Enable "Send Email on Transactions" toggle
5. Save

### Step 6: Test the Email System

1. **Add a Test Member**
   - Go to Admin → Members → Add Member
   - Use your own email address
   - Make sure `emailOptIn` is checked (enabled)

2. **Record a Transaction**
   - Go to Usher App
   - Scan the member's QR code (or enter manually)
   - Enter an amount
   - Submit

3. **Check Email**
   - Wait 5-10 seconds
   - Check your email inbox (check spam/promotions folder if not in inbox)
   - You should receive a beautiful receipt email

### Step 7: Verify Everything Works

**Check Cloud Functions Logs:**
1. In Firebase Console → Functions
2. Click on `sendPostOfferingEmail`
3. Click **Logs** tab
4. Look for success/error messages

**Email Log in Firestore:**
1. Firebase Console → Firestore
2. Collection: `emailLogs`
3. Should show sent emails with status: `success`

## Email Content

### Email Header
- Color-coded by transaction type:
  - 🟢 **Tithe** (Green #059669)
  - 🔵 **Offering** (Blue #0891b2)
- Shows emoji: 💚 for tithe, 💙 for offering
- Shows church name with professional styling

### Email Body
- Tagalog greeting: "Salamat sa inyong katapatan, [Name]! 🙏"
- Transaction receipt box with:
  - Type (Tithe/Offering)
  - Date (formatted: Month Day, Year)
  - Amount (formatted: ₱X,XXX.XX)
- **Inspirational Bible Verse** section with:
  - Random verse for offerings
  - Tithe-specific verses for tithes
  - 10 verses in database
- Thank you message
- Church footer with copyright

## Environment Variables Explained

```
SMTP_USER=your-email@gmail.com    # Gmail address to send FROM
SMTP_PASS=gkmv wped wguc xcrf     # 16-char Gmail app password
SMTP_HOST=smtp.gmail.com          # (auto-configured, no need to set)
SMTP_PORT=465                      # (auto-configured, no need to set)
```

## Troubleshooting

### Email Not Sending
**Check List:**
1. ✅ Environment variables set in Firebase Console?
2. ✅ Cloud Function status shows "Running"?
3. ✅ Member has email address in their profile?
4. ✅ Member has `emailOptIn` enabled?
5. ✅ Church settings has email enabled?
6. ✅ Check Cloud Functions Logs for errors

### Gmail Auth Failed
**Solution:**
- Make sure you're using a **16-character app password**
- NOT your regular Gmail password
- Generate at: https://myaccount.google.com/apppasswords
- Requires 2-factor authentication enabled

### Function Times Out
**Solution:**
- May take 1-2 minutes after setting config
- Try recording another transaction
- Check if email arrives on second attempt

### "Could Not Determine Executable to Run"
**This is happening on your system:** npm/firebase-tools issue
- **Workaround 1:** Use Firebase Console to set environment variables (web UI, no CLI)
- **Workaround 2:** Use WSL (Windows Subsystem for Linux)
- **Workaround 3:** Try installing from: https://firebase.google.com/docs/cli#windows-standalone-binary

## File Locations

- **Cloud Function Code**: `functions/index.js`
- **Email Template**: Line 55-145 (HTML generation)
- **SMTP Configuration**: Line 37-53 (getTransporter function)
- **Bible Verses Database**: Line 8-21 (INSPIRATIONAL_QUOTES array)
- **Firestore Schema**: `emailLogs` collection stores all email attempts

## Need More Help?

📌 **Common Commands:**
```bash
# Check Firebase config is set
firebase functions:config:get

# Check function logs
firebase functions:log --limit=20

# Redeploy functions
firebase deploy --only functions

# View specific function details
firebase functions:describe sendPostOfferingEmail
```

📌 **Quick Verification:**
```bash
# Verify functions are deployed
firebase functions:list
```

---

**Last Updated:** 2026-05-21
**System Version:** GraceTrack v1.0.0
**Email Provider:** Gmail SMTP (Nodemailer)
