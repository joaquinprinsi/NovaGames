const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// Palabras en las categorías
const animales = ["perro", "gato", "elefante", "tigre", "jirafa", "conejo", "ratón", "pájaro", "caballo", "vaca", "oveja", "mono", "león", "serpiente", "pollo", "pingüino", "ardilla", "rana", "cocodrilo", "delfín"];
const colores = ["rojo", "azul", "verde", "amarillo", "naranja", "morado", "rosa", "negro", "blanco", "gris", "marrón", "turquesa", "beige", "celeste", "violeta", "dorado", "plateado", "rojizo", "verde claro", "gris oscuro"];
const frutas = ["manzana", "naranja", "plátano", "uva", "sandía", "fresa", "kiwi", "melón", "limón", "piña", "mango", "papaya", "cereza", "pera", "coco", "frambuesa", "mandarina", "granada", "zarzamora", "melocotón"];
const cosasCotidianas = ["silla", "mesa", "televisor", "computadora", "ventana", "puerta", "refrigerador", "estufa", "lavadora", "secadora", "cama", "lámpara", "espejo", "cepillo", "peine", "taza", "plato", "tenedor", "cuchillo", "cuchara"];
const palabrasRandom = ["Silla", "Piso", "Sol", "Pared", "Libro", "Bosque", "Montaña", "Río", "Llave", "Reloj", "Globo", "Nube", "Guitarra", "Sombrero", "Nube", "Pintura", "Papel", "Lápiz", "Linterna", "Microondas", "Almohada", "Piscina", "Barco", "Pala", "Cuchara", "Avión", "Coche", "Puente", "Casa", "Juego", "Dado", "Reloj", "Árbol", "Piedra", "Mar", "Playa", "Caja", "Ventana", "Calle", "Mapa", "Globo aerostático", "Cámara", "Radio", "Fruta", "Música", "Corazón", "Luna", "Globo", "Clave", "Balón", "Mano", "Hoja", "Lago", "Teléfono", "Computadora", "Tren", "Nieve", "Naranja", "Martillo", "Zapato", "Pájaro", "Llave", "Pelota", "Gafas", "Puerta", "Taza", "Perro", "Gato", "Rana", "Elefante", "Tigre", "Jirafa", "Ropa", "Leche", "Café", "Oro", "Plata", "Cobre", "Acero", "Tijeras", "Papel higiénico", "Cinta", "Botella", "Espejo", "Pintura", "Fuego", "Vela", "Piano", "Escalera", "Zapato", "Ojo", "Mano", "Nariz", "Oreja", "Boca", "Diente", "Pierna", "Brazo", "Cabeza", "Pelo", "Lengua", "Barba", "Silla", "Mesa", "Cama", "Armario", "Ventilador", "Lámpara", "Cepillo", "Peine", "Toalla", "Tenedor", "Plato", "Cuchillo", "Sartén", "Olla", "Taza", "Vaso", "Lavadora", "Secadora", "Nevera", "Estufa", "Horno", "Televisor", "Radio", "Teléfono", "Computadora", "Ratón", "Teclado", "Altavoz", "Auriculares", "Micrófono", "Cámara", "Proyector", "Impresora", "Escáner", "Enchufe", "Bombilla", "Interruptor", "Cable", "Batería", "Mando a distancia", "Cargador", "Lupa", "Binoculares", "Brújula", "Martillo", "Destornillador", "Sierra", "Taladro", "Llave inglesa", "Pinzas", "Serrucho", "Cincel", "Alicate", "Escalera", "Escoba", "Recogedor", "Fregona", "Cubo", "Cuerda", "Cinta adhesiva", "Pegamento", "Tijeras", "Papel", "Cartón", "Plástico", "Vidrio", "Metal", "Cerámica", "Goma", "Piedra", "Madera", "Arena", "Agua", "Fuego", "Aire", "Tierra", "Hierro", "Oro", "Plata", "Cobre", "Bronce", "Aluminio", "Titanio", "Acero", "Níquel", "Zinc", "Platino", "Tungsteno", "Helio", "Neón", "Argón", "Kriptón", "Xenón", "Radón", "Hidrógeno", "Oxígeno", "Nitrógeno", "Carbono", "Azufre", "Fósforo", "Calcio", "Potasio", "Hierro", "Magnesio", "Cloro", "Sodio", "Cobre", "Zinc", "Plomo", "Mercurio", "Litio", "Radio", "Uranio", "Berilio", "Paladio", "Iridio", "Rodio", "Titanio", "Vanadio", "Cromo", "Cobalto", "Molibdeno", "Estaño", "Manganeso", "Antimonio", "Arsenio", "Silicio", "Cerio", "Galio", "Bismuto", "Wolframio", "Talio", "Renio", "Selenio", "Silicio", "Germio", "Astato", "Telurio", "Polonio", "Francio", "Estroncio", "Rubidio", "Cesio", "Yodo", "Flúor", "Cloro", "Bromo", "Litio", "Sodio", "Potasio", "Fósforo", "Azufre", "Mercurio", "Bario", "Radio", "Cesio", "Torio", "Titanio", "Cromo", "Platino", "Plomo", "Magnesio", "Cadmio", "Oro", "Paladio", "Renio", "Escandio", "Vanadio", "Galio", "Manganeso", "Silicio", "Estaño", "Zirconio", "Cobalto", "Niobio", "Hafnio", "Renio", "Iridio", "Lantano", "Molibdeno", "Tantalio", "Cesio", "Rutenio", "Osmio", "Itrio", "Cobre", "Silicio", "Germanio", "Arsénico", "Telurio", "Antimonio", "Boro", "Cinc", "Paladio", "Estaño", "Plata", "Litio", "Cobre"
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("acomodar")
    .setDescription("🧩 Acomoda palabras 🧩"),

  async execute(interaction) {
    try {
      const categorias = [animales, colores, frutas, cosasCotidianas, palabrasRandom];
      const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
      const palabraAleatoria = categoriaAleatoria[Math.floor(Math.random() * categoriaAleatoria.length)];
      const palabraDesordenada = desordenarPalabra(palabraAleatoria);

      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("🧩 Acomoda la palabra 🧩")
        .setDescription(`Acomoda la siguiente palabra: **${palabraDesordenada}**`);

      await interaction.reply({ embeds: [embed] });

      const filter = (m) => m.author.id === interaction.user.id;
      const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 20000 });

      collector.on("end", async (collected, reason) => {
        if (reason === "time") {
          await interaction.followUp(`🥵 Se acabó el tiempo para acomodar la palabra, ${interaction.user.toString()}!`);
        } else {
          const respuesta = collected.first().content.toLowerCase().trim();
          const palabraCorrecta = palabraAleatoria.toLowerCase();

          if (respuesta === palabraCorrecta) {
            await collected.first().reply(`🎊 ¡Correcto! 🎉 Has acomodado la palabra correctamente. 😎`);
          } else {
            await collected.first().reply(`😅 ¡Incorrecto! La respuesta correcta era **${palabraCorrecta}**. 🤯`);
          }
        }
      });
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp('⚠️ Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.');
      } else {
        await interaction.reply('⚠️ Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.');
      }
    }
  },
};

// Función para desordenar una palabra
function desordenarPalabra(palabra) {
  const palabraArray = palabra.split("");
  for (let i = palabraArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [palabraArray[i], palabraArray[j]] = [palabraArray[j], palabraArray[i]];
  }
  return palabraArray.join("");
}
