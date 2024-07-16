const { Client, Intents, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const { Direction, oppositeDir } = require('./../../../direction');
const GameBase = require('./../../../game-base');
const GameResult = require('./../../../game-result');
const Position = require('./../../../position');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('2048')
        .setDescription('Inicia un juego de 2048'),

    async execute(interaction) {
        const game = new TwentyFortyEightGame();

        game.newGame(interaction, null, (result) => {
            interaction.reply({
                embeds: [game.getGameOverContent(result)]
            });
        });

        await interaction.reply({
            content: '¡Juego de 2048 iniciado!',
            ephemeral: true
        });
    },
};

const WIDTH = 4;
const HEIGHT = 4;

class TwentyFortyEightGame extends GameBase {
    constructor() {
        super('2048', false);
        this.mergedPos = [];
        this.gameBoard = Array.from({ length: WIDTH * HEIGHT }, () => 0);
        this.placeRandomNewTile();
        this.score = 0;
    }

    getBaseEmbed() {
        return new EmbedBuilder()
            .setColor('#f2e641')
            .setTitle('2048')
            .setAuthor('Hecho por: TurkeyDev', 'https://site.theturkey.dev/images/turkey_avatar.png', 'https://www.youtube.com/watch?v=zHyKnlUWnp8')
            .setImage(`https://api.theturkey.dev/discordgames/gen2048?gb=${this.gameBoard.join(',')}`)
            .setTimestamp();
    }

    getContent() {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('left')
                    .setLabel('⬅️')
                    .setStyle('PRIMARY'),
                new ButtonBuilder()
                    .setCustomId('up')
                    .setLabel('⬆️')
                    .setStyle('PRIMARY'),
                new ButtonBuilder()
                    .setCustomId('right')
                    .setLabel('➡️')
                    .setStyle('PRIMARY'),
                new ButtonBuilder()
                    .setCustomId('down')
                    .setLabel('⬇️')
                    .setStyle('PRIMARY'),
            );

        const embed = this.getBaseEmbed()
            .addField('Puntuación:', this.score.toString())
            .setFooter(`Jugando actualmente: ${this.gameStarter.username}`);

        return { embeds: [embed], components: [row] };
    }

    getGameOverContent(result) {
        return { embeds: [new EmbedBuilder().setDescription(`¡JUEGO TERMINADO!\nPuntuación: ${this.score}`).setFooter(`Jugador: ${this.gameStarter.username}`)] };
    }

    placeRandomNewTile() {
        const newPos = { x: 0, y: 0 };
        do {
            newPos.x = Math.floor(Math.random() * WIDTH);
            newPos.y = Math.floor(Math.random() * HEIGHT);
        } while (this.gameBoard[newPos.y * WIDTH + newPos.x] !== 0);

        this.gameBoard[newPos.y * WIDTH + newPos.x] = Math.random() < 0.25 ? 2 : 1;
    }

    shiftLeft() {
        let moved = false;
        for (let y = 0; y < HEIGHT; y++)
            for (let x = 1; x < WIDTH; x++)
                moved = this.shift({ x, y }, Direction.LEFT) || moved;
        return moved;
    }

    shiftRight() {
        let moved = false;
        for (let y = 0; y < HEIGHT; y++)
            for (let x = WIDTH - 2; x >= 0; x--)
                moved = this.shift({ x, y }, Direction.RIGHT) || moved;
        return moved;
    }

    shiftUp() {
        let moved = false;
        for (let x = 0; x < WIDTH; x++)
            for (let y = 1; y < HEIGHT; y++)
                moved = this.shift({ x, y }, Direction.UP) || moved;
        return moved;
    }

    shiftDown() {
        let moved = false;
        for (let x = 0; x < WIDTH; x++)
            for (let y = HEIGHT - 2; y >= 0; y--)
                moved = this.shift({ x, y }, Direction.DOWN) || moved;
        return moved;
    }

    shift(pos, dir) {
        let moved = false;
        const movingNum = this.gameBoard[pos.y * WIDTH + pos.x];
        if (movingNum === 0)
            return false;

        let moveTo = pos;
        let set = false;
        while (!set) {
            moveTo = Position.move(moveTo, dir);
            const moveToNum = this.gameBoard[moveTo.y * WIDTH + moveTo.x];
            if (!Position.isInside(moveTo, WIDTH, HEIGHT) || (moveToNum !== 0 && moveToNum !== movingNum) || this.mergedPos.find(p => p.x === moveTo.x && p.y === moveTo.y)) {
                const oppDir = oppositeDir(dir);
                const moveBack = Position.move(moveTo, oppDir);
                if (!Position.posEqual(moveBack, pos)) {
                    this.gameBoard[pos.y * WIDTH + pos.x] = 0;
                    this.gameBoard[moveBack.y * WIDTH + moveBack.x] = movingNum;
                    moved = true;
                }
                set = true;
            }
            else if (moveToNum === movingNum) {
                moved = true;
                this.gameBoard[moveTo.y * WIDTH + moveTo.x] += 1;
                this.score += Math.floor(Math.pow(this.gameBoard[moveTo.y * WIDTH + moveTo.x], 2));
                this.gameBoard[pos.y * WIDTH + pos.x] = 0;
                set = true;
                this.mergedPos.push(moveTo);
            }
        }
        return moved;
    }

    isBoardFull() {
        return !this.gameBoard.includes(0);
    }

    numMovesPossible() {
        let numMoves = 0;
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                const pos = { x, y };
                const posNum = this.gameBoard[pos.y * WIDTH + pos.x];
                [Direction.DOWN, Direction.LEFT, Direction.RIGHT, Direction.UP].forEach(dir => {
                    const newPos = Position.move(pos, dir);
                    if (Position.isInside(newPos, WIDTH, HEIGHT) && (this.gameBoard[newPos.y * WIDTH + newPos.x] === 0 || this.gameBoard[newPos.y * WIDTH + newPos.x] === posNum))
                        numMoves++;
                });
            }
        }
        return numMoves;
    }

    async onInteraction(interaction) {
        if (!interaction.isButton())
            return;

        let moved = false;
        this.mergedPos = [];
        switch (interaction.customId) {
            case 'left':
                moved = this.shiftLeft();
                break;
            case 'up':
                moved = this.shiftUp();
                break;
            case 'right':
                moved = this.shiftRight();
                break;
            case 'down':
                moved = this.shiftDown();
                break;
        }

        if (moved)
            this.placeRandomNewTile();

        super.step(false);

        if (this.isBoardFull() && this.numMovesPossible() === 0) {
            const result = new GameResult(ResultType.LOSER, this.gameStarter.username, `${this.score}`);
            const gameOverContent = this.getGameOverContent(result);
            try {
                await interaction.update(gameOverContent);
            } catch (e) {
                super.handleError(e, 'update interaction');
            }
        } else {
            const content = this.getContent();
            try {
                await interaction.update(content);
            } catch (e) {
                super.handleError(e, 'update interaction');
            }
        }
    }

    onReaction(reaction) { }
}

module.exports = TwentyFortyEightGame;
