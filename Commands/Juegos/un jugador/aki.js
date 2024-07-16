const Discord = require("discord.js");
const akinator = require("discord.js-akinator");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("akinator")
    .setDescription("Iniciar el juego de Akinator.")
    .addSubcommand(subcommand =>
      subcommand
        .setName("personaje")
        .setDescription("Adivina el personaje que estoy pensando.")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("animal")
        .setDescription("Adivina el animal que estoy pensando.")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("objeto")
        .setDescription("Adivina el objeto que estoy pensando.")
    ),

  /**
   * @param {Discord.Client} client
   * @param {Discord.ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    let gameType;

    switch (subcommand) {
      case 'personaje':
        gameType = 'Character';
        break;
      case 'animal':
        gameType = 'Animal';
        break;
      case 'objeto':
        gameType = 'Object';
        break;
      default:
        return interaction.reply('❌ Subcomando no válido.');
    }

    const msg = await interaction.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setTitle(`😀 ¡Vamos a jugar Akinator!`)
          .setDescription('Haz clic en **"INICIAR"** para comenzar el juego.')
          .addFields(
            {
              name: "🔍 Tipo de juego:",
              value: `\`${subcommand}\``,
              inline: true
            }
          )
          .setColor("Red")
          .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Akinator.png/640px-Akinator.png")
          .setImage("https://bk.ibxk.com.br/2014/3/programas/10567873.png")
          .setFooter({ text: '¡Buena suerte! 😊' })
      ],
      components: [
        new Discord.ActionRowBuilder()
          .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId("ako")
              .setEmoji("🗺")
              .setLabel("INICIAR")
              .setStyle(Discord.ButtonStyle.Primary),
          )
      ]
    });

    const collector = msg.createMessageComponentCollector();

    collector.on("collect", async (i) => {
      if (i.customId === 'ako') {
        if (i.user.id !== interaction.user.id) {
          return i.reply({ content: `**❌ - ¡No eres el autor del comando!**`, ephemeral: true });
        }

        await i.deferUpdate();

        const language = "es";
        const childMode = true;
        const useButtons = true;
        const embedColor = "Yellow";

        akinator(i, {
          language: language,
          childMode: childMode,
          gameType: gameType,
          useButtons: useButtons,
          embedColor: embedColor
        });
      }
    });
  },
};
