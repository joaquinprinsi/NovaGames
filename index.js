const { Client, GatewayIntentBits, Partials, Collection, MessageEmbed, Interaction, ApplicationCommandOption, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { loadEvents } = require("./Handlers/eventHandler");
const { loadButtons } = require("./Handlers/buttonHandler");
const { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');

//a


// Integración del primer código (adaptado a Discord.js)
const SnakeGame = require('./Commands/Juegos/un jugador/snake');
const HangmanGame = require('./Commands/Juegos/un jugador/hangman');
const MinesweeperGame = require('./Commands/Juegos/un jugador/minesweeper');
const Connect4Game = require('./Commands/Juegos/un jugador/connect4');
const ChessGame = require('./Commands/Juegos/un jugador/chess');
const TicTacToeGame = require('./Commands/Juegos/un jugador/tic-tac-toe');
const GameBase = require('./game-base');
const GameResult = require('./game-result');
const FloodGame = require('./Commands/Juegos/un jugador/flood');
const TwentyFortyEightGame = require('./Commands/Juegos/un jugador/2048');

const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember],
});

const config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();

loadEvents(client);
loadButtons(client);

client.on("messageCreate", async message => {
  if (message.content === "chau") {
    message.channel.send("¡Hasta luego!");
  } else if (message.content === "ping") {
    message.channel.send("Pong!");
  } else if (message.content === "puta") {
    message.channel.send("¡como tu madre!");
  } else if (message.content === "._.") {
    message.channel.send("@_@");
  } else if (message.content === "nop") {
    message.channel.send("sip");
  } else if (message.content === "dea") {
    message.channel.send("ahre");
  } else if (message.content === "Hola") {
    message.channel.send("¡Hola! ¿Cómo estás?");
  }
});

client.on('ready', () => {
  updateStatus();
});

async function updateStatus() {
  while (true) {
    const serverCount = client.guilds.cache.size;
    const memberCount = client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0);
    client.user.setActivity(`${serverCount} servidores!!`);
    await sleep(15000); // Espera 15 segundos antes de actualizar nuevamente
    client.user.setActivity(`${memberCount} usuarios!!`);
    await sleep(15000); // Espera 15 segundos antes de actualizar nuevamente
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Integración del segundo código (adaptado a Discord.js)
const commandGameMap = {
  'snake': () => new SnakeGame(),
  'hangman': () => new HangmanGame(),
  'connect4': () => new Connect4Game(),
  'minesweeper': () => new MinesweeperGame(),
  'chess': () => new ChessGame(),
  'tictactoe': () => new TicTacToeGame(),
  'flood': () => new FloodGame(),
  '2048': () => new TwentyFortyEightGame(),
};

const playerGameMap = new Map();

client.on('ready', () => {
  initCommands();
  console.log(`Conectado como ${client.user.tag}!`);
});

function initCommands() {

  client.guilds.cache.forEach(guild => {
    guild.commands.set([])
      .then(() => {
        guild.commands.create({
          name: 'gamesbot',
          description: 'Ayuda e información de GamesBot'
        }).catch(console.error);

        guild.commands.create({
          name: 'listgames',
          description: 'Lista de juegos disponibles'
        }).catch(console.error);

        guild.commands.create({
          name: 'endgame',
          description: 'Termina el juego actualmente en curso'
        }).catch(console.error);

        guild.commands.create({
          name: 'snake',
          description: 'Jugar a Serpiente'
        }).catch(console.error);

        guild.commands.create({
          name: 'hangman',
          description: 'Jugar a Ahorcado'
        }).catch(console.error);

        new SlashCommandBuilder()
        .setName('connect4')
        .setDescription('Jugar a Conecta 4')
        .addSubcommand(subcommand =>
            subcommand
                .setName('select')
                .setDescription('Seleccionar a un oponente')
                .addUserOption(option =>
                    option.setName('opponent')
                        .setDescription('Elige a quién deseas desafiar')
                        .setRequired(true)
                )
        )

        guild.commands.create({
          name: 'minesweeper',
          description: 'Jugar a Buscaminas'
        }).catch(console.error);

        new SlashCommandBuilder()
        .setName('tictactoe')
        .setDescription('Jugar a Tres en Raya.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('select')
                .setDescription('Seleccionar a un oponente')
                .addUserOption(option =>
                    option.setName('opponent')
                        .setDescription('Elige a quién deseas desafiar')
                        .setRequired(true)
                )
        )

        new SlashCommandBuilder()
        .setName('chess')
        .setDescription('Jugar al Ajedrez')
        .addSubcommand(subcommand =>
            subcommand
                .setName('select')
                .setDescription('Seleccionar a un oponente')
                .addUserOption(option =>
                    option.setName('opponent')
                        .setDescription('Elige a quién deseas desafiar')
                        .setRequired(true)
                )
        )
        guild.commands.create({
          name: 'flood',
          description: 'Jugar a Flood'
        }).catch(console.error);

        guild.commands.create({
          name: '2048',
          description: 'Jugar a 2048'
        }).catch(console.error);

      })
      .catch(console.error);
  });
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const guildId = interaction.guildId;
  const userId = interaction.member?.user.id ?? interaction.user.id;
  const command = interaction.commandName;

  if (Object.keys(commandGameMap).includes(command)) {
    const game = commandGameMap[command]();
    Ajedr
    const player2Option = interaction.options.get('vs');
    let player2;
    if (player2Option) {
      if (!game.doesSupportMultiplayer()) {
        await interaction.reply({ content: '¡Lo siento, ese juego no es multijugador!', ephemeral: true });
        return;
      }
      const player2Id = player2Option.value;
      player2 = await interaction.guild.members.fetch(player2Id);
    }

    if (userId === player2?.id) {
      await interaction.reply({ content: '¡No puedes jugar contigo mismo!', ephemeral: true });
      return;
    }

    if (!playerGameMap.has(guildId))
      playerGameMap.set(guildId, new Map());

    const userGame = playerGameMap.get(guildId).get(userId);
    if (userGame) {
      await interaction.reply({ content: 'Debes terminar o finalizar tu juego actual (`/endgame`) antes de jugar otro!', ephemeral: true });
      return;
    }

    const player2Game = playerGameMap.get(guildId).get(player2?.id);
    if (player2 && player2Game) {
      await interaction.reply({ content: '¡La persona contra la que intentas jugar ya está en una partida!', ephemeral: true });
      return;
    }

    const existingGame = Array.from(playerGameMap.get(guildId).values()).find(g => g.getGameId() === game.getGameId());
    if (existingGame && existingGame.isInGame()) {
      await interaction.reply({ content: '¡Lo siento, solo puede haber una instancia de un juego a la vez!', ephemeral: true });
      return;
    }

    game.newGame(interaction, player2, (result) => {
      playerGameMap.get(guildId).delete(userId);
      if (player2)
        playerGameMap.get(guildId).delete(player2.id);
    });
    playerGameMap.get(guildId).set(userId, game);
    if (player2)
      playerGameMap.get(guildId).set(player2.id, game);

    await interaction.reply({ content: `Juego iniciado: ${command}`, ephemeral: true });
  }
  else if (command === 'endgame') {
    const userGame = playerGameMap.get(guildId).get(userId);
    if (userGame) {
      userGame.gameOver({ result: ResultType.FORCE_END });
      playerGameMap.get(guildId).delete(userId);
      if (userGame.player2)
        playerGameMap.get(guildId).delete(userGame.player2.id);

      await interaction.reply({ content: '¡Tu juego ha sido finalizado!', ephemeral: true });
    } else {
      await interaction.reply({ content: '¡Lo siento! ¡Debes estar en un juego primero!', ephemeral: true });
    }
  }
  else if (command === 'listgames') {
    const embed = new EmbedBuilder()
      .setColor('#fc2eff')
      .setTitle('Juegos Disponibles')
      .setDescription(`
        🐍 - Serpiente (/snake)
        🅰️ - Ahorcado (/hangman)
        🔵 - Conecta 4 (/connect4)
        💣 - Buscaminas (/minesweeper)
        ♟️ - Ajedrez (/chess)
        ❌ - Tres en Raya (/tictactoe)
        🟪 - Flood (/flood)
        8️⃣ - 2048 (/2048)
      `)
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
});

client.login(config.token);
