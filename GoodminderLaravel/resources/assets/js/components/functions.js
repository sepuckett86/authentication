const emojiRegex = require('emoji-regex');

export const textFails = (text) => {
  let verdict;
  let fails = [];
  // Test for emoji
  if (text.match(emojiRegex()) !== null) {
    fails.push('Emojis not allowed')
  }
  // Test for whitespace
  if (/\s/.test(text)) {
    fails.push('Whitespace not allowed')
  }
  if (fails.length === 0) {
    return false
  } else {
    return fails
  }
}
