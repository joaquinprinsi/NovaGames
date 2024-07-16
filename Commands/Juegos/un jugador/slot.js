const { SlashCommandBuilder } = require('@discordjs/builders');
const { Slots } = require('discord-gamecord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slots')
    .setDescription('Juega al juego de las máquinas tragamonedas.'),

  async execute(interaction) {
    const game = new Slots({
      message: interaction,
      slash_command: true,
      embed: {
        title: 'Máquina tragamonedas',
        color: 'Random',
      },
      slots: ['🤑', '🪙', '💰', '💸'],
    });

    game.startGame();
    game.on('gameOver', (result) => {
      console.log(result); // => { result... }
    });
  },
};
