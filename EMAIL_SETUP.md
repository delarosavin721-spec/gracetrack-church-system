# Email Configuration Guide

## 🚀 Quick Setup

Ang sistema ay ready mag-send ng emails pero kailangan i-configure mo ang email service. Pumili ng isa sa mga options:

### **Option 1: SendGrid (RECOMMENDED) ⭐**

**Best for**: Reliability, professional delivery, 100 free emails/day

1. **Create SendGrid Account**
   - Go to https://sendgrid.com
   - Sign up (free account)
   - Verify email

2. **Get API Key**
   - Login to SendGrid Dashboard
   - Navigate to: Settings → API Keys
   - Create new API Key (Full Access)
   - Copy the key

3. **Set Firebase Environment Variable**
   ```bash
   firebase functions:config:set sendgrid.api_key="SG.your_api_key_here"
   firebase functions:config:set sendgrid.from_email="church@yourdomain.com"
   ```

4. **Deploy**
   ```bash
   firebase deploy --only functions
   ```

---

### **Option 2: Gmail SMTP**

**Best for**: Quick setup, if you already have Gmail

1. **Enable Gmail Less Secure App Access**
   - Go to: https://myaccount.google.com/apppasswords
   - Select: Mail → Windows Computer
   - Generate app password (16-character password)

2. **Set Firebase Environment Variables**
   ```bash
   firebase functions:config:set smtp.user="your-email@gmail.com"
   firebase functions:config:set smtp.pass="your-16-char-app-password"
   ```

3. **Deploy**
   ```bash
   firebase deploy --only functions
   ```

---

### **Option 3: Custom Email Service** 

Para sa ibang email providers (Yahoo, Outlook, custom server):

```bash
firebase functions:config:set smtp.host="smtp.yourmailprovider.com"
firebase functions:config:set smtp.port="465"
firebase functions:config:set smtp.user="your-email@yourdomain.com"
firebase functions:config:set smtp.pass="your-password"
```

---

## ✅ Testing Email System

After configuration:

1. **Add a test member** with valid email
2. **Record a tithe/offering** via Usher app
3. **Check email inbox** (may tumagal 5-10 seconds)
4. **Check Firebase Cloud Functions logs** for errors:
   ```bash
   firebase functions:log
   ```

---

## 📋 Email Preferences

Members can control email opt-in when adding/editing profile:
- ✅ **Enabled by default** - emails will be sent
- ❌ **Disable** - member won't receive emails

---

## 🐛 Troubleshooting

### "Email service not configured" error
- Make sure environment variables are set
- Run: `firebase functions:config:get` to verify
- Redeploy: `firebase deploy --only functions`

### Emails not received
1. Check spam/junk folder
2. Verify member email is correct
3. Check Firebase Cloud Functions logs: `firebase functions:log`
4. Test SMTP credentials in: https://www.mail-tester.com/

### Gmail Authentication Failed
- Make sure you're using **App Password**, not regular password
- App password must be 16 characters
- Regenerate if needed: https://myaccount.google.com/apppasswords

---

## 📊 Email Log Monitoring

All sent emails are logged in Firestore under `emailLogs` collection:
- **memberId**: Who received the email
- **type**: tithe_offering, devotional, etc
- **status**: success or failed
- **sentAt**: When it was sent
- **error**: If failed, what went wrong

Check logs in Firebase Console → Firestore → emailLogs collection

---

## 🔐 Security Notes

- Never commit API keys to GitHub
- Use Firebase Functions Config for sensitive data
- SendGrid is encrypted and PCI compliant
- Gmail App Passwords are safer than using main password

---

## 💡 Pro Tips

1. **Use custom domain email**: 
   - Gets better deliverability
   - More professional (church@churchname.com)

2. **Monitor bounce rates**:
   - Invalid emails will show in logs
   - Check `emailLogs` collection regularly

3. **Unsubscribe option**:
   - Add members to Firebase list
   - They can opt-out from profile settings

4. **Test before going live**:
   - Send test email to yourself first
   - Verify styling and content

---

## 📧 Email Flow Diagram

```
Member gives Tithe/Offering
         ↓
     Usher records via QR
         ↓
  Transaction saved to Firestore
         ↓
  Cloud Function triggered automatically
         ↓
  Fetch member email & details
         ↓
  Check if member opted in
         ↓
  Generate beautiful email HTML
         ↓
  Send via SendGrid / SMTP
         ↓
  Log result in emailLogs
         ↓
  ✅ Email arrives in inbox!
```

---

## 🎯 Next Steps

1. Choose your email service (SendGrid recommended)
2. Get your API key / SMTP credentials
3. Set Firebase config variables
4. Deploy functions: `firebase deploy --only functions`
5. Test with a real transaction
6. Celebrate! 🎉
