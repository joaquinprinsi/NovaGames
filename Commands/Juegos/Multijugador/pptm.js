const { SlashCommandBuilder } = require('@discordjs/builders');
const { RockPaperScissors } = require('discord-gamecord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('piedrapapelotijera')
    .setDescription('Juega al juego de Piedra, Papel o Tijera.')
    .addUserOption(option =>
      option.setName('oponente')
        .setDescription('Selecciona a tu oponente.')
        .setRequired(true)
    ),

  async execute(interaction) {
    const opponent = interaction.options.getUser('oponente');

    if (!opponent) {
      return interaction.reply('Debes seleccionar a un oponente válido.');
    }

    const Game = new RockPaperScissors({
      message: interaction,
      slash_command: true,
      opponent: opponent,
      embed: {
        title: 'Piedra, Papel o Tijera',
        color: 'Random',
        description: 'Presiona un botón para hacer tu elección.'
      },
      buttons: {
        rock: 'Piedra',
        paper: 'Papel',
        scissors: 'Tijera'
      },
      emojis: {
        rock: '🌑',
        paper: '📰',
        scissors: '✂️'
      },
      mentionUser: true,
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      pickMessage: 'Has elegido {emoji}.',
      winMessage: '**{player}** ganó el juego. ¡Felicitaciones!',
      tieMessage: 'El juego terminó en empate. ¡Nadie ganó!',
      timeoutMessage: 'El juego no se completó a tiempo. ¡Nadie ganó!',
      playerOnlyMessage: 'Solo {player} y {opponent} pueden usar estos botones.'
    });

    Game.startGame();
    Game.on('gameOver', result => {
      console.log(result);  // => { result... }
    });
  },
};
