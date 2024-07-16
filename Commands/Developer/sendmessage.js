const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('globalmsg')
    .setDescription('Envía un mensaje a todos los servidores donde está el bot.')
    .addStringOption(option =>
      option
        .setName('mensaje')
        .setDescription('El mensaje que deseas enviar.')
        .setRequired(true)),
  async execute(interaction) {
    // Verifica si el usuario que ejecuta el comando tiene el ID especificado
    if (interaction.user.id !== '1071596284059861075') {
      return await interaction.reply({
        content: 'No tienes permisos para usar este comando.',
        ephemeral: true,
      });
    }

    // Obtén el mensaje que el usuario quiere enviar
    const message = interaction.options.getString('mensaje');
    const now = new Date();

    // Formatea la hora actual
    const formattedTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Crea un EmbedBuilder para el mensaje
    const embed = new EmbedBuilder()
      .setColor('Random')
      .setTitle('Mensaje del dueño del bot.')
      .setDescription(message)
      
      .setFooter({
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }), // URL de la foto del usuario
        text: `Enviado por ${interaction.user.username} • hoy a las ${formattedTime}`
      });

    // Itera a través de todos los servidores donde está el bot
    interaction.client.guilds.cache.forEach(async guild => {
      try {
        // Busca un canal adecuado para enviar el mensaje (puede ajustarse según tus necesidades)
        const channelToSend =
          guild.systemChannel ??
          guild.channels.cache.find(channel =>
            channel.type === 'GUILD_TEXT' &&
            channel.permissionsFor(guild.me).has('SEND_MESSAGES')
          );

        if (channelToSend) {
          // Envía el mensaje al canal encontrado
          await channelToSend.send({ embeds: [embed] });
        }
      } catch (error) {
        console.error(
          `Error al enviar mensaje a ${guild.name}: ${error.message}`
        );
      }
    });

    // Responde al usuario que ejecutó el comando
    await interaction.reply({
      content: 'Mensaje enviado a todos los servidores donde estoy.',
      ephemeral: true,
    });
  },
};
