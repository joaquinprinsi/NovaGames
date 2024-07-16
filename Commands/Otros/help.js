const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("❓ Mira mis comandos"),

  async execute(interaction) {

    const cmp = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId("Menu")
        .addOptions([
          {
            label: "Menu Principal",
            description: "Menu Principal.",
            value: "uno",
            emoji: "🏡",
          },
          {
            label: "Configuracion",
            description: "Comandos de Configuracion",
            value: "dos",
            emoji: "🔧",
          },
          {
            label: "Moderacion",
            description: "Comandos de Moderacion",
            value: "tres",
            emoji: "🛡️",
          },
          {
            label: "Interaccion",
            description: "Comandos de Interaccion",
            value: "cuatro",
            emoji: "🎮",
          },
          {
            label: "NSFW",
            description: "Comandos NSFW",
            value: "cinco",
            emoji: "🔞",
          },
          {
            label: "Juegos",
            description: "Comandos de Juegos",
            value: "seis",
            emoji: "🎲",
          },
          {
            label: "Música",
            description: "Comandos de Música",
            value: "siete",
            emoji: "🎵",
          },
          {
            label: "Otros",
            description: "Comandos de Otras Categorías",
            value: "otros",
            emoji: "🔩",
          },
        ])
      );
    const user = interaction.user;

    const embed = new EmbedBuilder()
      .setTitle("WinnerBot / Support Team")
      .setImage("https://media.discordapp.net/attachments/1086311971005136936/1091908401870680124/New_Project_1.png?width=1025&height=183")
      .setColor("Random")
      .setDescription(`WinnerBot Es Un Bot Multifuncion Con muchas Categorias, Mas de 80 Comandos Para Explorar, Un Bot 24/7, Seguro Y Sobre Todo Es Configurable, Este Bot Solo Busca Estar Y Help En Tu Servidor

**Informacion Del Bot:**
Dueño: @joako_85#3484 
Prefix: /
Soporte: https://discord.gg/KAxc773EUH
vote e invite: https://top.gg/bot/1104613755570110474?s=01e2cea438f79
Devs: None

**porfavor selecione una categoria:**`);

    let mensaje = await interaction.reply({
      embeds: [embed],
      components: [cmp],
    });

    const ifiltro = i => i.user.id === interaction.user.id;

    let collector = interaction.channel.createMessageComponentCollector({ filter: ifiltro });

    const embed1 = new EmbedBuilder()
      .setTitle("Comandos de Configuración")
      .setDescription("PROXIMAMENTE.")
      .setFooter({ text: "WinnerBot" })
      .setTimestamp()
      .setColor("Random");

    const embed2 = new EmbedBuilder()
      .setTitle("Comandos de Moderación")
      .setDescription("Ban - kick - Warn - Nuke - Clear")
      .setFooter({ text: "WinnerBot" })
      .setTimestamp()
      .setColor("Random");

    const embed3 = new EmbedBuilder()
      .setTitle("Comandos de Interacción")
      .setDescription("Angry - Slap - Kill - Messi - Capybara - Mario")
      .setFooter({ text: "WinnerBot" })
      .setTimestamp()
      .setColor("Random");

    const embed4 = new EmbedBuilder()
      .setTitle("Comandos NSFW")
      .setDescription("Fuck - Suck - Boobjob")
      .setFooter({ text: "WinnerBot" })
      .setTimestamp()
      .setColor("Random");

    const embed5 = new EmbedBuilder()
      .setTitle("Comandos de Juegos")
      .setDescription("2048 - 8ball - Tweet - Meme - Acomodar - Ahorcado - Moneda - Animal selector - Snake - Banana - Tres en raya - Busca minas - Ruleta rusa - Confess - Slot - Dado - PPT - Fast Type - Find emoji - Piedrapapelotijera - Numerical question - Flood - Adivina el pokemon - Love - Match - Connect4 - Medidor gey - Encantar - Aldeano - Guess,facil,intermedio,dificil,imposible y legendario.")
      .setFooter({ text: "WinnerBot" })
      .setTimestamp()
      .setColor("Random");

    const embed6 = new EmbedBuilder()
      .setTitle("Comandos de Música")
      .setDescription("PROXIMAMENTE.")
      .setFooter({ text: "WinnerBot" })
      .setTimestamp()
      .setColor("Random");

    const embedOtros = new EmbedBuilder()
      .setTitle("Comandos de Otras Categorías")
      .setDescription("Emoji info - Emoji list - ID converter - Role info - Server info - Server imagen - Membercount - Stats bot")
      .setFooter({ text: "WinnerBot" })
      .setTimestamp()
      .setColor("Random");

    collector.on("collect", async i => {
      if (i.values[0] === "uno") {
        await i.deferUpdate();
        i.editReply({ embeds: [embed], components: [cmp] });
      }
    });

    collector.on("collect", async i => {
      if (i.values[0] === "dos") {
        await i.deferUpdate();
        i.editReply({ embeds: [embed1], components: [cmp] });
      }
    });

    collector.on("collect", async i => {
      if (i.values[0] === "tres") {
        await i.deferUpdate();
        i.editReply({ embeds: [embed2], components: [cmp] });
      }
    });

    collector.on("collect", async i => {
      if (i.values[0] === "cuatro") {
        await i.deferUpdate();
        i.editReply({ embeds: [embed3], components: [cmp] });
      }
    });

    collector.on("collect", async i => {
      if (i.values[0] === "cinco") {
        await i.deferUpdate();
        i.editReply({ embeds: [embed4], components: [cmp] });
      }
    });

    collector.on("collect", async i => {
      if (i.values[0] === "seis") {
        await i.deferUpdate();
        i.editReply({ embeds: [embed5], components: [cmp] });
      }
    });

    collector.on("collect", async i => {
      if (i.values[0] === "siete") {
        await i.deferUpdate();
        i.editReply({ embeds: [embed6], components: [cmp] });
      }
    });

    collector.on("collect", async i => {
      if (i.values[0] === "otros") {
        await i.deferUpdate();
        i.editReply({ embeds: [embedOtros], components: [cmp] });
      }
    });

  },
};
