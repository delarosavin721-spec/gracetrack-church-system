const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

admin.initializeApp()
const db = admin.firestore()

// SMTP config would typically be read from churchSettings or Firebase config
const getTransporter = async () => {
  const settingsDoc = await db.collection('churchSettings').doc('main').get()
  const smtpConfig = settingsDoc.data()?.smtpConfig || {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || functions.config().smtp?.user,
      pass: process.env.SMTP_PASS || functions.config().smtp?.pass
    }
  }
  return nodemailer.createTransport(smtpConfig)
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
      
      const typeLabel = data.type.charAt(0).toUpperCase() + data.type.slice(1)
      const amountStr = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(data.amount)
      
      const content = `
        <p style="font-size: 18px;">Dear ${member.name},</p>
        <p>Thank you for your faithful giving. Your ${data.type} helps us continue the work of the church.</p>
        
        <div style="background-color: #fcf8f0; border: 1px solid #f5c842; border-radius: 8px; padding: 20px; margin: 30px 0;">
          <p style="margin: 5px 0;"><strong>Amount:</strong> ${amountStr}</p>
          <p style="margin: 5px 0;"><strong>Type:</strong> ${typeLabel}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
        </div>

        <div class="verse-box">
          <p style="font-size: 18px; font-style: italic; color: #0F172A; margin-top: 0;">"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."</p>
          <p style="margin-bottom: 0; color: #71717a; font-size: 14px;">— 2 Corinthians 9:7</p>
        </div>
      `

      await transporter.sendMail({
        from: '"Grace Church" <noreply@gracechurch.local>',
        to: member.email,
        subject: `Thank you for your ${typeLabel}`,
        html: emailHtmlWrapper(content)
      })

      // Log email
      await db.collection('emailLogs').add({
        memberId: member.id,
        type: 'post_offering',
        transactionId: context.params.transactionId,
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'success'
      })

      return { success: true }
    } catch (error) {
      console.error('Error sending post-offering email:', error)
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
