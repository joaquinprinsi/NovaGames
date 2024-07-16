const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Banear a un usuario")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Usuario a banear")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("razon").setDescription("Razón del ban")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    const { guild } = interaction;

    let razon = interaction.options.getString("razon");
    const member = await interaction.guild.members.fetch(user.id).catch(console.error);

    if (!razon) razon = "No hay razón";
    if (user.id === interaction.user.id)
      return interaction.reply({
        content: "No puedes banearte a ti mismo",
        ephemeral: true,
      });
    if (user.id === client.user.id)
      return interaction.reply({
        content: "No puedes banearme a mí",
        ephemeral: true,
      });
    if (member.roles.highest.position >= interaction.member.roles.highest.position)
      return interaction.reply({
        content: "No puedes banear a alguien con un rol igual o superior al tuyo",
        ephemeral: true,
      });
    if (!member.bannable)
      return interaction.reply({
        content: "No puedo banear a alguien con un rol superior al mío",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setAuthor({
        name: guild.name,
        iconURL:
          guild.iconURL({ dynamic: true }) ||
          "https://cdn.discordapp.com/attachments/1053464482095050803/1053464952607875072/PRywUXcqg0v5DD6s7C3LyQ.png",
      })
      .setTitle(`${user.tag} ha sido baneado del servidor`)
      .setColor("Random")
      .setTimestamp()
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields({ name: "Razón", value: razon });

    await member.ban({ reason: razon }).catch(console.error);

    interaction.reply({ embeds: [embed] });
  },
};
