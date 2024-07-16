const { SlashCommandBuilder } = require('@discordjs/builders');
const { MatchPairs } = require('discord-gamecord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('match')
    .setDescription('Juega al Match Pairs.'),
  async execute(interaction) {
    const game = new MatchPairs({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Match Pairs',
        color: 'Random',
        description: '**Haz clic en los botones para emparejar emojis.**'
      },
      timeoutTime: 60000,
      emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
      winMessage: '**¡Ganaste el juego! Volteaste un total de `{tilesTurned}` parejas.**',
      loseMessage: '**Perdiste el juego! Volteaste un total de `{tilesTurned}` parejas.**',
      playerOnlyMessage: 'Solo {player} puede usar estos botones.'
    });

    game.startGame();
    game.on('gameOver', result => {
      console.log(result);  // =>  { result... }
    });
  },
};
