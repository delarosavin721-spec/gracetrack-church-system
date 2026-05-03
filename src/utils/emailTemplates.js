export const generatePostOfferingEmail = (memberName, amount, type, date, verse) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f4f4f5;
      margin: 0;
      padding: 0;
      color: #3f3f46;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #0F172A;
      color: #FEF9EE;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .message {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .details {
      background-color: #fcf8f0;
      border: 1px solid #f5c842;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
    }
    .details p {
      margin: 8px 0;
      font-size: 15px;
    }
    .verse-box {
      border-left: 4px solid #D4A853;
      padding-left: 20px;
      margin: 30px 0;
    }
    .verse {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 18px;
      font-style: italic;
      color: #0F172A;
      margin: 0 0 10px 0;
    }
    .reference {
      font-size: 14px;
      color: #71717a;
      margin: 0;
    }
    .footer {
      background-color: #f4f4f5;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #a1a1aa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CCCCPGI</h1>
    </div>
    <div class="content">
      <div class="greeting">Dear ${memberName},</div>
      <div class="message">
        Thank you for your faithful giving. Your ${type.toLowerCase()} helps us continue the work of the church and spread God's love to our community.
      </div>
      
      <div class="details">
        <p><strong>Amount:</strong> ₱${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p><strong>Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
        <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div class="verse-box">
        <p class="verse">"${verse.verse}"</p>
        <p class="reference">— ${verse.reference}</p>
      </div>
      
      <div class="message">
        May God bless you abundantly for your generosity.
      </div>
    </div>
    <div class="footer">
      <p>This is an automated email from CCCCPGI Church Management System.</p>
    </div>
  </div>
</body>
</html>
  `
}

export const generateDailyDevotionalEmail = (memberName, devotional, verse) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    /* Similar styles as above, omitted for brevity but would be full HTML */
    body { font-family: 'DM Sans', sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background-color: #0F172A; color: #FEF9EE; padding: 30px; text-align: center; }
    .content { padding: 40px 30px; }
    .verse-box { background-color: #fcf8f0; border: 1px solid #f5c842; border-radius: 8px; padding: 25px; margin: 20px 0; text-align: center; }
    .verse { font-family: 'Playfair Display', serif; font-size: 20px; font-style: italic; color: #0F172A; margin: 0 0 15px 0; }
    .reference { font-size: 14px; font-weight: bold; color: #D4A853; margin: 0; }
    .reflection { font-size: 16px; line-height: 1.6; color: #3f3f46; margin-bottom: 20px; }
    .prayer-box { background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 15px 20px; margin-top: 30px; }
    .footer { background-color: #f4f4f5; padding: 20px; text-align: center; font-size: 12px; color: #a1a1aa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Good Morning, ${memberName}!</h2>
      <p style="margin:0; opacity:0.8;">${devotional.theme}</p>
    </div>
    <div class="content">
      <div class="verse-box">
        <p class="verse">"${verse.verse}"</p>
        <p class="reference">— ${verse.reference}</p>
      </div>
      
      <div class="reflection">
        ${devotional.reflection}
      </div>
      
      ${devotional.prayer ? `
      <div class="prayer-box">
        <strong>Today's Prayer:</strong><br><br>
        ${devotional.prayer}
      </div>
      ` : ''}
      
      <div style="margin-top: 40px; text-align: center; font-size: 14px; color: #71717a;">
        Remember to bring your envelope this Sunday!
      </div>
    </div>
    <div class="footer">
      CCCCPGI — Managing God's House, Beautifully & Faithfully
    </div>
  </div>
</body>
</html>
  `
}
