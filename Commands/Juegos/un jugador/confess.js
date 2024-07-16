const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("confess")
    .setDescription("Envia una confecion")
    .addStringOption((option) =>
      option
        .setName(`confecion`)
        .setDescription(`Escribe aqui tu confess`)
        .setRequired(true)
    )
    .addStringOption((option) =>
    option.setName(`tipo`)
    .setDescription(`elije si lo quieres anonimo`)
    .addChoices(
      {name: `privado`, value: `privado`},
      {name: `publico`, value: `publico`}
    )
    .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const confecion = interaction.options.getString(`confecion`);
    const tipo = interaction.options.getString(`tipo`)

    const { guild } = interaction;

    const channel = interaction.guild.channels.cache.find(
      (c) => c.id === `1100964369610854440`
    );

    if(tipo === "privado"){
      const priv = new EmbedBuilder()
      .setTitle(`💡 | Nueva Confecion`)
      .addFields(
        {name: `Confecion`, value: ` \`\`\`${confecion}\`\`\` `},
        {name: `Tipo:`, value: ` \`\`\`${tipo}\`\`\` `}
      )
        .setFooter({text: `Si quieres enviar una confecion solo usa /confess`})
        .setColor(`Random`)
        .setTimestamp()

        await interaction.channel.send({ embeds: [priv]})
        await interaction.reply({ content: `Confecion enviado correctamente`, ephemeral: true})
    } else 
    if(tipo === "publico"){
      const pub= new EmbedBuilder()
      .setTitle(`💡 | Nueva Confecion`)
      .addFields(
        {name: `Confecion`, value: ` \`\`\`${confecion}\`\`\` `},
        {name: `Tipo:`, value: ` \`\`\`${tipo}\`\`\` `},
        {name: `Enviado:`, value: ` \`\`\`Del usuario ${interaction.user.username}\`\`\` `}
      )
      .setThumbnail(`${interaction.user.avatarURL({ dynamic: true, size: 2048 })}`)
        .setFooter({text: `Si quieres enviar una confecion solo usa /confess`})
        .setColor(`Random`)
        .setTimestamp()

        await interaction.channel.send({ embeds: [pub]})
        await interaction.reply({ content: `Confecion enviado correctamente`, ephemeral: true})
      };
 },
};
