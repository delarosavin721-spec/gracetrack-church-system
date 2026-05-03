// 30+ curated Bible verses about giving and generosity
const givingVerses = [
  { verse: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.", reference: "2 Corinthians 9:7" },
  { verse: "Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this... and see if I will not throw open the floodgates of heaven.", reference: "Malachi 3:10" },
  { verse: "Honor the Lord with your wealth, with the firstfruits of all your crops.", reference: "Proverbs 3:9" },
  { verse: "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.", reference: "Luke 6:38" },
  { verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", reference: "John 3:16" },
  { verse: "Remember this: Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously.", reference: "2 Corinthians 9:6" },
  { verse: "Command them to do good, to be rich in good deeds, and to be generous and willing to share.", reference: "1 Timothy 6:18" },
  { verse: "One person gives freely, yet gains even more; another withholds unduly, but comes to poverty.", reference: "Proverbs 11:24" },
  { verse: "A generous person will prosper; whoever refreshes others will be refreshed.", reference: "Proverbs 11:25" },
  { verse: "Do not store up for yourselves treasures on earth... But store up for yourselves treasures in heaven.", reference: "Matthew 6:19-20" },
  { verse: "No one can serve two masters... You cannot serve both God and money.", reference: "Matthew 6:24" },
  { verse: "The generous will themselves be blessed, for they share their food with the poor.", reference: "Proverbs 22:9" },
  { verse: "In everything I did, I showed you that by this kind of hard work we must help the weak, remembering the words the Lord Jesus himself said: 'It is more blessed to give than to receive.'", reference: "Acts 20:35" },
  { verse: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.", reference: "Philippians 4:19" },
  { verse: "Whoever is kind to the poor lends to the Lord, and he will reward them for what they have done.", reference: "Proverbs 19:17" },
  { verse: "Each man should give what he has decided in his heart to give, not reluctantly or under compulsion.", reference: "2 Corinthians 9:7" },
  { verse: "But who am I, and who are my people, that we should be able to give as generously as this? Everything comes from you, and we have given you only what comes from your hand.", reference: "1 Chronicles 29:14" },
  { verse: "For where your treasure is, there your heart will be also.", reference: "Matthew 6:21" },
  { verse: "You will be enriched in every way so that you can be generous on every occasion.", reference: "2 Corinthians 9:11" },
  { verse: "Seek first his kingdom and his righteousness, and all these things will be given to you as well.", reference: "Matthew 6:33" },
  { verse: "Whoever has two coats is to share with him who has none, and whoever has food is to do likewise.", reference: "Luke 3:11" },
  { verse: "If anyone has material possessions and sees a brother or sister in need but has no pity on them, how can the love of God be in that person?", reference: "1 John 3:17" },
  { verse: "The wicked borrow and do not repay, but the righteous give generously.", reference: "Psalm 37:21" },
  { verse: "She opens her arms to the poor and extends her hands to the needy.", reference: "Proverbs 31:20" },
  { verse: "All the believers were one in heart and mind. No one claimed that any of their possessions was their own, but they shared everything they had.", reference: "Acts 4:32" },
  { verse: "He who supplies seed to the sower and bread for food will also supply and increase your store of seed and will enlarge the harvest of your righteousness.", reference: "2 Corinthians 9:10" },
  { verse: "Sell your possessions and give to the poor. Provide purses for yourselves that will not wear out, a treasure in heaven that will never fail.", reference: "Luke 12:33" },
  { verse: "Give to everyone what you owe them: If you owe taxes, pay taxes; if revenue, then revenue; if respect, then respect; if honor, then honor.", reference: "Romans 13:7" },
  { verse: "Now he who supplies seed to the sower and bread for food will also supply and increase your store of seed.", reference: "2 Corinthians 9:10" },
  { verse: "Blessed are the merciful, for they will be shown mercy.", reference: "Matthew 5:7" },
  { verse: "Do not forget to do good and to share with others, for with such sacrifices God is pleased.", reference: "Hebrews 13:16" },
  { verse: "Be generous in a way that plants deeply and blossoms, so others may see your good deeds and praise your Father in heaven.", reference: "Matthew 5:16" },
]

/**
 * Select a verse based on weekCode seed — same verse all week, rotates weekly
 */
export const getVerseByWeekCode = (weekCode) => {
  // Use weekCode as a seed (sum of char codes)
  const seed = weekCode.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const index = seed % givingVerses.length
  return givingVerses[index]
}

/**
 * Get a verse for a specific day of the week
 */
export const getVerseByDay = (dayIndex) => {
  return givingVerses[dayIndex % givingVerses.length]
}

export const getAllVerses = () => givingVerses

/**
 * Get random verse (for display variety)
 */
export const getRandomVerse = () => {
  return givingVerses[Math.floor(Math.random() * givingVerses.length)]
}

// Daily devotional content by day of week
export const dailyDevotionals = [
  { // Sunday
    subject: "It's Sunday! 🙏 See you at church",
    theme: "Worship & Fellowship",
    reflection: "As we gather together today, let us remember that we are the body of Christ. Let your presence be a gift to the community of faith.",
    prayer: "Lord, as we gather in worship today, open our hearts to receive Your word and our hands to give generously. Amen."
  },
  { // Monday
    subject: "Good Morning! 🌅 Your Daily Life Verse",
    theme: "New Beginnings",
    reflection: "Each Monday is a fresh start, a new week filled with opportunities to honor God through our work and generosity.",
    prayer: "Father, as this new week begins, help me to seek Your kingdom first in all that I do. Guide my steps and open my hands to give. Amen."
  },
  { // Tuesday
    subject: "Good Morning! 🌅 Your Daily Life Verse",
    theme: "Faithfulness",
    reflection: "Faithfulness in small things prepares us for greater responsibilities. Today, be faithful in your work, your relationships, and your giving.",
    prayer: "God of faithfulness, help me to be trustworthy in every area of my life today. May my actions reflect Your love and generosity. Amen."
  },
  { // Wednesday
    subject: "Good Morning! 🌅 Your Daily Life Verse",
    theme: "Midweek Strength",
    reflection: "Halfway through the week, pause and remember why you do what you do. Every act of generosity is an act of worship.",
    prayer: "Lord, renew my strength today. Help me to serve others with joy and to give from a heart of gratitude. Amen."
  },
  { // Thursday
    subject: "Good Morning! 🌅 Your Daily Life Verse",
    theme: "Gratitude",
    reflection: "Count your blessings today — not just material ones, but the gift of community, health, and God's presence in your life.",
    prayer: "Thank You, Father, for every good and perfect gift. May my gratitude overflow into generosity toward others. Amen."
  },
  { // Friday
    subject: "Friday Bible Study Reminder 📖",
    theme: "Learning & Growing",
    reflection: "Tonight's Bible study is an opportunity to grow deeper in God's word. Come with an open heart, ready to learn and share.",
    prayer: "Open my mind, Lord, to understand Your word more deeply tonight. May our study together strengthen our faith and our community. Amen."
  },
  { // Saturday — rest day, no email
    subject: null,
    theme: "Rest",
    reflection: "Even God rested. Take today to recharge, spend time with family, and prepare your heart for Sunday worship.",
    prayer: null
  }
]
