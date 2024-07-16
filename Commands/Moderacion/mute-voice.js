const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute-voice")
    .setDescription("Mutea a un usuario que elijas en un canal de voz")
    .addMentionableOption((option) =>
      option
        .setName(`target`)
        .setDescription(`Usuario a mutear`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName(`duracion`).setDescription(`Duración del muteo`)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const user = interaction.options.getMentionable(`target`);
    const { guild } = interaction;

    let duracion = interaction.options.getString(`duracion`);
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!duracion) duracion = "Indefinido";
    if (user.id === interaction.user.id)
      return interaction.reply({
        content: `No puedes mutearte a ti mismo`,
        ephemeral: true,
      });
    if (user.id === client.user.id)
      return interaction.reply({
        content: `No puedes mutearme a mí`,
        ephemeral: true,
      });
    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        content: `No puedes mutear a alguien con un rol igual o superior al tuyo`,
        ephemeral: true,
      });
    if (!member.voice.channel)
      return interaction.reply({
        content: `El usuario no está en un canal de voz`,
        ephemeral: true,
      });

    await member.voice.setMute(true).catch(console.error);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${guild.name}`,
        iconURL: `${
          guild.iconURL({ dynamic: true }) ||
          "https://cdn.discordapp.com/attachments/1053464482095050803/1053464952607875072/PRywUXcqg0v5DD6s7C3LyQ.png"
        }`,
      })
      .setTitle(`${user.tag} ha sido muteado en el servidor`)
      .setColor(`Random`)
      .setTimestamp()
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      .addFields({ name: `Duración`, value: `${duracion}` });

    interaction.reply({ embeds: [embed] });
  },
};
