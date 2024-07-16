const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('banana')
    .setDescription('Mira cuánto te mide.')
    .addUserOption(option =>
              option.setName('usuario')
                  .setDescription('Usuario')
                  .setRequired(false)
    ),
    
  
    execute(interaction) {
        const { options } = interaction;
        const usuario = interaction.options.getUser('usuario') || interaction.user
        const banana = [Math.floor(Math.random() * 30)]
      
        const embed = new EmbedBuilder()
        .setDescription(`**La banana de ${usuario.username} mide ${banana} cm.**`)
        .setColor("Random")
        .setImage("https://images-ext-1.discordapp.net/external/0AL9NK17dkRcqaahbxNQrzui2i0OTlsCY091ETFzY0E/https/images.emojiterra.com/twitter/512px/1f34c.png?width=391&height=391")


        interaction.reply({ embeds: [embed]})
    }
};