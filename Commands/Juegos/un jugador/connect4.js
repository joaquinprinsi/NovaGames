const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const GameResult = require('./../../../game-result');
const { ResultType } = require('./../../../game-result');
const GameBase = require('./../../../game-base');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect4')
        .setDescription('Inicia un juego de Connect-4')
        .addUserOption(option =>
            option.setName('oponente')
                .setDescription('Selecciona un oponente para jugar')
                .setRequired(true)),

    async execute(interaction) {
        const opponent = interaction.options.getUser('oponente');

        if (!opponent) {
            return interaction.reply({
                content: 'Debes seleccionar un oponente para jugar.',
                ephemeral: true
            });
        }

        const game = new Connect4Game();

        game.newGame(interaction, opponent, (result) => {
            interaction.reply({
                embeds: [game.getGameOverContent(result)]
            });
        });

        await interaction.reply({
            content: `¡Juego de Connect-4 iniciado contra ${opponent.username}!`,
            ephemeral: true
        });
    },
};

const WIDTH = 7;
const HEIGHT = 7;

class Connect4Game extends GameBase {
    constructor() {
        super('connect4', true);
        this.gameBoard = Array.from({ length: WIDTH * HEIGHT }, () => '⚪');
    }

    gameBoardToString() {
        let str = '';
        if (!this.player2)
            str += 'Note there is no AI for this game, so you are just playing against yourself';
        str += '\n|1️⃣|2️⃣|3️⃣|4️⃣|5️⃣|6️⃣|7️⃣|\n';
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++)
                str += '|' + this.gameBoard[y * WIDTH + x];
            str += '|\n';
        }
        return str;
    }

    newGame(interaction, player2, onGameEnd) {
        if (super.isInGame())
            return;

        this.gameBoard = Array.from({ length: WIDTH * HEIGHT }, () => '⚪');
        super.newGame(interaction, player2, onGameEnd);
    }

    getBaseEmbed() {
        return new EmbedBuilder()
            .setColor('#000b9e')
            .setTitle('Connect-4')
            .setAuthor({ name: 'Made By: TurkeyDev', iconURL: 'https://site.theturkey.dev/images/turkey_avatar.png', url: 'https://www.youtube.com/watch?v=Sl1ZnvlNalI' })
            .setTimestamp();
    }

    getContent() {
        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('1').setLabel('1️⃣').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('2').setLabel('2️⃣').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('3').setLabel('3️⃣').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('4').setLabel('4️⃣').setStyle(ButtonStyle.Secondary)
        );
        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('5').setLabel('5️⃣').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('6').setLabel('6️⃣').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('7').setLabel('7️⃣').setStyle(ButtonStyle.Secondary)
        );

        return {
            embeds: [this.getBaseEmbed()
                .setDescription(this.gameBoardToString())
                .addFields({ name: 'Turn:', value: this.getUserDisplay() })
                .setFooter({ text: `Currently Playing: ${this.gameStarter.username}` })],
            components: [row1, row2]
        };
    }

    getGameOverContent(result) {
        return {
            embeds: [this.getBaseEmbed()
                .setDescription(`**GAME OVER! ${this.getWinnerText(result)}**\n\n${this.gameBoardToString()}`)]
        };
    }

    step() {
        this.player1Turn = !this.player1Turn;
        super.step(false);
    }

    onReaction(reaction) {}

    onInteraction(interaction) {
        const sender = interaction.user.id;
        const turnPlayerId = this.player1Turn ? this.gameStarter.id : (this.player2 ? this.player2.id : this.gameStarter.id);
        if (sender !== turnPlayerId) {
            interaction.deferUpdate().catch(e => super.handleError(e, 'defer interaction'));
            return;
        }

        const customId = interaction.customId;
        if (!customId) {
            this.step();
            interaction.deferUpdate().catch(e => super.handleError(e, 'defer interaction'));
            return;
        }

        let column = parseInt(customId);

        if (column === undefined) {
            interaction.deferUpdate().catch(e => super.handleError(e, 'defer interaction'));
            return;
        }

        column -= 1;
        let placedX = -1;
        let placedY = -1;

        for (let y = HEIGHT - 1; y >= 0; y--) {
            const chip = this.gameBoard[column + (y * WIDTH)];
            if (chip === '⚪') {
                this.gameBoard[column + (y * WIDTH)] = this.getChipFromTurn();
                placedX = column;
                placedY = y;
                break;
            }
        }

        if (this.hasWon(placedX, placedY)) {
            this.gameOver({ result: ResultType.WINNER, name: this.getUserDisplay(), score: this.getScore() }, interaction);
        } else if (this.isBoardFull()) {
            this.gameOver({ result: ResultType.TIE, score: this.getScore() }, interaction);
        } else {
            this.step();
            interaction.update(this.getContent()).catch(e => super.handleError(e, 'update interaction'));
        }
    }

    getScore() {
        return this.gameBoard.map(chip => chip === '⚪' ? '0' : (chip === '🔴' ? '1' : '2')).join('');
    }

    getUserDisplay() {
        if (this.isMultiplayerGame && this.player2)
            return this.player1Turn ? '🔴 ' + this.gameStarter.username : '🟡 ' + (this.player2?.username ?? 'ERR');
        return this.getChipFromTurn();
    }

    getChipFromTurn() {
        return this.player1Turn ? '🔴' : '🟡';
    }

    hasWon(placedX, placedY) {
        const chip = this.getChipFromTurn();

        // Horizontal Check
        const y = placedY * WIDTH;
        for (let i = Math.max(0, placedX - 3); i <= Math.min(placedX, WIDTH - 1); i++) {
            const adj = i + y;
            if (i + 3 < WIDTH) {
                if (this.gameBoard[adj] === chip && this.gameBoard[adj + 1] === chip && this.gameBoard[adj + 2] === chip && this.gameBoard[adj + 3] === chip)
                    return true;
            }
        }

        // Vertical Check
        for (let i = Math.max(0, placedY - 3); i <= Math.min(placedY, HEIGHT - 1); i++) {
            const adj = placedX + (i * WIDTH);
            if (i + 3 < HEIGHT) {
                if (this.gameBoard[adj] === chip && this.gameBoard[adj + WIDTH] === chip && this.gameBoard[adj + (2 * WIDTH)] === chip && this.gameBoard[adj + (3 * WIDTH)] === chip)
                    return true;
            }
        }

        // Ascending Diag
        for (let i = -3; i <= 0; i++) {
            const adjX = placedX + i;
            const adjY = placedY + i;
            if (adjX < 0 || adjY < 0)
                continue;
            const adj = adjX + (adjY * WIDTH);
            if (adjX + 3 < WIDTH && adjY + 3 < HEIGHT) {
                if (this.gameBoard[adj] === chip && this.gameBoard[adj + WIDTH + 1] === chip && this.gameBoard[adj + (2 * WIDTH) + 2] === chip && this.gameBoard[adj + (3 * WIDTH) + 3] === chip)
                    return true;
            }
        }

        // Descending Diag
        for (let i = -3; i <= 0; i++) {
            const adjX = placedX + i;
            const adjY = placedY - i;
            if (adjX < 0 || adjY < 0)
                continue;
            const adj = adjX + (adjY * WIDTH);
            if (adjX + 3 < WIDTH && adjY - 3 >= 0) {
                if (this.gameBoard[adj] === chip && this.gameBoard[adj - WIDTH + 1] === chip && this.gameBoard[adj - (2 * WIDTH) + 2] === chip && this.gameBoard[adj - (3 * WIDTH) + 3] === chip)
                    return true;
            }
        }

        return false;
    }

    isBoardFull() {
        return !this.gameBoard.includes('⚪');
    }
}

module.exports = Connect4Game;
