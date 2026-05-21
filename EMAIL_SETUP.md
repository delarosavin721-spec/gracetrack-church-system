# Email Configuration Guide

## 🚀 Simple SMTP Setup

Ang sistema ay ready mag-send ng emails sa SMTP. Choose your email provider at sundin ang steps:

---

## ✅ Option 1: Gmail (Fastest Setup) ⭐

**Best for**: Quick setup, if you already have Gmail

1. **Create Gmail App Password** (not your regular password)
   - Go to: https://myaccount.google.com/apppasswords
   - Select: Mail → Windows Computer
   - Generate app password (16-character password)
   - Copy it

2. **Set Firebase Environment Variables**
   ```bash
   firebase functions:config:set smtp.user="your-email@gmail.com"
   firebase functions:config:set smtp.pass="your-16-char-app-password"
   ```

3. **Deploy**
   ```bash
   firebase deploy --only functions
   ```

4. **Test**
   - Add a member with email
   - Record a tithe/offering
   - Check inbox (5-10 seconds)

---

## ✅ Option 2: Yahoo Mail

1. **Generate App Password**
   - Go to: https://login.yahoo.com
   - Account Info → Security
   - Generate app password for "Mail"
   - Copy it

2. **Set Firebase Variables**
   ```bash
   firebase functions:config:set smtp.user="your-email@yahoo.com"
   firebase functions:config:set smtp.pass="your-app-password"
   firebase functions:config:set smtp.host="smtp.mail.yahoo.com"
   firebase functions:config:set smtp.port="465"
   ```

3. **Deploy & Test**
   ```bash
   firebase deploy --only functions
   ```

---

## ✅ Option 3: Custom Email Server

For Outlook, Office365, or custom domain email:

```bash
firebase functions:config:set smtp.host="your.smtp.server.com"
firebase functions:config:set smtp.port="465"
firebase functions:config:set smtp.user="your-email@yourdomain.com"
firebase functions:config:set smtp.pass="your-password"
firebase deploy --only functions
```

---

## 📋 Verify Configuration

Check if variables are set correctly:
```bash
firebase functions:config:get
```

Should show:
```json
{
  "smtp": {
    "user": "your-email@gmail.com",
    "pass": "your-app-password"
  }
}
```

---

## 🐛 Troubleshooting

### Emails not sending?
1. Check environment variables:
   ```bash
   firebase functions:config:get
   ```

2. Check Cloud Functions logs:
   ```bash
   firebase functions:log
   ```

3. Verify email credentials work (test in Outlook/Gmail)

4. Check spam folder

### "Email service not configured" error
- Missing `SMTP_USER` or `SMTP_PASS`
- Run: `firebase functions:config:set`

### Gmail says "password not accepted"?
- Use **App Password** (16 chars), NOT your regular password
- Get it here: https://myaccount.google.com/apppasswords

---

## 📊 Monitor Sent Emails

All emails logged in Firestore → `emailLogs` collection:
- **memberId**: Who received it
- **status**: success or failed
- **sentAt**: When sent
- **error**: If failed, why

---

## ✨ Email Template Preview

Members receive:
- 💚/💙 Beautiful gradient header (Tithe/Offering)
- 📖 Random inspirational Bible verse
- 💵 Receipt (Amount, Date, Type)
- 🙏 Thank you message in Tagalog
- ✅ Professional footer

---

## 🎯 Quick Checklist

- [ ] Choose email provider (Gmail recommended)
- [ ] Get/generate app password
- [ ] Set Firebase config: `firebase functions:config:set smtp.user="..." smtp.pass="..."`
- [ ] Deploy: `firebase deploy --only functions`
- [ ] Test with real transaction
- [ ] Check inbox (may 5-10 seconds)
- [ ] Celebrate! 🎉

