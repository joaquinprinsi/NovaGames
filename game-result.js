const ResultType = {
    TIMEOUT: 'timeout',
    FORCE_END: 'force_end',
    WINNER: 'winner',
    LOSER: 'loser',
    TIE: 'tie',
    ERROR: 'error',
    DELETED: 'deleted',
};

class GameResult {
    constructor(result, error = undefined, name = undefined, score = undefined) {
        this.result = result;
        this.error = error;
        this.name = name;
        this.score = score;
    }
}

module.exports = { GameResult, ResultType };
