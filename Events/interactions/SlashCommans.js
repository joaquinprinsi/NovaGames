
const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "Comando no disponible.",
        ephermal: true,
      });

    if (command.developer && interaction.user.id !== "1071596284059861075")
      return interaction.reply({
        content: "este comando es solo para el desarollador.",
        ephermal: true,
      });

    command.execute(interaction, client);
  },
};