const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, APIError } = require('discord.js');
const GameResult = require('./game-result');
const { ResultType } = GameResult;

class GameBase {
    constructor(gameType, isMultiplayerGame) {
        this.gameType = gameType;
        this.isMultiplayerGame = isMultiplayerGame;
        this.inGame = false;
        this.result = undefined;
        this.gameMessage = undefined;
        this.gameStarter = undefined;
        this.player2 = null;
        this.player1Turn = true;
        this.onGameEnd = () => {};
        this.gameTimeoutId = undefined;
    }

    newGame(interaction, player2, onGameEnd) {
        this.gameStarter = interaction.user ?? interaction.member.user;
        this.player2 = player2;
        this.onGameEnd = onGameEnd;
        this.inGame = true;

        const resp = { content: 'Game started. Happy Playing!' };
        interaction.reply(resp).catch(console.log);

        const content = this.getContent();
        interaction.followUp({ embeds: content.embeds, components: content.components }).then(msg => {
            this.gameMessage = msg;
            this.gameTimeoutId = setTimeout(() => this.gameOver({ result: ResultType.TIMEOUT }), 60000);
        }).catch(e => this.handleError(e, 'send message/ embed'));
    }

    step(edit = false) {
        if (edit)
            this.gameMessage?.edit(this.getContent());

        if (this.gameTimeoutId)
            clearTimeout(this.gameTimeoutId);
        this.gameTimeoutId = setTimeout(() => this.gameOver({ result: ResultType.TIMEOUT }), 60000);
    }

    handleError(e, perm) {
        if (e instanceof APIError) {
            switch (e.code) {
                case 10003:
                    this.gameOver({ result: ResultType.ERROR, error: 'Channel not found!' });
                    break;
                case 10008:
                    this.gameOver({ result: ResultType.DELETED, error: 'Message was deleted!' });
                    break;
                case 10062:
                    console.log('Unknown Interaction??');
                    break;
                case 50001:
                    this.gameMessage?.channel.send('The bot is missing access to perform some of its actions!').catch(() => {
                        console.log('Error in the access error handler!');
                    });
                    this.gameOver({ result: ResultType.ERROR, error: 'Missing access!' });
                    break;
                case 50013:
                    this.gameMessage?.channel.send(`The bot is missing the '${perm}' permissions it needs in order to work!`).catch(() => {
                        console.log('Error in the permission error handler!');
                    });
                    this.gameOver({ result: ResultType.ERROR, error: 'Missing permissions!' });
                    break;
                default:
                    console.log('Encountered a Discord error not handled!');
                    console.log(e);
                    break;
            }
        } else {
            this.gameOver({ result: ResultType.ERROR, error: 'Game embed missing!' });
        }
    }

    gameOver(result, interaction = undefined) {
        if (!this.inGame)
            return;

        this.result = result;
        this.inGame = false;

        const gameOverContent = this.getGameOverContent(result);

        if (result.result !== ResultType.FORCE_END) {
            this.onGameEnd(result);
            this.gameMessage?.edit(gameOverContent).catch(e => this.handleError(e, ''));
            this.gameMessage?.reactions.removeAll().catch(() => {});
        } else {
            if (interaction)
                interaction.update(gameOverContent).catch(e => this.handleError(e, 'update interaction'));
            else
                this.gameMessage?.edit(gameOverContent).catch(e => this.handleError(e, ''));
        }

        if (this.gameTimeoutId)
            clearTimeout(this.gameTimeoutId);
    }

    getWinnerText(result) {
        switch (result.result) {
            case ResultType.TIE:
                return 'It was a tie!';
            case ResultType.TIMEOUT:
                return 'The game went unfinished :(';
            case ResultType.FORCE_END:
                return 'The game was ended';
            case ResultType.ERROR:
                return 'ERROR: ' + result.error;
            case ResultType.WINNER:
                return '`' + result.name + '` has won!';
            case ResultType.LOSER:
                return '`' + result.name + '` has lost!';
            default:
                return '';
        }
    }

    setGameId(id) {
        this.gameId = id;
    }

    getGameId() {
        return this.gameId;
    }

    getGameType() {
        return this.gameType;
    }

    getMessageId() {
        return this.gameMessage?.id ?? '';
    }

    isInGame() {
        return this.inGame;
    }

    doesSupportMultiplayer() {
        return this.isMultiplayerGame;
    }

    createMessageActionRowButton(buttonInfo) {
        const row = new ActionRowBuilder().addComponents(
            ...buttonInfo.map(([id, label]) => 
                new ButtonBuilder()
                    .setCustomId(id)
                    .setLabel(label)
                    .setStyle(ButtonStyle.Secondary))
        );
        return row;
    }

    // Abstract methods to be implemented by subclasses
    getContent() {
        throw new Error('Method not implemented.');
    }

    getGameOverContent(result) {
        throw new Error('Method not implemented.');
    }

    onReaction(reaction) {
        throw new Error('Method not implemented.');
    }

    onInteraction(interaction) {
        throw new Error('Method not implemented.');
    }
}

module.exports = GameBase;
