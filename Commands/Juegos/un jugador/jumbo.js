const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, parseEmoji } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jumbo')
        .setDescription('Agranda un emoji.')
        .addStringOption(option => 
            option.setName('emoji')
                .setDescription('El emoji para agrandar')
                .setRequired(true)),
    async execute(interaction) {
        const emoji = interaction.options.getString('emoji');
        const response = await getEmoji(interaction.user, emoji);
        await interaction.reply(response);
    }
};

async function getEmoji(user, emoji) {
    const custom = parseEmoji(emoji);
    const embed = new EmbedBuilder().setColor('Random');

    if (custom.id) {
        embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? 'gif' : 'png'}`);
        return { embeds: [embed] };
    } else {
        return 'Solo se pueden agrandar emojis personalizados.';
    }
}
