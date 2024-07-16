const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Desbanea a un usuario")
    .addStringOption((option) =>
      option
        .setName("usuario_id")
        .setDescription("ID del usuario a desbanear")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const userId = interaction.options.getString("usuario_id");
    const { guild } = interaction;

    const bans = await interaction.guild.bans.fetch();

    const bannedUser = bans.find((ban) => ban.user.id === userId);

    if (!bannedUser) {
      return interaction.reply({
        content: "El usuario especificado no está baneado.",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setAuthor({
        name: guild.name,
        iconURL:
          guild.iconURL({ dynamic: true }) ||
          "https://cdn.discordapp.com/attachments/1053464482095050803/1053464952607875072/PRywUXcqg0v5DD6s7C3LyQ.png",
      })
      .setTitle("Usuario desbaneado")
      .setColor("Random")
      .setTimestamp()
      .addFields(
        { name: "Usuario ID", value: bannedUser.user.id },
        { name: "Tag del Usuario", value: bannedUser.user.tag }
      );

    await guild.members.unban(userId, "Desbaneado por solicitud del moderador.");

    interaction.reply({ embeds: [embed] });
  },
};
