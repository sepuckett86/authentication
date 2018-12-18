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
  let fails = [];
  // Test for emoji
  if (text.match(emojiRegex()) !== null) {
    fails.push('Emojis not allowed')
  }
  // test for badquotes
  if (text.match(/[\u2018\u2019]/g) !== null) {
    fails.push('Text contains unusual characters')
  }
  // test for long words
  // Pneumonoultramicroscopicsilicovolcanoconiosis = 45 char
  // require one space every 45 char
  if (text.length > 45) {
    let spaceIndex = 0;
    for (let i = 0; i < text.length; i++) {
      if (i - spaceIndex > 45) {
        fails.push('Text does not contain a space every 45 characters')
        break;
      }
      if (text[i] === ' ') {
        spaceIndex = i
      }
    }
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
    .replace(/[\u2014]/g, '--')
    .replace(/[\u2026]/g, '...');
  return goodQuotes
}
