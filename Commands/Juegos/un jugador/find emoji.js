const { SlashCommandBuilder } = require('@discordjs/builders');
const { FindEmoji } = require('discord-gamecord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('find-emoji')
    .setDescription('Juega a Find Emoji.'),
  async execute(interaction) {
    const game = new FindEmoji({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Find Emoji',
        color: 'Random',
        description: 'Recuerda los emojis del tablero a continuación.',
        findDescription: 'Encuentra el emoji {emoji} antes de que se acabe el tiempo.'
      },
      timeoutTime: 60000,
      hideEmojiTime: 5000,
      buttonStyle: 'PRIMARY',
      emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
      winMessage: '¡Ganaste! Seleccionaste el emoji correcto: {emoji}',
      loseMessage: '¡Perdiste! Seleccionaste el emoji incorrecto: {emoji}',
      timeoutMessage: '¡Perdiste! Se acabó el tiempo. El emoji era: {emoji}',
      playerOnlyMessage: 'Solo {player} puede usar estos botones.'
    });

    game.startGame();
    game.on('gameOver', result => {
      console.log(result);  // =>  { result... }
    });
  },
};
