const {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder
} = require("discord.js");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("membercount") // poner el nombre del comando
    .setDescription("muestra el número de miembros del servidor."),
 
 
    async execute(interaction) {
        const { guild } = interaction;
        const { members } = guild;
 
        const botCount = members.cache.filter(member => member.user.bot).size;
 
        interaction.reply({ embeds: [
            new EmbedBuilder()
                .setColor("Random")
                .setTitle(`${guild.name}'s Membercount`)
                .setThumbnail(guild.iconURL({ size: 1024 }))
                .setImage(guild.bannerURL({ size: 1024 }))
                .setFooter({ text: "Membercount Command" })
                .addFields(
                    {
                        name: `User (${guild.memberCount})`,
                        value: [
                            `👨‍👩‍👧‍👦 **Member** ${guild.memberCount - botCount}`,
                            `🤖 **Bots** ${botCount}`
                        ].join("\n"),
                        inline: true
                    }
                )
        ] });
    }
};