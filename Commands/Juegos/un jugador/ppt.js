const { Client, ChatInputCommandInteraction, ComponentType, ActionRowBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ppt")
        .setDescription("Juega una partida de piedra, papel o tijeras!"),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { user, guild } = interaction;
        let choices = ["piedra", "papel", "tijeras"];
        const botchoice = `${choices[(Math.floor(Math.random() * choices.length))]}`;

        const Embed = new EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: "Piedra, papel o tijeras!!", iconURL: user.displayAvatarURL() })
            .setDescription(`<@${user.id}> vamos a la ataque!!`);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("piedra")
                .setLabel("piedra")
                .setEmoji(`🪨`),

            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("papel")
                .setLabel("papel")
                .setEmoji(`🧻`),

            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("tijeras")
                .setLabel("tijeras")
                .setEmoji(`✂️`)
        );

        const Page = await interaction.reply({
            embeds: [Embed],
            components: [row]
        });

        const col = Page.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: ms("10s")
        });

        col.on("collect", i => {
            switch (i.customId) {
                case "piedra": {
                    if (botchoice == "piedra") {
                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Random`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Empate 🥴🥴\`\`\``)
                                    .addFields(
                                        { name: "Mi elección", value: "🪨 Piedra", inline: true },
                                        { name: "Elección del bot", value: "🪨 Piedra", inline: true }
                                    )
                            ],
                            components: []
                        });
                    }
                    if (botchoice == "papel") {
                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Random`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Has perdido la partida, el bot gana 🥵\`\`\``)
                                    .addFields(
                                        { name: "Mi elección", value: "🪨 Piedra", inline: true },
                                        { name: "Elección del bot", value: "🧻 Papel", inline: true }
                                    )
                            ],
                            components: []
                        });
                    }
                    if (botchoice == "tijeras") {
                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Random`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Has ganado la partida 😎\`\`\``)
                                    .addFields(
                                        { name: "Mi elección", value: "🪨 Piedra", inline: true },
                                        { name: "Elección del bot", value: "✂️ Tijeras", inline: true }
                                    )
                            ],
                            components: []
                        });
                    }
                }
                break;
                case "papel": {
                    if (botchoice == "piedra") {
                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Random`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Has ganado la partida 🥳😎\`\`\``)
                                    .addFields(
                                        { name: "Mi elección", value: "🧻 Papel", inline: true },
                                        { name: "Elección del bot", value: "🪨 Piedra", inline: true }
                                    )
                            ],
                            components: []
                        });
                    }
                    if (botchoice == "papel") {
                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Random`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Empate 🥴\`\`\``)
                                    .addFields(
                                        { name: "Mi elección", value: "🧻 Papel", inline: true },
                                        { name: "Elección del bot", value: "🧻 Papel", inline: true }
                                    )
                            ],
                            components: []
                        });
                    }
                    if (botchoice == "tijeras") {
                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Random`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Has perdido la partida, el bot gana 🥵\`\`\``)
                                    .addFields(
                                        { name: "Mi elección", value: "🧻 Papel", inline: true },
                                        { name: "Elección del bot", value: "✂️ Tijeras", inline: true }
                                    )
                            ],
                            components: []
                        });
                    }
                }
                break;

                case "tijeras": {
                    if (botchoice == "piedra") {
                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Random`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Has perdido la partida, el bot gana 🥵\`\`\``)
                                    .addFields(
                                        { name: "Mi elección", value: "✂️ Tijeras", inline: true },
                                        { name: "Elección del bot", value: "🪨 Piedra", inline: true }
                                    )
                            ],
                            components: []
                        });
                    }
                    if (botchoice == "papel") {
                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Random`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Has ganado la partida 🥳🥳 \`\`\``)
                                    .addFields(
                                        { name: "Mi elección", value: "✂️ Tijeras", inline: true },
                                        { name: "Elección del bot", value: "🧻 Papel", inline: true }
                                    )
                            ],
                            components: []
                        });
                    }
                    if (botchoice == "tijeras") {
                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Random`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Empate 🥴\`\`\``)
                                    .addFields(
                                        { name: "Mi elección", value: "✂️ Tijeras", inline: true },
                                        { name: "Elección del bot", value: "✂️ Tijeras", inline: true }
                                    )
                            ],
                            components: []
                        });
                    }
                }
                break;
            }
        });
        col.on("end", (collected) => {
            if (collected.size > 0) return;
            interaction.editReply({
                embeds: [
                    Embed.setDescription(`No elegiste tu ataque. ¿Acaso te dio miedo?`)
                ],
                components: []
            });
        });
    }
};