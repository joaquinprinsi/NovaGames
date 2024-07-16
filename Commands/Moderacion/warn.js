const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Advertir a un usuario")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Usuario a advertir")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("razon").setDescription("Razón de la advertencia")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    const { guild } = interaction;

    let razon = interaction.options.getString("razon");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!razon) razon = "No hay razón";
    if (user.id === interaction.user.id)
      return interaction.reply({
        content: "No puedes advertirte a ti mismo",
        ephemeral: true,
      });
    if (user.id === client.user.id)
      return interaction.reply({
        content: "No puedes advertirme a mí",
        ephemeral: true,
      });
    if (member.roles.highest.position >= interaction.member.roles.highest.position)
      return interaction.reply({
        content:
          "No puedes advertir a alguien con un rol igual o superior al tuyo",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setAuthor({
        name: guild.name,
        iconURL:
          guild.iconURL({ dynamic: true }) ||
          "https://cdn.discordapp.com/attachments/1053464482095050803/1053464952607875072/PRywUXcqg0v5DD6s7C3LyQ.png",
      })
      .setTitle(`${user.tag} ha sido advertido`)
      .setColor("Random")
      .setTimestamp()
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields({ name: "Razón", value: razon });

    // Enviar el mensaje al usuario advertido
    await user.send({ embeds: [embed] }).catch(console.error);

    interaction.reply({ embeds: [embed] });
  },
};