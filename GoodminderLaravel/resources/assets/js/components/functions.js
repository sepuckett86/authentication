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

export const goodminderTextFails = (text) => {
  let verdict;
  let fails = [];
  // Test for emoji
  if (text.match(emojiRegex()) !== null) {
    fails.push('Emojis not allowed')
  }
  // test for badquotes
  if (text.match(/[\u2018\u2019]/g) !== null) {
    fails.push('Text contains unusual characters')
  }
  if (fails.length === 0) {
    return false
  } else {
    return fails
  }
}


export const replaceQuotes = (text) => {
  const goodQuotes = text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D\u275D\u275E]/g, '"')
    .replace(/[\u002C]/g, ',');
  return goodQuotes
}
