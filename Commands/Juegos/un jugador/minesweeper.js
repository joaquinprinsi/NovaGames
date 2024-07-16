const { ActionRowBuilder, MessageSelectMenu, ButtonBuilder, EmbedBuilder } = require('discord.js');
const GameBase = require('./../../../game-base');
const GameResult = require('./../../../game-result');
const Position = require('./../../../position');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('minesweeper')
        .setDescription('Inicia un juego de Buscaminas'),

    async execute(interaction) {
        const game = new MinesweeperGame();

        game.newGame(interaction, null, (result) => {
            interaction.followUp(game.getGameOverContent(result));
        });

        await interaction.reply({
            content: '¡Juego de Buscaminas iniciado!',
            ephemeral: true
        });

        await interaction.editReply(game.getContent());
    },
};
const WIDTH = 9;
const HEIGHT = 8;
const numberEmotes = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];

class MinesweeperGame extends GameBase {
    constructor() {
        super('minesweeper', false);
        this.gameBoard = [];
        this.bombLocs = [];
        this.hoverLoc = { x: 0, y: 0 };
    }

    gameBoardToString(links = true) {
        let str = '';
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                str += this.gameBoard[y * WIDTH + x];
            }
            str += '\n';
        }
        return str;
    }

    newGame(interaction, player2, onGameEnd) {
        if (this.inGame)
            return;

        this.gameBoard = Array.from({ length: WIDTH * HEIGHT }, () => '⬜');
        this.bombLocs = Array.from({ length: WIDTH * HEIGHT }, () => false);

        this.gameBoard[0] = '🟪';
        this.hoverLoc = { x: 0, y: 0 };

        for (let i = 0; i < 7; i++) {
            const x = this.getRandomInt(WIDTH);
            const y = this.getRandomInt(HEIGHT);

            const index = y * WIDTH + x;

            if (!this.bombLocs[index])
                this.bombLocs[index] = true;
            else
                i--;
        }

        super.newGame(interaction, player2, onGameEnd);
    }

    getBaseEmbed() {
        return new EmbedBuilder()
            .setColor('#c7c7c7')
            .setTitle('Minesweeper')
            .setAuthor('Made By: TurkeyDev', 'https://site.theturkey.dev/images/turkey_avatar.png', 'https://www.youtube.com/watch?v=j2ylF1AX1RY')
            .setTimestamp();
    }

    getContent() {
        const row1 = new ActionRowBuilder().addComponents(
            new MessageSelectMenu()
                .setCustomId('column')
                .addOptions([...Array.from({ length: WIDTH }, (_, i) => ({
                    label: String.fromCharCode(65 + i),
                    value: String(i),
                    default: this.hoverLoc.x === i
                }))])
        );

        const row2 = new ActionRowBuilder().addComponents(
            new MessageSelectMenu()
                .setCustomId('row')
                .addOptions([...Array.from({ length: HEIGHT }, (_, i) => ({
                    label: String(i + 1),
                    value: String(i),
                    default: this.hoverLoc.y === i
                }))])
        );

        const row3 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('uncover')
                .setLabel('👆'),
            new ButtonBuilder()
                .setCustomId('flag')
                .setLabel('🚩')
        );

        return {
            embeds: [this.getBaseEmbed()
                .setDescription(this.gameBoardToString())
                .addField('How To Play:', 'Use the select menus to choose a tile, then click the finger to reveal the tile, or the flag to flag the tile!', false)
                .setFooter(`Currently Playing: ${this.gameStarter.username}`)],
            components: [row1, row2, row3]
        };
    }

    getGameOverContent(result) {
        return {
            embeds: [this.getBaseEmbed()
                .setDescription(`**GAME OVER!**\n${this.getWinnerText(result)}\n\n${this.gameBoardToString(false)}`)]
        };
    }

    gameOver(result, interaction = undefined) {
        this.resetPosState(this.hoverLoc.y * WIDTH + this.hoverLoc.x);
        super.gameOver(result, interaction);
    }

    step(edit) {
        let lose = false;
        let win = true;
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                const index = y * WIDTH + x;
                if ((this.gameBoard[index] === '⬜' || this.gameBoard[index] === '🟪') && !this.bombLocs[index])
                    win = false;
                if (this.gameBoard[index] === '💣')
                    lose = true;
                if ((this.gameBoard[index] === '🚩') && !this.bombLocs[index])
                    win = false;
            }
        }

        if (win) {
            this.gameOver({ result: 'WINNER', name: this.gameStarter.username, score: '' });
        }
        else if (lose) {
            this.showBombs();
            this.gameOver({ result: 'LOSER', name: this.gameStarter.username, score: '' });
        }
        else {
            super.step(edit);
        }
    }

    onReaction(reaction) { }

    onInteraction(interaction) {
        let currIndex = this.hoverLoc.y * WIDTH + this.hoverLoc.x;
        switch (interaction.customId) {
            case 'uncover':
                this.makeMove(this.hoverLoc.x, this.hoverLoc.y, true);
                break;
            case 'flag':
                this.makeMove(this.hoverLoc.x, this.hoverLoc.y, false);
                break;
            case 'row':
                this.resetPosState(currIndex);
                this.hoverLoc.y = parseInt(interaction.values[0]);
                currIndex = this.hoverLoc.y * WIDTH + this.hoverLoc.x;
                this.updatePosState(currIndex);
                break;
            case 'column':
                this.resetPosState(currIndex);
                this.hoverLoc.x = parseInt(interaction.values[0]);
                currIndex = this.hoverLoc.y * WIDTH + this.hoverLoc.x;
                this.updatePosState(currIndex);
                break;
        }

        this.step(false);
        interaction.update(this.getContent()).catch(e => super.handleError(e, 'update interaction'));
    }

    resetPosState(index) {
        if (this.gameBoard[index] === '🟪')
            this.gameBoard[index] = '⬜';
        else if (this.gameBoard[index] === '🔳')
            this.gameBoard[index] = '⬛';
    }

    updatePosState(index) {
        if (this.gameBoard[index] === '⬜')
            this.gameBoard[index] = '🟪';
        else if (this.gameBoard[index] === '⬛')
            this.gameBoard[index] = '🔳';
    }

    showBombs() {
        this.gameBoard = this.gameBoard.map((v, i) => this.bombLocs[i] ? '💣' : v);
    }

    uncover(col, row) {
        const index = row * WIDTH + col;
        if (this.bombLocs[index]) {
            this.gameBoard[index] = '💣';
        }
        else {
            let bombsAround = 0;
            for (let y = -1; y < 2; y++) {
                for (let x = -1; x < 2; x++) {
                    if (col + x < 0 || col + x >= WIDTH || row + y < 0 || row + y >= HEIGHT)
                        continue;
                    if (x === 0 && y === 0)
                        continue;
                    const i2 = (row + y) * WIDTH + (col + x);
                    if (this.bombLocs[i2])
                        bombsAround++;
                }
            }
            if (bombsAround == 0) {
                if (col === this.hoverLoc.x && row === this.hoverLoc.y)
                    this.gameBoard[index] = '🔳';
                else
                    this.gameBoard[index] = '⬛';
                for (let y = -1; y < 2; y++) {
                    for (let x = -1; x < 2; x++) {
                        if (col + x < 0 || col + x >= WIDTH || row + y < 0 || row + y >= HEIGHT)
                            continue;
                        if (this.gameBoard[(row + y) * WIDTH + (col + x)] === '⬜')
                            this.uncover(col + x, row + y);
                    }
                }
            }
            else {
                this.gameBoard[index] = numberEmotes[bombsAround - 1];
            }
        }
    }

    makeMove(col, row, uncover) {
        const index = row * WIDTH + col;
        if (this.gameBoard[index] === '🟪') {
            if (uncover)
                this.uncover(col, row);
            else
                this.gameBoard[index] = '🚩';

            this.step(true);
        }
        else if (this.gameBoard[index] === '🚩' && !uncover) {
            this.gameBoard[index] = '🟪';
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

module.exports = MinesweeperGame;
