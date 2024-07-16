const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const GameBase = require('./../../../game-base');
const { GameResult, ResultType } = require('./../../../game-result');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hangman')
        .setDescription('Inicia un juego de Ahorcado'),

    async execute(interaction) {
        const game = new HangmanGame();

        game.newGame(interaction, null, (result) => {
            interaction.reply({
                embeds: [game.getGameOverContent(result)]
            });
        });

        await interaction.reply({
            content: '¡Juego de Ahorcado iniciado!',
            ephemeral: true
        });
    },
};
//unicode fun...
const reactions = new Map([
    ['🅰️', 'A'],
    ['🇦', 'A'],
    ['🅱️', 'B'],
    ['🇧', 'B'],
    ['🇨', 'C'],
    ['🇩', 'D'],
    ['🇪', 'E'],
    ['🇫', 'F'],
    ['🇬', 'G'],
    ['🇭', 'H'],
    ['ℹ️', 'I'],
    ['🇮', 'I'],
    ['🇯', 'J'],
    ['🇰', 'K'],
    ['🇱', 'L'],
    ['Ⓜ️', 'M'],
    ['🇲', 'M'],
    ['🇳', 'N'],
    ['🅾️', 'O'],
    ['⭕', 'O'],
    ['🇴', 'O'],
    ['🅿️', 'P'],
    ['🇵', 'P'],
    ['🇶', 'Q'],
    ['🇷', 'R'],
    ['🇸', 'S'],
    ['🇹', 'T'],
    ['🇺', 'U'],
    ['🇻', 'V'],
    ['🇼', 'W'],
    ['✖️', 'X'],
    ['❎', 'X'],
    ['❌', 'X'],
    ['🇽', 'X'],
    ['🇾', 'Y'],
    ['💤', 'Z'],
    ['🇿', 'Z'],
]);

class HangmanGame extends GameBase {
    constructor() {
        super('hangman', false);
        this.word = '';
        this.guessed = [];
        this.wrongs = 0;
    }

    newGame(interaction, player2, onGameEnd) {
        if (this.inGame)
            return;

        fetch('https://api.theturkey.dev/randomword')
            .then(resp => resp.text())
            .then(word => {
                this.word = word.toUpperCase();
                this.guessed = [];
                this.wrongs = 0;

                super.newGame(interaction, player2, onGameEnd);
            })
            .catch(() => console.log('Failed to fetch random word!'));
    }

    getBaseEmbed() {
        return new EmbedBuilder()
            .setColor('#db9a00')
            .setTitle('Hangman')
            .setAuthor({ name: 'Made By: TurkeyDev', iconURL: 'https://site.theturkey.dev/images/turkey_avatar.png', url: 'https://www.youtube.com/watch?v=0G3gD4KJ59U' })
            .setTimestamp();
    }

    getContent() {
        return {
            embeds: [this.getBaseEmbed()
                .setDescription(this.getDescription())
                .addFields({ name: 'Letters Guessed', value: this.guessed.length == 0 ? '\u200b' : this.guessed.join(' ') },
                           { name: 'How To Play', value: 'React to this message using the emojis that look like letters (🅰️, 🇹, )' })
                .setFooter({ text: `Currently Playing: ${this.gameStarter.username}` })]
        };
    }

    getGameOverContent(result) {
        return {
            embeds: [this.getBaseEmbed()
                .setDescription(`${this.getWinnerText(result)}\n\nThe Word was:\n${this.word}\n\n${this.getDescription()}`)]
        };
    }

    makeGuess(reaction) {
        if (reactions.has(reaction)) {
            const letter = reactions.get(reaction);
            if (letter === undefined)
                return;

            if (!this.guessed.includes(letter)) {
                this.guessed.push(letter);

                if (this.word.indexOf(letter) == -1) {
                    this.wrongs++;

                    if (this.wrongs == 5) {
                        this.gameOver({ result: ResultType.LOSER, name: this.gameStarter.username, score: this.word });
                        return;
                    }
                }
                else if (!this.word.split('').map(l => this.guessed.includes(l) ? l : '_').includes('_')) {
                    this.gameOver({ result: ResultType.WINNER, name: this.gameStarter.username, score: this.word });
                    return;
                }
            }
        }

        this.step(true);
    }

    getDescription() {
        return '```'
            + '|‾‾‾‾‾‾|   \n|     '
            + (this.wrongs > 0 ? '🎩' : ' ')
            + '   \n|     '
            + (this.wrongs > 1 ? '😟' : ' ')
            + '   \n|     '
            + (this.wrongs > 2 ? '👕' : ' ')
            + '   \n|     '
            + (this.wrongs > 3 ? '🩳' : ' ')
            + '   \n|    '
            + (this.wrongs > 4 ? '👞👞' : ' ')
            + '   \n|     \n|__________\n\n'
            + this.word.split('').map(l => this.guessed.includes(l) ? l : '_').join(' ')
            + '```';
    }

    onReaction(reaction) {
        const reactName = reaction.emoji.name;
        if (reactName)
            this.makeGuess(reactName);
        else
            this.step(true);
    }

    onInteraction(interaction) {}
}

module.exports = HangmanGame;
