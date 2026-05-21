const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

admin.initializeApp()
const db = admin.firestore()

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
]

const getRandomQuote = (category = null) => {
  const filtered = category 
    ? INSPIRATIONAL_QUOTES.filter(q => q.category === category)
    : INSPIRATIONAL_QUOTES
  return filtered[Math.floor(Math.random() * filtered.length)]
}

// SMTP Configuration - Simple and Direct
const getTransporter = async () => {
  const settingsDoc = await db.collection('churchSettings').doc('main').get()
  
  const smtpConfig = settingsDoc.data()?.smtpConfig || {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }

  // Validate SMTP credentials exist
  if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
    console.error('❌ SMTP credentials not configured.')
    console.error('Set environment variables: SMTP_USER and SMTP_PASS')
    throw new Error('Email service not configured. Set SMTP credentials.')
  }

  return nodemailer.createTransport(smtpConfig)
}

// Generate tithes/offering email with inspirational quote
const generateTitheEmailHTML = ({ memberName, amount, type, date, churchName = 'CCCCPGI' }) => {
  const quote = type === 'tithe' 
    ? getRandomQuote('tithe')
    : getRandomQuote()
  
  const typeLabel = type === 'tithe' ? 'Tithe' : 'Offering'
  const typeColor = type === 'tithe' ? '#059669' : '#0891b2'
  const typeIcon = type === 'tithe' ? '💚' : '💙'
  const dateFormatted = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const amountFormatted = parseFloat(amount).toFixed(2)

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${typeLabel} Receipt</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', 'DM Sans', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .header { background: linear-gradient(135deg, ${typeColor} 0%, ${typeColor}dd 100%); color: white; padding: 40px 20px; text-align: center; }
        .logo { width: 60px; height: 60px; margin: 0 auto 15px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; }
        .church-name { font-size: 28px; font-weight: bold; margin-bottom: 5px; letter-spacing: 1px; }
        .church-tagline { font-size: 13px; opacity: 0.95; letter-spacing: 2px; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; color: #1f2937; margin-bottom: 30px; font-weight: 500; }
        .receipt-box { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 4px solid ${typeColor}; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .receipt-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; }
        .receipt-label { color: #6b7280; font-weight: 500; }
        .receipt-value { color: #1f2937; font-weight: 600; }
        .receipt-amount { font-size: 24px !important; color: ${typeColor} !important; margin-top: 15px; padding-top: 15px; border-top: 2px solid rgba(0,0,0,0.1); }
        .type-badge { display: inline-block; background: ${typeColor}; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 15px; }
        .quote-section { background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%); padding: 25px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #f59e0b; }
        .quote-verse { font-size: 12px; color: #92400e; font-weight: 600; letter-spacing: 1px; margin-bottom: 10px; text-transform: uppercase; }
        .quote-text { font-size: 15px; color: #78350f; line-height: 1.6; font-style: italic; font-family: 'Georgia', serif; }
        .message { font-size: 14px; color: #4b5563; line-height: 1.6; margin-bottom: 20px; }
        .footer { background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; }
        .footer-text { font-size: 12px; color: #6b7280; margin-bottom: 10px; }
        .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">${typeIcon}</div>
            <div class="church-name">${churchName}</div>
            <div class="church-tagline">TITHES & OFFERINGS</div>
        </div>

        <div class="content">
            <div class="greeting">
                Salamat sa inyong katapatan, <strong>${memberName}</strong>! 🙏
            </div>

            <span class="type-badge">${typeLabel}</span>

            <div class="receipt-box">
                <div class="receipt-row">
                    <span class="receipt-label">Type</span>
                    <span class="receipt-value">${typeLabel}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Date</span>
                    <span class="receipt-value">${dateFormatted}</span>
                </div>
                <div class="receipt-row receipt-amount">
                    <span class="receipt-label">Amount</span>
                    <span class="receipt-value">₱${amountFormatted}</span>
                </div>
            </div>

            <div class="quote-section">
                <div class="quote-verse">${quote.verse}</div>
                <div class="quote-text">"${quote.text}"</div>
            </div>

            <div class="message">
                Your ${typeLabel.toLowerCase()} has been recorded and will bless our church community. 
                God sees your generosity and faithful heart! ❤️
            </div>
        </div>

        <div class="footer">
            <div class="footer-text">
                This is an automated receipt from ${churchName}. <br>
                Please contact us if you have any questions.
            </div>
            <div class="divider"></div>
            <div class="footer-text">
                © ${new Date().getFullYear()} ${churchName}. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
  `
}

// Basic HTML Wrapper
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

exports.sendPostOfferingEmail = functions.firestore
  .document('transactions/{transactionId}')
  .onCreate(async (snap, context) => {
    const data = snap.data()
    
    // Check if emails are enabled globally
    const settingsDoc = await db.collection('churchSettings').doc('main').get()
    if (settingsDoc.exists && settingsDoc.data().emailEnabled === false) return null

    // Get member details
    const memberDoc = await db.collection('members').doc(data.memberId).get()
    if (!memberDoc.exists || !memberDoc.data().email) return null
    const member = memberDoc.data()

    // Skip if member opted out
    if (member.emailOptIn === false) return null

    try {
      const transporter = await getTransporter()
      
      // Get church name from settings
      const churchName = settingsDoc.data()?.churchName || 'CCCCPGI'
      
      // Generate beautiful email with inspirational quote
      const htmlContent = generateTitheEmailHTML({
        memberName: member.name,
        amount: data.amount,
        type: data.type,
        date: data.date,
        churchName: churchName
      })

      const typeLabel = data.type.charAt(0).toUpperCase() + data.type.slice(1)
      
      await transporter.sendMail({
        from: `"${churchName}" <noreply@gracechurch.local>`,
        to: member.email,
        subject: `✨ Thank you for your ${typeLabel} | ${churchName}`,
        html: htmlContent
      })

      // Log email
      await db.collection('emailLogs').add({
        memberId: member.id,
        memberEmail: member.email,
        type: 'tithe_offering',
        transactionId: context.params.transactionId,
        amount: data.amount,
        transactionType: data.type,
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'success'
      })

      console.log(`Email sent successfully to ${member.email} for ${typeLabel}`)
      return { success: true }
    } catch (error) {
      console.error('Error sending tithe/offering email:', error)
      
      // Log failed email attempt
      try {
        await db.collection('emailLogs').add({
          memberId: data.memberId,
          type: 'tithe_offering',
          transactionId: context.params.transactionId,
          sentAt: admin.firestore.FieldValue.serverTimestamp(),
          status: 'failed',
          error: error.message
        })
      } catch (logErr) {
        console.error('Could not log email error:', logErr)
      }
      
      return { success: false, error: error.message }
    }
  })

// Scheduled daily at 6:00 AM Manila Time (UTC+8)
exports.sendDailyDevotionals = functions.pubsub.schedule('0 6 * * *').timeZone('Asia/Manila').onRun(async (context) => {
  const settingsDoc = await db.collection('churchSettings').doc('main').get()
  if (settingsDoc.exists && settingsDoc.data().emailEnabled === false) return null

  // Skip on Saturday
  const dayOfWeek = new Date().getDay()
  if (dayOfWeek === 6) return null // 6 is Saturday

  try {
    const transporter = await getTransporter()
    
    // Get active members with emails who opted in
    const membersSnap = await db.collection('members')
      .where('active', '==', true)
      .where('emailOptIn', '==', true)
      .get()

    if (membersSnap.empty) return null

    let subject = "Good Morning! 🌅 Your Daily Devotional"
    let content = ""

    if (dayOfWeek === 5) { // Friday
      subject = "Friday Bible Study Reminder 📖"
      content = `
        <h3 style="color: #D4A853;">Tonight is Bible Study!</h3>
        <p>Join us tonight as we dive deeper into God's word. Bring your Bible, a notebook, and an open heart.</p>
        <p><strong>Time:</strong> 6:00 PM</p>
      `
    } else if (dayOfWeek === 0) { // Sunday
      subject = "It's Sunday! 🙏 See you at church"
      content = `
        <h3 style="color: #D4A853;">Welcome to the Lord's Day</h3>
        <p>We look forward to worshiping with you today!</p>
        <p><strong>Service Time:</strong> 9:00 AM</p>
        <p style="color: #71717a; font-size: 14px; margin-top: 30px;">Don't forget to bring your tithes and offering envelopes.</p>
      `
    } else { // Mon-Thu
      content = `
        <h3 style="color: #D4A853;">Your Daily Verse</h3>
        <div class="verse-box">
          <p style="font-size: 18px; font-style: italic; color: #0F172A; margin-top: 0;">"The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you."</p>
          <p style="margin-bottom: 0; color: #71717a; font-size: 14px;">— Numbers 6:24-25</p>
        </div>
        <p>Take a moment today to reflect on God's goodness and grace in your life.</p>
      `
    }

    const promises = membersSnap.docs.map(async (doc) => {
      const member = doc.data()
      if (!member.email) return

      try {
        const personalizedContent = `
          <p style="font-size: 18px;">Hello ${member.name},</p>
          ${content}
        `
        await transporter.sendMail({
          from: '"Grace Church" <noreply@gracechurch.local>',
          to: member.email,
          subject: subject,
          html: emailHtmlWrapper(personalizedContent)
        })
      } catch (err) {
        console.error(`Failed to send daily devotional to ${member.email}:`, err)
      }
    })

    await Promise.all(promises)
    return { success: true }
  } catch (error) {
    console.error('Error sending daily devotionals:', error)
    return { success: false, error: error.message }
  }
})
