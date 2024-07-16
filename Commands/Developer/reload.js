const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client
} = require(`discord.js`);

const { loadCommands } = require(`../../Handlers/commandHandler`)
const { loadEvents } = require(`../../Handlers/eventHandler`);
const { loadButtons } = require(`../../Handlers/buttonHandler`)

module.exports = {
    developer: true,
  data: new SlashCommandBuilder()
    .setName(`reload`)
    .setDescription(`Recarga tus comandos/eventos`)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options.setName(`events`).setDescription(`Recarga tus eventos`)
    )
    .addSubcommand((options) =>
      options.setName(`buttons`).setDescription(`Recarga tus botones`)
    )
    .addSubcommand((options) =>
      options.setName(`commands`).setDescription(`Recarga tus comandos`)
    ),
    

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {client} client
   */

  execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case "events":
        {
          for (const [key, value] of client.events)
            client.removeListener(`${key}`, value, true);
          loadEvents(client);
          interaction.reply({
            content: `Tus eventos fueron recargados`,
            ephemeral: true,
          });
        }

        break;
      case "commands":
        {
          loadCommands(client);
          interaction.reply({
            content: `Tus comandos fueron recargados`,
            ephemeral: true,
          });
        }
        break;
            
      case "buttons":
        {
          loadCommands(client);
          interaction.reply({
            content: `Tus botones fueron recargados`,
            ephemeral: true,
          });
        }
        break;
            
    }
  },
};
