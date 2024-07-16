const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server-imagen")
    .setDescription("Ver la imagen del server"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const icon = interaction.guild.iconURL({ dynamic: true, size: 1024 })
    const embed = new EmbedBuilder()
      .setTitle(`imagen del server ${interaction.guild.name}`)
      .setImage(icon)
      .setColor("Random")
      .setTimestamp()
      .setFooter({ text: `${interaction.user.tag}` })
    interaction.reply({ embeds: [embed] });
  }
};