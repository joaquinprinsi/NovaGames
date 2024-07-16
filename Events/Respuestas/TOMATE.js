const { Message } = require('discord.js');

module.exports = {
  name: 'messageCreate',
  execute(message) {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === 'tomate') {
      message.reply('TOMATEEE');
    }
  },
};
