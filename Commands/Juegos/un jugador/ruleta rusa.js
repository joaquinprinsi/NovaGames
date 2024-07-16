const Discord = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('ruleta-rusa')
  .setDescription('Jugaras ruleta rusa'),

  execute(interaction) {
   const { options } = interaction;
   let rpts = [`Estas vivo`, `Estas muerto`, `Sin munición`, `Se quedo atascada`, `el arma homicisa fallo` ]

///   if (!pregunta) return int.reply('Escriba una pregunta.')
     const embed = new EmbedBuilder()
     .setColor(`Random`)
     .setTitle(`Ruleta Rusa de Winner`)
     .setImage("https://media.discordapp.net/attachments/1005560864725807134/1063989570867314749/tomp3.cc_-_Death_Big_bad_Wolf_edit_1080p.gif")
     .addFields(
        {name: `💀 🤐 😮`, value: `${rpts[Math.floor(Math.random() * rpts.length)]}`}
     )

     interaction.channel.send({ embeds: [embed] });
     interaction.reply({ content: `Preparando el revolver 🔫`,  ephemeral: true })

  },

};