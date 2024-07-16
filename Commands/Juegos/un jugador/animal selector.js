const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("animal-selector")
    .setDescription("Selecciona tu animal."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let respuestas = [
          "🦓 Cebra: fuerte y rayada",
    "🐭 Ratón: pequeño y curioso",
    "🐻 Oso: grande y peludo",
    "🐺 Lobo: cazador en manada",
    "🦛 Hipopótamo: robusto y semiacuático",
    "🐸 Rana: saltarina y acuática",
    "🐿️ Ardilla: ágil trepadora de árboles",
    "🐮 Vaca: animal de granja lechero",
    "🦘 Canguro: saltador con bolsa marsupial",
    "🦆 Pato: nadador con plumas",
    "🦋 Mariposa: delicada y colorida",
    "🐝 Abeja: polinizadora y trabajadora",
    "🦍 Gorila: poderoso y pacífico",
    "🐫 Camello: resistente y adaptable",
    "🐠 Pez: nadador acuático",
    "🐊 Cocodrilo: depredador reptil",
    "🦇 Murciélago: volador nocturno",
    "🐧 Pingüino: nadador antártico",
    "🐬 Delfín: inteligente y sociable",
    "🦀 Cangrejo: crustáceo con tenazas",
    "🦅 Halcón: ave de presa",
    "🦅 Águila: majestuoso ave rapaz",
    "🦃 Pavo: colorido y doméstico",
    "🐍 Serpiente: reptil sigiloso",
    "🐴 Caballo: elegante y veloz",
    "🦉 Búho: ave nocturna sabia",
    "🐙 Pulpo: tentáculos y camuflaje",
    "🦢 Cisne: grácil y elegante",
    "🐐 Cabra: trepadora y saltarina",
    "🐑 Oveja: lanuda y dócil",
    "🦌 Reno: cornamenta y resistente",
    "🐺 Coyote: astuto y salvaje",
    "🐆 Lince: cazador ágil",
    "🐳 Orca: inteligente y social",
    "🐇 Conejo: veloz reproductor",
    "🐜 Hormiga: trabajadora y organizada",
    "🦎 Iguana: reptil de colores vivos",
    "🦌 Ciervo: elegante y grácil",
    "🦔 Erizo: púas defensivas",
    "🐨 Koala: tranquilo y arborícola",
    "🐼 Panda: adorable y herbívoro",
    "🦦 Nutria: nadadora y juguetona",
    "🐢 Tortuga: lenta y longeva",
    "🗡️ Pez espada: ágil y depredador",
    "🦂 Escorpión: venenoso y sigiloso",
    "🪳 Cucaracha: resistente y adaptable",
    "🐀 Rata: hábil roedora",
    "🦎 Lagarto: reptil de hábitats diversos",
    "🐦 Gaviota: ave costera voladora",
    "🌸 Colibrí: pequeño y rápido",
    "🦬 Bisonte: robusto y herbívoro",
    "🐃 Hiena: carroñera y astuta",
    "🦇 Murciélago: volador nocturno",
    "🐃 Búfalo: resistente y poderoso",
    "🐛 Ciempiés: muchos segmentos y patas",
    "🐕 Dingo: canino salvaje",
    "🐡 Pez globo: inflable y venenoso",
    "🐠 Pez ángel: colorido y elegante",
    "🦈 Tiburón: depredador marino",
    "🐊 Caimán: reptil semiacuático",
    "🐍 Cobra: serpiente venenosa",
    "🐔 Gallina: ave doméstica",
    "🐓 Gallo: ave de corral",
    "🦤 Dodo: extinto y peculiar",
    "🐦 Gorrión: ave pequeña y común",
    "🐹 Hámster: roedor pequeño y peludo",
    "🐛 Insecto: pequeño y variado",
    "🐗 Jabalí: cerdo salvaje",
    "🦞 Langosta: crustáceo marino",
    "🐞 Libélula: voladora y colorida",
    "🪱 Lombriz: invertebrado terrestre",
    "🪰 Mosca: insecto volador",
    "🐋 Narval: ballena con colmillo",
    "🐃 Ñu: migratorio y herbívoro",
    "🐦 Oropéndola: ave cantora",
    "🦔 Puercoespín: cubierto de púas",
    "🦜 Quetzal: ave exótica y colorida",
    "🐭 Ratón: pequeño y curioso",
    "🦎 Salamandra: anfibio de piel suave",
    "🦠 Sanguijuela: parásito sanguíneo",
    "🕷️ Tarántula: araña peluda",
    "🦜 Urraca: ave inteligente y vocal",
    "🐍 Víbora: serpiente venenosa",
    "🐨 Wombat: marsupial terrestre",
    "🐸 Xenopus: rana acuática",
    "🐂 Yak: robusto y peludo",
    "🦨 Zorrillo: oloroso y defensivo",
    ];

    const respuesta = Math.floor(Math.random() * respuestas.length);

    const embed = new EmbedBuilder()
      .addFields({ name: `Tu animal es:`, value: `**${respuestas[respuesta]}**` })
      .setTitle("Selector de animales | WinnerBot")
      .setDescription("cual sera tu animal? 🤔")
      .setColor("Random");

    await interaction.reply({ embeds: [embed] });
  },
};
