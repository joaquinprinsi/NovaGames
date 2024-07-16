const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const fuck = [
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/11/anime-gg-5.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/11/anime-gg-1.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/11/anime-gg-13.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/11/anime-gg-12.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/11/anime-gg-4.gif?resize=640%2C552&ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/11/anime-kaw-13.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/11/anime-gg-6.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/11/anime-kaw-4.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/11/anime-kaw-11.gif?ssl=1",
  "https://i0.wp.com/uncensored-hentai.top/wp-content/uploads/2020/11/anime-kaw-5.gif?ssl=1"
];

// Variable global para almacenar el recuento de usos del comando por usuario
const commandCount = {};

module.exports = {
  premiumOnly: false,
  data: new SlashCommandBuilder()
    .setName("fuck")
    .setDescription("¡Dale una cojida a un usuario!")
    .addUserOption(option =>
      option.setName("target")
        .setDescription("¿A quién quieres cojer?")
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
          .setImage(fuck[Math.floor(Math.random() * fuck.length)])
          .setDescription(`${member} Se cojio a ${user}!`) 
      ]
    });
  }
};