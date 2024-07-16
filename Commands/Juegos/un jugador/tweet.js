const { EmbedBuilder } = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("tweet")
    .setDescription("🎮 | Crea un tweet falso")
    .addStringOption((option) =>
      option
        .setName("tweet")
        .setDescription("Escribe un tweet")
        .setRequired(true)
    ),
  async execute(interaction) {
    let tweet = interaction.options.getString("tweet");
    let avatarUrl = interaction.user.avatarURL({ extension: "jpg" });
    let canvas = `https://some-random-api.com/canvas/misc/tweet?avatar=${avatarUrl}&displayname=${
      interaction.user.username
    }&username=${interaction.user.username}&comment=${encodeURIComponent(
      tweet
    )}`;

    const embed = new discord.EmbedBuilder()
    .setTitle("**Tweets | Winner**")
    .setImage(canvas)
    .setTimestamp()
    .setColor("Random")

    interaction.reply({ content: `<:verifyicon:1082767419073896580> **Tweet enviado correctamente**`, ephemeral: true })
    await interaction.channel.send({
      embeds: [embed]
    });

  },
};