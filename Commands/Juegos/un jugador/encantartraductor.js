const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('encantar')
    .setDescription('Traduce palabras en símbolos')
    .addStringOption(option =>
      option.setName('palabras')
        .setDescription('Ingresa las palabras a traducir en símbolos')
        .setRequired(true)
    ),

  async execute(interaction) {
    const palabras = interaction.options.getString('palabras');
    const simbolos = traducirPalabras(palabras);

    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setTitle('Palabras en encantamientos 📚')
      .setDescription(`Palabras ingresadas: **${palabras}\n\n**Traducción 📚: **${simbolos}**`)
      .setColor('Random'); // Color aleatorio en formato chupame un huevo

    await interaction.editReply({ embeds: [embed] });
  },
};

function traducirPalabras(palabras) {
  let simbolos = '';
  for (let i = 0; i < palabras.length; i++) {
    simbolos += traducirLetra(palabras[i]);
  }
  return simbolos;
}

function traducirLetra(letra) {
  const traducciones = {
     'a': 'ᔑ',
    'b': 'ʖ',
    'c': 'ᓵ',
    'd': '↸',
    'e': 'ᒷ',
    'f': '⎓',
    'g': '⊣',
    'h': '⍑',
    'i': '╎',
    'j': '⋮',
    'k': 'ꖌ',
    'l': 'ꖎ',
    'm': 'ᒲ',
    'n': 'リ',
    'o': '𝙹',
    'p': '!¡',
    'q': 'ᑑ',
    'r': '∷',
    's': 'ᓭ',
    't': 'ℸ',
    'u': '⚍',
    'v': '⍊',
    'w': '∴',
    'x': '·',
    'y': '||',
    'z': '⨅',
    '0': '⬡',
    '1': 'Ⅰ',
    '2': 'Ⅱ',
    '3': 'Ⅲ',
    '4': 'Ⅳ',
    '5': 'Ⅴ',
    '6': 'Ⅵ',
    '7': 'Ⅶ',
    '8': 'Ⅷ',
    '9': 'Ⅸ'
  };
  return traducciones[letra.toLowerCase()] || letra;
}
