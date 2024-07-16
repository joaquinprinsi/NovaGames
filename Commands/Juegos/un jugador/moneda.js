const Discord = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('moneda')
  .setDescription('Tira una moneda, cara o cruz'),

  execute(interaction) {
   const { options } = interaction;
   let rpts = [`Cara`, `Cruz`]

     const embed = new EmbedBuilder()
     .setColor(`Random`)
     .setTitle(`Tirando una moneda `)
     .setImage(`https://i.ibb.co/5527HRb/moneda.gif`)
     .addFields(
        {name: `Te ha tocado`, value: `${rpts[Math.floor(Math.random() * rpts.length)]}`}
     )

     interaction.channel.send({ embeds: [embed] });
     interaction.reply({ content: `moneda tirada`,  ephemeral: true })

  },

};