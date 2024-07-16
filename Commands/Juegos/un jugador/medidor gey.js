const Discord = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('medidor-gey')
  .setDescription('ve un porcentage de cuando eres de gey')
  .addUserOption((option) =>
  option.setName(`usuario`)
  .setDescription(`ve a un usuario cuanro es de gay`)
  .setRequired(false)
  ),

  execute(interaction) {
   const { options } = interaction;
   const usuario = interaction.options.getUser(`usuario`);

   let rpts = [`5%`, `10%`, `15%`, `20%`, `25%`, `30%`, `35%`, `40%`, `45%`, `50%`, `55%`, `60%`, `65%`, `70%`, `75%`, `80%`, `85%`, `90%`, `95%`, `100%`]

///   if (!pregunta) return int.reply('Escriba una pregunta.')
     const embed = new EmbedBuilder()
     .setColor(`Random`)
     .setTitle(`Medidor gey `)
     .setDescription(`
     usuario: 
     ${usuario}
      Te ha tocado:
        ${rpts[Math.floor(Math.random() * rpts.length)]} gey 🏳‍🌈
        `)
         .setFooter({ text: `Usuario quien puso el comando ${interaction.user.username}`})
        

     interaction.channel.send({ embeds: [embed] });
     interaction.reply({ content: `revisa tu porcentaje de gay`,  ephemeral: true })

  },

};