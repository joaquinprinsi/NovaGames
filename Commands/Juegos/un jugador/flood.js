const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const GameBase = require('./../../../game-base');
const GameResult = require('./../../../game-result');
const { ResultType } = GameResult;
const Position = require('./../../../position');
const { up, down, left, right, isInside } = Position;
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flood')
        .setDescription('Inicia un juego de Flood'),

    async execute(interaction) {
        const game = new FloodGame();

        game.newGame(interaction, null, (result) => {
            interaction.reply({
                embeds: [game.getGameOverContent(result)]
            });
        });

        await interaction.reply({
            content: '¡Juego de Flood iniciado!',
            ephemeral: true
        });
    },
};
const WIDTH = 13;
const HEIGHT = 13;

const SQUARES = { 'red_square': '🟥', 'blue_square': '🟦', 'orange_square': '🟧', 'purple_square': '🟪', 'green_square': '🟩' };

class FloodGame extends GameBase {
    constructor() {
        super('flood', false);
        this.gameBoard = Array.from({ length: WIDTH * HEIGHT }, () => Object.values(SQUARES)[Math.floor(Math.random() * Object.keys(SQUARES).length)]);
        this.turn = 1;
    }

    gameBoardToString() {
        let str = '';
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                str += this.gameBoard[y * WIDTH + x];
            }
            str += '\n';
        }
        return str;
    }

    getBaseEmbed() {
        return new EmbedBuilder()
            .setColor('#08b9bf')
            .setTitle('Flood')
            .setAuthor({ name: 'Made By: TurkeyDev', iconURL: 'https://site.theturkey.dev/images/turkey_avatar.png', url: 'https://www.youtube.com/watch?v=BCKoXy94PM4' })
            .setTimestamp();
    }

    getContent() {
        const row = new ActionRowBuilder()
            .addComponents(
                ...Object.entries(SQUARES).map(([k, v]) => 
                    new ButtonBuilder()
                        .setCustomId(k)
                        .setLabel(v)
                        .setStyle(ButtonStyle.Secondary))
            );

        const embed = this.getBaseEmbed()
            .setDescription(this.gameBoardToString())
            .addFields({ name: 'Turn:', value: this.turn.toString() })
            .setFooter({ text: `Currently Playing: ${this.gameStarter.username}` });

        return {
            embeds: [embed],
            components: [row]
        };
    }

    getGameOverContent(result) {
        const turnResp = result.result == ResultType.WINNER ? `Game beat in ${this.turn - 1} turns!` : '';
        return {
            embeds: [this.getBaseEmbed().setDescription(`GAME OVER!\n${turnResp}`).setFooter({ text: `Player: ${this.gameStarter.username}` })]
        };
    }

    onInteraction(interaction) {
        if (!interaction.isButton()) return;

        const selected = Object.entries(SQUARES).find(([k, v]) => k === interaction.customId);
        const current = this.gameBoard[0];

        if (selected && selected[1] !== current) {
            this.turn += 1;
            const queue = [{ x: 0, y: 0 }];
            const visited = [];

            while (queue.length > 0) {
                const pos = queue.shift();
                if (!pos || visited.some(p => p.x === pos.x && p.y === pos.y)) continue;

                visited.push(pos);
                if (this.gameBoard[pos.y * WIDTH + pos.x] === current) {
                    this.gameBoard[pos.y * WIDTH + pos.x] = selected[1];

                    [up(pos), down(pos), left(pos), right(pos)].forEach(checkPos => {
                        if (!visited.some(p => p.x === checkPos.x && p.y === checkPos.y) && isInside(checkPos, WIDTH, HEIGHT))
                            queue.push(checkPos);
                    });
                }
            }

            const gameOver = !this.gameBoard.find(t => t !== selected[1]);
            if (gameOver) {
                this.gameOver({ result: ResultType.WINNER, score: (this.turn - 1).toString() }, interaction);
            } else {
                super.step(false);
            }
        }

        if (this.isInGame()) {
            interaction.update(this.getContent()).catch(e => super.handleError(e, 'update interaction'));
        } else if (!this.result) {
            this.gameOver({ result: ResultType.ERROR }, interaction);
        }
    }

    onReaction(reaction) {}
}

module.exports = FloodGame;
