const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("say avanzado para que mandes un mensage a traves del bot")
    .addStringOption(option =>
        option.setName("avanzado")
        .setDescription("Elije que tipo de say quieres embed o normal")
        .addChoices(
            {name: `embed`, value: `e`},
            {name: `texto`, value: `t`}
        )
        .setRequired(true)
        )
    .addStringOption(option =>
        option.setName("mensage")
        .setDescription("tipo de mensage")
        .setRequired(true)
        ),

    async execute(interaction){

        const { options } = interaction;

        const m = options.getString("mensage");
        const avanzado = options.getString("avanzado");

        if(avanzado === "e"){

            const embed = new EmbedBuilder()
            .setDescription(`${m}`)
            .setColor("Random")
            .setTimestamp()

            await interaction.channel.send({embeds: [embed]})
            await interaction.reply({
                content: ` ✅ | Say enviado correctamente`,
                ephemeral: true
                })

        } else if(avanzado === "t"){

           
            await interaction.reply(`${m}`)
        }
    }
}