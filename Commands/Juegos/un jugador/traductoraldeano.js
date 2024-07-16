const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('aldeano')
    .setDescription('Traduce palabras al idioma de los aldeanos')
    .addStringOption(option =>
      option.setName('palabras')
        .setDescription('Ingresa las palabras a traducir')
        .setRequired(true)
    ),
  async execute(interaction) {
    const palabras = interaction.options.getString('palabras');
    const respuesta = traducirPalabras(palabras);

    await interaction.reply(`${respuesta}`);
  },
};

function traducirPalabras(palabras) {
  const palabrasSeparadas = palabras.split(' ');
  let respuesta = '';

  for (let i = 0; i < palabrasSeparadas.length; i++) {
    const palabra = palabrasSeparadas[i];
    const traduccion = 'h' + palabra.slice(1).replace(/./g, 'm');
    respuesta += traduccion + ' ';
  }

  return respuesta.trim();
}
