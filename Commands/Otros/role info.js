
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rol-info")
    .setDescription("Consigue informacion del rol que quieres")
    .addRoleOption(opt => opt.setName("rol").setDescription("El rol para obtener la información.").setRequired(true)
    ),
  async execute(interaction, client) {
    const role = interaction.options.getRole('rol')

    if (!role || !role.id) return interaction.reply({ content: "**Rol no encontrado.**" }) 

    const embed = new EmbedBuilder()
      .setColor('Random')
      .setTitle("**> Información del rol | **" + role.name)
      .setDescription(`> **ID DEL ROL:** ${role.id} \n> **COLOR DEL ROL:** ${role.hexColor}`)
      .setTimestamp()
      .setThumbnail("https://images-ext-1.discordapp.net/external/XnuJ-MtWOgUAr3QXTXrfHTfQPvVVJr4x7YZuPaK0IVU/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1104613755570110474/e2345bfd6b592da8bc125fb835c21e13.webp?width=393&height=393")
      .setFooter({ text: "WinnerBot" })

    interaction.reply({ embeds: [embed] }) 
  }
}
