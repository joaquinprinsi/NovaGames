const { Client, ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('guess')
    .setDescription('🔮 Adivina el número generado por Rogel')
    .addSubcommand(subcommand =>
      subcommand
        .setName('facil')
        .setDescription('🎲 Adivina el número generado por Rogel, del 1 al 10.'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('intermedio')
        .setDescription('🎲 Adivina el número generado por Rogel, del 1 al 50.'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('dificil')
        .setDescription('🎲 Adivina el número generado por Rogel, del 1 al 100.'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('imposible')
        .setDescription('🎲 Adivina el número generado por Rogel, del 1 al 1.000.000.'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('legendario')
        .setDescription('🎲 Adivina el número generado por Rogel, del 1 al 1.000.')),

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    let numberToGuess;
    let rangeMessage;

    switch (subcommand) {
      case 'facil':
        numberToGuess = Math.floor(Math.random() * 10) + 1;
        rangeMessage = '🎯 Adivina el **número del 1 al 10** que estoy pensando -.-';
        break;
      case 'intermedio':
        numberToGuess = Math.floor(Math.random() * 50) + 1;
        rangeMessage = '🎯 Adivina el **número del 1 al 50** que estoy pensando -.-';
        break;
      case 'dificil':
        numberToGuess = Math.floor(Math.random() * 100) + 1;
        rangeMessage = '🎯 Adivina el **número del 1 al 100** que estoy pensando -.-';
        break;
      case 'legendario':
        numberToGuess = Math.floor(Math.random() * 1000) + 1;
        rangeMessage = '🎯 Adivina el **número del 1 al 1.000** que estoy pensando -.-';
        break;
      case 'imposible':
        numberToGuess = Math.floor(Math.random() * 1000000) + 1;
        rangeMessage = '🎯 Adivina el **número del 1 al 1.000.000** que estoy pensando -.-';
        break;
      default:
        return interaction.reply('❌ Subcomando no válido.');
    }

    await interaction.reply(rangeMessage);

    const collector = interaction.channel.createMessageCollector({
      filter: msg => msg.author.id === interaction.user.id,
      time: 10000, // Tiempo límite para adivinar en milisegundos (10 segundos en este caso)
      max: 1, // Número máximo de intentos permitidos
    });

    collector.on('collect', msg => {
      const userGuess = parseInt(msg.content);

      if (isNaN(userGuess)) {
        return msg.reply('❌ Debes proporcionar un número válido.');
      }

      if (userGuess === numberToGuess) {
        return msg.reply(`🎉 ¡Has adivinado correctamente! Mi número era **${numberToGuess}**.`);
      } else {
        return msg.reply(`😜 No has adivinado, mi número era **${numberToGuess}**.`);
      }
    });

    collector.on('end', collected => {
      if (collected.size === 0) {
        return interaction.followUp('⏳ El tiempo para adivinar mi número terminó, inténtalo de nuevo.');
      }
    });
  },
};
