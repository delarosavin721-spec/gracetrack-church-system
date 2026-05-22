// Vercel Serverless Function - Email Sender
// This proxies email sending requests to Firebase securely
// No CORS issues since frontend calls same origin

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const db = admin.firestore();

// Inspirational quotes database
const INSPIRATIONAL_QUOTES = [
  { verse: "Proverbs 22:9", text: "A generous person will prosper; whoever refreshes others will be refreshed.", category: "generosity" },
  { verse: "2 Corinthians 9:7", text: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.", category: "giving" },
  { verse: "Malachi 3:10", text: "Bring the whole tithe into the storehouse... and see if I will not throw open the floodgates of heaven and pour out so much blessing.", category: "tithe" },
  { verse: "Luke 6:38", text: "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.", category: "giving" },
  { verse: "Philippians 4:17", text: "Not that I desire your gifts; what I desire is that more be credited to your account.", category: "giving" },
  { verse: "1 Timothy 6:18-19", text: "Command them to do good, to be rich in good deeds, and to be generous and willing to share... In this way they will lay up treasure for themselves as a firm foundation for the coming age.", category: "giving" },
  { verse: "Deuteronomy 16:17", text: "Each of you must bring a gift in proportion to the way the Lord your God has blessed you.", category: "tithe" },
  { verse: "Proverbs 3:9-10", text: "Honor the Lord with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing, and your vats will brim over with new wine.", category: "tithe" },
  { verse: "Acts 20:35", text: "It is more blessed to give than to receive.", category: "giving" },
  { verse: "Psalm 37:21", text: "The wicked borrow and do not repay, but the righteous give generously.", category: "generosity" }
];

const getRandomQuote = (category = null) => {
  const filtered = category 
    ? INSPIRATIONAL_QUOTES.filter(q => q.category === category)
    : INSPIRATIONAL_QUOTES
  return filtered[Math.floor(Math.random() * filtered.length)]
}

const emailHtmlWrapper = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px; color: #3f3f46; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    .header { background-color: #0F172A; color: #FEF9EE; padding: 30px; text-align: center; }
    .content { padding: 40px 30px; line-height: 1.6; }
    .footer { background-color: #f4f4f5; padding: 20px; text-align: center; font-size: 12px; color: #a1a1aa; }
    .verse-box { border-left: 4px solid #D4A853; padding-left: 20px; margin: 30px 0; background: #fcf8f0; padding: 20px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h2>GraceTrack</h2></div>
    <div class="content">${content}</div>
    <div class="footer">GraceTrack — Managing God's House, Beautifully & Faithfully</div>
  </div>
</body>
</html>
`

// Email sending handler
export default async function handler(req, res) {
  // Enable CORS for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { members = [], emailType = 'receipt', customSubject = '', customMessage = '' } = req.body;

    if (!members || members.length === 0) {
      return res.status(400).json({ error: 'No members provided', success: false });
    }

    // Get Nodemailer transporter (using environment variables)
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({ 
        error: 'Email service not configured. SMTP credentials missing.', 
        success: false 
      });
    }

    let sentCount = 0;
    let failedCount = 0;

    const settingsDoc = await db.collection('churchSettings').doc('main').get();
    const churchName = settingsDoc.data()?.churchName || 'CCCCPGI';

    // Send emails to each member
    for (const member of members) {
      if (!member.email) continue;

      try {
        let htmlContent, subject;

        if (emailType === 'receipt') {
          subject = `💚 Thank you for your faithful giving | ${churchName}`;
          const quote = getRandomQuote();
          htmlContent = `
            <h2 style="color: #059669; text-align: center;">Thank You for Your Generosity! 💚</h2>
            <p style="font-size: 16px;">Salamat sa inyong katapatan, <strong>${member.name}</strong>! 🙏</p>
            
            <div style="background: #f0f9ff; border-left: 4px solid #059669; padding: 20px; margin: 30px 0; border-radius: 4px;">
              <p style="margin: 0; color: #059669; font-weight: 600;">📖 Inspirational Message</p>
              <p style="margin: 15px 0 5px 0; font-style: italic; font-size: 16px; color: #0f172a;">"${quote.text}"</p>
              <p style="margin: 5px 0; color: #718096; font-size: 13px;">— ${quote.verse}</p>
            </div>

            <p style="font-size: 15px; line-height: 1.6;">Your faithful giving is recorded in our hearts and in God's ledger. Every tithe and offering strengthens our church community and advances God's kingdom. 💝</p>
            
            <p style="color: #4b5563; font-size: 14px;">With gratitude,<br><strong>${churchName}</strong></p>
          `;
        } else if (emailType === 'devotional') {
          subject = `📖 Your Daily Inspiration | ${churchName}`;
          const quote = getRandomQuote();
          htmlContent = `
            <h2 style="color: #D4A853; text-align: center;">🌅 Good Morning!</h2>
            <p style="font-size: 16px;">Hello <strong>${member.name}</strong>,</p>
            
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 25px; margin: 30px 0; border-radius: 4px;">
              <p style="margin: 0; color: #92400e; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Daily Verse</p>
              <p style="margin: 15px 0 5px 0; font-style: italic; font-size: 18px; color: #78350f; font-family: Georgia, serif;">"${quote.text}"</p>
              <p style="margin: 5px 0; color: #b45309; font-size: 13px; font-weight: 600;">— ${quote.verse}</p>
            </div>

            <p style="font-size: 15px; line-height: 1.6;">Take a moment today to reflect on God's word and allow it to guide your day. Remember, you are loved and blessed! 🙏</p>
            
            <p style="color: #4b5563; font-size: 14px;">May God bless your day,<br><strong>${churchName}</strong></p>
          `;
        } else if (emailType === 'custom') {
          subject = customSubject || 'Message from ' + churchName;
          htmlContent = `
            <h2 style="color: #0F172A;">${customSubject}</h2>
            <p style="font-size: 16px;">Hello <strong>${member.name}</strong>,</p>
            <div style="font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${customMessage}</div>
            <p style="color: #4b5563; font-size: 14px; margin-top: 30px;">Blessings,<br><strong>${churchName}</strong></p>
          `;
        }

        await transporter.sendMail({
          from: `"${churchName}" <${process.env.SMTP_USER}>`,
          to: member.email,
          subject: subject,
          html: emailHtmlWrapper(htmlContent)
        });

        // Log successful send
        await db.collection('emailLogs').add({
          memberId: member.id,
          memberEmail: member.email,
          type: emailType,
          sentAt: admin.firestore.FieldValue.serverTimestamp(),
          status: 'success',
          source: 'vercel_api'
        });

        sentCount++;
        console.log(`✅ Email sent to ${member.email}`);
      } catch (err) {
        failedCount++;
        console.error(`❌ Failed to send email to ${member.email}:`, err);
        
        // Log failed send
        await db.collection('emailLogs').add({
          memberId: member.id,
          memberEmail: member.email,
          type: emailType,
          sentAt: admin.firestore.FieldValue.serverTimestamp(),
          status: 'failed',
          error: err.message,
          source: 'vercel_api'
        });
      }
    }

    return res.status(200).json({
      success: true,
      sent: sentCount,
      failed: failedCount,
      total: members.length,
      message: `${sentCount} emails sent successfully${failedCount > 0 ? ` (${failedCount} failed)` : ''}`
    });
  } catch (error) {
    console.error('❌ Error in email handler:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send emails'
    });
  }
}
