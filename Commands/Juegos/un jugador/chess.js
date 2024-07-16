const { ActionRowBuilder, ButtonBuilder, MessageSelectMenu, MessageSelectOption, EmbedBuilder } = require('discord.js');
const GameBase = require('./../../../game-base'); 
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chess')
        .setDescription('Inicia un juego de ajedrez')
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

        const game = new ChessGame();

        game.newGame(interaction, opponent, (result) => {
            interaction.reply({
                embeds: [game.getGameOverContent(result)]
            });
        });

        await interaction.reply({
            content: `¡Juego de ajedrez iniciado contra ${opponent.username}!`,
            ephemeral: true
        });
    },
};




const BLACK_KING = 6;
const WHITE_KING = 16;

class ChessGame extends GameBase {
    constructor() {
        super('chess', true);
        this.gameBoard = [];
        this.aiMoveStack = [];
        this.selectedMove = { fx: 0, fy: 0, tx: 0, ty: 0, replaced: -1 };
        this.message = '\u200b';
    }

    getGameDesc() {
        return '**Welcome to Chess!**\n'
            + '- To play simply use the reactions provided to first select your piece you want to move\n'
            + '- Next hit the check reaction\n'
            + '- Now select where you want that piece to be moved!\n'
            + '- To go back to the piece selection hit the back reaction!\n'
            + '- Hit the check reaction to confirm your movement!\n'
            + '- If the piece dose not move check below to possibly see why!\n'
            + '- You do play against an AI, however the AI is not particularly very smart!\n'
            + '- There is no castling and you must actually take the king to win!\n';
    }

    newGame(interaction, player2, onGameEnd) {
        if (super.isInGame())
            return;

        this.gameBoard = [2, 3, 4, 6, 5, 4, 3, 2,
            1, 1, 1, 1, 1, 1, 1, 1,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            11, 11, 11, 11, 11, 11, 11, 11,
            12, 13, 14, 15, 16, 14, 13, 12];

        this.player1Turn = true;
        this.selectedMove = { fx: 0, fy: 0, tx: 0, ty: 0, replaced: -1 };
        this.message = '\u200b';

        super.newGame(interaction, player2, onGameEnd);
    }

    getLetterOptions(to) {
        return [0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            new MessageSelectOption({ label: `${to ? 'To' : 'From'} ${String.fromCharCode(65 + i)}`, value: `${i}` })
                .setDefault(to ? this.selectedMove.tx === i : this.selectedMove.fx === i)
        ));
    }

    getNumberOptions(to) {
        return [0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            new MessageSelectOption({ label: `${to ? 'To' : 'From'} ${i + 1}`, value: `${i}` })
                .setDefault(to ? this.selectedMove.ty === i : this.selectedMove.fy === i)
        ));
    }

    getBaseEmbed() {
        return new EmbedBuilder()
            .setColor('#d6b881')
            .setTitle('Chess')
            .setAuthor('Made By: TurkeyDev', 'https://site.theturkey.dev/images/turkey_avatar.png', 'https://www.youtube.com/watch?v=yMg9tVZBSPw')
            .setDescription(this.getGameDesc())
            .setImage(`https://api.theturkey.dev/discordgames/genchessboard?gb=${this.gameBoard.join(',')}&s1=${this.selectedMove.fx},${this.selectedMove.fy}&s2=${this.selectedMove.tx},${this.selectedMove.ty}`)
            .setTimestamp();
    }

    getContent() {
        const row1 = new ActionRowBuilder().addComponents(
            new MessageSelectMenu({ customId: 'from_letter', options: this.getLetterOptions(false) })
        );
        const row2 = new ActionRowBuilder().addComponents(
            new MessageSelectMenu({ customId: 'from_number', options: this.getNumberOptions(false) })
        );
        const row3 = new ActionRowBuilder().addComponents(
            new MessageSelectMenu({ customId: 'to_letter', options: this.getLetterOptions(true) })
        );
        const row4 = new ActionRowBuilder().addComponents(
            new MessageSelectMenu({ customId: 'to_number', options: this.getNumberOptions(true) })
        );
        const row5 = new ActionRowBuilder().addComponents(
            new ButtonBuilder({ style: 'SECONDARY', customId: 'confirm', label: 'Confirm' })
        );

        const resp = {
            embeds: [this.getBaseEmbed()
                .setDescription(this.getGameDesc())
                .addField('Turn:', this.getDisplayForTurn())
                .addField('Message:', this.message)
                .setFooter(`Currently Playing: ${this.gameStarter.username}`)],
            components: [row1, row2, row3, row4, row5]
        };
        return resp;
    }

    getGameOverContent(result) {
        return {
            embeds: [this.getBaseEmbed().setDescription('GAME OVER! ' + this.getWinnerText(result))]
        };
    }

    endTurn() {
        if (!this.gameBoard.includes(BLACK_KING) || !this.gameBoard.includes(WHITE_KING)) {
            this.gameOver({ result: ResultType.WINNER, name: this.getDisplayForTurn(), score: this.gameBoard.join(',') });
        }

        this.player1Turn = !this.player1Turn;

        if (!this.player1Turn && this.player2 == null && this.isInGame()) {
            this.makeBestMove();
            this.endTurn();
        }
    }

    onInteraction(interaction) {
        const id = interaction.customId;
        const val = interaction.isButton() ? '' : interaction.values[0];

        switch (id) {
            case 'confirm':
                const fromIndex = (this.selectedMove.fy * 8) + this.selectedMove.fx;
                const fromPiece = this.gameBoard[fromIndex];
                const toIndex = (this.selectedMove.ty * 8) + this.selectedMove.tx;
                if ((fromPiece >= 10 && this.player1Turn) || (fromPiece > 0 && fromPiece < 10 && !this.player1Turn)) {
                    this.message = '\u200b';
                    const moveInfo = this.canPieceMoveTo(fromPiece, this.selectedMove);
                    if (moveInfo.valid) {
                        this.gameBoard[fromIndex] = 0;
                        this.gameBoard[toIndex] = fromPiece;
                        this.selectedMove = { fx: -1, fy: -1, tx: -1, ty: -1, replaced: -1 };
                        this.endTurn();
                    }
                    else {
                        this.message = moveInfo.msg;
                    }
                }
                else if (fromPiece == 0) {
                    this.message = 'There is no piece at that location!';
                }
                else {
                    this.message = 'You cannot move that piece!';
                }
                break;
            case 'from_letter':
                this.selectedMove.fx = parseInt(val);
                break;
            case 'from_number':
                this.selectedMove.fy = parseInt(val);
                break;
            case 'to_letter':
                this.selectedMove.tx = parseInt(val);
                break;
            case 'to_number':
                this.selectedMove.ty = parseInt(val);
                break;
        }

        this.step(false);
        interaction.update(this.result ? this.getGameOverContent(this.result) : this.getContent()).catch(e => super.handleError(e, 'update interaction'));
    }

    canPieceMoveTo(piece, selectedMove) {
        const blackPiece = piece < 10;

        switch (piece % 10) {
            case 1:
                return this.checkPawnMove(blackPiece, selectedMove);
            case 2:
                return this.checkRookMove(blackPiece, selectedMove);
            case 3:
                return this.checkKnightMove(blackPiece, selectedMove);
            case 4:
                return this.checkBishopMove(blackPiece, selectedMove);
            case 5:
                const rookMove = this.checkRookMove(blackPiece, selectedMove, true);
                if (!rookMove.valid)
                    return this.checkBishopMove(blackPiece, selectedMove, true);
                return rookMove;
            case 6:
                return this.checkKingMove(blackPiece, selectedMove);
        }
        return { valid: false, msg: 'Invalid Piece!' };
    }

    checkPawnMove(blackPiece, selectedMove) {
        const xDiff = selectedMove.fx - selectedMove.tx;
        const yDiff = selectedMove.fy - selectedMove.ty;
        const pieceAt = this.gameBoard[(selectedMove.ty * 8) + selectedMove.tx];
        if (pieceAt != 0 && ((blackPiece && pieceAt < 10) || (!blackPiece && pieceAt > 10)))
            return { valid: false, msg: 'You already have a piece there!' };

        const pieceAtDiff = pieceAt != 0 && ((blackPiece && pieceAt < 10) || (!blackPiece && pieceAt > 10));
        if ((Math.abs(yDiff) == 2 && !pieceAtDiff) && (selectedMove.fy == (blackPiece ? 6 : 1))) {
            this.aiMoveStack.push(selectedMove);
            return { valid: true, msg: '\u200b' };
        }}}
