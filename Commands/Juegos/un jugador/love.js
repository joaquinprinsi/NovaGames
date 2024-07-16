const Discord = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('love')
  .setDescription('mide tu amor con un usuario')
  .addUserOption((option) =>
  option.setName(`user`)
  .setDescription(`usuario al quien queres medir el amor`)
  .setRequired(true)
  ),

  async execute(interaction) {
   const { options } = interaction;
   const user = options.getUser(`user`)
   let rpts = [`🖤5%🖤`, `💔10%💔`, `💔15%💔`, `💔20%💔`, `💔25%💔`, `💔30%💔`, `💔35%💔`, `♥40%♥`, `♥45%♥`, `♥50%♥`, `♥55%♥`, `♥60%♥`, `💖65%💖`, `💖70%💖`, `💖75%💖`, `💖80%💖`, `💖85%💖`, `💞90%💞`, `💞95%💞`, `💕100%💕`]

///   if (!pregunta) return int.reply('Escriba una pregunta.')
     const embed = new EmbedBuilder()
     .setColor(`DarkVividPink`)
     .setTitle(`El amor de ${interaction.user.username} y ${user.username} `)
     .addFields(
        {name: `Es: `, value: `${rpts[Math.floor(Math.random() * rpts.length)]}`}
     )

     interaction.channel.send({ embeds: [embed] });
     interaction.reply({ content: `Mensage enviado `,  ephemeral: true })

  },

};
