const { MessageActionRow, ButtonBuilder, EmbedBuilder } = require('discord.js');
const GameBase = require('./../../../game-base');
const Position = require('./../../../position');
const { ResultType } = require('./../../../game-result');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snake')
        .setDescription('Inicia un juego de Snake'),

    async execute(interaction) {
        const game = new SnakeGame();
        game.newGame(interaction, null, (result) => {
            interaction.followUp(game.getGameOverContent(result));
        });

        await interaction.reply(game.getContent());
    },
};

const WIDTH = 15;
const HEIGHT = 10;

class SnakeGame extends GameBase {
    constructor() {
        super('snake', false);
        this.gameBoard = [];
        this.apple = { x: 1, y: 1 };
        this.snake = [];
        this.snakeLength = 1;
        this.score = 0;

        // Initialize game board
        for (let i = 0; i < WIDTH * HEIGHT; i++) {
            this.gameBoard.push('🟦');
        }

        // Initialize snake starting position
        this.snake.push({ x: 5, y: 5 });
    }

    getGameBoard() {
        let str = '';
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                if (x === this.apple.x && y === this.apple.y) {
                    str += '🍎';
                } else {
                    let isSnakeBody = false;
                    for (let s = 0; s < this.snake.length; s++) {
                        if (x === this.snake[s].x && y === this.snake[s].y) {
                            if (s === 0) {
                                str += this.inGame ? '🐍' : '☠️';
                            } else {
                                str += '🟩';
                            }
                            isSnakeBody = true;
                        }
                    }
                    if (!isSnakeBody) {
                        str += this.gameBoard[y * WIDTH + x];
                    }
                }
            }
            str += '\n';
        }
        return str;
    }

    isLocInSnake(pos) {
        return this.snake.some(sPos => sPos.x === pos.x && sPos.y === pos.y);
    }

    newAppleLoc() {
        do {
            this.apple.x = Math.floor(Math.random() * WIDTH);
            this.apple.y = Math.floor(Math.random() * HEIGHT);
        } while (this.isLocInSnake(this.apple));
    }

    newGame(interaction, player2, onGameEnd) {
        if (this.isInGame()) return;
        this.score = 0;
        this.snakeLength = 1;
        this.snake = [{ x: 5, y: 5 }];
        this.newAppleLoc();
        super.newGame(interaction, player2, onGameEnd);
    }

    getBaseEmbed() {
        return new EmbedBuilder()
            .setColor('#03ad03')
            .setTitle('Snake Game')
            .setAuthor('Made By: TurkeyDev', 'https://site.theturkey.dev/images/turkey_avatar.png', 'https://www.youtube.com/watch?v=tk5c0t72Up4')
            .setTimestamp();
    }

    getContent() {
        const row = new MessageActionRow()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('left')
                    .setLabel('Left')
                    .setEmoji('⬅️')
                    .setStyle('PRIMARY'),
                new ButtonBuilder()
                    .setCustomId('up')
                    .setLabel('Up')
                    .setEmoji('⬆️')
                    .setStyle('PRIMARY'),
                new ButtonBuilder()
                    .setCustomId('right')
                    .setLabel('Right')
                    .setEmoji('➡️')
                    .setStyle('PRIMARY'),
                new ButtonBuilder()
                    .setCustomId('down')
                    .setLabel('Down')
                    .setEmoji('⬇️')
                    .setStyle('PRIMARY')
            );

        const embed = this.getBaseEmbed()
            .setDescription(this.getGameBoard())
            .setFooter(`Currently Playing: ${this.gameStarter.username}`);

        return { embeds: [embed], components: [row] };
    }

    getGameOverContent(result) {
        const embed = this.getBaseEmbed()
            .setDescription(`**GAME OVER!**\nScore: ${this.score}\n\n${this.getGameBoard()}`)
            .setFooter(`Player: ${this.gameStarter.username}`);

        return { embeds: [embed] };
    }

    step() {
        const snakeHead = this.snake[0];
        const nextPos = { x: snakeHead.x, y: snakeHead.y };

        switch (this.interaction.data.customId) {
            case 'left':
                nextPos.x = snakeHead.x - 1;
                break;
            case 'up':
                nextPos.y = snakeHead.y - 1;
                break;
            case 'down':
                nextPos.y = snakeHead.y + 1;
                break;
            case 'right':
                nextPos.x = snakeHead.x + 1;
                break;
        }

        if (this.isLocInSnake(nextPos) || nextPos.x < 0 || nextPos.x >= WIDTH || nextPos.y < 0 || nextPos.y >= HEIGHT) {
            this.gameOver({ result: ResultType.LOSER, score: this.score.toString() });
        } else {
            this.snake.unshift(nextPos);
            if (this.snake.length > this.snakeLength) {
                this.snake.pop();
            }
            if (nextPos.x === this.apple.x && nextPos.y === this.apple.y) {
                this.score++;
                this.snakeLength++;
                this.newAppleLoc();
            }
            super.step(false);
        }
    }

    onReaction(reaction) {}
    onInteraction(interaction) {
        this.interaction = interaction;
        this.step();
        interaction.update(this.getContent()).catch(e => super.handleError(e, 'update interaction'));
    }
}

module.exports = SnakeGame;
