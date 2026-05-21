# ⚡ Quick Start Email Checklist

Complete these items in order to activate email functionality:

## ✨ Pre-Deployment (Already Done)
- ✅ Email code written and tested
- ✅ Nodemailer installed in Cloud Functions
- ✅ Gmail account ready (your-email@gmail.com)
- ✅ Gmail app password generated (gkmv wped wguc xcrf)
- ✅ Beautiful email templates created
- ✅ 10 inspirational Bible verses in database

## 🚀 Deployment Tasks (DO THESE)

### Task 1: Deploy Cloud Functions
**Goal:** Get the sendPostOfferingEmail function live

**Choose ONE:**
```
☐ Option A: Use Google Cloud Console (No CLI needed)
   1. Go: https://console.firebase.google.com/project/gracetrack-8cd61/functions
   2. Look for sendPostOfferingEmail
   3. If status is red/disabled, click "Deploy"
   
☐ Option B: Use Firebase CLI
   Command: firebase deploy --only functions
   (Only works if firebase-tools is installed successfully)
```

### Task 2: Set SMTP Credentials
**Goal:** Tell the function which email account to use

**Choose ONE:**
```
☐ Option A: Firebase Console Web UI (Easiest)
   1. Go: https://console.firebase.google.com/project/gracetrack-8cd61/functions
   2. Click: sendPostOfferingEmail
   3. Click: Runtime Settings (top right)
   4. Scroll: Find "Runtime environment variables"
   5. Add TWO variables:
      Name: SMTP_USER        Value: your-email@gmail.com
      Name: SMTP_PASS        Value: gkmv wped wguc xcrf
   6. Click: Save

☐ Option B: Firebase CLI
   Command: firebase functions:config:set smtp.user="your-email@gmail.com" smtp.pass="gkmv wped wguc xcrf"
```

### Task 3: Enable Email in App Settings
**Goal:** Turn on email sending globally

```
Steps:
1. ☐ Login to app as admin
2. ☐ Go to Admin → Settings
3. ☐ Find "Send Emails on Transactions" toggle
4. ☐ Turn it ON
5. ☐ Save
```

## 🧪 Testing (Verify It Works)

### Setup Test Member
```
1. ☐ Go to Admin → Members
2. ☐ Add New Member
3. ☐ Name: "Test Member"
4. ☐ Email: YOUR PERSONAL EMAIL (to test)
5. ☐ Make sure emailOptIn = YES
6. ☐ Save
```

### Record a Test Transaction
```
1. ☐ Go to Usher App
2. ☐ Scan QR code for test member (or search by name)
3. ☐ Enter amount: 100
4. ☐ Select type: Tithe or Offering
5. ☐ Submit
6. ☐ Return to top screen
```

### Check Email Arrived
```
1. ☐ Wait 5-10 seconds
2. ☐ Check your email inbox
3. ☐ Look in PROMOTIONS/SPAM folder if not in INBOX
4. ☐ Should see email with subject like:
      "✨ Thank you for your Tithe | CCCCPGI"
5. ☐ Open email and verify:
   - Church name visible
   - Amount correct (₱100.00)
   - Bible verse displayed
   - Professional design
   - Tagalog greeting (Salamat sa inyong katapatan!)
```

## ❌ Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| Email not arriving | Check Cloud Functions logs in Firebase Console |
| Auth error | Verify SMTP_USER and SMTP_PASS are set |
| Wrong email address | Update SMTP_USER in Runtime Settings |
| Function not deploying | Try Firebase Console deploy button instead of CLI |
| Gmail rejected password | Use 16-char app password, not regular password |

## 📝 Important Notes

**Gmail App Password:**
- Generated at: https://myaccount.google.com/apppasswords
- Requires: 2-factor authentication enabled
- Format: 4 groups of 4 characters (16 total)
- Your password: `gkmv wped wguc xcrf` ✓

**Firebase Project:**
- Project: gracetrack-8cd61
- Console: https://console.firebase.google.com
- Hosting: https://gracetrack-church-system.vercel.app

**Cloud Function:**
- Name: `sendPostOfferingEmail`
- Trigger: When transaction is created
- Runtime: Node.js (firebase-functions)

## 🎉 After Everything Works

```
Once emails are sending:

☐ Update default church settings if needed
☐ Test with different transaction types (tithe vs offering)
☐ Test with different members
☐ Monitor emailLogs collection in Firestore
☐ Celebrate! 🎊
```

## 🔗 Important Links

- Firebase Console: https://console.firebase.google.com/project/gracetrack-8cd61/functions
- Gmail App Passwords: https://myaccount.google.com/apppasswords
- GraceTrack App: https://gracetrack-church-system.vercel.app
- Firestore: https://console.firebase.google.com/project/gracetrack-8cd61/firestore

---

**Questions?** Check EMAIL_DEPLOYMENT_GUIDE.md for detailed troubleshooting
