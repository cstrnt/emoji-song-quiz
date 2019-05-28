import emoji from 'node-emoji';

export const convertTextToEmoji = text => {
  const words = text.split(' ');
  const emojis = [];
  words.forEach(word => {
    const emojiFromWord = emoji.find(word.toLowerCase());
    if (emojiFromWord) emojis.push(emojiFromWord.emoji);
  });
  return emojis.join(' ');
};
