import { getRandomQuote, getQuoteByCategory } from './inspirationalQuotes'

/**
 * Generate a beautiful HTML email template for tithe/offering receipts
 * with inspirational quotes and logo
 */
export const generateTitheEmailTemplate = ({
  memberName,
  amount,
  type,
  date,
  churchName = 'CCCCPGI'
}) => {
  const quote = type === 'tithe' 
    ? getQuoteByCategory('tithe')
    : getRandomQuote()
  
  const typeLabel = type === 'tithe' ? 'Tithe' : 'Offering'
  const typeColor = type === 'tithe' ? '#059669' : '#0891b2'
  const typeIcon = type === 'tithe' ? '💚' : '💙'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${typeLabel} Receipt - ${churchName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', 'DM Sans', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .header {
            background: linear-gradient(135deg, ${typeColor} 0%, ${typeColor}dd 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .logo {
            width: 60px;
            height: 60px;
            margin: 0 auto 15px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
        }
        .church-name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 5px;
            letter-spacing: 1px;
        }
        .church-tagline {
            font-size: 13px;
            opacity: 0.95;
            letter-spacing: 2px;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            color: #1f2937;
            margin-bottom: 30px;
            font-weight: 500;
        }
        .receipt-box {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-left: 4px solid ${typeColor};
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .receipt-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 14px;
        }
        .receipt-row:last-child {
            margin-bottom: 0;
        }
        .receipt-label {
            color: #6b7280;
            font-weight: 500;
        }
        .receipt-value {
            color: #1f2937;
            font-weight: 600;
        }
        .receipt-amount {
            font-size: 24px !important;
            color: ${typeColor} !important;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 2px solid rgba(0,0,0,0.1);
        }
        .type-badge {
            display: inline-block;
            background: ${typeColor};
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-bottom: 15px;
        }
        .quote-section {
            background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid #f59e0b;
        }
        .quote-verse {
            font-size: 12px;
            color: #92400e;
            font-weight: 600;
            letter-spacing: 1px;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        .quote-text {
            font-size: 15px;
            color: #78350f;
            line-height: 1.6;
            font-style: italic;
            font-family: 'Georgia', serif;
        }
        .message {
            font-size: 14px;
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .footer {
            background: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 10px;
        }
        .divider {
            height: 1px;
            background: #e5e7eb;
            margin: 20px 0;
        }
        .heart {
            display: inline-block;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">${typeIcon}</div>
            <div class="church-name">${churchName}</div>
            <div class="church-tagline">TITHES & OFFERINGS</div>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Greeting -->
            <div class="greeting">
                Salamat sa inyong katapatan, <strong>${memberName}</strong>! 🙏
            </div>

            <!-- Type Badge -->
            <span class="type-badge">${typeLabel}</span>

            <!-- Receipt Box -->
            <div class="receipt-box">
                <div class="receipt-row">
                    <span class="receipt-label">Type</span>
                    <span class="receipt-value">${typeLabel}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Date</span>
                    <span class="receipt-value">${new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="receipt-row receipt-amount">
                    <span class="receipt-label">Amount</span>
                    <span class="receipt-value">₱${parseFloat(amount).toFixed(2)}</span>
                </div>
            </div>

            <!-- Inspirational Quote -->
            <div class="quote-section">
                <div class="quote-verse">${quote.verse}</div>
                <div class="quote-text">"${quote.text}"</div>
            </div>

            <!-- Message -->
            <div class="message">
                Your ${typeLabel.toLowerCase()} has been recorded and will bless our church community. 
                God sees your generosity and faithful heart! <span class="heart">❤️</span>
            </div>
        </div>

        <!-- Footer -->
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
