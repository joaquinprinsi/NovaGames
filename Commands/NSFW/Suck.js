const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const suck = [
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2021/04/url-hentai-blowjob-gif-1-min.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2021/04/forced-blowjob-hentai-gif-1-min.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2021/04/hentai-girl-blowjob-gif-1-min.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2021/04/hentai-girl-blowjob-gif-min.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/11/anime-gg-4.gif?resize=640%2C552&ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2021/04/hentai-fellatio-gif-2-min.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2021/04/anime-blowjob-gif-1-min.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/07/anime-hentai-gif-13.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/07/my-hero-academia-18.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/07/my-hero-academia-25.gif?ssl=1"
];

// Variable global para almacenar el recuento de usos del comando por usuario
const commandCount = {};

module.exports = {
  premiumOnly: false,
  data: new SlashCommandBuilder()
    .setName("suck")
    .setDescription("¡Dale una chupada a un usuario!")
    .addUserOption(option =>
      option.setName("target")
        .setDescription("¿A quién se la quieres chupar?")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!interaction.channel.nsfw) {
      return interaction.reply({ content: 'Este comando solo puede ser usado en canales NSFW.', ephemeral: true });
    }

    const { options, member } = interaction;
    const user = options.getUser("target");
    const userId = member.user.id;    



    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Random")
          .setImage(suck[Math.floor(Math.random() * suck.length)])
          .setDescription(`${member} Se la chupo a ${user}!`) 
      ]
    });
  }
};