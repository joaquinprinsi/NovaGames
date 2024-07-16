const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.on('ready', () => {
    console.log(`Bot iniciado como ${client.user.tag}`);
    updateBotStatus(); // Actualiza el estado del bot al iniciar
    setInterval(updateBotStatus, 5 * 60 * 1000); // Actualiza el estado del bot cada 5 minutos
});

async function updateBotStatus() {
    const guildCount = client.guilds.cache.size;
    const memberCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

    await client.user.setPresence({
        activities: [{
            name: `${guildCount} servidores | ${memberCount} usuarios`,
            type: 'WATCHING'
        }],
        status: 'online'
    });
}

module.exports = client;
