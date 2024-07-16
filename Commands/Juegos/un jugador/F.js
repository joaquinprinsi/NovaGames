const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("f")
    .setDescription("Solo F"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const embed = new EmbedBuilder()
      
      .setDescription(`
      ███████╗
      ██╔═══╝
      ███████╗
      ██╔═══╝
      ██║
      ╚═╝
      `)
      .setColor("Random");

    await interaction.reply({ embeds: [embed] });
  },
};

