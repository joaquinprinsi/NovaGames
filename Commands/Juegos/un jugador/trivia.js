const { SlashCommandBuilder } = require('@discordjs/builders');
const { Trivia } = require('discord-gamecord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Juega al juego de trivia.'),

  async execute(interaction) {
    const game = new Trivia({
      message: interaction,
      slash_command: true,
      embed: {
        title: 'Trivia',
        color: 'Random',
        description: 'Tienes 60 segundos para adivinar la respuesta.',
      },
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      trueButtonStyle: 'SUCCESS',
      falseButtonStyle: 'DANGER',
      mode: 'multiple', // multiple || single
      difficulty: 'medium', // easy || medium || hard
      winMessage: '¡Ganaste! La respuesta correcta es {answer}.',
      loseMessage: 'Perdiste. La respuesta correcta es {answer}.',
      errMessage: '¡No se pudo obtener la pregunta! Por favor, intenta de nuevo.',
      playerOnlyMessage: 'Solo {player} puede usar estos botones.',
    });

    game.startGame();
  },
};
