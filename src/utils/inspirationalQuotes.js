// Collection of inspirational Bible verses and quotes
const INSPIRATIONAL_QUOTES = [
  {
    verse: "Proverbs 22:9",
    text: "A generous person will prosper; whoever refreshes others will be refreshed.",
    category: "generosity"
  },
  {
    verse: "2 Corinthians 9:7",
    text: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
    category: "giving"
  },
  {
    verse: "Malachi 3:10",
    text: "Bring the whole tithe into the storehouse... and see if I will not throw open the floodgates of heaven and pour out so much blessing.",
    category: "tithe"
  },
  {
    verse: "Luke 6:38",
    text: "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.",
    category: "giving"
  },
  {
    verse: "Philippians 4:17",
    text: "Not that I desire your gifts; what I desire is that more be credited to your account.",
    category: "giving"
  },
  {
    verse: "1 Timothy 6:18-19",
    text: "Command them to do good, to be rich in good deeds, and to be generous and willing to share... In this way they will lay up treasure for themselves as a firm foundation for the coming age.",
    category: "giving"
  },
  {
    verse: "Deuteronomy 16:17",
    text: "Each of you must bring a gift in proportion to the way the Lord your God has blessed you.",
    category: "tithe"
  },
  {
    verse: "Proverbs 3:9-10",
    text: "Honor the Lord with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing, and your vats will brim over with new wine.",
    category: "tithe"
  },
  {
    verse: "Acts 20:35",
    text: "It is more blessed to give than to receive.",
    category: "giving"
  },
  {
    verse: "Psalm 37:21",
    text: "The wicked borrow and do not repay, but the righteous give generously.",
    category: "generosity"
  }
]

/**
 * Get a random inspirational quote
 * @returns {Object} Random quote with verse and text
 */
export const getRandomQuote = () => {
  return INSPIRATIONAL_QUOTES[Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)]
}

/**
 * Get a quote by category
 * @param {string} category - 'giving', 'tithe', or 'generosity'
 * @returns {Object} Random quote from the category
 */
export const getQuoteByCategory = (category) => {
  const filtered = INSPIRATIONAL_QUOTES.filter(q => q.category === category)
  return filtered.length > 0 
    ? filtered[Math.floor(Math.random() * filtered.length)]
    : getRandomQuote()
}

/**
 * Get all quotes
 * @returns {Array} All inspirational quotes
 */
export const getAllQuotes = () => {
  return INSPIRATIONAL_QUOTES
}
