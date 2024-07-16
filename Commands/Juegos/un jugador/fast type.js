const { SlashCommandBuilder } = require('@discordjs/builders');
const { FastType } = require('discord-gamecord');

// Array de oraciones aleatorias
const sentences = [
  'El sol brilla en un cielo despejado.',
  'La lluvia cae suavemente.',
  'Los pájaros cantan en los árboles cercanos.',
  'El viento sopla suavemente a través del campo.',
  'Las flores despliegan sus hermosos colores.',
  'Un perro corre felizmente por el parque.',
  'El café caliente emite un aroma delicioso.',
  'La risa llena el aire en la reunión.',
  'Los niños juegan felices en el patio.',
  'Las estrellas brillan en el cielo nocturno.',
  'El mar susurra melodías relajantes.',
  'Un libro abre las puertas de la imaginación.',
  'El pastel recién horneado llena la cocina.',
  'La montaña se alza majestuosamente en el horizonte.',
  'Un abrazo cálido reconforta el corazón.',
  'La música animada invita a bailar.',
  'Un suspiro escapa de los labios cansados.',
  'La aventura espera más allá del horizonte.',
  'La sonrisa ilumina el rostro de la persona amada.',
  'El arcoíris pinta colores en el cielo.',
  'El teléfono suena anunciando buenas noticias.',
  'Una taza de té calma el alma agitada.',
  'El coche rojo acelera por la carretera.',
  'La bufanda abriga el cuello del frío invierno.',
  'El perfume floral embriaga los sentidos.',
  'Un mensaje de texto trae alegría inesperada.',
  'El río fluye sereno bajo el puente.',
  'El reloj marca el paso implacable del tiempo.',
  'Una lágrima cae silenciosamente por la mejilla.',
  'La bicicleta roja se desliza por la colina.',
  'Un bocadillo delicioso satisface el hambre.',
  'El bosque encantado esconde secretos mágicos.',
  'Un lápiz traza líneas en el papel en blanco.',
  'La vela ilumina la habitación en penumbra.',
  'Un susurro al oído despierta emociones dormidas.',
  'El tren parte rumbo a nuevos destinos.',
  'Un sueño se convierte en realidad al despertar.',
  'El silencio envuelve el lugar en calma.',
  'La bufanda multicolor alegra el atuendo.',
  'Un baño caliente relaja los músculos cansados.',
  'El helado derretido se derrite en las manos.',
  'Una caricia suave reconforta el corazón herido.',
  'La luz tenue crea un ambiente romántico.',
  'Un sombrero elegante complementa el conjunto.',
  'La luna llena ilumina el paisaje nocturno.',
  'Un globo flota en el aire libremente.',
  'Una manta suave abriga en las noches frías.',
  'El sol ilumina el día nublado.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fast-type')
    .setDescription('Juega al juego Fast Type.'),

  async execute(interaction) {
    // Seleccionar una oración aleatoria
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];

    const game = new FastType({
      message: interaction,
      slash_command: true,
      embed: {
        title: 'Fast-Type',
        color: 'Random',
        description: `Tienes **{time} segundos** para escribir la siguiente oración:\n\n${randomSentence}`,
      },
      timeoutTime: 60000,
      sentence: randomSentence,
      winMessage: '¡Ganaste! Terminaste la carrera de escritura en {time} segundos con una velocidad de {wpm} ppm.',
      loseMessage: '¡Perdiste! No escribiste la oración correcta a tiempo.',
    });

    game.startGame();
    game.on('gameOver', (result) => {
      console.log(result); // => { result... }
    });
  },
};
