const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Intents, CommandInteraction } = require('discord.js');



const ownerId = '1071596284059861075'; // Reemplaza con tu ID de usuario

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription('Apaga el bot (solo disponible para el propietario)'),
    async execute(interaction) {
        if (interaction.user.id !== ownerId) {
            return await interaction.reply({ content: 'No tienes permiso para usar este comando.', ephemeral: true });
        }

        await interaction.reply({ content: 'Apagando el bot...', ephemeral: true });
        await client.destroy(); // Esta línea apaga el bot

        process.exit(); // Opcional: salir del proceso de Node.js completamente
    },
};
