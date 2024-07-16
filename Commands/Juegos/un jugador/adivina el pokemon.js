const { SlashCommandBuilder } = require('@discordjs/builders');
const { GuessThePokemon } = require('discord-gamecord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('adivina-el-pokemon')
    .setDescription('Juega al juego adivina el Pokemon.'),

  async execute(interaction) {
    const game = new GuessThePokemon({
      message: interaction,
      slash_command: true,
      embed: {
        title: '¿Quién es este Pokémon',
        color: 'Random',
      },
      timeoutTime: 60000,
      winMessage: '¡Lo adivinaste! Era un {pokemon}.',
      loseMessage: '¡Mejor suerte la próxima vez! Era un {pokemon}.',
      errMessage: '¡No se pudo obtener la información del pokemon! Por favor, intenta nuevamente.',
      playerOnlyMessage: 'Solo {player} puede usar estos botones.',
    });

    game.startGame();
    game.on('gameOver', (result) => {
      console.log(result); // => { result... }
    });
  },
};
