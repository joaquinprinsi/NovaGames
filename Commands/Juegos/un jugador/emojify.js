const { SlashCommandBuilder } = require('discord.js');

// Función para obtener el emoji correspondiente al número o letra
function getEmoji(caracter) {
    const emojis = {
        '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣', '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣',
        'a': '🇦', 'b': '🇧', 'c': '🇨', 'd': '🇩', 'e': '🇪', 'f': '🇫', 'g': '🇬', 'h': '🇭', 'i': '🇮', 'j': '🇯', 'k': '🇰', 'l': '🇱', 'm': '🇲', 'n': '🇳',
        'o': '🇴', 'p': '🇵', 'q': '🇶', 'r': '🇷', 's': '🇸', 't': '🇹', 'u': '🇺', 'v': '🇻', 'w': '🇼', 'x': '🇽', 'y': '🇾', 'z': '🇿',
        '!': '❗', '?': '❓', '#': '#️⃣', '*': '*️⃣', ' ': '⬛', ' ': '⬜'
    };
    return emojis[caracter.toLowerCase()] || '❓'; // Retorna el emoji correspondiente o ❓ si no está definido
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojify')
        .setDescription('Convierte texto en emojis.')
        .addStringOption(option =>
            option.setName('texto')
                .setDescription('El texto que quieres convertir en emojis (máximo 50 caracteres)')
                .setRequired(true)),
    async execute(interaction) {
        const texto = interaction.options.getString('texto').slice(0, 50); // Limita el texto a 50 caracteres
        let resultado = '';

        if (texto.length > 50) {
            await interaction.reply('El texto excede los 100 caracteres permitidos. Por favor, ingresa un texto más corto.');
            return;
        }

        for (let i = 0; i < texto.length; i++) {
            const caracter = texto[i];
            const emoji = getEmoji(caracter);
            resultado += emoji + ' ';
        }

        await interaction.reply(resultado.trim());
    },
};
