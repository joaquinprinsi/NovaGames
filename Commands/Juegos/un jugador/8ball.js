const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("8ball")
      .setDescription("Te respondere a tus preguntas")
      .addStringOption((option) =>
        option
          .setName(`pregunta`)
          .setDescription(`Describe tu pregunta`)
          .setRequired(true)
      ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
      const pregunta = interaction.options.getString(`pregunta`);
  
      let respuestas = [
        "Si",
        "No",
        "No lo se",
        "Quiza",
        "Puede que si",
        "Puede que no",
        "Claramente si",
        "Claramente no",
          "Probablemente ",
          "no lo creo",
      ];
  
      const respuesta = Math.floor(Math.random() * respuestas.length);
  
      const embed = new EmbedBuilder().addFields(
        {
          name: `Pregunta`,
          value: `${pregunta}`,
        },
        { name: `Respuesta`, 
        value: `${respuestas[respuesta]}` }
      )
      .setDescription("🎱 Bola mágica de Rogel")
      .setColor("Random");

      await interaction.reply({ embeds: [embed] });
    },
  };