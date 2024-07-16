const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('servermap')
    .setDescription('Visualiza el mapeo de servidores del bot'),

  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */

  async execute(interaction, client) {
    // Verificar el ID de usuario de la persona permitida
    const allowedUser = '1071596284059861075'; // Reemplaza 'YOUR_USER_ID' con el ID de usuario de la persona permitida
    if (interaction.user.id !== allowedUser) {
      await interaction.reply('No tienes permiso para usar este comando.');
      return;
    }
    
    const serversList = client.guilds.cache.map(guild => {
      const members = guild.members.cache;
      const humanMembers = members.filter(member => !member.user.bot).size;
      const botMembers = members.filter(member => member.user.bot).size;
      const totalMembers = members.size;
      return {
        name: guild.name,
        id: guild.id,
        humanMembers,
        botMembers,
        totalMembers
      };
    });

    serversList.sort((a, b) => b.totalMembers - a.totalMembers); // Ordenar por cantidad de miembros totales de mayor a menor

    const formattedServersList = serversList.map(server => {
      return `> *- ${server.name}* \`(ID: ${server.id})\`\nHumanos: ${server.humanMembers}, Bots: ${server.botMembers}, Total: ${server.totalMembers}`;
    });

    const embed = new EmbedBuilder()
      .setTitle('MAPEO DE SERVIDORES')
      .setDescription(`El bot se encuentra en los siguientes servidores:\n\n${formattedServersList.join('\n\n')}`)
      .setColor('Random');

    await interaction.reply({ embeds: [embed] });
  },
};

// comando creado por Joako_85#3484
// comando creado por Joako_85#3484
// comando creado por Joako_85#3484